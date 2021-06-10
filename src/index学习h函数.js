//npm i snabbdom
import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
} from "snabbdom";

//创建出patch函数
const patch = init([classModule,
    propsModule,
    styleModule,
    eventListenersModule])

//创建虚拟节点
let myVnode = h('a', { props: { href: 'https://www.baidu.com' } }, 'baidu')


//可以通过h函数嵌套创建虚拟DOM树
const vnode3 = h('ul', {}, [
    h('li', '香蕉'),
    h('li', '西瓜'),
    h('li', '苹果'),
    h('li', '菠萝')
])

//让虚拟节点上树
const container = document.getElementById('container')
patch(container, vnode3)