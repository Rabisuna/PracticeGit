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

    const newItem = createTodoItem(text);

    list.appendChild(newItem);
    input.value = "";
    saveToLocal();
    updateCount();
}

function createTodoItem(text, iscompleted = false) {
    const newItem = document.createElement('li');
    
    if(iscompleted)
        newItem.classList.add('completed');
    
    newItem.innerHTML = `<span>${text}</span>
        <button class="delete-btn">🗑️</button>`;

    newItem.addEventListener('click', function(e){
        if(e.target.tagName !== 'BUTTON') {
            this.classList.toggle('completed');
            saveToLocal();
            updateCount();
        }
    });
    
    const delBtn = newItem.querySelector('.delete-btn');
    delBtn.addEventListener('click', function(){
        newItem.classList.add('removing');
        setTimeout(() => {
            newItem.remove();
            saveToLocal();
            updateCount();
        }, 400);
        
    });

    return newItem;
}

function saveToLocal() {
    const allLi = document.querySelectorAll('#todoList li');
    const items = [];

    allLi.forEach(li => {
        const text = li.querySelector('span').textContent;

        const iscompleted = li.classList.contains('completed');

        items.push({
            text: text,
            completed: iscompleted
        });
    });

    localStorage.setItem('myTodoList', JSON.stringify(items));
}

function loadList() {
    const savedData = localStorage.getItem('myTodoList');
    if(savedData){
        const items = JSON.parse(savedData);
        items.forEach(item => {
            const newItem = createTodoItem(item.text, item.completed);
            list.appendChild(newItem);
        })
    }
    updateCount();
}

function updateCount() {
    const total = document.querySelectorAll("#todoList li").length;
    const completed = document.querySelectorAll('#todoList li.completed').length;
    const remaining = total - completed;

    const todoCount = document.querySelector('#todoCount');
    todoCount.textContent = `待辦: ${remaining} / 已完成: ${completed}`;
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