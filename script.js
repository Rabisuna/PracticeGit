//點擊Button練習
const btn = document.querySelector('#myBtn');
const txt = document.querySelector('#message');
const menuBtns = document.querySelectorAll('.menu-item');

btn.addEventListener('click', function(){
    txt.textContent = "按鈕被點到!文字已改變!";
    txt.style.color = "red";
});

for(let i = 0; i < menuBtns.length; i++) {
    menuBtns[i].addEventListener('click', function(){
        alert("你點擊了第 " + (i+1) + " 個按鈕");
    });
}

for(let i = 1; i <= 10; i++){
    if(i % 2 === 0)
        console.log(i);
}

//代辦清單練習
const input = document.querySelector('#todoInput');
const addBtn = document.querySelector('#addBtn');
const list = document.querySelector('#todoList');

//Function
function addNewItem() {
    const text = input.value;

    if(text.trim() === ""){
        alert("請輸入內容!!");
        return;
    }

    const newItem = document.createElement('li');
    newItem.textContent = text;

    newItem.addEventListener('click', function(){
        this.remove();
        saveToLocal();
    });

    list.appendChild(newItem);
    input.value = "";
    saveToLocal();
}

function saveToLocal() {
    const allLi = document.querySelectorAll('#todoList li');
    const items = [];

    allLi.forEach(li => {
        items.push(li.textContent);
    });

    localStorage.setItem('myTodoList', JSON.stringify(items));
}

function loadList() {
    const savedData = localStorage.getItem('myTodoList');
    if(savedData){
        const items = JSON.parse(savedData);
        items.forEach(text => {
            const newItem = document.createElement('li');
            newItem.textContent = text;
            newItem.addEventListener('click', function() {
                this.remove();
                saveToLocal();
            });
            list.appendChild(newItem);
        })
    }
}

addBtn.addEventListener('click', function () {
    addNewItem();
});

input.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
        console.log("Enter");
        addNewItem();
    }
});


loadList();