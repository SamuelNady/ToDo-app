

let mainInp = document.querySelector(".control .container .row input");
let add = document.querySelector(".control .container .row button");


function display () {
    let contentObj = JSON.parse(localStorage.getItem("tasks")) || [];
    let disPlace = document.querySelector(".tasks .container");
    disPlace.innerHTML = "<h2>tasks:</h2>"

    for (let i = 0; i < contentObj.length; ++i) {
        disPlace.innerHTML +=
        `
        <div class="item">
            <input class="inp" type="text" value="${contentObj[i].content}" disabled = "true">
            <div>
                <button class="btn" onclick="rem(${i})">remove</button>
                <button class="btn" onclick="edit(${i})">edit</button>
            </div>
        </div>
        `;
    }
}

function rem(target) {
    let contentObj = JSON.parse(localStorage.getItem("tasks")) || [];
    contentObj.splice(target, 1);
    localStorage.setItem("tasks", JSON.stringify(contentObj));
    display();
}

function edit(target) {
    let contentObj = JSON.parse(localStorage.getItem("tasks"));
    let editBtn = document.querySelectorAll(".tasks .container .item div button:last-child")[target];
    let editInp = document.querySelectorAll(".tasks .container .item input")[target];

    if (editBtn.innerHTML == "edit") {

        editBtn.innerHTML = "save";
        editInp.disabled = false;
        editInp.focus();
    }else {
        if (editInp.value.length < 1) {

            window.alert("Oops, Can't save an empty task");
        }else {

            editBtn.innerHTML = "edit";
            editInp.disabled = true;
            contentObj[target].content = editInp.value;
            localStorage.setItem("tasks", JSON.stringify(contentObj));
        }
    }
}

add.addEventListener("click",() => {
    if (mainInp.value.length < 1) {

        window.alert("Oops, Can't add an empty task");
    }else {

        let contentObj = JSON.parse(localStorage.getItem("tasks")) || [];
        contentObj.push({content: mainInp.value});
        mainInp.value = "";
        localStorage.setItem("tasks", JSON.stringify(contentObj));
        display();
    }
});


display();

