let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2 ;

let velocidadeXBolinha = 7;
let velocidadeYBolinha = 7;
let raqueteComprimento = 10;
let raqueteAltura = 90;

let xPlayer1 = 5;
let yPlayer1 = 150;

let xPlayer2 = 585;
let yPlayer2 = 150;
let velocidadeYOponente;

let colidiu = false;

let pontosPlayer1 = 0;
let pontosPlayer2 = 0;

let ponto;
let raquetada;
let trilha;

let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  bolinha();
  verificaColisaoBorda();
  
  mostraRaquetes(xPlayer1, yPlayer1);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xPlayer1, yPlayer1);
  
  mostraRaquetes(xPlayer2, yPlayer2);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xPlayer2, yPlayer2);
  
  placar();
  marcaPonto();
}

function bolinha(){
  push();
  fill('hsb(160, 255%, 70%)');
  circle(xBolinha, yBolinha, diametro).pop();
  
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquetes(x,y){
  rect(x, y, raqueteComprimento, 
      raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yPlayer1 -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yPlayer1 += 10;
  }
  
  yPlayer1 = constrain(yPlayer1, 5, 305);
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xPlayer1 + raqueteComprimento && yBolinha - raio < yPlayer1 + raqueteAltura && yBolinha + raio > yPlayer1){
    velocidadeXBolinha *= -1;
  }
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y,raqueteComprimento,raqueteAltura,
xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosPlayer2 >= pontosPlayer1) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 55
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function movimentaRaqueteOponente(){

  velocidadeYOponente = yBolinha -yPlayer2 - raqueteComprimento / 2 - 40;
  yPlayer2 += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
  
 if (keyIsDown(UP_ARROW)){
    yPlayer2 -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yPlayer2 += 10;
  }

  yPlayer2 = constrain(yPlayer2, 5, 395);
}


function bolinhaNaoFicaPresa(){
    if (XBolinha - raio < 0){
    XBolinha = 23
    }
}

function placar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16).fill(color(255, 140, 0));
  rect(150, 10, 40, 20).fill(255).text(pontosPlayer1, 170, 26).fill(color(255, 140, 0));
  rect(400, 10, 40, 20).fill(255).text(pontosPlayer2, 420, 26);
  text('VS', 300, 30).textSize(32);
}
 
function marcaPonto(){
  if (xBolinha > 590){
    pontosPlayer1 += 1;
    ponto.play();
  }
  
  if (xBolinha < 10){
    pontosPlayer2 += 1;
    ponto.play();
  }
}