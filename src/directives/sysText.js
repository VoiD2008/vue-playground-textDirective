// Директива v-sys-text
// синтаксис использования:
// v-sys-text="binding" ## см. TODO в коде ниже
// v-sys-text принимает модификатор html - v-sys-text.html="binding"
// если он задан, результат будет распарсен как html, по умолчанию как текст
// v-sys-text принимает аргумент "имя слота" или "id html элемента" для размещения текста
// пример:
// компонент <myComponent v-sys-text:slot1.html="binding1" v-sys-text="binding2" v-sys-text:myid="binding3"/>
// код компонента
// <template>
//     <slot>сюда попадет binding2</slot>
//     <slot name="slot1">сюда попадет binding1 в виде html</slot>
//     <div>
//       <span id="myid">сюда попадет binding3</span>
//     </div>
// </template>
const sysText = {
    mounted(elem, binding) {
        binding.dir.updated.apply(null,[elem, binding])
    },
    updated(elem, binding) {
        // директива для тестов написана без функционала получения настроек
        // в updatedText задаем то, что нужно будет вписывать в компонент или тэг
        // TODO реализовать получения системного текста из virtualhost из binding.value и вписать в updatedText
        const updatedText = binding.value;
        //ищем слоты
        const slots = {};
        let node = null;
        //получаем массив слотов из vnode
        elem.__vnode.dynamicChildren && elem.__vnode.dynamicChildren.filter(function(vnode){
            return vnode.type = "Symbol(Fragment)" && !(vnode.el instanceof HTMLElement);
        })
            //для удобства разложим слоты по ключам где _default - это безымянный <slot/>
            .forEach(function(slotVNode){
                slots[slotVNode.key] = slotVNode;
            });
        if (Object.keys(slots).length === 0 || (binding.arg && typeof slots['_'+binding.arg] == 'undefined')){
            //если слотов в элементе нет или нет слота с переданным binding.arg
            if (binding.arg){
                // если передан аргумент v-test:argument="bindingvalue"
                // поищем по id элемента
                node = elem.querySelector(`#${binding.arg}`);
            }
        } else {
            //если слоты есть
            if (binding.arg && slots['_'+binding.arg]) {
                // если передан аргумент v-test:argument="bindingvalue"
                node = slots['_'+binding.arg]
            } else if (slots['_default']) {
                node = slots['_default']
            }
        }
        if (node) {
            //если выше el найден запишем в него binding.value
            if (node instanceof HTMLElement){
                if (binding.modifiers['html']){
                    //если передан модификатор html - v-test.html:argument="bindingvalue"
                    //впишем binding как html
                    node.innerHTML = updatedText;
                } else {
                    //впишем binding как текст
                    node.innerText = updatedText;
                }
            } else {
                // если цель не htmlElement
                if (binding.modifiers['html']){
                    //если передан модификатор html - v-test.html:argument="bindingvalue"
                    //впишем binding как html
                    //создаем временный контейнер
                    const temp = document.createElement('div');
                    temp.innerHTML = updatedText;
                    elem._tempNodes = elem._tempNodes || {};
                    elem._tempNodes[binding.arg||'_default'] = elem._tempNodes[binding.arg||'_default'] || [];
                    //удалим ранее добавленную разметку из DOM

                    elem._tempNodes[binding.arg||'_default'].forEach(
                        function(node){
                            node.remove();
                        }
                    );
                    //запомним добавляемые элементы для последующего удаления
                    const tempArray = elem._tempNodes[binding.arg||'_default'] = Array.from(temp.children);
                    if (node.anchor.previousElementSibling){
                        // если перед слотом есть элемент добавим после него
                        node.anchor.previousElementSibling.after(...tempArray);
                    } else if (node.anchor.nextElementSibling){
                        // или если после слота есть элемент добавим перед ним
                        node.anchor.nextElementSibling.before(...tempArray);
                    } else {
                        // или если у слота нет соседей запишемся в его родителя
                        node.anchor.parentElement.innerHTML = updatedText;
                    }
                } else {
                    //впишем binding как текст
                    node.anchor.textContent = updatedText
                }
            }
        }
    },
}

export default sysText;