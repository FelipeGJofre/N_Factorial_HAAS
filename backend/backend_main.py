#!/bin/python3

from flask import Flask, jsonify, request
import json

app = Flask(__name__, template_folder='./')

@app.route("/signup", methods=["GET", "POST"])
def signup():
    data = request.json
    # Process the received data
    file = open("database.txt", "a")
    json.dump(data, file)
    file.write("\n")
    file.close()
    print(data)
    return jsonify({'message': 'Received sign up data successfully'})

@app.route("/login", methods=["GET", "POST"])
def login():
    querydata = request.json
    # Process the received data
    file = open("database.txt", "r")
    for line in file.readlines():
        dbdata = json.loads(line)
        if querydata['email'] == dbdata['email'] and querydata['password'] == dbdata['password']:
            rtnmsg = "Hello, " + dbdata['user'] + "!"
    file.close()
    print(rtnmsg)
    return jsonify({'message': 'Found user data successfully'})


# Define a route for the "/about" URL with GET met

if __name__ == "__main__":
    app.run()
    