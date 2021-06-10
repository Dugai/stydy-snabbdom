import vnode from './vnode.js'
import createElement from './createElement.js'
import patchVnode from './patchVnode.js'

export default function(oldVnode, newVnode){
    //1.判断老节点，是否为虚拟节点
    if(oldVnode.sel == '' || oldVnode.sel == undefined){
        //老节点为Dom节点，此时要包装为虚拟节点
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
    }

    //2.判断oldVnode和newVnode是不是同一个节点
    if(oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel ){
        console.log('是同一个节点')
        patchVnode(oldVnode, newVnode)
        
    }else{
        console.log('不是同一个节点，暴力插入新的，删除旧的')
        let newVnodeElm = createElement(newVnode)
        oldVnode.elm.parentNode.insertBefore(newVnodeElm,  oldVnode.elm)
        //删除老节点
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)

    }
}