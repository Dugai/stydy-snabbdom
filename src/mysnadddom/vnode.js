
//函数的功能很简单， 将参数合并为一个对象返回
export default function(sel, data, children, text, elm){
    let key = data.key
    return {
        sel, data, children, text, elm, key
    }
}