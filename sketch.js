var tower,towera;
var door,doora,doorGroup;
var climber,climbera,climberGroup;
var ghost,ghosta;
var invisibleblock,invisibleGroup;
var gameState="play";

function preload(){
  towera=loadImage('tower.png');
  doora=loadImage("door.png");
  climbera=loadImage("climber.png");
  ghosta=loadImage("ghost1.png");
  ghostsound=loadSound("spooky.wav")
}
function setup(){
  createCanvas(600,600);
  ghostsound.loop()
  tower=createSprite(300,300);
  tower.addImage(towera);
  tower.velocityY=1;
  
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleGroup=new Group();
  
  ghost=createSprite(200,200,50,50)
  ghost.addImage(ghosta)
  ghost.scale=0.3
}
function draw(){
  background(0);
  
  if(gameState==="play"){
      if(keyDown("left_arrow")){
    ghost.x+=-3
  }
  if(keyDown("right_arrow")){
    ghost.x+=3
  }
  if(keyDown("space")){
    ghost.velocityY=-3
  }
  ghost.velocityY=ghost.velocityY+0.8
    
     if(tower.y>400){
    tower.y=300;
  }
  spawndoors();  
  
    
    
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleGroup.isTouching(ghost)|| ghost.y>600){
    ghost.destroy()
    gameState="end"
  }
    drawSprites();
  }
 if(gameState==="end"){
   stroke("yellow")
   fill("yellow")
   textSize(30)
   text("GAMEOVER",230,250)
 }
  

  
  
  
}
function spawndoors(){
  if(frameCount%240===0){
    var door=createSprite(200,-50)
    door.addImage(doora);
    
    var climber=createSprite(200,10)
    climber.addImage(climbera);
    
    invisibleblock=createSprite(200,15)
    invisibleblock.width=climber.width
    invisibleblock.height=2
    
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    
    climber.x=door.x;
    climber.velocityY=1;
    
    invisibleblock.x=door.x;
    invisibleblock.velocityY=1;
    
    ghost.depth=door.depth
    ghost.depth+=1
    
    door.lifetime=800;
    climber.lifetime=800;
    
    doorGroup.add(door)
    climberGroup.add(climber)
    invisibleblock.debug=true
    invisibleGroup.add(invisibleblock)
  }
}
