var database;
var back_img,back_img2;
var stage = 0;
var gameState =0;
var playerCount = 0;
var allPlayers,fruitBody,textVar,textVar2,textVar3,textVar4;
var player, form,game,playerIndex,bgm;
var player1,player2,score1,score2;
var players,name1,name2,click;
var fruits,fruits2,fruits3;
var fruitGroup,fruits,win,lose;
var fruit1_img, fruit2_img, fruit3_img, fruit4_img, fruit5_img;
var player_img,ground;
var message = "Multiplayer room is already equiped by someone else, please wait for the players";
var message2 = "to finish the game. Once they finish, we'll let you know.";
var message3 = "The game has been finished, please refresh your page, click the reset button";
var message4 = "and again refresh your page";

function preload(){
  back_img = loadImage("jungle.jpg");
  player_img = loadImage("basket2.png");
  fruit1_img = loadImage("apple2.png");
  fruit2_img = loadImage("banana2.png");
  fruit3_img = loadImage("melon2.png");
  fruit4_img = loadImage("orange2.png");
  fruit5_img = loadImage("pineapple2.png");  
  win = loadSound("win.mp3");
  lose = loadSound("lose.mp3");
  click = loadSound("click.mp3");
  bgm = loadSound("bgm.mp3");
  fruitGroup = new Group();
  fruitGroup2 = new Group();
  fruitGroup3 = new Group();
}
function setup() {
  createCanvas(1000, 600);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  sprite1 = createSprite(200,300,10,10);
  sprite1.visible = false;
  sprite2 = createSprite(200,300,10,10);
  sprite2.visible = false;

  ground = createSprite(500,550,1000,20);
  ground.visible = false;
}

function draw() { 
  background(back_img);

  if(gameState === 0 && stage === 0) {
    fill("white");
    textAlign(CENTER);
    textFont("cursive");
    textSize(25);
    text("Welcome to the Fruit Catcher!! This is an online multiplayer game so make sure",500,160);
    text("that you have an opponent to play with and your device has an internet connection.",500,190);
    text("Maximum and Minimum players required are 2. As soon as 2 players join, the game",500,220);
    text("will start. You have to collect as much fruits as you can in your basket. Control",500,250);
    text("the movement of your basket with the help of arrow keys on your keyboard. You",500,280);
    text("will be given random points based on the fruit type you collect. You have to score",500,310);
    text("at least 1000 points. The player who scores more shall win the game. Fill your name",500,340);
    text("in the box below, click the 'Create/Join a Room' button and wait for your opponent",500,370);
    text("to join. You can reset the game after finishing by clicking the 'Reset' button at",500,400);
    text("the bottom right of your screen and then refreshing your page.",500,430);
  }

  if(stage === 2) {
    fill("white");
    textFont("Forte");
    textSize(40);
    textAlign(CENTER);
    text("Please Refresh your page to play again.",500,200);
  }

  if(stage === 1) {
    fill("white");
    textFont("forte");
    textSize(100);
    textAlign(CENTER);
    text("Hello " + player.name,500,220);
    textFont("cursive");
    textStyle(BOLD);
    textSize(26);
    text("Waiting for an opponent to join...",500,280);
    textStyle(NORMAL);
    text("If you find an error, please click the Reset button",500,400);
    text("and Refresh your page.",500,430);
  }

  if (playerCount === 2) {
     game.update(1);
  }
  if (gameState === 1) {
    clear();
    game.play();

    if(score1 >= 1000 && score1 > score2) {
     if(player.index === 1) {
      fill("red");
      textFont("forte");
      textSize(40);
      textAlign(CENTER); 
      text("You win!!",500,300);
      sprite1.velocityX = -5;
     }
     else if(player.index === 2) {
       fill("red");
       textFont("forte");
       textSize(40);
       textAlign(CENTER);
       text("Opponent wins!!",500,300);
       sprite2.velocityX = -5;
     }
     else if(player.index === null) {
        database.ref('/').update({
          message3: message3
        });
        database.ref('message3').on("value", (data) => {
            textVar3 = data.val();
        })
        database.ref('/').update({
          message4: message4
        });
        database.ref('message4').on("value", (data) => {
            textVar4 = data.val();
        })
        fill("white");
        textSize(20);
        textStyle(BOLD);
        textFont("georgia");
        textAlign(CENTER);
        text(textVar3,500,300);
        text(textVar4,500,325);
     }
     fruitGroup.destroyEach();
     fruitGroup2.destroyEach();
     fruitGroup3.destroyEach();
    }

    if(score2 >= 1000 && score2 > score1) {
      if(player.index === 1) {
        fill("red");
        textFont("forte");
        textSize(40);
        textAlign(CENTER);
        text("Opponent wins!!",500,300);
        sprite2.velocityX = -5;
      }
      else if(player.index === 2) {
        fill("red");
        textFont("forte");
        textSize(40);
        textAlign(CENTER);
        text("You win!!",500,300);
        sprite1.velocityX = -5;
      }
      else if(player.index === null) {
          database.ref('/').update({
            message3: message3
          });
          database.ref('message3').on("value", (data) => {
              textVar3 = data.val();
          })
          database.ref('/').update({
            message4: message4
          });
          database.ref('message4').on("value", (data) => {
              textVar4 = data.val();
          })
          fill("white");
          textSize(20);
          textStyle(BOLD);
          textFont("georgia");
          textAlign(CENTER);
          text(textVar3,500,300);  
          text(textVar4,500,325);
       }
      fruitGroup.destroyEach();
      fruitGroup2.destroyEach();
      fruitGroup3.destroyEach();
    }

    if(sprite1.x < 0) {
      sprite1.x = 200000000000000;
      sprite1.setVelocity(0,0);
      win.play();
    }
    if(sprite2.x < 0) {
      sprite2.x = 200000000000000;
      sprite2.setVelocity(0,0);
      lose.play();
    }
  }
   if (gameState === 2) {
     game.end();
   }
}