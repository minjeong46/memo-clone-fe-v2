from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

class Memo(BaseModel):
    id: int
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

@app.put("/memo/{id}")
def edit_memo(memo:Memo):
    for m in memos :
        if m.id == memo.id:
            m.content = memo.content
            return "성공했습니다."
    return "메모를 찾을 수 없습니다."
    
@app.delete("/memo/{memo_id}")
def del_memo(memo_id:int):
    for index, m in enumerate(memos) : # enumerate 배열의 index 를 같이 뽑아주는
        if m.id == memo_id:
            memos.pop(index)
            return "성공했습니다."
    return "메모를 찾을 수 없습니다."

app.mount("/", StaticFiles(directory="static", html=True), name="static")