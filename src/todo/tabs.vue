
<template>
    <div class="helper">
        <span class="left"> {{unFinishedTodoLength}} items left</span> 
        <span class="tabs">
            <span 
            v-for="state in states"
            :key="state"
            :class="[state, filter === state ? 'actived' : '']"
            @click = "toggleFilter(state)"
            >
            {{state}}
           </span>
        </span>
        <span class="clear" @click="clearAllCompleted">clear completed</span>
    </div>
</template>
<script>

export default {
    props:{ //透過父組件綁定tabs標籤，在這裡建立props物件，就可以接收父元件所傳遞的資料，單向傳遞，無法回傳。
        filter:{
            type:String,
            required:true
        },
        todos:{
            type:Array,
            required:true
        }
    },
    data() {
       return {
         states: ["all", "active", "completed"]
       }
    },
    methods: {//透過$emit方法，將方法送出去，
        clearAllCompleted(){
            this.$emit("clearAllCompleted")
        },
        toggleFilter(state){
            this.$emit('toggle',state)
        }

    },
    computed: {
        unFinishedTodoLength(){
          return  this.todos.filter( todo => !todo.completed).length
        }
    }
}


</script>

<style lang="stylus" scoped>
.helper
    font-weight 100
    display flex
    justify-content space-between
    padding 5px 0
    line-height 30px
    background-color #ffffff
    font-size 14px
    font-smoothing antialiased
.left, .clear, .tabs
    padding 0 10px
.left .clear
    width 150px
.left
    text-align center
.clear
    text-align right
    cursor pointer
.tabs
    width 200px
    display flex
    justify-content space-between
    *
        display inline-block
        padding 0 10px
        cursor pointer
        border 1px solid rgba(175,47,47,0)
        &.actived
            border-color rgba(175,47,47,0.4)
            border-radius 5px
</style>