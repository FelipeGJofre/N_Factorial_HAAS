#!/bin/python3

from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__, template_folder='./')
CORS(app)  # Handle CORS

@app.route("/signup", methods=["GET", "POST"])
def signup():
    data = request.json
    # Process the received data
    check_file = open("database.txt", "r")
    # Check whether it exists already or not
    for line in check_file.readlines():
        dbdata = json.loads(decrypt(line.strip(), 3, 1))
        if data['email'] == dbdata['email'] and data['password'] == dbdata['password']:
            print("User already exists!")
            check_file.close()
            return jsonify({'message': 'User already exists!'})
        
    check_file.close()
    file = open("database.txt", "a")
    file.write(encrypt(json.dumps(data), 3, 1) + "\n")
    file.close()
    print(data)
    return jsonify({'message': 'Received sign up data successfully'})   

@app.route("/login", methods=["GET", "POST"])
def login():
    querydata = request.json
    # Process the received data
    file = open("database.txt", "r")
    for line in file.readlines():
        dbdata = json.loads(decrypt(line.strip(), 3, 1))
        if querydata['email'] == dbdata['email'] and querydata['password'] == dbdata['password']:
            rtnmsg = "Hello, " + dbdata['user']
    file.close()
    print(rtnmsg)
    return jsonify({'message': 'Found user data successfully'})

def encrypt(text, n, d):
    return "".join([chr(((ord(c) + (n * d)) % 128)) for c in text[::-1]])



def decrypt(text, n, d):
    return "".join([chr(((ord(c) + (n * d * -1)) % 128)) for c in text[::-1]])


# Define a route for the "/about" URL with GET met

if __name__ == "__main__":
    app.run()
    