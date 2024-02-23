#!/bin/python3

from flask import Flask, jsonify, request
import json

app = Flask(__name__, template_folder='./')

@app.route("/login",  methods=["GET", "POST"])
def login():
    data = request.json
    # Process the received data
    file = open("database.txt", "a")
    json.dump(data, file)
    file.write("\n")
    file.close()
    print(data)
    return jsonify({'message': 'Received login data successfully'})


# Define a route for the "/about" URL with GET met

if __name__ == "__main__":
    app.run()
    