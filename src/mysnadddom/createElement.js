//真正创建DOM节点, 将vnode创建为DOM，插入到pivot这个元素之前
export default function createElement(vnode){
    let domNode = document.createElement(vnode.sel)
    //有子节点还是有文本
    if(vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)){
        //此事为文本节点
        domNode.innerText = vnode.text

    }else if(Array.isArray(vnode.children) && vnode.children.length > 0){
        for(let i=0; i<vnode.children.length; i++){
            domNode.appendChild(createElement(vnode.children[i]))
        }
    }
    vnode.elm = domNode
    return domNode
}