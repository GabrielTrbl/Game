import { Player } from "./player.js";
import { movePlayerPosition } from "./controls.js";
import { Notes } from "./notes.js";

let run = 1;     // variables iniciales del juego

let gameOver = 0;

let menu = 2;

let preRun = 4;

let state = menu;

let isGameOver = false;

let isGamePaused = false;

let gameTime = 0;

let currentDifficulty = 1;

let score = 0;

let gameOver1 = 0;

let isStartButtonDisabled = false;
let isRestartButtonDisabled = true;
let isMenuButtonDisabled = true;

const notes = [] ;      // arreglo que contiene las notas

export const canvas = document.getElementById("canvas-game");  //dibujo del canvas y sus parametros
export const ctx = canvas.getContext("2d");
canvas.height = 600 ;
canvas.width = 500 ;


const player = new Player(250, 550, 75, 50);        //creacion de un Player, importando la clase Player
const maxDifficulty = 5;


const noteImages = [        // lista de imagenes
    "img/Nota1.png" ,
    "img/Nota2.png" ,
    "img/Nota3.png" ,
    "img/Nota4.png" ,
    "img/Nota5.png" , 
    "img/Nota6.png" ,
    "img/Nota7.png"
];
const noteSounds = {        // lista de sonidos y su nota correspondiente
   "img/Nota1.png":  new Audio("sounds/Do.mp3") ,
    "img/Nota2.png": new Audio ("sounds/Fa.mp3") ,
    "img/Nota3.png": new Audio ("sounds/La.mp3") ,
    "img/Nota4.png": new Audio ("sounds/Mi.mp3") ,
    "img/Nota5.png": new Audio ("sounds/Re.mp3") ,
    "img/Nota6.png": new Audio ("sounds/Si.mp3") ,
    "img/Nota7.png": new Audio ("sounds/Sol.mp3") ,

};

function drawGameOverScreen(ctx){   // dibuja Game Over en la pantalla
    ctx.font = "50px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over",125,300);
};

function drawMenuScreen(ctx){       // dibuja la pantalla de menu
    ctx.font = "50px Arial";
    ctx.fillStyle = "#6F0606";
    ctx.fillText("Atrapa la musica",65,180);
    ctx.fillText("Press Start",130,300);
};


function  drawbackground() {       // limpia el canvas
    ctx.fillStyle = "White";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

function drawplayer(){             // dibuja al jugador, asignandole una imagen.

    const playerImg = new Image();
    playerImg.src = "img/Player.png";
    
    playerImg.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawbackground();
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
    };
};

function drawNotes(notes, ctx) {        // dibuja las notas.
    for (let i = 0; i < notes.length; i++) {
    const currentNote = notes[i];
    const noteImg = new Image();
    noteImg.src = currentNote.imageSrc;
    
    noteImg.onload = function () {
      ctx.drawImage(noteImg, currentNote.x, currentNote.y, currentNote.width, currentNote.height);           
    };
}
};

function drawScore (){          // dibuja el puntaje obtenido
    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Notas atrapadas: " + score, 10,30);
};

function spawnNote() {      // genera una nota y la agrega al arreglo
    const note = new Notes ();
    const randomImageIndex = Math.floor(Math.random( ) * noteImages.length);
    note.imageSrc = noteImages [randomImageIndex];
        
    note.x = Math.random () * (canvas.width - 20) ;
    note.y = 0;
    note.width = 24;
    note.height = 24;
    note.speed = Math.random () *2 + 1;
    notes.push (note);
};

function upDifficulty (){   // sube la dificultad, aumentando el limite de notas en pantalla.
    gameTime += 16;
    if (currentDifficulty < maxDifficulty){
        if (gameTime >= currentDifficulty * 5000)
        currentDifficulty++;
    }
    const maxNotes = currentDifficulty * 2;
    while(notes.length < maxNotes){
    spawnNote();
    }
};
     
