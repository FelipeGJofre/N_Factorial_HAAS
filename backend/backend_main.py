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
    print("UserID:", data['userID'], "attempting signup")
    if mongo_interactions.signup(data['userID'], data['password']):
        print("Welcome, " + data['userID']) 
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
    print("UserID:", querydata['userID'], "attempting login")
    if mongo_interactions.login(querydata['userID'], querydata['password']):
        print("Hello, " + querydata['userID'])
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

@app.route("/getProjects", methods=["GET", "POST"])
def getProjects():
    querydata = request.json
    print(querydata)
    result = mongo_interactions.getProjects(querydata['data'])
    return jsonify(result)
# Define a route for the "/about" URL with GET met

@app.route("/updatehw/<projectID>", methods=["POST"])
def updatehw(projectID):
    querydata = request.json
    print(querydata)
    mongo_interactions.updatehw(projectID, querydata['HWSet1_available'], querydata['HWSet2_available'])
    return jsonify({'message': f"updated HW availability of {projectID}", 'projectId': projectID})
    

@app.route("/joinproj/<userID>/<projectID>", methods=["POST"])
def joinProject(userID, projectID):
    print(userID, "joined", projectID)
    mongo_interactions.join(userID, projectID)
    return jsonify({'message': f"{userID} joined {projectID}", 'projectId': projectID})

@app.route("/leaveproj/<userID>/<projectID>", methods=["POST"])
def leaveProject(userID, projectID):
    print(userID, "left", projectID)
    mongo_interactions.leave(userID, projectID)
    return jsonify({'message': f"{userID} left {projectID}", 'projectId': projectID})

@app.route("/newproj/<userID>", methods=["POST"])
def newProject(userID):
    querydata = request.json
    projectID = querydata['newprojectID']
    print(userID, "created new Project", projectID)
    if mongo_interactions.newProject(projectID):
        mongo_interactions.join(userID, projectID)
        return jsonify({'message': f"{userID} created new Project {projectID}", 'projectId': projectID})
    return jsonify({'message': 'Project already exists!'})

if __name__ == "__main__":
    mongo_interactions.setup()
    app.run()
    