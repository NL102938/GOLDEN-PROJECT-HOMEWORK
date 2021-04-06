var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,ground_image,invisible_ground;
var player;
var obstaclesGroup,obstacle;
var powersGroup,power;
var jumpSound,dieSound,checkpointSound;
var score;
var gameOver,restart,gameOverImage,restartImage;

function preload(){
  ground_image = loadImage("Background.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkpointSound = loadSound("checkPoint.mp3");
}

function setup() {
 createCanvas(600,500);
  
  ground=createSprite(200,150,0,0);
  ground.addImage("bground",ground_image)
  ground.shapeColor="white";
  ground.velocityX=-1;
  
  player=createSprite(300,420,20,30);
  player.shapeColor = ("#8F0E06");
  
  ape=createSprite(50,410,20,30);
  ape.shapeColor = ("#5A2F77");

  
  invisible_ground=createSprite(300,485,600,10);
  invisible_ground.visible=false;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(300,180);
  restart.addImage(restartImage);
  
  obstaclesGroup = new Group();
  powersGroup = new Group();
  
  score=0;
}

function draw() {
  background("black");
  
  player.velocityY = player.velocityY + 0.8;
  player.collide(invisible_ground); 
  
  ape.velocityY = ape.velocityY + 0.8;
  ape.collide(invisible_ground); 
  
  
  if (gameState===PLAY){
    gameOver.visible=false;
    gameOver.scale=0.5
    restart.visible=false;
    restart.scale=0.5
    score = score + Math.round(getFrameRate()/60);
 
    spawnObstacles();
    if (obstaclesGroup.isTouching(ape)){
      ape.velocityY=-12;
    }
    ground.velocityX = -(4 + 3* score/100);
     
    if (ground.x < 200){
      ground.x = ground.width/2;
    }
  
    if(score>0 && score%100 === 0){
      checkpointSound.play() 
    }
    
    if((keyDown("space")&& player.y >= 220)) {
      player.velocityY = -12;
      jumpSound.play();
    }  
  
    if (player.isTouching(obstaclesGroup)){
      gameState=END;
      dieSound.play();
    }
  }

  if ( gameState===END) {
    gameOver.visible=true;
    restart.visible=true;
    ground.velocityX = 0;
    player.velocityY = 0
    ape.x=player.x;
  
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
  
    if(mousePressedOver(restart)) {
      reset();
    }
  } 
  
  drawSprites();
  fill("pink");
  textSize(20);
  text("Score: "+ score, 500,50);
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  score=0;
  ape.x=50;
}

function spawnObstacles() {
  if (frameCount % 10 === 0){
  var obstacle = createSprite(600,470,20,20);
  obstacle.velocityX = ground.velocityX;
  obstacle.shapeColor = ("yellow")
  obstacle.collide(ground);
  obstaclesGroup.add(obstacle);
  obstacle.setCollider("circle",0,0,1);
  }     
}
function spawnPowers() {
  if (frameCount % 100 === 0){
    var power = createSprite(600,250,0,10,40);
    obstacle.velocityX = ground.velocityX;
    var rand = Math.round(random(1,6));
    power.addImage(power);
    power.scale=0.1;
    powersGroup.add(power);
    power.setCollider("circle",0,0,1);
  }
}

