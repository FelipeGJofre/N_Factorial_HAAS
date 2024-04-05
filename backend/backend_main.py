#!/bin/python3
import mongo_interactions
from flask import Flask, jsonify, request
import json
from flask_cors import CORS

app = Flask(__name__, template_folder='./')
CORS(app)

@app.route("/signup", methods=["GET", "POST"])
def signup():
    data = request.json
    # Process the received data
    # check_file = open("database.txt", "r")
    # Check whether it exists already or not
    if mongo_interactions.signup(data['email'], data['password'], data['projectID']): 
        return jsonify({'message': 'Received sign up data successfully'})
    return jsonify({'message': 'User already exists!'})
    # for line in check_file.readlines():
    #     dbdata = json.loads(decrypt(line.strip(), 3, 1))
    #     if data['email'] == dbdata['email'] and data['password'] == dbdata['password']:
    #         print("User already exists!")
    #         check_file.close()
    #         return jsonify({'message': 'User already exists!'})
        
    # check_file.close()
    # file = open("database.txt", "a")
    # file.write(encrypt(json.dumps(data), 3, 1) + "\n")
    # file.close()
    # print(data)
    # return jsonify({'message': 'Received sign up data successfully'})   

@app.route("/login", methods=["GET", "POST"])
def login():
    querydata = request.json
    # Process the received data
    if mongo_interactions.login(querydata['email'], querydata['password']):
        print("Hello, " + querydata['email'])
        return jsonify({'message': 'Found user data successfully'})
    print("No succesful login")
    return ({'message': 'Did not find user data'})
    # file = open("database.txt", "r")
    # for line in file.readlines():
    #     dbdata = json.loads(decrypt(line.strip(), 3, 1))
    #     if querydata['email'] == dbdata['email'] and querydata['password'] == dbdata['password']:
    #         rtnmsg = "Hello, " + dbdata['user']
    # file.close()
    # print(rtnmsg)
    # return jsonify({'message': 'Found user data successfully'})

@app.route("/get_projects", methods=["GET", "POST"])
def get_projects():
    querydata = request.json
    print(querydata)
    result = mongo_interactions.get_projects(querydata['data'])
    return jsonify(result)
# Define a route for the "/about" URL with GET met

if __name__ == "__main__":
    mongo_interactions.setup()
    app.run()
    