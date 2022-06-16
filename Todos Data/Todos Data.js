const PAGE={
    data: {
        todos: [{
            title: '打一瓶酱油',
            completed: false
        },{
            title: '跑步500米',
            completed: true
        }],
        filters: {
            1: '全部',
            2: '待办',
            3: '已办'
        },
        filter: 1
    },
    init: function(){
        this.bind();
        this.render();
    },
    bind: function(){
        let input=document.getElementById('todo-input');
        input.addEventListener('keyup',this.addTodo);
        let todosList=document.getElementById('todos-list');
        this.onElementlister(todosList,'click','todo-item-hd',this.toggleTodo);
        this.onElementlister(todosList,'click','todo-item-ft',this.removeTodo);
        let todosFilter=document.getElementById('todos-filter');
        this.onElementlister(todosFilter,'click','filter-item',this.filterTodo);
    },
    render: function(){
        let todos=PAGE.data.todos;
        let filters=PAGE.data.filters;
        let filter=PAGE.data.filter;
        todos.forEach((date,index)=>date.index=index);
        let showTodos;
        switch(filter){
            case 2:
                showTodos=todos.filter(data => !data.completed);
                break;
            case 3:
                showTodos=todos.filter(data => data.completed);
                break;
            default:
                showTodos=todos;
                break;
        };
        let todosElement=showTodos.map((data)=>{
            return `
                <div class="todo-item${data.completed ? ' active' : ''}" data-index="${data.index}">
                    <div class="todo-item-hd"></div>
                    <div class="todo-item-bd">${data.title}</div>
                    <div class="todo-item-ft">x</div>
                </div>
            `
        }).join('');
        let filtersElement=Object.keys(filters).map((key)=>{
            return `<span class="filter-item${key==filter ? ' active' : ''}" data-id="${key}">${filters[key]}</span>`
        }).join('');
        let todosList=document.getElementById('todos-list');
        let todosFilter=document.getElementById('todos-filter');
        todosList.innerHTML=todosElement;
        todosFilter.innerHTML=filtersElement;
    },
    addTodo: function(event){
        let value=this.value.trim();
        if(event.which!==13 || !value){
            return;
        }else{
            let todos=PAGE.data.todos;
            todos.push({
                title: value,
                completed: false
            });
            PAGE.render();
            this.value='';
        }
    },
    onElementlister: function(parentNode,action,childClassName,callback){
        parentNode.addEventListener(action,function(event){
            event.target.className.indexOf(childClassName) >=0 && callback(event);
        })
    },
    toggleTodo: function(event){
        let todos=PAGE.data.todos;
        let todoItem=event.target.parentNode;
        let index=todoItem.dataset.index;
        todos[index].completed=!todos[index].completed;
        PAGE.render();
    },
    removeTodo: function(event){
        let todos=PAGE.data.todos;
        let todoItem=event.target.parentNode;
        let index=todoItem.dataset.index;
        todos.splice(index,1);
        PAGE.render();
    },
    filterTodo: function(event){
        let filter=event.target.dataset.id;
        PAGE.data.filter=Number(filter);
        PAGE.render();
    }
}
PAGE.init();