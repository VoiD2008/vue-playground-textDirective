<template>
    <div class="hello">
        <h2>
            <div>Тест слота</div>
            <div>внутри разметки</div>
            <slot></slot>
            <div>---------------</div>
        </h2>
        <div>тест именованного слота</div>
        <slot name="testSlot"></slot>
        <div>тест именованного элемента</div>
        <div id="myid"></div>
    </div>
</template>

<script setup>
</script>

