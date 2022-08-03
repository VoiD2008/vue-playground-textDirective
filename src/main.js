import { createApp } from 'vue'
import MyComponent from "@/components/MyComponent.vue"
import App from './App.vue'
import sysText from "@/directives/sysText.js";

const app = createApp(App);
app.directive('sysText',sysText);
app.component("MyComponent",MyComponent)
app.mount('#app')

export default app;
