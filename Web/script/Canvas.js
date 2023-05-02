Module.onRuntimeInitialized = () => { start(); }

/* ******************** global variables ******************** */

var canvas = document.getElementById('mycanvas');


// load images
var LIGHTBULB_IMG = new Image();
var MARK_IMG = new Image();
var BLACK0_IMG = new Image();
var BLACK1_IMG = new Image();
var BLACK2_IMG = new Image();
var BLACK3_IMG = new Image();
var BLACK4_IMG = new Image();
var BLACKU_IMG = new Image();
var LIGHTED_IMG = new Image();

var LIGHTBULB_ERR_IMG = new Image();
var BLACK0_ERR_IMG = new Image();
var BLACK1_ERR_IMG = new Image();
var BLACK2_ERR_IMG = new Image();
var BLACK3_ERR_IMG = new Image();
var BLACK4_ERR_IMG = new Image(); 

LIGHTBULB_IMG.src = "./src/Images/S_LIGHTBULB.png";
MARK_IMG.src = "./src/Images/st_50.png";
BLACK0_IMG.src = "./src/Images/S_BLACK0.png";
BLACK1_IMG.src = "./src/Images/S_BLACK1.png";
BLACK2_IMG.src = "./src/Images/S_BLACK2.png";
BLACK3_IMG.src = "./src/Images/S_BLACK3.png";
BLACK4_IMG.src = "./src/Images/S_BLACK4.png";
BLACKU_IMG.src = "./src/Images/S_BLACKU.png";
LIGHTED_IMG.src = "./src/Images/F_LIGHTED.png";

LIGHTBULB_ERR_IMG.src = "./src/Images/dm_50.png";
BLACK0_ERR_IMG.src = "./src/Images/S_BLACK0_ERR.png";
BLACK1_ERR_IMG.src = "./src/Images/S_BLACK1_ERR.png";
BLACK2_ERR_IMG.src = "./src/Images/S_BLACK2_ERR.png";
BLACK3_ERR_IMG.src = "./src/Images/S_BLACK3_ERR.png";
BLACK4_ERR_IMG.src = "./src/Images/S_BLACK4_ERR.png"; 

// initial position in canvas

var lightbulbX, lightbulbY;

//position exacte de l'emplacement du carré AVEC LES TAILLES DU CANVAS
var squareX;
var squareY;

//position exacte de l'emplacement du carré AVEC LES TAILLES DU TABLEAU
var posX;
var posY;

const BLANK = 0;
const LIGHTBULB = 1;
const MARK = 2;

var nb_rows;
var nb_cols;

var g;

/* ******************** register events ******************** */

canvas.addEventListener('click', canvasLeftClick);        // left click event

/* ******************** event callback ******************** */

function canvasLeftClick(event) {
    event.preventDefault(); // prevent default context menu to appear...
    // get relative cursor position in canvas

    squareX = event.offsetX;
    squareY = event.offsetY;

    var width = canvas.width;
    var height = canvas.height;

    for(var i = 0; i < nb_rows; i++){
        for(var j = 0; j < nb_cols; j++){
            if (event.offsetX >= (i*(width/nb_rows)) && event.offsetX <= (width/nb_rows)*(i+1)
            && event.offsetY >= (j*(height/nb_cols)) && event.offsetY <= (height/nb_cols)*(j+1)){
                squareX = (width/nb_rows)/2+(i*(width/nb_rows));
                squareY = (height/nb_cols)/2+(j*(height/nb_cols));
                //console.log("pos :", squareX, squareY);
                //console.log("pos2 :", posX, posY);

                posX = i;
                posY = j;
                
                var blank = Module._is_blank(g, i, j);
                var ligthed = Module._is_lighted(g, i, j);
                var lightbulb = Module._is_lightbulb(g, i, j);
                var marked = Module._is_marked(g, i, j);

                if (blank && ligthed == false ){
                    console.log("blank");
                    Module._play_move(g, posX, posY, LIGHTBULB);
                }
                else if (lightbulb){
                    console.log("lightbulb");

                    Module._play_move(g, posX, posY, MARK);
                }
                else if (marked){
                    console.log("marked");

                    Module._play_move(g, posX, posY, BLANK);
                }

                else{
                    alert("It's not a Blank Square or Lightbulb");
                }
    
            }
        }
    }
    console.log("draw");
    drawCanvas();
}

/* ******************** canvas drawing ******************** */


