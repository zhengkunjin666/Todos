const PAGE={
    init: function(){
        this.bind();
    },
    bind: function(){
        let todoInput=document.getElementById('todo-input');
        let todosList=document.getElementById('todos-list');
        todoInput.addEventListener('keyup',this.addTodo);
        this.onEventlistener(todosList,'click','todo-item-hd',this.toggleTodo);
        this.onEventlistener(todosList,'click','todo-item-ft',this.removeTodo);
    },
    onEventlistener: function(parentNode,action,childClassName,callback){
        parentNode.addEventListener(action,function(event){
            if(event.target.className===childClassName){
                callback(event);
            }
        })
    },
    addTodo: function(event){
        let value=this.value.trim();
        let key=event.which;
        if(key!==13 || !value){
            return;
        }else{
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
            let todosList=document.getElementById('todos-list');
            todosList.appendChild(todoItem);
            return this.value='';
        }
    },
    toggleTodo: function(event){
        let todoItem=event.target.parentNode;
        let isActive=todoItem.className.indexOf('active');
        if(isActive>=0){
            todoItem.className='todo-item';
        }else{
            todoItem.className+=' active';
        }
    },
    removeTodo: function(event){
        let todoItem=event.target.parentNode;
        todoItem.remove();
    }
}
PAGE.init();