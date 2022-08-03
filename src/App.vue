<template>
    <div>Биндинг в компонент как текст и html в слоты и разметку</div>
    <MyComponent v-sys-text:myid.html="timerHtml" v-sys-text:testSlot="timer" v-sys-text.html="timerHtml"/>
    <hr>
    <div>Биндинг в html как текст</div>
    <div v-sys-text="timer"></div>
    <hr>
    <div>Биндинг в html как html</div>
    <div v-sys-text.html="timerHtml"></div>
    <hr>
    <button type="button" @click="timer++">ClickMe</button>
</template>

<script setup>
import {computed, ref} from "@vue/reactivity";
import MyComponent from "@/components/MyComponent";
const timer = ref(0);
const timerHtml = computed(()=>'<i>'+timer.value+'</i><b>в виде HTML</b>')

window.setInterval(()=>{
    timer.value++;
},1000)

</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
