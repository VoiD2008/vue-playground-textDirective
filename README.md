# vue-playground

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Директива v-sys-text
```
синтаксис использования:
v-sys-text="binding" ## см. TODO в коде директивы
v-sys-text принимает модификатор html - v-sys-text.html="binding"
если он задан, результат будет распарсен как html, по умолчанию как текст
v-sys-text принимает аргумент "имя слота" или "id html элемента" для размещения текста
```
### пример:

компонент
```
<myComponent v-sys-text:slot1.html="binding1" v-sys-text="binding2" v-sys-text:myid="binding3"/>
```
код компонента

```
<template>
     <slot>сюда попадет binding2</slot>
     <slot name="slot1">сюда попадет binding1 в виде html</slot>
     <div>
       <span id="myid">сюда попадет binding3</span>
     </div>
</template>
```