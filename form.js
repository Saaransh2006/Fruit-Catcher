class Form{
    constructor(){
       this.input = createInput("Name");
       this.button = createButton('Create/Join a Room');
       this.title = createElement('h2');
       this.reset = createButton('Reset');
    }
    hide() {
        this.button.hide();
        this.input.hide();
        this.title.hide();
    }
    display() {
        this.title.position(350, 50);
        this.title.style('font-size', '70px');
        this.title.style('color', 'skyblue');
        this.input.position(300,600);
        this.input.style('width', '200px');
        this.input.style('height', '20px');
        this.input.style('background', 'lavender');
        this.button.position(700,600);
        this.button.style('width', '200px');
        this.button.style('height', '40px');
        this.button.style('background', 'lightpink');
        this.reset.position(1000, 600);
        this.reset.style('width', '100px');
        this.reset.style('height', '30px');
        this.reset.style('background', 'lightpink');

        this.button.mousePressed(() => {
            stage = 1;
            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playerCount += 1;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);
            click.play();
            bgm.play();
            bgm.loop();
        });

        this.reset.mousePressed(() => {
            stage = 2;
            player.updateCount(0);
            game.update(0);
            click.play();
        });

    }
}