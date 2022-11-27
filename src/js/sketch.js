//Variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

//Velocidade da Bolinha
let velocidadeXBolinha = 6; 
let velocidadeYBolinha = 6;

//Variáveis da Raquete
let xRaquete = 0;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//Variáveis do Oponente
let xRaqueteOponente = 590;
let yRaqueteOponente = 150;
let velocidadeYOponente;
  
let colidiu = false;

//Placar do Jogo
let meusPontos = 0;
let pontosOponente = 0;

//Sons do Jogo
let raquetada;
let ponto;
let trilha;

//Erro do Oponente
let chanceDeErrar = 0;

function preload(){
  raquetada = loadSound("../../assets/raquetada.mp3");
  ponto = loadSound("../../assets/ponto.mp3");
  trilha = loadSound("../../assets/trilha.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente(); 
  //movimentaRaqueteOponenteMultiplayer();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  bolinhaFicaPresa();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if(xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if(yBolinha + raio> height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function mostraRaqueteOponente(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;  
  } 
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();
}

function movimentaRaqueteOponenteMultiplayer(){
  if(keyIsDown(87)){
    yRaqueteOponente -= 10;  
  } 
  if(keyIsDown(83)){
    yRaqueteOponente += 10;
  }
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255,140,0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  } 
}

function calculaChanceDeErrar(){
  if (pontosOponente >= meusPontos){
    chanceDeErrar += 1;
    if(chanceDeErrar >= 39){
      chanceDeErrar = 40;
    }
  } else {
    chanceDeErrar -= 1;
    if(chanceDeErrar <= 35){
      chanceDeErrar = 35;
    }
  }
}

function bolinhaFicaPresa(){
  if(xBolinha - raio < 0){
    xBolinha = 12;
  }
}