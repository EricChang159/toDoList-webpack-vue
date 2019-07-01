
<template>
    <div id="app">
        <div id="color">{{msg}}</div>
        <Header></Header>
        <todo></todo>
        <Footer></Footer>
        
    </div>
</template>


<script>
    import Header from './todo/header.vue'
    import Footer from './todo/footer.jsx'
    import todo from './todo/todo.vue'
    export default {
        components: {
            Header,
            Footer,
            todo,

        },
        data() {
            return {
                msg: "Yo what's up!!!"
            }
        },
        methods: {

        }
    }
</script>

<style lang="stylus" >
    #app {
        position absolute 
        left 0 
        right 0 
        top 0 
        bottom 0
    }
</style>