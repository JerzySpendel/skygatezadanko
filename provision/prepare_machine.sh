#!/usr/bin/env bash

#install packages from apt
sudo apt-get update
sudo apt-get install git npm nginx -y

#python&flask&sqlalchemy
sudo apt-get install python python-pip python3 python3-pip ipython3 -y
sudo pip install flask flask-sqlalchemy
sudo pip3 install flask flask-sqlalchemy

#prepare nginx
sudo cp -u /vagrant/provision/nginx_settings/phonebook /etc/nginx/sites-enabled/default
sudo service nginx restart

#prepare frontend packages
sudo ln -s /usr/bin/nodejs /usr/bin/node
sudo npm install -g bower

#prepare frontend
cd /vagrant/code/frontend
bower install
