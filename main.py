from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

class Memo(BaseModel):
    id:str
    content:str
    
memos = []

app = FastAPI();


@app.post("/memo")
def create_memo(memo:Memo):
    memos.append(memo)
    return "메모 추가 성공"

@app.get("/memo")
def read_memo():
    return memos

app.mount("/", StaticFiles(directory="static", html=True), name="static")