import {gameObj} from "./index";
import {platforms} from "./game_assets/platforms";
import {Enemy} from "./game_assets/enemy";
import {collectable} from "./game_assets/collectable";
import {canyon} from "./game_assets/canyon";
import {clouds} from "./game_assets/clouds";
import {character} from "./game_assets/character";
import {mountains} from "./game_assets/mountains";
import {trees} from "./game_assets/trees";
import {scoreBoard} from "./game_assets/scoreBoard";
import {heartLife} from "./game_assets/heartLife";
import {flagPole} from "./game_assets/flagPole";

export const sketch = (p) => {

    p.preload = () => {
        //p.soundFormats('mp3', 'wav');

        //load your sounds here
        //gameObj.jumpSound = p.loadSound('assets/jump.wav');
        //gameObj.coinSound = p.loadSound('assets/coin05.mp3');
        //gameObj.bgm = p.loadSound('assets/bgm.mp3');
        //gameObj.jumpSound.setVolume(0.2);
        //gameObj.coinSound.setVolume(0.2);
        //gameObj.bgm.setVolume(0.2);

        //gameObj.font = p.loadFont('assets/FredokaOne-Regular.ttf');
    }

    p.setup = () => {
        p.createCanvas(1024, 576);
        //gameObj.bgm.loop();
        gameObj.c1 = p.color(255);
        gameObj.c2 = p.color(136, 212, 255);

        gameObj.floorPos_y = p.height * 3 / 4;

        startGame();

        gameObj.lives = 3;

        //p.textFont(gameObj.font);

        gameObj.isPlummeting = false;
    }

    p.draw = () => {
        p.background(136, 211, 252); //fill the sky blue
        setGradient(0, 0, p.width, p.height, gameObj.c2, gameObj.c1);

        p.noStroke();
        p.fill(86, 183, 110);
        p.rect(0, gameObj.floorPos_y, p.width, p.height - gameObj.floorPos_y);
        p.fill(145, 103, 59);
        p.rect(0, gameObj.floorPos_y + 50, p.width, p.height - gameObj.floorPos_y);
        p.push();
        p.translate(gameObj.scrollPos, 0);

        // Draw clouds.
        clouds(p);

        // Draw mountains.
        mountains(p);

        // Draw trees.
        trees(p);

        // Draw canyons.
        for (let i = 0; i < gameObj.canyon.length; i++) {
            gameObj.canyon[i].draw();
            gameObj.canyon[i].check();
        }

        // Draw gameObj.collectable items.
        for (let i = 0; i < gameObj.collectable.length; i++) {
            if (gameObj.collectable[i].isFound === false) {
                gameObj.collectable[i].draw();
                gameObj.collectable[i].check();
            }
        }

        // Draw platforms.
        for (let i = 0; i < gameObj.platforms.length; i++) {
            gameObj.platforms[i].draw();
        }

        flagPole(p);

        // Draw enemies.
        for (let i = 0; i < gameObj.enemies.length; i++) {
            gameObj.enemies[i].draw();

            let isContact = gameObj.enemies[i].checkContact(gameObj.gameChar_world_x, gameObj.gameChar_y);

            if (isContact) {
                gameObj.lives -= 1;
                if (gameObj.lives > 0) {
                    startGame();
                    break;
                }
                if (gameObj.lives < 1) {
                    gameObj.reset = true;
                }
            }
        }


        p.pop();

        checkPlayerDie();

        // Draw game character.
        character(p);

        // Draw Score Board.
        scoreBoard(p);

        // Draw Heart.
        let heart_x = 0;
        for (let i = 1; i < gameObj.lives + 1; i++) {
            heartLife(p, 85 + heart_x, 63, 20);
            heart_x += 25;
        }

        // Logic to make the game character move or the background scroll.
        if (gameObj.isLeft && !gameObj.reset && !gameObj.clear) {
            if (gameObj.gameChar_x > p.width * 0.2) {
                gameObj.gameChar_x -= 5;
            } else {
                gameObj.scrollPos += 5;
            }
        }

        if (gameObj.isRight && !gameObj.reset && !gameObj.clear) {
            if (gameObj.gameChar_x < p.width * 0.8) {
                gameObj.gameChar_x += 5;
            } else {
                gameObj.scrollPos -= 5; // negative for moving against the background
            }
        }

        // Logic to make the game character rise and fall.
        if (gameObj.gameChar_y < gameObj.floorPos_y) {
            let isContact = false;
            for (let i = 0; i < gameObj.platforms.length; i++) {
                if (gameObj.platforms[i].checkContact(gameObj.gameChar_world_x, gameObj.gameChar_y) === true) {
                    isContact = true;
                    break;
                }
            }
            if (isContact === false) {
                gameObj.gameChar_y += 2;
                gameObj.isFalling = true;
            }
        } else {
            gameObj.isFalling = false;
        }

        if (gameObj.isPlummeting) {
            gameObj.gameChar_y += 5;
        }

        if (gameObj.flagpole.isReached === false) {
            checkFlagpole();
        }

        if (gameObj.flagpole.isReached) {
            p.fill(255, 196, 44);
            p.push();
            p.textSize(50);
            p.stroke(255);
            p.strokeWeight(8);
            p.text("LEVEL COMPLETE!", p.width / 8, p.height / 2);
            p.text("Press space to continue.", p.width / 8, p.height / 2 + 50);
            p.pop();
            gameObj.clear = true;
            return;
        }

        // Update real position of gameChar for collision detection.
        gameObj.gameChar_world_x = gameObj.gameChar_x - gameObj.scrollPos;
    }

    p.keyPressed = () => {

        if (p.keyCode === 37) {
            gameObj.isLeft = true;
        } else if (p.keyCode === 39) {
            gameObj.isRight = true;
        }

        if (p.keyCode === 32 && gameObj.gameChar_y === gameObj.floorPos_y && !gameObj.reset && !gameObj.clear) {
            gameObj.gameChar_y -= 100;
            //gameObj.jumpSound.play();
        }

        if (p.keyCode === 32 && gameObj.reset || p.keyCode === 32 && gameObj.clear) {
            gameObj.lives = 3;
            startGame();
        }

    }

    p.keyReleased = () => {

        if (p.keyCode === 37) {
            gameObj.isLeft = false;
        } else if (p.keyCode === 39) {
            gameObj.isRight = false;
        }

    }

    function checkFlagpole() {
        let d = p.abs(gameObj.gameChar_world_x - gameObj.flagpole.x_pos);
        if (d < 15) {
            gameObj.flagpole.isReached = true;
        }
    }

    function checkPlayerDie() {
        if (gameObj.gameChar_y > p.height) {
            gameObj.lives -= 1;
            if (gameObj.lives > 0) {
                startGame();
            }
            if (gameObj.lives < 1) {
                gameObj.reset = true;
                gameObj.lives = 0;
            }
        }

        if (gameObj.reset) {
            p.push();
            p.fill(255);
            p.textSize(50);
            p.stroke(123, 89, 52);
            p.strokeWeight(8);
            p.text("GAME OVER...", p.width / 8, p.height / 2);
            p.text("Press space to continue.", p.width / 8, p.height / 2 + 50);
            p.pop();
        }
    }

    function setGradient(x, y, w, h, c1, c2) {
        p.noFill();

        // Left to right gradient
        for (let i = y; i <= y + h; i++) {
            let inter = p.map(i, y, y + h, 0, 1);
            let c = p.lerpColor(c1, c2, inter);
            p.stroke(c);
            p.line(x, i, x + w, i);
        }
    }

    function startGame() {
        gameObj.gameChar_x = 80;
        gameObj.gameChar_y = gameObj.floorPos_y;

        // letiable to control the background scrolling.
        gameObj.scrollPos = 0;

        // letiable to store the real position of the gameChar in the game
        // world. Needed for collision detection.
        gameObj.gameChar_world_x = gameObj.gameChar_x - gameObj.scrollPos;

        // Boolean letiables to control the movement of the game character.
        gameObj.isLeft = false;
        gameObj.isRight = false;
        gameObj.isFalling = false;
        gameObj.isPlummeting = false;

        // Initialise arrays of scenery objects.
        gameObj.trees = [{x_pos: 100, width: 40}, {x_pos: 430, width: 40}, {x_pos: 580, width: 40}, {
            x_pos: 730,
            width: 40
        }, {x_pos: 940, width: 40}, {x_pos: 1110, width: 40}, {x_pos: 1380, width: 40}, {
            x_pos: 1600,
            width: 40
        }, {x_pos: 1760, width: 40}, {x_pos: 1930, width: 40}, {x_pos: 2100, width: 40}, {
            x_pos: 2250,
            width: 40
        }, {x_pos: 2400, width: 40}, {x_pos: 2600, width: 40}, {x_pos: 2750, width: 40}, {x_pos: 2900, width: 40}];

        gameObj.clouds = [{x_pos: 400, y_pos: 100, size: 80}, {x_pos: 700, y_pos: 150, size: 80}, {
            x_pos: 950,
            y_pos: 100,
            size: 80
        }, {x_pos: 1300, y_pos: 80, size: 80}, {x_pos: 1800, y_pos: 110, size: 80}, {
            x_pos: 2000,
            y_pos: 100,
            size: 80
        }, {x_pos: 2300, y_pos: 80, size: 80}, {x_pos: 2600, y_pos: 120, size: 80}];

        gameObj.mountains = [{
            x_pos: 200,
            y_pos: 400
        }, {x_pos: 700}, {x_pos: 1200}, {x_pos: 1900}, {x_pos: 2000}, {x_pos: 2500}, {x_pos: 3000}, {x_pos: 3300}, {x_pos: 3600}];

        gameObj.platforms = [];
        gameObj.platforms.push(platforms(p, 500, gameObj.floorPos_y - 100, 200));
        gameObj.platforms.push(platforms(p, 900, gameObj.floorPos_y - 100, 150));
        gameObj.platforms.push(platforms(p, 1300, gameObj.floorPos_y - 100, 200));
        gameObj.platforms.push(platforms(p, 1400, gameObj.floorPos_y - 100, 200));

        gameObj.enemies = [];
        gameObj.enemies.push(new Enemy(p, 530, gameObj.floorPos_y - 60, 200));
        gameObj.enemies.push(new Enemy(p, 1400, gameObj.floorPos_y - 60, 100));
        gameObj.enemies.push(new Enemy(p, 2800, gameObj.floorPos_y - 60, 200));
        gameObj.enemies.push(new Enemy(p, 3200, gameObj.floorPos_y - 60, 200));


        gameObj.collectable = [];
        gameObj.collectable.push(collectable(p, 500, 410, false));
        gameObj.collectable.push(collectable(p, 600, 310, false));
        gameObj.collectable.push(collectable(p, 900, 310, false));
        gameObj.collectable.push(collectable(p, 950, 310, false));
        gameObj.collectable.push(collectable(p, 1000, 310, false));
        gameObj.collectable.push(collectable(p, 1100, 310, false));
        gameObj.collectable.push(collectable(p, 1200, 310, false));
        gameObj.collectable.push(collectable(p, 1500, 310, false));
        gameObj.collectable.push(collectable(p, 1600, 310, false));
        gameObj.collectable.push(collectable(p, 1800, 410, false));
        gameObj.collectable.push(collectable(p, 2000, 410, false));
        gameObj.collectable.push(collectable(p, 2100, 410, false));
        gameObj.collectable.push(collectable(p, 2200, 410, false));
        gameObj.collectable.push(collectable(p, 2500, 410, false));
        gameObj.collectable.push(collectable(p, 3100, 410, false));
        gameObj.collectable.push(collectable(p, 3400, 410, false));
        gameObj.collectable.push(collectable(p, 3500, 410, false));

        gameObj.canyon = [];
        gameObj.canyon.push(canyon(p, 300, 100));
        gameObj.canyon.push(canyon(p, 800, 100));
        gameObj.canyon.push(canyon(p, 1200, 100));
        gameObj.canyon.push(canyon(p, 1500, 100));
        gameObj.canyon.push(canyon(p, 2000, 100));
        gameObj.canyon.push(canyon(p, 2500, 100));

        gameObj.game_score = 0;

        gameObj.flagpole = {isReached: false, x_pos: 3800};

        gameObj.reset = false;

        gameObj.clear = false;

        return gameObj;
    }

}