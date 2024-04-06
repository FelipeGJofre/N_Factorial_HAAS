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
    if encrypt(userID, 3, 1) in db.list_collection_names():
        user = db[encrypt(userID, 3, 1)]
        db_pass = user.find_one({}, {"password" : 1})
        encrypted_password = db_pass["password"]
        print(decrypt(encrypted_password, 3, 1))
        # If password is the same
        if encrypted_password == encrypt(password, 3, 1):
            return True
    # Else return false
    return False
    
    
def signup(username, userID, password):
    if not encrypt(userID, 3, 1) in client["Users"].list_collection_names():
        user = client["Users"][encrypt(userID, 3, 1)]
        user.insert_one(
            {
                "username" : username,
                "password" : encrypt(password, 3, 1),
                "projects" : []
            }
        )
        return True
    else:
        return False
    
def getUsername(userID):
    if encrypt(userID, 3, 1) in client["Users"].list_collection_names():
        return client["Users"][encrypt(userID, 3, 1)].find_one()['username']
    return ""

def getProjects(userID) -> dict:
    dataret = []
    user = client["Users"][encrypt(userID, 3, 1)]
    # Todo: This array not being grabbed properly, shits fucked
    array = user.find_one({}, {"projects"})['projects']
    print(array)
    
    projects = client["Projects"]
    for project in array:
        proj = projects[project]
        selected_proj = proj.find_one({})
        dataret.append({
            "id"                 : project,
            "name"               : selected_proj["name"],
            "desc"               : selected_proj["description"],
            "hw_set_1_cap"       : selected_proj["hw_set_1_cap"],
            "hw_set_2_cap"       : selected_proj["hw_set_2_cap"],
            "hw_set_1_available" : selected_proj["hw_set_1_available"],
            "hw_set_2_available" : selected_proj["hw_set_2_available"] 
        })
    return dataret

def updatehw(projectID, hwset1avail, hwset2avail):
    proj = client["Projects"][projectID]
    oldhw1avail = proj.find_one()["hw_set_1_available"]
    oldhw2avail = proj.find_one()["hw_set_2_available"]
    query = {"hw_set_1_available": oldhw1avail, "hw_set_2_available": oldhw2avail}
    newvals = {"$set": {"hw_set_1_available": hwset1avail, "hw_set_2_available": hwset2avail}}
    print(query, "=>", newvals)
    proj.update_one(query, newvals)

def join(userID, projectID):
    if projectID in client["Projects"].list_collection_names():
        user = client["Users"][encrypt(userID, 3, 1)]
        oldprojlist = user.find_one()["projects"]
        newprojlist = oldprojlist.copy()
        newprojlist.append(projectID)
        query = {"projects": oldprojlist}
        newval = {"$set": {"projects": newprojlist}}
        print(query, "=>", newval)
        user.update_one(query, newval)
        return True
    return False

def leave(userID, projectID):
    user = client["Users"][encrypt(userID, 3, 1)]
    oldprojlist = user.find_one()["projects"]
    newprojlist = oldprojlist.copy()
    newprojlist.remove(projectID)
    query = {"projects": oldprojlist}
    newval = {"$set": {"projects": newprojlist}}
    print(query, "=>", newval)
    user.update_one(query, newval)

def newProject(projectname, projectID, projectdesc):
    if not projectID in client["Projects"].list_collection_names():
        newproj = client["Projects"][projectID]
        newprojdoc = {"name": projectname,
                      "description": projectdesc,
                      "hw_set_1_cap": 100,
                      "hw_set_1_available": 100,
                      "hw_set_2_cap": 100,
                      "hw_set_2_available": 100}
        newproj.insert_one(newprojdoc)
        return True
    return False

