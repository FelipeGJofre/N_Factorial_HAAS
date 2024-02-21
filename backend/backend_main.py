#!/bin/python3

from flask import Flask, render_template, request

app = Flask(__name__, template_folder='./')

@app.route("/",  methods=["GET", "POST"])
def index():
    if request.method == "POST":
        # Access form data submitted via POST request
        data = request.form.get("data")
        return f"Submitted data: {data}"
    else:
        # Render an HTML form for submitting data
        return render_template("index.html")


# Define a route for the "/about" URL with GET method
@app.route("/about", methods=["GET"])
def about():
    return "About Page"

# Define a route for the "/submit" URL with POST method
@app.route("/submit", methods=["POST"])
def submit():
    # Access form data submitted via POST request
    data = request.form.get("data")
    return f"Submitted data: {data}"

if __name__ == "__main__":
    app.run()
    