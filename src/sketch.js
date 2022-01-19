import {globalObj} from "./index";
import {createPlatforms} from "./game_assets/createPlatforms";
import {Enemy} from "./game_assets/enemy";
import {createCollectable} from "./game_assets/createCollectable";
import {createCanyon} from "./game_assets/createCanyon";
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
        //globalObj.jumpSound = p.loadSound('assets/jump.wav');
        //globalObj.coinSound = p.loadSound('assets/coin05.mp3');
        //globalObj.bgm = p.loadSound('assets/bgm.mp3');
        //globalObj.jumpSound.setVolume(0.2);
        //globalObj.coinSound.setVolume(0.2);
        //globalObj.bgm.setVolume(0.2);

        //globalObj.font = p.loadFont('assets/FredokaOne-Regular.ttf');
    }

    p.setup = () => {
        p.createCanvas(1024, 576);
        //globalObj.bgm.loop();
        globalObj.c1 = p.color(255);
        globalObj.c2 = p.color(136, 212, 255);

        globalObj.floorPos_y = p.height * 3 / 4;

        startGame();

        globalObj.lives = 3;

        //p.textFont(globalObj.font);

        globalObj.isPlummeting = false;
    }

    p.draw = () => {
        p.background(136, 211, 252); //fill the sky blue
        setGradient(0, 0, p.width, p.height, globalObj.c2, globalObj.c1);

        p.noStroke();
        p.fill(86, 183, 110);
        p.rect(0, globalObj.floorPos_y, p.width, p.height - globalObj.floorPos_y);
        p.fill(145, 103, 59);
        p.rect(0, globalObj.floorPos_y + 50, p.width, p.height - globalObj.floorPos_y);
        p.push();
        p.translate(globalObj.scrollPos, 0);

        // Draw clouds.
        clouds(p);

        // Draw mountains.
        mountains(p);

        // Draw trees.
        trees(p);

        // Draw canyons.
        for (let i = 0; i < globalObj.canyon.length; i++) {
            globalObj.canyon[i].draw();
            globalObj.canyon[i].check();
        }

        // Draw globalObj.collectable items.
        for (let i = 0; i < globalObj.collectable.length; i++) {
            if (globalObj.collectable[i].isFound === false) {
                globalObj.collectable[i].draw();
                globalObj.collectable[i].check();
            }
        }

        // Draw platforms.
        for (let i = 0; i < globalObj.platforms.length; i++) {
            globalObj.platforms[i].draw();
        }

        flagPole(p);

        // Draw enemies.
        for (let i = 0; i < globalObj.enemies.length; i++) {
            globalObj.enemies[i].draw();

            let isContact = globalObj.enemies[i].checkContact(globalObj.gameChar_world_x, globalObj.gameChar_y);

            if (isContact) {
                globalObj.lives -= 1;
                if (globalObj.lives > 0) {
                    startGame();
                    break;
                }
                if (globalObj.lives < 1) {
                    globalObj.reset = true;
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
        for (let i = 1; i < globalObj.lives + 1; i++) {
            heartLife(p, 85 + heart_x, 63, 20);
            heart_x += 25;
        }

        // Logic to make the game character move or the background scroll.
        if (globalObj.isLeft && !globalObj.reset && !globalObj.clear) {
            if (globalObj.gameChar_x > p.width * 0.2) {
                globalObj.gameChar_x -= 5;
            } else {
                globalObj.scrollPos += 5;
            }
        }

        if (globalObj.isRight && !globalObj.reset && !globalObj.clear) {
            if (globalObj.gameChar_x < p.width * 0.8) {
                globalObj.gameChar_x += 5;
            } else {
                globalObj.scrollPos -= 5; // negative for moving against the background
            }
        }

        // Logic to make the game character rise and fall.
        if (globalObj.gameChar_y < globalObj.floorPos_y) {
            let isContact = false;
            for (let i = 0; i < globalObj.platforms.length; i++) {
                if (globalObj.platforms[i].checkContact(globalObj.gameChar_world_x, globalObj.gameChar_y) === true) {
                    isContact = true;
                    break;
                }
            }
            if (isContact === false) {
                globalObj.gameChar_y += 2;
                globalObj.isFalling = true;
            }
        } else {
            globalObj.isFalling = false;
        }

        if (globalObj.isPlummeting) {
            globalObj.gameChar_y += 5;
        }

        if (globalObj.flagpole.isReached === false) {
            checkFlagpole();
        }

        if (globalObj.flagpole.isReached) {
            p.fill(255, 196, 44);
            p.push();
            p.textSize(50);
            p.stroke(255);
            p.strokeWeight(8);
            p.text("LEVEL COMPLETE!", p.width / 8, p.height / 2);
            p.text("Press space to continue.", p.width / 8, p.height / 2 + 50);
            p.pop();
            globalObj.clear = true;
            return;
        }

        // Update real position of gameChar for collision detection.
        globalObj.gameChar_world_x = globalObj.gameChar_x - globalObj.scrollPos;
    }

    p.keyPressed = () => {

        if (p.keyCode === 37) {
            globalObj.isLeft = true;
        } else if (p.keyCode === 39) {
            globalObj.isRight = true;
        }

        if (p.keyCode === 32 && globalObj.gameChar_y === globalObj.floorPos_y && !globalObj.reset && !globalObj.clear) {
            globalObj.gameChar_y -= 100;
            //globalObj.jumpSound.play();
        }

        if (p.keyCode === 32 && globalObj.reset || p.keyCode === 32 && globalObj.clear) {
            globalObj.lives = 3;
            startGame();
        }

    }

    p.keyReleased = () => {

        if (p.keyCode === 37) {
            globalObj.isLeft = false;
        } else if (p.keyCode === 39) {
            globalObj.isRight = false;
        }

    }

    function checkFlagpole() {
        let d = p.abs(globalObj.gameChar_world_x - globalObj.flagpole.x_pos);
        if (d < 15) {
            globalObj.flagpole.isReached = true;
        }
    }

    function checkPlayerDie() {
        if (globalObj.gameChar_y > p.height) {
            globalObj.lives -= 1;
            if (globalObj.lives > 0) {
                startGame();
            }
            if (globalObj.lives < 1) {
                globalObj.reset = true;
                globalObj.lives = 0;
            }
        }

        if (globalObj.reset) {
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
        globalObj.gameChar_x = 80;
        globalObj.gameChar_y = globalObj.floorPos_y;

        // letiable to control the background scrolling.
        globalObj.scrollPos = 0;

        // letiable to store the real position of the gameChar in the game
        // world. Needed for collision detection.
        globalObj.gameChar_world_x = globalObj.gameChar_x - globalObj.scrollPos;

        // Boolean letiables to control the movement of the game character.
        globalObj.isLeft = false;
        globalObj.isRight = false;
        globalObj.isFalling = false;
        globalObj.isPlummeting = false;

        // Initialise arrays of scenery objects.
        globalObj.trees = [{x_pos: 100, width: 40}, {x_pos: 430, width: 40}, {x_pos: 580, width: 40}, {
            x_pos: 730,
            width: 40
        }, {x_pos: 940, width: 40}, {x_pos: 1110, width: 40}, {x_pos: 1380, width: 40}, {
            x_pos: 1600,
            width: 40
        }, {x_pos: 1760, width: 40}, {x_pos: 1930, width: 40}, {x_pos: 2100, width: 40}, {
            x_pos: 2250,
            width: 40
        }, {x_pos: 2400, width: 40}, {x_pos: 2600, width: 40}, {x_pos: 2750, width: 40}, {x_pos: 2900, width: 40}];

        globalObj.clouds = [{x_pos: 400, y_pos: 100, size: 80}, {x_pos: 700, y_pos: 150, size: 80}, {
            x_pos: 950,
            y_pos: 100,
            size: 80
        }, {x_pos: 1300, y_pos: 80, size: 80}, {x_pos: 1800, y_pos: 110, size: 80}, {
            x_pos: 2000,
            y_pos: 100,
            size: 80
        }, {x_pos: 2300, y_pos: 80, size: 80}, {x_pos: 2600, y_pos: 120, size: 80}];

        globalObj.mountains = [{
            x_pos: 200,
            y_pos: 400
        }, {x_pos: 700}, {x_pos: 1200}, {x_pos: 1900}, {x_pos: 2000}, {x_pos: 2500}, {x_pos: 3000}, {x_pos: 3300}, {x_pos: 3600}];

        globalObj.platforms = [];
        globalObj.platforms.push(createPlatforms(p, 500, globalObj.floorPos_y - 100, 200));
        globalObj.platforms.push(createPlatforms(p, 900, globalObj.floorPos_y - 100, 150));
        globalObj.platforms.push(createPlatforms(p, 1300, globalObj.floorPos_y - 100, 200));
        globalObj.platforms.push(createPlatforms(p, 1400, globalObj.floorPos_y - 100, 200));

        globalObj.enemies = [];
        globalObj.enemies.push(new Enemy(p, 530, globalObj.floorPos_y - 60, 200));
        globalObj.enemies.push(new Enemy(p, 1400, globalObj.floorPos_y - 60, 100));
        globalObj.enemies.push(new Enemy(p, 2800, globalObj.floorPos_y - 60, 200));
        globalObj.enemies.push(new Enemy(p, 3200, globalObj.floorPos_y - 60, 200));


        globalObj.collectable = [];
        globalObj.collectable.push(createCollectable(p, 500, 410, false));
        globalObj.collectable.push(createCollectable(p, 600, 310, false));
        globalObj.collectable.push(createCollectable(p, 900, 310, false));
        globalObj.collectable.push(createCollectable(p, 950, 310, false));
        globalObj.collectable.push(createCollectable(p, 1000, 310, false));
        globalObj.collectable.push(createCollectable(p, 1100, 310, false));
        globalObj.collectable.push(createCollectable(p, 1200, 310, false));
        globalObj.collectable.push(createCollectable(p, 1500, 310, false));
        globalObj.collectable.push(createCollectable(p, 1600, 310, false));
        globalObj.collectable.push(createCollectable(p, 1800, 410, false));
        globalObj.collectable.push(createCollectable(p, 2000, 410, false));
        globalObj.collectable.push(createCollectable(p, 2100, 410, false));
        globalObj.collectable.push(createCollectable(p, 2200, 410, false));
        globalObj.collectable.push(createCollectable(p, 2500, 410, false));
        globalObj.collectable.push(createCollectable(p, 3100, 410, false));
        globalObj.collectable.push(createCollectable(p, 3400, 410, false));
        globalObj.collectable.push(createCollectable(p, 3500, 410, false));

        globalObj.canyon = [];
        globalObj.canyon.push(createCanyon(p, 300, 100));
        globalObj.canyon.push(createCanyon(p, 800, 100));
        globalObj.canyon.push(createCanyon(p, 1200, 100));
        globalObj.canyon.push(createCanyon(p, 1500, 100));
        globalObj.canyon.push(createCanyon(p, 2000, 100));
        globalObj.canyon.push(createCanyon(p, 2500, 100));

        globalObj.game_score = 0;

        globalObj.flagpole = {isReached: false, x_pos: 3800};

        globalObj.reset = false;

        globalObj.clear = false;

        return globalObj;
    }

}