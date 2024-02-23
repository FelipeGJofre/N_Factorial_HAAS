#!/bin/python3

from flask import Flask, jsonify, request

app = Flask(__name__, template_folder='./')

@app.route("/login",  methods=["GET", "POST"])
def login():
    data = request.json
    # Process the received data
    # Example: Access data['user'], data['email'], data['password']
    print(data)
    return jsonify({'message': 'Received login data successfully'})


# Define a route for the "/about" URL with GET met

if __name__ == "__main__":
    app.run()
    