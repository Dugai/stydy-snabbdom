import h from './mysnadddom/h.js'
import patch from './mysnadddom/patch.js'

const vnode2 = h('ul', {}, [
  
    h('li', {key: 'A'}, 'A'),
    h('li', {key: 'D'}, 'D'),
    h('li', {key: 'B'}, 'B'),
    h('li', {key: 'C'}, 'C'),
])
const container = document.getElementById('container')
const btn = document.getElementById('btn')

const vnode1 = h('ul', {}, [
    h('li', {key: 'A'}, 'A'),
    h('li', {key: 'B'}, 'B'),
    h('li', {key: 'C'}, 'C'),
    
])
// const vnode1 = h('div', {}, [
    
//     h('p', {}, 'A'),
//     h('p', {}, 'B'),
//     h('p', {}, 'C')
// ])
// const vnode2 = h('div', {}, [
//     h('p', {}, 'A'),
//     h('p', {}, 'D'),
//     h('p', {}, 'B'),
//     h('p', {}, 'C')
// ])
patch(container, vnode1)

btn.onclick = function(){
    patch(vnode1, vnode2)
}
