from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://rajasiddharthrajasiddharth_db_user:rajasiddharth2006@cluster0.jajcrhl.mongodb.net/nexlet?retryWrites=true&w=majority"

client = MongoClient(uri, server_api=ServerApi('1'))

try:
    client.admin.command("ping")
    print("✅ MongoDB connection SUCCESS")

    db = client["nexlet"]
    db.contacts.insert_one({
        "name": "Test User",
        "email": "test@test.com",
        "message": "Hello NexLet from Atlas"
    })
    print("✅ Insert SUCCESS")

except Exception as e:
    print("❌ ERROR")
    print(e)
