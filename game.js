class Game {
    constructor() {
        
    }
    
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    
    async start() {
        if(gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        player1 = createSprite(200,500);
        player1.addImage("player1",player_img);
        
        player2 = createSprite(800,500);
        player2.addImage("player2", player_img);
        players=[player1,player2];
    }
    
    play() {
        form.hide();
        Player.getPlayerInfo();
        
        if(allPlayers !== undefined) {
            image(back_img, 0, 0, 1000, 800);
            var x =100;
            var y=200;
            var index =0;        
            for(var plr in allPlayers) {                   
                index = index+1;
                x = 500-allPlayers[plr].distance;
                y=500;     
                players[index -1].x = x;
                players[index - 1].y = y;       
            }
        }
        
        if(keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.distance -= 10
            player.update();
        }
        if(keyIsDown(LEFT_ARROW) && player.index !== null) {
            player.distance += 10
            player.update();
        }

        if(frameCount % 35 === 0) {
            fruits = createSprite(random(100,1000),-30,20,20);
            fruits.velocityY = 6;
            fruits.lifetime = 85;
            var rand = Math.round(random(1,5));
            switch(rand){
                case 1: fruits.addImage("fruit1",fruit1_img);
                break;
                case 2: fruits.addImage("fruit1", fruit2_img);
                break;
                case 3: fruits.addImage("fruit1", fruit3_img);
                break;
                case 4: fruits.addImage("fruit1", fruit4_img);
                break;
                case 5: fruits.addImage("fruit1", fruit5_img);
                break;
            }
            fruits.depth = player1.depth;
            player1.depth = player1.depth + 1;
            fruits.depth = player2.depth;
            player2.depth = player2.depth + 1;
            fruitGroup.add(fruits);
        }
        if(frameCount % 40 === 0) {
            fruits2 = createSprite(random(100,1000),-30,20,20);
            fruits2.velocityY = 6;
            fruits2.lifetime = 85;
            var rand = Math.round(random(1,5));
            switch(rand){
                case 1: fruits2.addImage("fruit1",fruit1_img);
                break;
                case 2: fruits2.addImage("fruit1", fruit2_img);
                break;
                case 3: fruits2.addImage("fruit1", fruit3_img);
                break;
                case 4: fruits2.addImage("fruit1", fruit4_img);
                break;
                case 5: fruits2.addImage("fruit1", fruit5_img);
                break;
            }
            fruits2.depth = player1.depth;
            player1.depth = player1.depth + 1;
            fruits2.depth = player2.depth;
            player2.depth = player2.depth + 1;
            fruitGroup2.add(fruits2);
        }
        if(frameCount % 45 === 0) {
            fruits3 = createSprite(random(100,1000),-30,20,20);
            fruits3.velocityY = 6;
            fruits3.lifetime = 85;
            var rand = Math.round(random(1,5));
            switch(rand){
                case 1: fruits3.addImage("fruit1",fruit1_img);
                break;
                case 2: fruits3.addImage("fruit1", fruit2_img);
                break;
                case 3: fruits3.addImage("fruit1", fruit3_img);
                break;
                case 4: fruits3.addImage("fruit1", fruit4_img);
                break;
                case 5: fruits3.addImage("fruit1", fruit5_img);
                break;
            }
            fruits3.depth = player1.depth;
            player1.depth = player1.depth + 1;
            fruits3.depth = player2.depth;
            player2.depth = player2.depth + 1;
            fruitGroup3.add(fruits3);
        }
        
        drawSprites(); 

        database.ref('players/player1/score').on("value", (data) => {
            score1 = data.val();
        })
        database.ref('players/player2/score').on("value", (data) => {
            score2 = data.val();
        })

        fill("yellow");
        textSize(30);
        textStyle(NORMAL);
        textAlign(CENTER);
        text("Player 1 score: " + score1,150,100);
        text("Player 2 score: " + score2,150,130);

        if(index === player.index && allPlayers !== undefined) {     
            var player1Name = database.ref('players/player1/name');
            player1Name.on("value", (data) => {
                name1 = data.val();
            })
            var player2Name = database.ref('players/player2/name');
            player2Name.on("value", (data) => {
                name2 = data.val();
            })
            fill("black");
            textFont("georgia");
            textSize(25);
            textStyle(BOLD);
            textAlign(CENTER);
            text(name1,player1.x,player1.y+25);  
            textAlign(CENTER);
            text(name2,player2.x,player2.y+25); 

            if(fruitGroup.isTouching(player1)) {
                player.score += 1;
                database.ref('players/player1').update({
                    score:player.score
                })
            }
            if(fruitGroup2.isTouching(player1)) {
                player.score += 1;
                database.ref('players/player1').update({
                    score:player.score
                })
            }
            if(fruitGroup3.isTouching(player1)) {
                player.score += 1;
                database.ref('players/player1').update({
                    score:player.score
                })
            }

            if(fruitGroup.isTouching(player2)) {
                player.score += 1;
                database.ref('players/player2').update({
                    score:player.score
                })
            }
            if(fruitGroup2.isTouching(player2)) {
                player.score += 1;
                database.ref('players/player2').update({
                    score:player.score
                })
            }
            if(fruitGroup3.isTouching(player2)) {
                player.score += 1;
                database.ref('players/player2').update({
                    score:player.score
                })
            }
        }
        
        if(player.index === null) {
            fruitGroup.destroyEach();
            fruitGroup2.destroyEach();
            fruitGroup3.destroyEach();
            database.ref('/').update({
                message: message
            });
            database.ref('message').on("value", (data) => {
                textVar = data.val();
            })
            database.ref('/').update({
                message2: message2
            });
            database.ref('message2').on("value", (data) => {
                textVar2 = data.val();
            })
            fill("white");
            textSize(20);
            textStyle(BOLD);
            textFont("georgia");
            textAlign(CENTER);
            text(textVar,500,250); 
            text(textVar2,500,275);
        }
    }
}