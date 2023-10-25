import { canvasLeft,canvasTop,scaleHorizont,scaleVertical } from "./main.js";

let isDragging = false;
let istouch_X = 0;
let istouch_Y = 0;
let realTouchX = 0;
let realTouchY = 0;

export function touchStart(e,player){
    const touch = e.touches[0];
    // console.log(canvasLeft)
    // console.log(canvasTop)
    realTouchX = touch.pageX * scaleHorizont ;
    realTouchY = touch.pageY * scaleVertical;
    // console.log("Xtouch"+realTouchX)
    // console.log("Ytouch"+realTouchY)
    realTouchX = (touch.pageX - canvasLeft)*scaleHorizont;      //Ajusta las coordenadas del touchScreen en base al escalado de la pantalla
    realTouchY = (touch.pageY - canvasTop)*scaleVertical;       
    // console.log("Xtouch"+realTouchX);
    // console.log("Ytouch"+realTouchY);

    
    if (isTouchInPlayer(realTouchX,realTouchY,player) == true) {
        isDragging = true
        istouch_X = realTouchX - player.x - player.width / 2  ;
        istouch_Y = realTouchY  - player.y - player.height / 2 ;
        // console.log(istouch_X);
        // console.log(istouch_Y);
        // console.log(isDragging);   
    }

};

export function touchMove(e,player,canvas){
    if (isDragging == true) {
    const touch = e.touches[0];    
    const newX = touch.pageX - istouch_X;
    const newY = touch.pageY - istouch_Y;

    player.x = Math.max(0,Math.min(newX,canvas.width - player.width));
    player.y = Math.max(0,Math.min(newY,canvas.height - player.height));
    console.log(player.x + "p");
    console.log(player.y + "p");
    }
}

export function touchEnd(){
    isDragging = false;
    console.log(isDragging);

}

function isTouchInPlayer(realTouchX,realTouchY,player){
    // console.log("Xplayer"+player.x);
    // console.log("Yplayer"+player.y);
    if ( 
    (realTouchX > player.x) &&
    (realTouchX < (player.x + player.width)) &&
    (realTouchY > player.y) &&
    (realTouchY < (player.y + player.height))
    ){
    // console.log("entre aqui");
    return true
    }
    else {
    // console.log("no entre aqui");
    return false
}
    
}
