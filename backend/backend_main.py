#!/bin/python3

from flask import Flask, jsonify, request
import json

app = Flask(__name__, template_folder='./')

@app.route("/signup", methods=["GET", "POST"])
def signup():
    data = request.json
    # Process the received data
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
    