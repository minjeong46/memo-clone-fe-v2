async function createMemo (value) {
    console.log(value);

    const res = await fetch("/memo", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ // 문자열로 바꿔줌 -> 통신할 때 문자열로 바꿔줘야함
            id: new Date().getTime(),
            content: value,
        })
    });

    // const 응답 = await res.json();

    readMemo();

}

async function readMemo () {
    const res = await fetch('/memo')
    const jsonRes = await res.json();
    const ul = document.querySelector("#memo-ul");
    ul.innerHTML = "";
    jsonRes.forEach(displayMemos); // 배열 뒤에 forEach 로 각각 동작, 출력하도록
    
}

function displayMemos(memo) {
    const ul = document.querySelector("#memo-ul");
    const li = document.createElement("li");
    li.innerText = `id:${memo.id}, content:${memo.content}`;
    ul.appendChild(li);

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