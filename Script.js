let mycanvas =document.getElementById('mycanvas');
mycanvas.width =innerWidth-100;
mycanvas.height = innerHeight-80;


let context =mycanvas.getContext("2d")
let startFillColor="white"
context.fillStyle=startFillColor;
context.fillRect(0,0,mycanvas.width,mycanvas.height)

let draw_color ="black";
let draw_width='2';
let is_drawing =false;
let undo=[];
let index = -1;



const start=(event)=>{
    is_drawing=true;
    context.beginPath();
    context.moveTo(event.clientX - mycanvas.offsetLeft,event.clientY - mycanvas.offsetTop);
    event.preventDefault();

}

const draw=(event)=>{
    
    if(is_drawing){
        context.lineTo(event.clientX - mycanvas.offsetLeft,event.clientY - mycanvas.offsetTop)
        context.strokeStyle =draw_color;
        context.lineWidth=draw_width;
        context.lineCap="round";
        context.lineJoin ="round";
        context.stroke();

    }
    event.preventDefault();
}

const stop=(event)=>{
if(is_drawing){
    context.stroke();
    context.closePath();
    is_drawing=false;
}
event.preventDefault();
if(event.type != 'mouseout'){
undo.push(context.getImageData(0,0,mycanvas.width,mycanvas.height))
index +=1
}

}



mycanvas.addEventListener('touchstart',start,false)
mycanvas.addEventListener('touchmove',draw,false);
mycanvas.addEventListener('touchend',stop,false)
mycanvas.addEventListener('mousedown',start,false)
mycanvas.addEventListener('mousemove',draw,false)
mycanvas.addEventListener('mouseup',stop,false)
mycanvas.addEventListener('mouseout',stop,false)



// ----------------------------------------------------------------------------------------
const HandleColor=(SelectedColor)=>{
    draw_color=SelectedColor.style.background
}


const HandleClear=()=>{
    context.fillStyle=startFillColor;
    context.clearRect(0,0,mycanvas.width,mycanvas.height)
    context.fillRect(0,0,mycanvas.width,mycanvas.height)
    undo=[];
    index=-1

     
}


const HandleUndo=()=>{
    if(index<=0)
    {
        HandleClear();
    }else{
        index-=1
        undo.pop();
        context.putImageData(undo[index],0,0)
    }


}
