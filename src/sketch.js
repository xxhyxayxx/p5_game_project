export const sketch = (p) => {
    const globalObj = {};

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
        drewCloud();

        // Draw mountains.
        drewMountains();

        // Draw trees.
        drawTrees();

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

        renderFlagpole();

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
        drawGameChar();

        // Draw Score Board.
        drawScoreBoard();

        // Draw Heart.
        let heart_x = 0;
        for (let i = 1; i < globalObj.lives + 1; i++) {
            drawHeart(85 + heart_x, 63, 20);
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

    function drawGameChar() {
        // draw game character
        if (globalObj.isLeft && globalObj.isFalling) {
            // add your jumping-left code
            p.fill(255, 255, 255)
            p.ellipse(globalObj.gameChar_x, globalObj.gameChar_y - 57, 30, 30);
            p.rect(globalObj.gameChar_x - 15, globalObj.gameChar_y - 57, 30, 48);
            p.push();
            p.translate(globalObj.gameChar_x, globalObj.gameChar_y);
            p.rotate(p.PI / -3);
            p.ellipse(23, -30, 6, 15);
            p.pop();
            p.fill(255, 196, 44);
            p.ellipse(globalObj.gameChar_x - 10, globalObj.gameChar_y - 2, 8, 10);
            p.ellipse(globalObj.gameChar_x - 15, globalObj.gameChar_y - 49, 10, 8);
            p.fill(255, 221, 182);
            p.rect(globalObj.gameChar_x - 12, globalObj.gameChar_y - 10, 4, 8);
            p.fill(255, 255, 255);
            p.stroke(0);
            p.line(globalObj.gameChar_x - 20, globalObj.gameChar_y - 49, globalObj.gameChar_x - 10, globalObj.gameChar_y - 49);
            p.ellipse(globalObj.gameChar_x - 8, globalObj.gameChar_y - 57, 7, 7);
            p.fill(0);
            p.ellipse(globalObj.gameChar_x - 8, globalObj.gameChar_y - 57, 1, 1);
        } else if (globalObj.isRight && globalObj.isFalling) {
            // add your jumping-right code
            p.fill(255, 255, 255)
            p.ellipse(globalObj.gameChar_x, globalObj.gameChar_y - 57, 30, 30);
            p.rect(globalObj.gameChar_x - 15, globalObj.gameChar_y - 57, 30, 48);
            p.push();
            p.translate(globalObj.gameChar_x, globalObj.gameChar_y);
            p.rotate(p.PI / 3);
            p.ellipse(-23, -30, 6, 15);
            p.pop();
            p.fill(255, 196, 44);
            p.ellipse(globalObj.gameChar_x + 10, globalObj.gameChar_y - 2, 8, 10);
            p.ellipse(globalObj.gameChar_x + 15, globalObj.gameChar_y - 49, 10, 8);
            p.fill(255, 221, 182);
            p.rect(globalObj.gameChar_x + 8, globalObj.gameChar_y - 10, 4, 8);
            p.fill(255, 255, 255);
            p.stroke(0);
            p.line(globalObj.gameChar_x + 20, globalObj.gameChar_y - 49, globalObj.gameChar_x + 10, globalObj.gameChar_y - 49);
            p.ellipse(globalObj.gameChar_x + 8, globalObj.gameChar_y - 57, 7, 7);
            p.fill(0);
            p.ellipse(globalObj.gameChar_x + 8, globalObj.gameChar_y - 57, 1, 1);
        } else if (globalObj.isLeft) {
            // add your walking left code
            p.fill(255, 255, 255)
            p.ellipse(globalObj.gameChar_x, globalObj.gameChar_y - 45, 30, 30);
            p.rect(globalObj.gameChar_x - 15, globalObj.gameChar_y - 45, 30, 48);
            p.push();
            p.translate(globalObj.gameChar_x, globalObj.gameChar_y);
            p.rotate(p.PI / 6);
            p.ellipse(-24, -15, 6, 15);
            p.pop();
            p.fill(255, 196, 44);
            p.arc(globalObj.gameChar_x - 10, globalObj.gameChar_y + 3, 10, 10, p.PI, p.TWO_PI);
            p.ellipse(globalObj.gameChar_x - 15, globalObj.gameChar_y - 37, 10, 8);
            p.fill(255, 255, 255);
            p.stroke(0);
            p.line(globalObj.gameChar_x - 20, globalObj.gameChar_y - 37, globalObj.gameChar_x - 10, globalObj.gameChar_y - 37);
            p.ellipse(globalObj.gameChar_x - 8, globalObj.gameChar_y - 45, 7, 7);
            p.fill(0);
            p.ellipse(globalObj.gameChar_x - 8, globalObj.gameChar_y - 45, 1, 1);

        } else if (globalObj.isRight) {
            // add your walking right code
            p.fill(255, 255, 255)
            p.ellipse(globalObj.gameChar_x, globalObj.gameChar_y - 45, 30, 30);
            p.rect(globalObj.gameChar_x - 15, globalObj.gameChar_y - 45, 30, 48);
            p.push();
            p.translate(globalObj.gameChar_x, globalObj.gameChar_y);
            p.rotate(p.PI / -6);
            p.ellipse(24, -15, 6, 15);
            p.pop();
            p.fill(255, 196, 44);
            p.arc(globalObj.gameChar_x + 10, globalObj.gameChar_y + 3, 10, 10, p.PI, p.TWO_PI);
            p.ellipse(globalObj.gameChar_x + 15, globalObj.gameChar_y - 37, 10, 8);
            p.fill(255, 255, 255);
            p.stroke(0);
            p.line(globalObj.gameChar_x + 20, globalObj.gameChar_y - 37, globalObj.gameChar_x + 10, globalObj.gameChar_y - 37);
            p.ellipse(globalObj.gameChar_x + 8, globalObj.gameChar_y - 45, 7, 7);
            p.fill(0);
            p.ellipse(globalObj.gameChar_x + 8, globalObj.gameChar_y - 45, 1, 1);

        } else if (globalObj.isFalling || globalObj.isPlummeting) {
            // add your jumping facing forwards code
            p.fill(255, 255, 255)
            p.ellipse(globalObj.gameChar_x, globalObj.gameChar_y - 57, 30, 30);
            p.rect(globalObj.gameChar_x - 15, globalObj.gameChar_y - 57, 30, 48);
            p.push();
            p.translate(globalObj.gameChar_x, globalObj.gameChar_y);
            p.rotate(p.PI / 3);
            p.ellipse(-28, -34, 6, 15);
            p.pop();
            p.push();
            p.translate(globalObj.gameChar_x, globalObj.gameChar_y);
            p.rotate(p.PI / -3);
            p.ellipse(28, -34, 6, 15);
            p.pop();
            p.fill(255, 196, 44);
            p.ellipse(globalObj.gameChar_x - 10, globalObj.gameChar_y - 2, 8, 10);
            p.ellipse(globalObj.gameChar_x + 10, globalObj.gameChar_y - 2, 8, 10);
            p.ellipse(globalObj.gameChar_x, globalObj.gameChar_y - 46, 20, 12);
            p.fill(255, 221, 182);
            p.rect(globalObj.gameChar_x + 8, globalObj.gameChar_y - 10, 4, 8);
            p.rect(globalObj.gameChar_x - 12, globalObj.gameChar_y - 10, 4, 8);
            p.fill(255, 255, 255);
            p.stroke(0);
            p.ellipse(globalObj.gameChar_x - 5, globalObj.gameChar_y - 57, 7, 7);
            p.ellipse(globalObj.gameChar_x + 6, globalObj.gameChar_y - 57, 7, 7);
            p.fill(0);
            p.ellipse(globalObj.gameChar_x - 5, globalObj.gameChar_y - 57, 1, 1);
            p.ellipse(globalObj.gameChar_x + 6, globalObj.gameChar_y - 57, 1, 1);
            p.ellipse(globalObj.gameChar_x, globalObj.gameChar_y - 46, 17, 4);
        } else {
            // add your standing front facing code
            p.fill(255, 255, 255)
            p.ellipse(globalObj.gameChar_x, globalObj.gameChar_y - 45, 30, 30);
            p.rect(globalObj.gameChar_x - 15, globalObj.gameChar_y - 45, 30, 48);
            p.push();
            p.translate(globalObj.gameChar_x, globalObj.gameChar_y);
            p.rotate(p.PI / 6);
            p.ellipse(-28, -15, 6, 15);
            p.pop();
            p.push();
            p.translate(globalObj.gameChar_x, globalObj.gameChar_y);
            p.rotate(p.PI / -6);
            p.ellipse(28, -15, 6, 15);
            p.pop();
            p.fill(255, 196, 44);
            p.arc(globalObj.gameChar_x - 10, globalObj.gameChar_y + 3, 10, 10, p.PI, p.TWO_PI);
            p.arc(globalObj.gameChar_x + 10, globalObj.gameChar_y + 3, 10, 10, p.PI, p.TWO_PI);
            p.ellipse(globalObj.gameChar_x, globalObj.gameChar_y - 35, 20, 8);
            p.fill(255, 255, 255);
            p.stroke(0);
            p.line(globalObj.gameChar_x - 9, globalObj.gameChar_y - 36, globalObj.gameChar_x + 9, globalObj.gameChar_y - 36);
            p.ellipse(globalObj.gameChar_x - 5, globalObj.gameChar_y - 45, 7, 7);
            p.ellipse(globalObj.gameChar_x + 6, globalObj.gameChar_y - 45, 7, 7);
            p.fill(0);
            p.ellipse(globalObj.gameChar_x - 5, globalObj.gameChar_y - 45, 1, 1);
            p.ellipse(globalObj.gameChar_x + 6, globalObj.gameChar_y - 45, 1, 1);

        }
    }

    function drewCloud() {
        for (let i = 0; i < globalObj.clouds.length; i++) {
            p.fill(255, 255, 255);
            p.ellipse(globalObj.clouds[i].x_pos, globalObj.clouds[i].y_pos, globalObj.clouds[i].size, globalObj.clouds[i].size);
            p.ellipse(globalObj.clouds[i].x_pos - 40, globalObj.clouds[i].y_pos, globalObj.clouds[i].size - 20, globalObj.clouds[i].size - 20);
            p.ellipse(globalObj.clouds[i].x_pos + 40, globalObj.clouds[i].y_pos, globalObj.clouds[i].size - 20, globalObj.clouds[i].size - 20);
        }
    }

    function drewMountains() {
        for (let i = 0; i < globalObj.mountains.length; i++) {
            p.fill(147, 212, 205);
            p.triangle(globalObj.mountains[i].x_pos, globalObj.floorPos_y, globalObj.mountains[i].x_pos - 260, globalObj.floorPos_y, globalObj.mountains[i].x_pos - 140, 140);
            p.fill(133, 206, 199);
            p.triangle(globalObj.mountains[i].x_pos - 150, globalObj.floorPos_y, globalObj.mountains[i].x_pos - 290, globalObj.floorPos_y, globalObj.mountains[i].x_pos - 220, 200);
        }
    }

    function drawTrees() {
        for (let i = 0; i < globalObj.trees.length; i++) {
            p.fill(123, 89, 52);
            p.rect(globalObj.trees[i].x_pos, globalObj.floorPos_y - 50, globalObj.trees[i].width, 50);
            //branches
            p.fill(61, 142, 103);
            p.ellipse(globalObj.trees[i].x_pos + 20, globalObj.floorPos_y - 130, 100, 120);
            p.ellipse(globalObj.trees[i].x_pos + 20, globalObj.floorPos_y - 100, 140, 120);
            p.fill(75, 178, 129);
            p.ellipse(globalObj.trees[i].x_pos + 15, globalObj.floorPos_y - 135, 95, 115);
            p.ellipse(globalObj.trees[i].x_pos + 15, globalObj.floorPos_y - 105, 135, 115);
        }
    }

    function createCanyon(x, width) {
        let ca = {
            x: x,
            width: width,
            draw: function () {
                p.fill(224, 244, 255);
                p.rect(this.x, globalObj.floorPos_y, this.width, 150);
            },
            check: function () {
                if (globalObj.gameChar_world_x < (this.x + this.width) && globalObj.gameChar_world_x > this.x && globalObj.gameChar_y >= globalObj.floorPos_y) {
                    globalObj.isPlummeting = true;
                }
                if (globalObj.isPlummeting === true) {
                    globalObj.gameChar_y += 1;
                }
            }
        }

        return ca;
    }

    function createCollectable(x, y, isFound) {
        let c = {
            x: x,
            y: y,
            size: 50,
            isFound: isFound,
            draw: function () {
                p.fill(214, 173, 1);
                p.ellipse(this.x + 5, this.y, this.size - 10, this.size);
                p.fill(242, 210, 48);
                p.ellipse(this.x, this.y, this.size - 10, this.size);
                p.fill(209, 174, 0);
                p.ellipse(this.x, this.y, this.size - 20, this.size - 10);
                p.fill(242, 210, 48);
                p.ellipse(this.x + 1, this.y + 1, this.size - 21, this.size - 12);
                p.fill(209, 174, 0);
                p.rect(this.x - 4, this.y - 12, 8, 25);
                p.fill(229, 183, 1);
                p.rect(this.x - 2, this.y - 10, 6, 23);
            },
            check: function () {
                if (p.dist(globalObj.gameChar_world_x, globalObj.gameChar_y, this.x, this.y) < this.size) {
                    this.isFound = true;
                    globalObj.game_score += 1;
                    //globalObj.coinSound.play();
                }
            }
        }

        return c;
    }

    function renderFlagpole() {
        p.push();
        p.strokeWeight(5);
        p.stroke(100);
        p.line(globalObj.flagpole.x_pos, globalObj.floorPos_y, globalObj.flagpole.x_pos, globalObj.floorPos_y - 300);
        p.fill(255);
        p.noStroke();
        if (globalObj.flagpole.isReached) {
            p.rect(globalObj.flagpole.x_pos, globalObj.floorPos_y - 300, 70, 55);
            p.fill(255);
            p.stroke(0);
            p.strokeWeight(1);
            p.ellipse(globalObj.flagpole.x_pos + 23, globalObj.floorPos_y - 280, 15);
            p.ellipse(globalObj.flagpole.x_pos + 48, globalObj.floorPos_y - 280, 15);
            p.noStroke();
            p.fill(0);
            p.ellipse(globalObj.flagpole.x_pos + 23, globalObj.floorPos_y - 280, 5);
            p.ellipse(globalObj.flagpole.x_pos + 48, globalObj.floorPos_y - 280, 5);
            p.fill(255, 196, 44);
            p.ellipse(globalObj.flagpole.x_pos + 35, globalObj.floorPos_y - 262, 38, 12);
            p.stroke(0);
            p.strokeWeight(1);
            p.line(globalObj.flagpole.x_pos + 16, globalObj.floorPos_y - 262, globalObj.flagpole.x_pos + 53, globalObj.floorPos_y - 262);
        } else {
            p.rect(globalObj.flagpole.x_pos, globalObj.floorPos_y - 50, 70, 50);
            p.fill(255);
            p.stroke(0);
            p.strokeWeight(1);
            p.ellipse(globalObj.flagpole.x_pos + 23, globalObj.floorPos_y - 30, 15);
            p.ellipse(globalObj.flagpole.x_pos + 48, globalObj.floorPos_y - 30, 15);
            p.noStroke();
            p.fill(0);
            p.ellipse(globalObj.flagpole.x_pos + 23, globalObj.floorPos_y - 30, 5);
            p.ellipse(globalObj.flagpole.x_pos + 48, globalObj.floorPos_y - 30, 5);
            p.fill(255, 196, 44);
            p.ellipse(globalObj.flagpole.x_pos + 35, globalObj.floorPos_y - 12, 38, 12);
            p.stroke(0);
            p.strokeWeight(1);
            p.line(globalObj.flagpole.x_pos + 16, globalObj.floorPos_y - 12, globalObj.flagpole.x_pos + 53, globalObj.floorPos_y - 12);
        }
        p.pop();
    }

    function checkFlagpole() {
        let d = p.abs(globalObj.gameChar_world_x - globalObj.flagpole.x_pos);
        if (d < 15) {
            globalObj.flagpole.isReached = true;
        }
    }

    function createPlatforms(x, y, length) {
        let p = {
            x: x,
            y: y,
            length: length,
            draw: function (p) {
                //p.fill(181, 129, 74);
                //p.rect(this.x, this.y, this.length, 20);
            },
            checkContact: function (gc_x, gc_y) {
                if (gc_x > this.x && gc_x < this.x + this.length) {
                    let d = this.y - gc_y;
                    if (d >= 0 && d < 5) {
                        return true;
                    }
                }

                return false;
            }
        }

        return p;
    }

    function Enemy(x, y, range) {
        this.x = x;
        this.y = y;
        this.range = range;

        this.currentX = x;
        this.inc = 1;

        this.update = function () {
            this.currentX += this.inc;

            if (this.currentX >= this.x + this.range) {
                this.inc = -1;
            } else if (this.currentX < this.x) {
                this.inc = 1;
            }
        }

        this.draw = function () {
            this.update();
            p.noStroke();
            p.fill(135)
            p.rect(this.currentX, this.y, 50, 50, 8);
            p.fill(180)
            p.triangle(this.currentX + 5, this.y, this.currentX + 10, this.y - 10, this.currentX + 15, this.y);
            p.triangle(this.currentX + 15, this.y, this.currentX + 20, this.y - 10, this.currentX + 25, this.y);
            p.triangle(this.currentX + 25, this.y, this.currentX + 30, this.y - 10, this.currentX + 35, this.y);
            p.triangle(this.currentX + 35, this.y, this.currentX + 40, this.y - 10, this.currentX + 45, this.y);

            p.triangle(this.currentX + 50, this.y + 5, this.currentX + 60, this.y + 10, this.currentX + 50, this.y + 15);
            p.triangle(this.currentX + 50, this.y + 15, this.currentX + 60, this.y + 20, this.currentX + 50, this.y + 25);
            p.triangle(this.currentX + 50, this.y + 25, this.currentX + 60, this.y + 30, this.currentX + 50, this.y + 35);
            p.triangle(this.currentX + 50, this.y + 35, this.currentX + 60, this.y + 40, this.currentX + 50, this.y + 45);

            p.triangle(this.currentX + 5, this.y + 50, this.currentX + 10, this.y + 60, this.currentX + 15, this.y + 50);
            p.triangle(this.currentX + 15, this.y + 50, this.currentX + 20, this.y + 60, this.currentX + 25, this.y + 50);
            p.triangle(this.currentX + 25, this.y + 50, this.currentX + 30, this.y + 60, this.currentX + 35, this.y + 50);
            p.triangle(this.currentX + 35, this.y + 50, this.currentX + 40, this.y + 60, this.currentX + 45, this.y + 50);

            p.triangle(this.currentX + 50, this.y + 5, this.currentX + 60, this.y + 10, this.currentX + 50, this.y + 15);
            p.triangle(this.currentX + 50, this.y + 15, this.currentX + 60, this.y + 20, this.currentX + 50, this.y + 25);
            p.triangle(this.currentX + 50, this.y + 25, this.currentX + 60, this.y + 30, this.currentX + 50, this.y + 35);
            p.triangle(this.currentX + 50, this.y + 35, this.currentX + 60, this.y + 40, this.currentX + 50, this.y + 45);

            p.triangle(this.currentX, this.y + 5, this.currentX - 10, this.y + 10, this.currentX, this.y + 15);
            p.triangle(this.currentX, this.y + 15, this.currentX - 10, this.y + 20, this.currentX, this.y + 25);
            p.triangle(this.currentX, this.y + 25, this.currentX - 10, this.y + 30, this.currentX, this.y + 35);
            p.triangle(this.currentX, this.y + 35, this.currentX - 10, this.y + 40, this.currentX, this.y + 45);

            p.fill(50);
            p.push();
            p.translate(this.currentX + 5, this.y + 15);
            p.rotate(p.PI / 6);
            p.rect(0, -8, 15, 5);
            p.rotate(p.PI / -3);
            p.rect(20, 12, 15, 5);
            p.pop();


            p.ellipse(this.currentX + 15, this.y + 20, 12);
            p.ellipse(this.currentX + 35, this.y + 20, 12);
            p.fill(255);
            p.ellipse(this.currentX + 17, this.y + 20, 8);
            p.ellipse(this.currentX + 33, this.y + 20, 8);
            p.fill(223, 48, 48);
            p.ellipse(this.currentX + 20, this.y + 21, 4, 6);
            p.ellipse(this.currentX + 30, this.y + 21, 4, 6);

            p.fill(50);
            p.rect(this.currentX + 12, this.y + 28, 25, 14);

            p.fill(255);
            p.rect(this.currentX + 13, this.y + 29, 5, 3);
            p.rect(this.currentX + 19, this.y + 29, 5, 3);
            p.rect(this.currentX + 25, this.y + 29, 5, 3);
            p.rect(this.currentX + 31, this.y + 29, 5, 3);

            p.rect(this.currentX + 13, this.y + 38, 5, 3);
            p.rect(this.currentX + 19, this.y + 38, 5, 3);
            p.rect(this.currentX + 25, this.y + 38, 5, 3);
            p.rect(this.currentX + 31, this.y + 38, 5, 3);
        }

        this.checkContact = function (gc_x, gc_y) {
            let d = p.dist(gc_x, gc_y, this.currentX, this.y + 40);
            if (d < 30) {
                return true;
            }

            return false;
        }
    }

    function drawScoreBoard() {
        p.fill(196, 158, 116);
        p.noStroke();
        p.beginShape();
        p.vertex(15, 23);
        p.vertex(170, 20);
        p.vertex(163, 105);
        p.vertex(15, 90);
        p.endShape();
        p.fill(249, 244, 240);
        p.beginShape();
        p.vertex(10, 30);
        p.vertex(160, 15);
        p.vertex(160, 95);
        p.vertex(23, 94);
        p.endShape();

        p.fill(111, 74, 45);
        p.noStroke();
        p.textStyle(p.BOLD);
        p.text("SCORE : " + globalObj.game_score, 30, 50);
        p.text("LIFE : ", 30, 75);
    }

    function drawHeart(x, y, size) {
        p.beginShape();
        p.vertex(x, y);
        p.fill(255, 117, 117)
        p.bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
        p.bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
        p.endShape(p.CLOSE);
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
        globalObj.platforms.push(createPlatforms(500, globalObj.floorPos_y - 100, 200));
        globalObj.platforms.push(createPlatforms(900, globalObj.floorPos_y - 100, 150));
        globalObj.platforms.push(createPlatforms(1300, globalObj.floorPos_y - 100, 200));
        globalObj.platforms.push(createPlatforms(1400, globalObj.floorPos_y - 100, 200));

        globalObj.enemies = [];
        globalObj.enemies.push(new Enemy(530, globalObj.floorPos_y - 60, 200));
        globalObj.enemies.push(new Enemy(1400, globalObj.floorPos_y - 60, 100));
        globalObj.enemies.push(new Enemy(2800, globalObj.floorPos_y - 60, 200));
        globalObj.enemies.push(new Enemy(3200, globalObj.floorPos_y - 60, 200));


        globalObj.collectable = [];
        globalObj.collectable.push(createCollectable(500, 410, false));
        globalObj.collectable.push(createCollectable(600, 310, false));
        globalObj.collectable.push(createCollectable(900, 310, false));
        globalObj.collectable.push(createCollectable(950, 310, false));
        globalObj.collectable.push(createCollectable(1000, 310, false));
        globalObj.collectable.push(createCollectable(1100, 310, false));
        globalObj.collectable.push(createCollectable(1200, 310, false));
        globalObj.collectable.push(createCollectable(1500, 310, false));
        globalObj.collectable.push(createCollectable(1600, 310, false));
        globalObj.collectable.push(createCollectable(1800, 410, false));
        globalObj.collectable.push(createCollectable(2000, 410, false));
        globalObj.collectable.push(createCollectable(2100, 410, false));
        globalObj.collectable.push(createCollectable(2200, 410, false));
        globalObj.collectable.push(createCollectable(2500, 410, false));
        globalObj.collectable.push(createCollectable(3100, 410, false));
        globalObj.collectable.push(createCollectable(3400, 410, false));
        globalObj.collectable.push(createCollectable(3500, 410, false));

        globalObj.canyon = [];
        globalObj.canyon.push(createCanyon(300, 100));
        globalObj.canyon.push(createCanyon(800, 100));
        globalObj.canyon.push(createCanyon(1200, 100));
        globalObj.canyon.push(createCanyon(1500, 100));
        globalObj.canyon.push(createCanyon(2000, 100));
        globalObj.canyon.push(createCanyon(2500, 100));

        globalObj.game_score = 0;

        globalObj.flagpole = {isReached: false, x_pos: 3800};

        globalObj.reset = false;

        globalObj.clear = false;
    }


}