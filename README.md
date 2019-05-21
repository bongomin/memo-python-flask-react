# memo-python-flask-react
Flask and React based intranet app where you can create and share lists (e.g. shopping list, todo, ...)



# memo-pytho-flask-react-app

Single page web app to keep track of various things, like shopping lists, to dos, ... The backend is written in python
using flask and flask-restful. The front end is coded around the react and redux js libraries. Ideal to run on a hobby webserver 
(e.g. raspberry pi).



## Installation

Installation instruction for deployment on a linux system. 

Clone the repository

    git clone 
    
Set up a virtual environment
    
    cd MemoBoard
    virtualenv --python=python3 venv
    
Activate the environment and install packages

    source venv/bin/activate
    pip install -r requirements.txt
    
Configure MemoBoard

    vim config.py
    
Set environmental variable (windows)
    
    set FLASK_APP=run.py 

Set environmental variable (linux)
    
    export FLASK_APP=run.py 

Create the database and migration

    # create database
    flask createdb
    
**Note:** When running this through a webservice and using SQLite, make sure the user www-data has read/write access to the file.

Run tests and run app

    python run_tests.py
    
    flask run
    
Check the web how to configure the webserver of your choice (tested with uwsgi and nginx) to serve memoboard. In case
a sqlite database is used, make sure the file is readable and writeable by the webserver.

# Front-end development

Install all packages through npm 

    npm install

Test (using Mocha)

    npm test

Build ./memoboard/static/js/bundle.js using webpack

    webpack -p

# Acknowledgements

This project makes use of several python packages and javascript libraries, without these development would have been much more complicated.
The favicon is from [http://www.freefavicon.com/]([http://www.freefavicon.com/).

