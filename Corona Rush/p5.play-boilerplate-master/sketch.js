var PLAY=1;
var END=0;
var gameState=PLAY;
var player, playerImg;
var virus, virusImg;
var bg_img;
var ground;
var invisibleGround;
var jumpImg;
var medicine, medicineImg;
var virusGroup, medGroup;
var collided;

function preload(){
  playerImg=loadAnimation("images/girl_1.png","images/girl_2.png", "images/girl_3.png", "images/girl_4.png", "images/girl_5.png", "images/girl_6.png");
  //jumpImg=loadImage("images/girl_4.png");
  ground_img=loadImage("images/bg.png");
  virusImg=loadImage("images/coronavirus.png");
  medicineImg=loadImage("images/medicine.png");
  girl_collided=loadImage("images/collided.png");
}

function setup() {
  createCanvas(1500,500);

  medGroup = new Group();
  virusGroup = new Group();

  ground=createSprite(500,100);
  ground.addImage(ground_img);
  ground.velocityX=-12;

  player=createSprite(100, 400, 50, 50);
  player.addAnimation("player_running", playerImg);
  player.addAnimation("collided",girl_collided);
 
  invisibleGround=createSprite(150,480,500,10);
  invisibleGround.visible=false;

 
}

function draw() {
  background(0);

  if(gameState===PLAY){

  if(ground.x<550){
    ground.x=ground.width/2
  }

  if(keyDown("SPACE") && player.y>=400-100){
    player.velocityY=-12;
  }
  player.velocityY= player.velocityY + 0.5;

  spawnViruses();
  spawnMeds();

  player.collide(invisibleGround);

  if(player.isTouching(virusGroup)){
    gameState=END;
  }


 }

    else if(gameState===END){

      for(var i = 0; i <virusGroup.length ; i++){
        if(virusGroup.get(i).isTouching(player)){
          ground.velocityX=0;
          player.velocityY=0;
          invisibleGround.velocityX=0;
          player.changeAnimation("collided",collided);
          virusGroup.get(i).remove();
          virusGroup.destroyEach();
          medGroup.destroyEach();
          virusGroup.setLifetimeEach(-1);
          medGroup.setLifetimeEach(-1);
          virusGroup.setVelocityXEach(0);
          medGroup.setVelocityXEach(0);

        }
      }

    }
    
  



  
  
  drawSprites();
}

function spawnViruses(){
  if(frameCount%200===0){
    virus=createSprite(800,350,20,20);
    virus.y=Math.round(random(320,480));
    virus.addImage(virusImg);
    virus.velocityX= -3;
    virus.scale=0.1;
    virus.lifetime=500;
    virusGroup.add(virus);
  }
  
  
}

function spawnMeds(){
  if(frameCount%700===0){
    medicine=createSprite(680,400,10,10);
    medicine.addImage(medicineImg);
    medicine.velocityX= -3;
    medicine.scale=0.1;
    medicine.lifetime=479;
    medGroup.add(medicine);

    medicine.depth = player.depth;
    player.depth = player.depth+1
  }
  
}