<template>
    <div>
        <h1>user</h1>
        <p>我是user组件, {{dynamicSegment}}</p>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                dynamicSegment: this.$route.params.id
            }
        },
        watch: {
            $route (to,from){
                // to表示的是你要去的那个组件，from 表示的是你从哪个组件过来的，它们是两个对象，你可以把它打印出来，它们也有一个param 属性
                console.log(to);
                console.log(from);
                this.dynamicSegment = to.params.id
            }
        }
    }
</script>