from pymongo.mongo_client import MongoClient

uri = "mongodb+srv://felipejofre:123@cluster0.8w3qgca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

def encrypt(text, n, d):
    return "".join([chr(((ord(c) + (n * d)) % 128)) for c in text[::-1]])

def decrypt(text, n, d):
    return "".join([chr(((ord(c) + (n * d * -1)) % 128)) for c in text[::-1]])


def setup():
    global client 
    client = MongoClient(uri)
    try:
        client.admin.command('ping')
        print("Communication with Mongo completed")
    except Exception as e:
        print(e)

def login(userID, password):
    db = client["Users"]
    # Checks if user is a collection
    if userID in db.list_collection_names():
        user = db[userID]
        db_pass = user.find_one({}, {"password" : 1})
        encrypted_password = db_pass["password"]
        print(encrypted_password)
        # If password is the same
        if encrypted_password == encrypt(password, 3, 1):
            return True
    # Else return false
    return False
    
    
def signup(userID, password, projectID):
    proj_db = client["Projects"]
    u_db = client["Users"]
    if projectID in proj_db.list_collection_names():
        user = u_db.get_collection(userID)
        if user == None:
            collection = u_db.create_collection(userID)
            projectIDs = [projectID]
            collection.insert_one(
                {
                    "password" : encrypt(password, 3, 1),
                    "projects" : projectIDs
                }
            )
            return True;
        
        array = user.find_one({}, {"projects"})
        user.update_one({}, { "$addToSet": {"projects" : projectID} })
        return True;
    else:
        newProj = proj_db.create_collection(projectID)
        newProj.insert_one(
            {
                "hw_set_1_cap" : 100,
                "hw_set_1_available" : 100,
                "hw_set_2_cap" : 100,
                "hw_set_2_available" : 100,
            }
        )
        user = u_db.get_collection(userID)
        if user == None:
            collection = u_db.create_collection(userID)
            projectIDs = [projectID]
            collection.insert_one(
                {
                    "password" : encrypt(password, 3, 1),
                    "projects" : projectIDs
                }
            )
            return True;
        array = user.find_one({}, {"projects"})
        user.update_one({}, { "$addToSet": {"projects" : projectID} })
        return True;
        