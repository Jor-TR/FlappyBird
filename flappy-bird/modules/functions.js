// 柯里化
export const curry=(func,...innerArgs)=>
    (...outerArgs)=>
        func.apply(null,innerArgs.concat(outerArgs));

// 复合函数
export const compose=(...funcs)=>
    (arg)=>
        funcs.reduceRight((result,func)=>func(result),arg);

//深度拷贝函数
export const deepCopy = (value) => {
    if (typeof value !== "object" || value === null) {
        return value;
    }
    let copy=Array.isArray(value)?[]:{};
    Object.setPrototypeOf(copy,Object.getPrototypeOf(value));
    for (let key in value) {
        copy[key] = deepCopy(value[key]);
    }
    return copy;
};

// 输入小于100的分数，输出一个二元数组，包含分数的个位和十位
export const splitScore=(score)=>{
    if(score<0||score>99){
        throw new Error("score should be within [0,99]!");
    }
    const scoreLeft=Math.floor(score/10),
        scoreRight=score%10;
    return [scoreLeft,scoreRight];
}

// 判断某个点point是否处于某个区域内
export const pointWithinArea=(point={x:0,y:0}, area={x:0,y:0,width:0,height:0}) =>{
    if (point.x > area.x && point.x < (area.x + area.width) &&
        point.y > area.y && point.y < (area.y + area.height)) {
        return true;
    } else {
        return false;
    }
}

// 获取某个元素相对于整个页面的坐标
export const getPageX=(elem)=>{
    if(elem===null){
        return 0;
    }else{
        return elem.offsetLeft+getPageX(elem.offsetParent);
    }
}

export const getPageY=(elem)=>{
    if(elem===null){
        return 0;
    }else{
        return elem.offsetTop+getPageY(elem.offsetParent);
    }
}

// 循环器，指定时间间隔往复调用某个函数
export const setSafeInterval=function(handler,interval){

    // 用于终止循环
    let timer={
        id:null
    };

    // 改进的循环事件处理程序
    const safeHandler=function(){
        handler();
        timer.id=setTimeout(safeHandler,interval);
    };

    // 开始第一次循环 
    setTimeout(safeHandler,interval);

    // 返回控制器，使得外部代码可以终止该循环
    return timer;
};

// 循环解除器
export const clearSafeInterval=function(timer){
    clearTimeout(timer.id);
};

// 只监听一次的事件绑定函数
export const addOnceEventListener=function(elem, event, handler, useCapture) {
    const newHandler = () => {
        handler();
        console.log("handler invoked!");
        elem.removeEventListener(event, newHandler, useCapture);
    }
    elem.addEventListener(event, newHandler, useCapture);
}

// 在画布中描画objects中包含的各物体
const drawObjects = function (ctx, objects) {
    for (let n = 0, len = objects.length; n < len; n++) {
        const obj = objects[n];
        if (obj.s) {
            const { image, s: { sX, sY, sWidth, sHeight }, d: { dX, dY, dWidth, dHeight } } = obj;
            ctx.drawImage(image, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);
        } else {
            const { image, d: { dX, dY, dWidth = null, dHeight = null } } = obj;
            if (dWidth === null) {
                ctx.drawImage(image, dX, dY);
            } else {
                ctx.drawImage(image, dX, dY, dWidth, dHeight);
            }
        }
    }
};

// 图像的加载是异步的，所以需要用promise来控制绘画的时机
export const drawPromises = function (ctx, promises) {
    Promise.all(promises).then(
        (objects) => {
            drawObjects(ctx, objects)
        },
        () => {
            throw new Error("rejected!")
        }
    );
};