function drawCanvas() {
    
    var ctx = canvas.getContext('2d');

    var width = canvas.width;
    var height = canvas.height;

    // clear canvas
    ctx.clearRect(0, 0, width, height);

    // draw some lines
    ctx.save();
    ctx.strokeStyle = 'dark';
    ctx.beginPath();
    for (var y = 1; y < nb_cols; ++y){
        ctx.moveTo(0, y*(height/nb_cols));
        ctx.lineTo(width, y*(height/nb_cols));
    }
    for (var x = 1; x < nb_rows; ++x){
        ctx.moveTo(x*(width/nb_rows), 0);
        ctx.lineTo(x*(width/nb_rows), height);
    }
    for (var row = 0; row < nb_rows; row++) {
        for (var col = 0; col < nb_cols; col++) {
            //var blank = Module._is_blank(g, row, col);
            var black = Module._is_black(g, row, col);
            var ligthed = Module._is_lighted(g, row, col);
            var lightbulb = Module._is_lightbulb(g, row, col);
            var marked = Module._is_marked(g, row, col);
            var error = Module._has_error(g, row, col);

            if (error){
                if (Module._get_black_number(g, row, col) == 0){
                    //console.log("BLACK0_ERR_IMG");

                    ctx.drawImage(BLACK0_ERR_IMG, (width/nb_rows)*row, (height/nb_cols)*col, (width/nb_rows), (height/nb_cols));
                }
                else if (Module._get_black_number(g, row, col) == 1){
                    //console.log("BLACK1_ERR_IMG");

                    ctx.drawImage(BLACK1_ERR_IMG, (width/nb_rows)*row, (height/nb_cols)*col, (width/nb_rows), (height/nb_cols));
                }
                else if (Module._get_black_number(g, row, col) == 2){
                    //console.log("BLACK2_ERR_IMG");

                    ctx.drawImage(BLACK2_ERR_IMG, (width/nb_rows)*row, (height/nb_cols)*col, (width/nb_rows), (height/nb_cols));
                }
                else if (Module._get_black_number(g, row, col) == 3){
                    //console.log("BLACK3_ERR_IMG");

                    ctx.drawImage(BLACK3_ERR_IMG, (width/nb_rows)*row, (height/nb_cols)*col, (width/nb_rows), (height/nb_cols));
                }
                else if (Module._get_black_number(g, row, col) == 4){
                    //console.log("BLACK4_ERR_IMG");

                    ctx.drawImage(BLACK4_ERR_IMG, (width/nb_rows)*row, (height/nb_cols)*col, (width/nb_rows), (height/nb_cols));
                }
 

            }
            else if (black){
                //console.log("black");
                if (Module._get_black_number(g, row, col) == 0){
                    ctx.drawImage(BLACK0_IMG, (width/nb_rows)*row, (height/nb_cols)*col, (width/nb_rows), (height/nb_cols));
                }
                else if (Module._get_black_number(g, row, col) == 1){
                    ctx.drawImage(BLACK1_IMG, (width/nb_rows)*row, (height/nb_cols)*col, (width/nb_rows), (height/nb_cols));
                }
                else if (Module._get_black_number(g, row, col) == 2){
                    ctx.drawImage(BLACK2_IMG, (width/nb_rows)*row, (height/nb_cols)*col, (width/nb_rows), (height/nb_cols));
                }
                else if (Module._get_black_number(g, row, col) == 3){
                    ctx.drawImage(BLACK3_IMG, (width/nb_rows)*row, (height/nb_cols)*col, (width/nb_rows), (height/nb_cols));
                }
                else if (Module._get_black_number(g, row, col) == 4){
                    ctx.drawImage(BLACK4_IMG, (width/nb_rows)*row, (height/nb_cols)*col, (width/nb_rows), (height/nb_cols));
                }
                else{
                    ctx.drawImage(BLACKU_IMG, (width/nb_rows)*row, (height/nb_cols)*col, (width/nb_rows), (height/nb_cols));
                }
            }
            else if (marked){
                //console.log("marked");
                ctx.drawImage(MARK_IMG, (width/nb_rows)*row , (height/nb_cols)*col, (width/nb_rows), (height/nb_cols));
            }
            else if (lightbulb){
                //console.log("lightbulb");
                ctx.drawImage(LIGHTBULB_IMG, (width/nb_rows)*row, (height/nb_cols)*col, (width/nb_rows), (height/nb_cols));

            }
            else if (ligthed){
                //console.log("ligthed");
                ctx.drawImage(LIGHTED_IMG, (width/nb_rows)*row, (height/nb_cols)*col, (width/nb_rows), (height/nb_cols));

            }

        }

    }
    ctx.closePath(); 
    ctx.stroke();

    if (Module._is_over(g)){
        alert("You Win");
        stop_ch();
    }

}
//
function Quit(){
    console.log("Quit");
    Module._delete(g);
}

let wall = document.getElementById("Walls");
let Difficulty = document.getElementById("Difficulty");
let wrapping = document.getElementById("wrapping");
let wall_value;
let difficulty_value;

/*fonctions auxilières*/

