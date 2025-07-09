from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
from pymongo import MongoClient
from bson import ObjectId

client = MongoClient("mongodb://localhost:27017")
db = client["mydb"]
collection = db["memos"]

class Memo(BaseModel):
    time: int
    content:str
    
# memos = []

app = FastAPI();


@app.post("/memo")
def create_memo(memo:Memo):
    res = collection.insert_one(memo.dict())
    return "200"

@app.get("/memo")
def read_memo():
    memos = []
    find = collection.find()
    for memo in find:
        memo["_id"] = str(memo["_id"])
        memos.append(memo)
    return memos

@app.put("/memo/{id}")
def edit_memo(id: str, memo:Memo):

    object_id = ObjectId(id) # 변환 필요

    res = collection.update_one(
        {"_id": object_id},
        {"$set": {"time": memo.time, "content": memo.content}}
    )
   
    updated = collection.find_one({"_id": id})
    updated["_id"] = str(updated["_id"])  # 직렬화
    return "200"
    
@app.delete("/memo/{id}")
def del_memo(id:str):
    
    object_id = ObjectId(id)
    
    res = collection.delete_one({"_id": object_id})
    
    return "200"

app.mount("/", StaticFiles(directory="static", html=True), name="static")