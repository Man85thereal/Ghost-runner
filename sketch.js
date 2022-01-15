var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"



function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup=new Group();
  climbersGroup=new Group();
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImg)
  ghost.scale=0.5
  invisibleBlockGroup=new Group()

  //spookySound.loop()
}

function draw() {
  background(200);
  
  if(gameState==="play"){
    if(keyDown("left_ARROW")){
      ghost.x=ghost.x-3
    }
     
    if(keyDown("right_ARROW")){
       ghost.x=ghost.x+3
    }
  
    if (keyDown("space")){
      ghost.velocityY=-5
    }
    ghost.velocityY=ghost.velocityY+0.8
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
     ghost.destroy()
     gameState="end"
    }
    if(tower.y > 400){
        tower.y = 300
      }
      spawnDoors();
      drawSprites();
  }
 
 
   if(gameState=="end"){
     stroke("yellow")
     fill ("yellow")
     textSize(30)
     text("Game Over better luck next time ",50,250)
   }


}
    

function spawnDoors(){
  if (frameCount%200===0){
    door=createSprite(200,-50);
    door.addImage(doorImg);
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    door.lifetime=600;
    doorsGroup.add(door);
    ghost.depth=door.depth;
    ghost.depth+=1;

    climbers=createSprite(200,10);
    climbers.addImage( climberImg);
    climbers.x=door.x
    climbers.velocityY=1
    climbers.lifetime=600
    climbersGroup.add(climbers)
    
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climbers.width;
    invisibleBlock.height=2
    invisibleBlock.x=door.x
    invisibleBlock.velocityY=1
    invisibleBlock.debug=true
    invisibleBlockGroup.add(invisibleBlock)

  }
}