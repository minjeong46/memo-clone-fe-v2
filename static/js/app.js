async function createMemo (value) {
    console.log(value);

    const res = await fetch("/memo", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ // 문자열로 바꿔줌 -> 통신할 때 문자열로 바꿔줘야함
            time: new Date().getTime(),
            content: value,
        })
    });

    // const 응답 = await res.json();

    readMemo();

}

async function readMemo () {
    const res = await fetch('/memo')
    const jsonRes = await res.json();

    console.log(res);
    const ul = document.querySelector("#memo-ul");
    ul.innerHTML = "";
    jsonRes.forEach(displayMemos); // 배열 뒤에 forEach 로 각각 동작, 출력하도록
    
}

function displayMemos(memo) {
    const ul = document.querySelector("#memo-ul");
    const li = document.createElement("li");
    const editBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    li.innerText = memo.content;
    editBtn.textContent = "수정하기";
    editBtn.dataset.id = memo._id;
    editBtn.addEventListener("click", editMemo);

    delBtn.textContent = "삭제";
    delBtn.addEventListener("click",deleteMemo);
    delBtn.dataset.id = memo._id;
 
    ul.appendChild(li);
    ul.appendChild(editBtn);
    ul.appendChild(delBtn);

}

async function deleteMemo(e) {
    const id = e.target.dataset.id;

    const res = await fetch(`/memo/${id}`, {
        method: "DELETE",
    });
    readMemo();
}

async function editMemo(e) {
    const id = e.target.dataset.id;
    const editInput = prompt("수정할 내용을 입력해주세요.");
    console.log(editInput);

    const res = await fetch(`/memo/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ // 문자열로 바꿔줌 -> 통신할 때 문자열로 바꿔줘야함
            time: new Date().getTime(),
            content: editInput,
        })
    });
    
    readMemo();
    

}


function handleSubmit (e) {
    e.preventDefault();
    console.log("동작??")
    const input = document.querySelector("#memo-input");
    createMemo(input.value);
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

readMemo();