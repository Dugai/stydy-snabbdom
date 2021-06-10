import createElement from './createElement.js'
import updateChildren from './updateChildren.js'

export default function patchVnode(oldVnode, newVnode) {
    //判断新老节点是否为同一个
    if (oldVnode === newVnode) return

    //判断新虚拟节点又没有text属性
    if (newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)) {
        //判断新老虚拟节点的text是否一样
        if (oldVnode.text === newVnode.text) return
        else {
            newVnode.elm = oldVnode.elm
            oldVnode.elm.innerText = newVnode.text
        }
    } else {
        //新虚拟节点没有text属性
        //判断老的有没有children
        if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
            //老虚拟节点有子节点，此时新老虚拟节点都有子节点，为最复杂的情况
 
            //diff算法核心： 四种命中查找
            //四个指针
                        // 1.新前与旧前
                        // 2.新后与旧后
                        // 3.新后与旧前（此种情况命中，那么新后指向节点，移动到旧后之后）
                        // 4.新前与旧后（此种情况命中，那么新前指向的节点，移动到旧前之前）
            updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
            
        } else {
            //老的没有子节点，新的有
            oldVnode.elm.innerHTML = ''
            for (let i = 0; i < newVnode.children.length; i++) {
                let childDom = createElement(newVnode.children[i])
                newVnode.children[i].elm = childDom
                oldVnode.elm.appendChild(childDom)
            }
            newVnode.elm = oldVnode.elm
        }
    }
}