const userSelect = document.querySelector("#list");

async function drawUserList(){
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let result = await response.json();

    for(let userName of result){
        userSelect.innerHTML += `
            <p onclick="getUserInfo('${userName.name}')">${userName.name}</p>
        `;
    }
}

drawUserList();

async function getUserInfo(name){
    localStorage.setItem("name", name);
    document.location = "comments.html";
}