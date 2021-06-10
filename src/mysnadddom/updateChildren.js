import createElement from './createElement.js'
import patch from './patch.js'
import patchVnode from './patchVnode.js'

export default function updateChildren(parentElm, oldCh, newCh){
    //旧前
    let oldStartIdx = 0
    //新前
    let newStartIdx = 0 
    //旧后
    let oldEndIdx = oldCh.length - 1 
    //新后
    let newEndIdx = newCh.length - 1
    //旧前节点
    let oldStartVnode = oldCh[0]
    //旧后节点
    let oldEndVnode = oldCh[oldEndIdx]
    //新前节点
    let newStartVnode = newCh[0]
    //新后节点
    let newEndVnode = newCh[newEndIdx]

    let keyMap = null
    while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx){
        if(oldStartVnode === undefined){
            oldStartVnode = oldCh[++oldStartIdx]
        }else if(oldEndVnode === undefined){
            oldEndVnode = oldCh[--oldEndIdx]
        }else if(checkSameVnode(oldStartVnode, newStartVnode)){
            console.log('1.新前与旧前命中')
            patchVnode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]

        }else if(checkSameVnode(oldEndVnode, newEndVnode)){
            console.log('2.新后与旧后命中')
            patchVnode(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]

        }else if(checkSameVnode(oldStartVnode, newEndVnode)){
            //新后旧前
            console.log('3.新后旧前命中')
            patchVnode(oldStartVnode, newEndVnode)
            //当
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]

        }else if(checkSameVnode(oldEndVnode, newStartVnode)){
            //新前旧后
            console.log('4.新前旧后命中')
            patchVnode(oldEndVnode, newStartVnode)
            //当
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        }else {
            //四种情况都没命中
            if(!keyMap){
                keyMap = {}
                for(let i = oldStartIdx; i <= oldEndIdx; i++){
                    const key = oldCh[i].key
                    if(key != undefined){
                        keyMap[key] = i
                    }
                }
            }

            //寻找当前这项（newStartIdx）在keymap中的映射的位置序号
            const idInOld = keyMap[newStartVnode.key]

            if(idInOld === undefined){
                //表示是全新的项
                parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
            }else {
                //如果不是undefined,不是全新的项，而是要移动
                const elmToMove = oldCh[idInOld]
                patchVnode(elmToMove, newStartVnode)
                oldCh[idInOld] = undefined
                parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
            }

            newStartVnode = newCh[++newStartIdx]
        }
    }

    if(newStartIdx <= newEndIdx){
        console.log('有节点需要插入')
        let before = null
        if(oldStartIdx >= oldCh.length){
            before = null
        }else {
            before = oldCh[oldStartIdx].elm
        }
        // const before = oldCh[oldStartIdx].elm == null ? null : oldCh[oldStartIdx].elm
     
        for(let i = newStartIdx; i <= newEndIdx; i++){
            let newDom = createElement(newCh[i])
            //insertBefore方法可以识别null，如果是null，则将元素排到队尾oldCh[oldStartIdx].elm
            console.log(parentElm)
            parentElm.insertBefore(newDom,before)
            newCh[i].elm = newDom
        }
    }else if(oldStartIdx <= oldEndIdx){
        console.log('有节点需要删除')
        for(let i = oldStartIdx; i <= oldEndIdx; i++){
           if(oldCh[i]){
               parentElm.removeChild(oldCh[i].elm)
           }
            
        }
    }

}

function checkSameVnode(a, b){
    return a.sel === b.sel && a.key === b.key
}