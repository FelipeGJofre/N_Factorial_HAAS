from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

#change the <<dbUrl>> with the database URL
client = MongoClient('<<dbUrl>>')
db = client['<<dbName>>']  #Use the database name

@app.route('/checkIn_hardware', methods=['POST'])
def checkIn_hardware():
    data = request.get_json()
    projectId = data['projectId']
    qty = data['qty']

    # ind the project in the database
    project = db.projects.find_one({'projectId': projectId})

    if project:
        # Update the total number in the database
        new_available = project['available'] + qty
        db.projects.update_one({'projectId': projectId}, {'$set': {'available': new_available}})
        return jsonify({'projectId': projectId, 'qty': qty, 'message': f'{qty} hardware checked in', 'avaialable': new_available})
    else:
        return jsonify({'message': 'Project not found'}), 404

@app.route('/checkOut_hardware', methods=['POST'])
def checkOut_hardware():
    data = request.get_json()
    projectId = data['projectId']
    qty = data['qty']

    #Find the project in the database
    project = db.projects.find_one({'projectId': projectId})

    if project:
        # Check if there are enough hardware to check out
        if project['available'] >= qty:
            # Update the total number in the database
            new_total = project['available'] - qty
            db.projects.update_one({'projectId': projectId}, {'$set': {'available': new_total}})
            return jsonify({'projectId': projectId, 'qty': qty, 'message': f'{qty} hardware checked out', 'available': new_total})
        else:
            return jsonify({'message': 'Not enough hardware to check out'}), 400
    else:
        return jsonify({'message': 'Project not found'}), 404