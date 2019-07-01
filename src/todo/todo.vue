<template>
    <section class="real-app">
        <input 
        type="text"
        class="add-input"
        autofocus="autofocus"
        placeholder="有什麼計劃呢?"
        @keyup.enter="addTodo">
        <!-- 若要傳遞data給子組建的話，就在子組件標籤上bind物件名稱，然後在子組件props的地方取用 -->
        <Item 
        :todo ="todo"
        v-for = "todo in filteredTodos"
        :key = "todo.id"
        @del="deleteTodo" />
        <Tabs
        :todos="todos" 
        :filter="filter"
        @toggle="toggleFilter"
        @clearAllCompleted="clearAllCompleted" />
    </section>
</template>

<script>
    import Item from './item.vue'
    import Tabs from './tabs.vue'
    
    let id = 0
    export default {
         data(){
                return{
                    todos:[],
                    filter:"all",
                }
            },
            components:{
                Item,
                Tabs
            },
            computed:{
                filteredTodos(){
                    if(this.filter === "all"){
                        return this.todos
                    }
                    const completed = this.filter ==="completed"
                    return this.todos.filter(todo => completed === todo.completed )
                }
            },
            methods:{
                addTodo(e){
                    //unshift 跟 push 功能一樣 push從最後加項目，unshift從最前面加
                    this.todos.unshift({
                        id: id++,
                        content:e.target.value.trim(),//trim()去除前後空格
                        completed:false
                    })
                    e.target.value=""
                },
                deleteTodo(id){
                //id事由item子組件被點擊才可以得到誰被點擊資料，
                //而item deleteTodo中的$emit 指定@del事件觸發 傳遞id給父元件，
                //這邊的id就這樣來
                    this.todos.splice(this.todos.findIndex(todo=>todo.id === id), 1) 
                },
                toggleFilter(state){
                     this.filter = state
                },
                clearAllCompleted(){
                    this.todos = this.todos.filter(todo=>!todo.completed)
                }
            }
        
    }
</script>

<style lang="stylus" scoped>
.real-app
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666
.add-input
    position relative
    margin 0
    width 100%
    font-size 24px
    font-family inherit
    font-weight inherit 
    line-height 1.4em
    border none
    outline none 
    color inherit 
    box-sizing border-box
    font-smoothing antialiased
    padding 16px 16px 16px 36px
    border none
    box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)
    
</style>