function moventNotes (notes) {      // controla el movimiento de las notas
        for (let i = 0; i < notes.length; i++) {
        const currentNote = notes[i];
        
        currentNote.y += currentNote.speed;
    }
    
};
function removeNote() {             // remueve las notas ante una colision con el jugador
    for(let i=0; i < notes.length; i++) {
        const currentNote = notes[i];
        if (
            player.x < currentNote.x + currentNote.width && 
            player.x + player.width > currentNote.x &&
            player.y < currentNote.y + currentNote.height &&
            player.y + player.height > currentNote.y
        ){
        const noteImage = currentNote.imageSrc;
        notes.splice(i,1);
        i--;
        score++;
        if(noteSounds[noteImage]){
            const previusSound = noteSounds[noteImage];
            previusSound.pause();
            previusSound.currentTime = 0;
            noteSounds[noteImage].play();
        }
        }
    
    }
};


// genera el boton de reinicio

const restart = document.getElementById("restart");

restart.addEventListener("click",restartGame);

//genera el boton de menu

const Menu = document.getElementById("menu");

Menu.addEventListener("click",menuGame);

//genera el boton de start

const start = document.getElementById("start");

start.addEventListener("click",startGame);

function restartGame(){         //La funcion se activa con el boton y reinicia las estadisticas a su estado inicial
    state = preRun;
    isRestartButtonDisabled = true;
    isStartButtonDisabled = false;
    isMenuButtonDisabled = false;

    restart.disabled = isRestartButtonDisabled;
    start.disabled = isStartButtonDisabled;
    Menu.disabled = isMenuButtonDisabled;

};
function menuGame(){            // La funcion se activa con el boton y lleva al juego al estado de menu
    state = menu;
    isRestartButtonDisabled = true;
    isStartButtonDisabled = false;
    isMenuButtonDisabled = true;

    restart.disabled = isRestartButtonDisabled;
    start.disabled = isStartButtonDisabled;
    Menu.disabled = isMenuButtonDisabled;
};
function startGame(){           // La funcion se activa con el boton y lleva al juego al estado start
    state = preRun; 
    isRestartButtonDisabled = false;
    isStartButtonDisabled = true;
    isMenuButtonDisabled = false;

    restart.disabled = isRestartButtonDisabled;
    start.disabled = isStartButtonDisabled;
    Menu.disabled = isMenuButtonDisabled;
};

function new_Inicio() {     // Esta funcion se encarga de que los valores se reseteen y trabaja junto con la funcion restart llevando al juego al estado prerun
    gameOver1 = 0;
    isGameOver = false;
    isGamePaused = false;
    state = run;
    score = 0;
    currentDifficulty = 1;
    gameTime = 0;
    notes.splice(0);
    player.x = 250;
    player.y = 550;
    requestAnimationFrame(updateGameArea);  
};

function checkGameOver(notes,canvas){   // chequea cuando el juego debe entrar en Game Over.
    for (let i = 0 ; i < notes.length ; i++){
    const currentNote = notes[i]; 
    if (currentNote.y > canvas.height) {
        notes.splice(i,1);
        isGameOver = true;
        isGamePaused = true;
        state= gameOver;
        restart.disabled = false; 
        start.disabled = true;    
        Menu.disabled = false;    
    }
        

}
};

function updateGameArea(){              // genera el bucle que hace funcionar al juego
    switch(state){
        case run : 
            if ((isGameOver == false) && (isGamePaused == false)){
                restart.disabled = false; 
                start.disabled = true;    
                Menu.disabled = false; 
                
                drawplayer();
                movePlayerPosition(player);
                drawNotes(notes, ctx);
                moventNotes (notes);
                removeNote();
                upDifficulty();
                drawScore();
                checkGameOver(notes,canvas);
            }
            requestAnimationFrame(updateGameArea);
            break;   
        case gameOver :
            if ((isGameOver == true) && (isGamePaused == true)){
            if ((gameOver1 == 0)) {
            drawbackground();
            drawGameOverScreen(ctx);
            drawScore();
            gameOver1 += 1;
            requestAnimationFrame(updateGameArea);
            }
            else {
            requestAnimationFrame(updateGameArea);
            }
        }
            break;
        case preRun :
            new_Inicio();
            break;
        case menu :
            restart.disabled = isRestartButtonDisabled;
            start.disabled = isStartButtonDisabled;
            Menu.disabled = isMenuButtonDisabled;
            isRestartButtonDisabled = true;
            isStartButtonDisabled = false;
            isMenuButtonDisabled = true;
            drawbackground();
            drawMenuScreen(ctx);
            requestAnimationFrame(updateGameArea);
            break;
    }
};       

updateGameArea();

export {currentDifficulty,maxDifficulty,gameTime,spawnNote};