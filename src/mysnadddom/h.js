import vnode from './vnode.js'

//编写一个低配的h函数
//h('div', {}, text)
//h('div', {}, [])
//h('div', {}, h())
export default function(sel, data, c){
    if(arguments.length !== 3){
        throw Error('低配h函数')
    }

    //检查参数c的类型
    if(typeof c == 'string' || typeof c == 'number'){
        return vnode(sel, data, undefined, c, undefined)
    }else if(Array.isArray(c)){
        //说明是数组
        let children = []
        for(let i=0; i < c.length; i++){
            if(typeof c[i] !== 'object' && !c.hasOwnProperty('sel')){
                throw Error('传入的参数必须是h函数')
            }

            children.push(c[i])
        }

        return vnode(sel, data, children, undefined, undefined)
        
    }else if(typeof c == 'object' && c.hasOwnProperty('sel')){
        let children = [c]
        return vnode(sel, data, children, undefined, undefined)
    }else {
        throw Error('低配h函数')
    }
}