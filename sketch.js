var dog, happyDog, database, foodS, foodStock;
var dogImg, dogHappy;
var milk, addFood, feed, fedTime, lastFed, foodObj;
var gameState,readState;
var bedroomImg,gardenImg,washroomImg;

function preload() {
  dogImg = loadImage("dogImg.png");
  dogHappy = loadImage("dogImg1.png");
  bedroomImg = loadImage('Bed Room.png')
  gardenImg = loadImage('Garden.png')
  washroomImg = loadImage('Wash Room.png');
}

function setup() {

  createCanvas(500, 500);

  database = firebase.database();

  dog = createSprite(250, 300);
  dog.addImage("Bob", dogImg);
  dog.scale = 0.25;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  foodObj = new Food();

  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods)
  //read game state
  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });
}


function draw() {  

  background(46, 139, 87);

  fedTime = database.ref('lastFed');
  fedTime.on("value", function(data) {
    lastFed = data.val();
  });

  

  currentTime = hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime==(lastFed=2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }

  
  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(dogImg);
  }

  drawSprites();
  foodObj.display();
}


function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x) {

  if(x<=0) {
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref('/').update({
    Food:x
  })

}

function add() {

  addFood.mousePressed(function(x) {

    if(x>=20) {
      x = 20;
    } else {
      x = x + 1;
    }
  
    database.ref('/').update({
      Food:x
    })

  })
}

function feedDog() {

  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
  FeedTime:hour()
  });
}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}