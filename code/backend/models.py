from flask.ext.sqlalchemy import SQLAlchemy
from flask import Flask
from hashlib import md5
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////vagrant/code/backend/db.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(512), unique=False)

    def __init__(self, email, password):
        self.email = email
        self.password = md5(password.encode('utf-8')).hexdigest()

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    telephone = db.Column(db.String(100))
    address = db.Column(db.String(100))
    comment = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    owner = db.relationship('User', backref=db.backref('contacts', lazy='dynamic'))

    def __init__(self, name, telephone, address, comment):
        self.name = name
        self.telephone = telephone
        self.address = address
        self.comment = comment

    def to_dict(self):
        d = {}
        d['name'], d['telephone'], d['address'],\
            d['comment'], d['id'], d['user_owner'] =\
            self.name, self.telephone, self.address,\
            self.comment, self.id, self.owner.id
        return d

db.create_all()
