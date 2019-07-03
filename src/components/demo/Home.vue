<template>
    <div>
        <h1>home</h1>
        <p>{{msg}}</p>
        <router-link to="/layout/home/phone1">phone1</router-link>
        <router-link to="/layout/home/phone2">phone2</router-link>
        <router-view/>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                msg: "我是home 组件"
            }
        }
    }
</script>