function Fun_Wall(){
    if (wall.value == "20"){
        wall_value = 5;

    }else if (wall.value == "40"){
        wall_value = 10;

    } else if (wall.value == "60"){
        wall_value = 15;

    }else if (wall.value == "80"){
        wall_value = 20;
    }
    else{
        wall_value = 10;
    }

}
function Fun_Difficulty(){
    if (Difficulty.value == "1"){
        difficulty_value = 5;

    }else if (Difficulty.value == "2"){
        difficulty_value = 7;

    } else if (Difficulty.value == "3"){
        difficulty_value = 9;

    }else{
        difficulty_value = 7;
    }

}
/*Les fonctions pour jouer au jeu*/

function New(){

    Module._delete(g);
    Fun_Wall();
    Fun_Difficulty();

    console.log("difficulty = ", difficulty_value);
    console.log("wall = ", wall_value);
    console.log("wrapping = ", wrapping.checked);

    if (wrapping.checked == true){
        g = Module._new_random(difficulty_value, difficulty_value, true, wall_value,false);

    }else {
        g = Module._new_random(difficulty_value, difficulty_value, false, wall_value,false);
    }
    nb_rows = Module._nb_rows(g);
    nb_cols = Module._nb_cols(g);
    drawCanvas();

}
function Restart(){
    Module._restart(g);
    drawCanvas();

}
function Solve(){
    Module._solve(g);
    drawCanvas();
}
function Undo(){
    Module._undo(g);
    drawCanvas();
}
function Redo(){
    Module._redo(g);
    drawCanvas();
}

/* Cette fonction permet de créer un chonomettre */

var sp = document.getElementsByTagName("span");
var btn_start=document.getElementById("start");
var btn_stop=document.getElementById("stop");
var t;
var ms=0,s=0,mn=0,h=0;

let div_timer = document.getElementById("timer");

function Timer() {

    
    if (getComputedStyle(div_timer).display != "none"){
        div_timer.style.display = "none";
    }
    else{
        div_timer.style.display = "block";
        stop_ch();
        reset_ch();

    }

}
   /*La fonction "start" démarre un appel répétitive de la fonction update_chrono par une cadence de 100 milliseconde en utilisant setInterval et désactive le bouton "start" */

function start_ch(){
   t = setInterval(update_chrono,100);
   btn_start.disabled=true;
  
  }
  /*La fonction update_chrono incrémente le nombre de millisecondes par 1 <==> 1*cadence = 100 */
function update_chrono(){
    ms+=1;
    /*si ms=10 <==> ms*cadence = 1000ms <==> 1s alors on incrémente le nombre de secondes*/
    if(ms==10){
        ms=1;
        s+=1;
    }
       /*on teste si s=60 pour incrémenter le nombre de minute*/
    if(s==60){
        s=0;
        mn+=1;
    }
    if(mn==60){
        mn=0;
        h+=1;
    }
       /*afficher les nouvelle valeurs*/
    sp[0].innerHTML=h+" h";
    sp[1].innerHTML=mn+" min";
    sp[2].innerHTML=s+" s";
    sp[3].innerHTML=ms+" ms";

  }
  
	/*on arrête le "timer" par clearInterval ,on réactive le bouton start */
function stop_ch(){
    clearInterval(t);
    btn_start.disabled=false;	
}

  /*dans cette fonction on arrête le "timer" ,on réactive le bouton "start" et on initialise les variables à zéro */
function reset_ch(){
    clearInterval(t);
    btn_start.disabled=false;
    ms=0,s=0,mn=0,h=0;
    /*on accède aux différents span par leurs indice*/
    sp[0].innerHTML=h+" h";
    sp[1].innerHTML=mn+" min";
    sp[2].innerHTML=s+" s";
    sp[3].innerHTML=ms+" ms";
}

//
let div_help = document.getElementById("help");

function Help(){

    if (getComputedStyle(div_help).display != "none"){
        div_help.style.display = "none";
    }
    else{
        div_help.style.display = "block";
    }

}
/* Pour cette fonction on vient chercher pour chaques structure, les valeurs que l'on a mis dans le fichier CSS*/

function DarkMode(){
    let body = document.querySelector("body");
    let h1 = document.querySelector("h1");
    let p = document.getElementById("Thanks");

    let Panel = document.getElementById("Panel");
    let help = document.getElementById("help");

    if (body.style.backgroundColor == "black"){
        body.style.backgroundColor = "white";
        Panel.style.boxShadow = "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px";
        help.style.boxShadow = "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px";
        h1.style.color = "black";
        p.style.color = "black";

    }else {
        body.style.backgroundColor = "black";
        Panel.style.boxShadow = "rgba(217, 0, 255, 0.56) 0px 0px 70px 40px";
        help.style.boxShadow = "rgba(217, 0, 255, 0.56) 0px 0px 70px 40px";
        h1.style.color = "white";
        p.style.color = "white";

    }
}
/* Première fonction utilisé */
/* On donne des valeurs aux variables définies */
function start() {

    div_help.style.display = "none";
    div_timer.style.display = "none";

    console.log("call start routine");
    g = Module._new_default();
    nb_rows = Module._nb_rows(g);
    nb_cols = Module._nb_cols(g);

    drawCanvas();
}

