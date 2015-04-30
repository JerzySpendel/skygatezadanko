from flask import request, Response, session
from hashlib import md5
from functools import wraps
import json
import models
app = models.app
app.secret_key = 'spijdfP)*SDUf-ssJSOPS(S(DF(*#jpdf8SDfhf'


def json_mimetype(f):
    @wraps(f)
    def wrapper(*v, **kv):
        r = f(*v, **kv)
        if r is not None:
            r.headers['Content-Type'] = 'application/json'
            return r
        return r
    return wrapper


def logged(f):

    @wraps(f)
    @json_mimetype
    def wrapper(*v, **kv):
        if logged_user():
            return f(*v, **kv)
        return Response(status=404)
    return wrapper


def logged_user():
    if session['id']:
        return models.User.query.filter_by(id=session['id']).first()
    return None


@app.route('/logout', methods=['POST'])
@json_mimetype
def logout():
    session.pop('id', None)
    r = Response(json.dumps({'status': 'ok'}))
    return r


@app.route('/contacts', methods=['POST'])
@logged
def contacts_post():
    data = request.json
    u = models.User.query.filter_by(email='jspendel@gmail.com').first()
    m = models.Contact(data['name'], data['telephone'],
                       data['address'], data['comment'])
    m.owner = u
    models.db.session.add(m)
    models.db.session.commit()
    data['user_owner'] = u.id
    data['id'] = m.id
    r = Response(json.dumps(data))
    return r


@app.route('/contacts', methods=['GET'])
@logged
def contacts_get():
    cs = models.Contact.query.filter_by(user_id=session['id'])
    d = [c.to_dict() for c in cs]
    print(d)
    r = Response(json.dumps({'contacts': d}))
    return r


@app.route('/register', methods=['POST'])
@json_mimetype
def register():
    data = request.json
    u = models.User(data['email'], data['password'])
    if len(models.User.query.filter_by(email=data['email']).all()) != 0:
        r = Response({'status': 'bad', 'uid': 0})
        return r
    models.db.session.add(u)
    models.db.session.commit()
    r = Response(json.dumps({"status": "ok", "uid": 2}))
    return r


@app.route('/account', methods=['GET'])
@logged
def account():
    if session['id']:
        u = models.User.query.filter_by(id=session['id']).first()
        r = Response(json.dumps({'email': u.email, 'uid': session['id']}))
        return r
    return Response()


@app.route('/login', methods=['POST', 'GET'])
@json_mimetype
def login():
    data = request.json
    u = models.User.query.filter_by(email=data['email']).first()
    if u is None:
        r = Response(json.dumps({'status': 'bad', 'uid': 0}))
        return r
    if u.password == md5(data['password'].encode('utf-8')).hexdigest():
        r = Response(json.dumps({'status': 'ok', 'uid': u.id}))
        session['id'] = u.id
        return r


@app.route('/contacts/<int:pk>', methods=['DELETE'])
@logged
def delete(pk):
    u = logged_user()
    to_delete = models.Contact.query.filter_by(id=pk, user_id=u.id).first()
    models.db.session.delete(to_delete)
    models.db.session.commit()
    return Response()

app.run()
