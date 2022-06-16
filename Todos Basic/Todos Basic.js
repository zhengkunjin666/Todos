let todoInput=document.getElementById('todo-input');
let todosList=document.getElementById('todos-list');
todoInput.addEventListener('keyup',function(event){
    let value=this.value.trim();
    let key=event.which;
    if(value!='' && key==13){
        let todoItem=document.createElement('div');
        let todoItemHd=document.createElement('div');
        let todoItemBd=document.createElement('div');
        let todoItemFt=document.createElement('div');
        todoItem.setAttribute('class','todo-item');
        todoItemHd.setAttribute('class','todo-item-hd');
        todoItemBd.setAttribute('class','todo-item-bd');
        todoItemFt.setAttribute('class','todo-item-ft');
        todoItemBd.innerText=value;
        todoItemFt.innerText='x';
        todoItem.appendChild(todoItemHd);
        todoItem.appendChild(todoItemBd);
        todoItem.appendChild(todoItemFt);
        todosList.appendChild(todoItem);
        return this.value='';
    }else{
        return;
    }
})
todosList.addEventListener('click',function(event){
    let className=event.target.className;
    let todoItem=event.target.parentNode;
    if(className==="todo-item-hd"){
        let isActive=todoItem.className.indexOf('active');
        if(isActive>0){
            todoItem.className='todo-item';
        }else{
            todoItem.className+=' active';
        }
    }else if(className==="todo-item-ft"){
        todoItem.remove();
    }
})