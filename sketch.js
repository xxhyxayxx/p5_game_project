let gameChar_x;
let gameChar_y;
let floorPos_y;
let scrollPos;
let gameChar_world_x;

let isLeft;
let isRight;
let isFalling;
let isPlummeting = false;

let collectable;
let clouds;
let mountains;
let canyon;

let game_score;
let flagpole;

let lives;
let reset;
let clear;
let test;
let c1,c2;

let platforms;
let enemies;

let jumpSound,coinSound,bgm;

function preload()
{
    soundFormats('mp3','wav');

    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    coinSound = loadSound('assets/coin05.mp3');
    bgm = loadSound('assets/bgm.mp3');
    jumpSound.setVolume(0.2);
    coinSound.setVolume(0.2);
    bgm.setVolume(0.2);

    font = loadFont('assets/FredokaOne-Regular.ttf');
}


function setup()
{
    createCanvas(1024, 576);
    bgm.loop();
    c1 = color(255);
    c2 = color(136, 212, 255);

    floorPos_y = height * 3/4;

    startGame();

    lives = 3;

    textFont(font);

}

function draw()
{
    background(136, 211, 252); //fill the sky blue
    setGradient(0, 0, width, height, c2, c1);

    noStroke();
    fill(86, 183, 110);
    rect(0, floorPos_y, width, height - floorPos_y);
    fill(145,103,59);
    rect(0, floorPos_y + 50, width, height - floorPos_y);
    push();
    translate(scrollPos, 0);

    // Draw clouds.
    drewCloud();

    // Draw mountains.
    drewMountains();

    // Draw trees.
    drawTrees();

    // Draw canyons.
    for(let i = 0; i < canyon.length; i++){
        canyon[i].draw();
        canyon[i].check();
    }

    // Draw collectable items.
    for(let i = 0; i < collectable.length; i++){
        if(collectable[i].isFound === false) {
            collectable[i].draw();
            collectable[i].check();
        }
    }

    // Draw platforms.
    for(let i = 0; i < platforms.length; i++){
        platforms[i].draw();
    }

    renderFlagpole();

    // Draw enemies.
    for(let i = 0; i < enemies.length; i++){
        enemies[i].draw();

        let isContact = enemies[i].checkContact(gameChar_world_x, gameChar_y);

        if(isContact){
            lives -= 1;
            if(lives > 0){
                startGame();
                break;
            }
            if(lives < 1){
                reset = true;
            }
        }
    }



    pop();

    checkPlayerDie();

    // Draw game character.
    drawGameChar();

    // Draw Score Board.
    drawScoreBoard();

    // Draw Heart.
    let heart_x = 0;
    for(i = 1; i < lives + 1; i++){
        drawHeart(85+heart_x, 63, 20);
        heart_x += 25;
    }

    // Logic to make the game character move or the background scroll.
    if(isLeft && !reset && !clear)
    {
        if(gameChar_x > width * 0.2)
        {
            gameChar_x -= 5;
        }
        else
        {
            scrollPos += 5;
        }
    }

    if(isRight && !reset && !clear)
    {
        if(gameChar_x < width * 0.8)
        {
            gameChar_x  += 5;
        }
        else
        {
            scrollPos -= 5; // negative for moving against the background
        }
    }

    // Logic to make the game character rise and fall.
    if(gameChar_y < floorPos_y){
        let isContact = false;
        for(let i = 0; i < platforms.length; i++){
            if(platforms[i].checkContact(gameChar_world_x, gameChar_y) === true){
                isContact = true;
                break;
            }
        }
        if(isContact === false){
            gameChar_y += 2;
            isFalling = true;
        }
    }else{
        isFalling = false;
    }

    if(isPlummeting){
        gameChar_y += 5;
    }

    if(flagpole.isReached === false){
        checkFlagpole();
    }

    if(flagpole.isReached){
        fill(255, 196, 44);
        push();
        textSize(50);
        stroke(255);
        strokeWeight(8);
        text("LEVEL COMPLETE!", width/8, height/2);
        text("Press space to continue.", width/8, height/2 + 50);
        pop();
        clear = true;
        return;
    }

    // Update real position of gameChar for collision detection.
    gameChar_world_x = gameChar_x - scrollPos;
}



// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

    if(keyCode === 37){
        isLeft = true;
    }else if(keyCode === 39){
        isRight = true;
    }

    if(keyCode === 32 && gameChar_y === floorPos_y && !reset && !clear){
        gameChar_y -= 100;
        jumpSound.play();
    }

    if(keyCode === 32 && reset || keyCode === 32 && clear){
        lives = 3;
        startGame();
    }

}

function keyReleased()
{

    if(keyCode === 37){
        isLeft = false;
    }else if(keyCode === 39){
        isRight = false;
    }

}

// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
    // draw game character
    if(isLeft && isFalling)
    {
        // add your jumping-left code
        fill(255, 255, 255)
        ellipse(gameChar_x, gameChar_y - 57, 30, 30);
        rect(gameChar_x - 15, gameChar_y - 57, 30, 48);
        push();
        translate(gameChar_x, gameChar_y);
        rotate(PI / -3);
        ellipse(23,-30, 6, 15);
        pop();
        fill(255, 196, 44);
        ellipse(gameChar_x-10, gameChar_y - 2, 8, 10);
        ellipse(gameChar_x - 15, gameChar_y - 49, 10, 8);
        fill(255, 221, 182);
        rect(gameChar_x - 12, gameChar_y - 10, 4, 8);
        fill(255, 255, 255);
        stroke(0);
        line(gameChar_x - 20, gameChar_y - 49, gameChar_x - 10, gameChar_y - 49);
        ellipse(gameChar_x - 8, gameChar_y - 57, 7, 7);
        fill(0);
        ellipse(gameChar_x - 8, gameChar_y - 57, 1, 1);
    }
    else if(isRight && isFalling)
    {
        // add your jumping-right code
        fill(255, 255, 255)
        ellipse(gameChar_x, gameChar_y - 57, 30, 30);
        rect(gameChar_x - 15, gameChar_y - 57, 30, 48);
        push();
        translate(gameChar_x, gameChar_y);
        rotate(PI / 3);
        ellipse(-23,-30, 6, 15);
        pop();
        fill(255, 196, 44);
        ellipse(gameChar_x+10, gameChar_y - 2, 8, 10);
        ellipse(gameChar_x + 15, gameChar_y - 49, 10, 8);
        fill(255, 221, 182);
        rect(gameChar_x + 8, gameChar_y - 10, 4, 8);
        fill(255, 255, 255);
        stroke(0);
        line(gameChar_x + 20, gameChar_y - 49, gameChar_x + 10, gameChar_y - 49);
        ellipse(gameChar_x + 8, gameChar_y - 57, 7, 7);
        fill(0);
        ellipse(gameChar_x + 8, gameChar_y - 57, 1, 1);
    }
    else if(isLeft)
    {
        // add your walking left code
        fill(255, 255, 255)
        ellipse(gameChar_x, gameChar_y - 45, 30, 30);
        rect(gameChar_x - 15, gameChar_y - 45, 30, 48);
        push();
        translate(gameChar_x, gameChar_y);
        rotate(PI / 6);
        ellipse(-24,-15, 6, 15);
        pop();
        fill(255, 196, 44);
        arc(gameChar_x-10, gameChar_y + 3, 10, 10, PI, TWO_PI);
        ellipse(gameChar_x - 15, gameChar_y - 37, 10, 8);
        fill(255, 255, 255);
        stroke(0);
        line(gameChar_x - 20, gameChar_y - 37, gameChar_x - 10, gameChar_y - 37);
        ellipse(gameChar_x - 8, gameChar_y - 45, 7, 7);
        fill(0);
        ellipse(gameChar_x - 8, gameChar_y - 45, 1, 1);

    }
    else if(isRight)
    {
        // add your walking right code
        fill(255, 255, 255)
        ellipse(gameChar_x, gameChar_y - 45, 30, 30);
        rect(gameChar_x - 15, gameChar_y - 45, 30, 48);
        push();
        translate(gameChar_x, gameChar_y);
        rotate(PI / -6);
        ellipse(24,-15, 6, 15);
        pop();
        fill(255, 196, 44);
        arc(gameChar_x+10, gameChar_y + 3, 10, 10, PI, TWO_PI);
        ellipse(gameChar_x + 15, gameChar_y - 37, 10, 8);
        fill(255, 255, 255);
        stroke(0);
        line(gameChar_x + 20, gameChar_y - 37, gameChar_x + 10, gameChar_y - 37);
        ellipse(gameChar_x + 8, gameChar_y - 45, 7, 7);
        fill(0);
        ellipse(gameChar_x + 8, gameChar_y - 45, 1, 1);

    }
    else if(isFalling || isPlummeting)
    {
        // add your jumping facing forwards code
        fill(255, 255, 255)
        ellipse(gameChar_x, gameChar_y - 57, 30, 30);
        rect(gameChar_x - 15, gameChar_y - 57, 30, 48);
        push();
        translate(gameChar_x, gameChar_y);
        rotate(PI / 3);
        ellipse(-28,-34, 6, 15);
        pop();
        push();
        translate(gameChar_x, gameChar_y);
        rotate(PI / -3);
        ellipse(28,-34, 6, 15);
        pop();
        fill(255, 196, 44);
        ellipse(gameChar_x-10, gameChar_y - 2, 8, 10);
        ellipse(gameChar_x+10, gameChar_y - 2, 8, 10);
        ellipse(gameChar_x, gameChar_y - 46, 20, 12);
        fill(255, 221, 182);
        rect(gameChar_x+8, gameChar_y - 10, 4, 8);
        rect(gameChar_x - 12, gameChar_y - 10, 4, 8);
        fill(255, 255, 255);
        stroke(0);
        ellipse(gameChar_x - 5, gameChar_y - 57, 7, 7);
        ellipse(gameChar_x + 6, gameChar_y - 57, 7, 7);
        fill(0);
        ellipse(gameChar_x - 5, gameChar_y - 57, 1, 1);
        ellipse(gameChar_x + 6, gameChar_y - 57, 1, 1);
        ellipse(gameChar_x, gameChar_y - 46, 17, 4);
    }
    else
    {
        // add your standing front facing code
        fill(255, 255, 255)
        ellipse(gameChar_x, gameChar_y - 45, 30, 30);
        rect(gameChar_x - 15, gameChar_y - 45, 30, 48);
        push();
        translate(gameChar_x, gameChar_y);
        rotate(PI / 6);
        ellipse(-28,-15, 6, 15);
        pop();
        push();
        translate(gameChar_x, gameChar_y);
        rotate(PI / -6);
        ellipse(28,-15, 6, 15);
        pop();
        fill(255, 196, 44);
        arc(gameChar_x-10, gameChar_y + 3, 10, 10, PI, TWO_PI);
        arc(gameChar_x+10, gameChar_y + 3, 10, 10, PI, TWO_PI);
        ellipse(gameChar_x, gameChar_y - 35, 20, 8);
        fill(255, 255, 255);
        stroke(0);
        line(gameChar_x - 9, gameChar_y - 36, gameChar_x + 9, gameChar_y - 36);
        ellipse(gameChar_x - 5, gameChar_y - 45, 7, 7);
        ellipse(gameChar_x + 6, gameChar_y - 45, 7, 7);
        fill(0);
        ellipse(gameChar_x - 5, gameChar_y - 45, 1, 1);
        ellipse(gameChar_x + 6, gameChar_y - 45, 1, 1);

    }
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drewCloud(){
    for(let i = 0; i < clouds.length; i++){
        fill(255, 255, 255);
        ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].size, clouds[i].size);
        ellipse(clouds[i].x_pos - 40, clouds[i].y_pos, clouds[i].size - 20, clouds[i].size - 20);
        ellipse(clouds[i].x_pos + 40, clouds[i].y_pos, clouds[i].size - 20, clouds[i].size - 20);
    }
}

// Function to draw mountains objects.
function drewMountains(){
    for(let i = 0; i < mountains.length; i++){
        fill(147, 212, 205);
        triangle(mountains[i].x_pos, floorPos_y, mountains[i].x_pos - 260 , floorPos_y, mountains[i].x_pos - 140 , 140);
        fill(133, 206, 199);
        triangle(mountains[i].x_pos - 150, floorPos_y, mountains[i].x_pos - 290 , floorPos_y, mountains[i].x_pos - 220, 200);
    }
}

// Function to draw trees objects.
function drawTrees(){
    for(let i = 0; i < trees.length; i++){
        fill(123, 89, 52);
        rect(trees[i].x_pos, floorPos_y - 50, trees[i].width, 50);
        //branches
        fill(61, 142, 103);
        ellipse(trees[i].x_pos + 20, floorPos_y - 130, 100, 120);
        ellipse(trees[i].x_pos + 20, floorPos_y - 100, 140, 120);
        fill(75, 178, 129);
        ellipse(trees[i].x_pos + 15, floorPos_y - 135, 95, 115);
        ellipse(trees[i].x_pos + 15, floorPos_y - 105, 135, 115);
    }
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.
function createCanyon(x,width){
    let ca = {
        x: x,
        width: width,
        draw: function(){
            fill(224, 244, 255);
            rect(this.x, floorPos_y, this.width, 150);
        },
        check: function(){
            if(gameChar_world_x < (this.x + this.width) && gameChar_world_x > this.x && gameChar_y >= floorPos_y){
                isPlummeting = true;
            }
            if(isPlummeting === true){
                gameChar_y += 1;
            }
        }
    }

    return ca;
}


// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function createCollectable(x, y, isFound){
    let c = {
        x: x,
        y: y,
        size: 50,
        isFound: isFound,
        draw: function(){
            fill(214, 173, 1);
            ellipse(this.x + 5, this.y, this.size - 10, this.size);
            fill(242, 210, 48);
            ellipse(this.x, this.y, this.size - 10, this.size);
            fill(209, 174, 0);
            ellipse(this.x, this.y, this.size - 20, this.size - 10);
            fill(242, 210, 48);
            ellipse(this.x + 1, this.y + 1, this.size - 21, this.size - 12);
            fill(209, 174, 0);
            rect(this.x - 4, this.y - 12, 8, 25);
            fill(229, 183, 1);
            rect(this.x -2, this.y - 10, 6, 23);
        },
        check: function(){
            if(dist(gameChar_world_x,gameChar_y,this.x,this.y) < this.size) {
                this.isFound = true;
                game_score += 1;
                coinSound.play();
            }
        }
    }

    return c;
}

function renderFlagpole(){
    push();
    strokeWeight(5);
    stroke(100);
    line(flagpole.x_pos,floorPos_y,flagpole.x_pos,floorPos_y - 300);
    fill(255);
    noStroke();
    if(flagpole.isReached){
        rect(flagpole.x_pos,floorPos_y - 300,70,55);
        fill(255);
        stroke(0);
        strokeWeight(1);
        ellipse(flagpole.x_pos + 23,floorPos_y - 280,15);
        ellipse(flagpole.x_pos + 48,floorPos_y - 280,15);
        noStroke();
        fill(0);
        ellipse(flagpole.x_pos + 23,floorPos_y - 280,5);
        ellipse(flagpole.x_pos + 48,floorPos_y - 280,5);
        fill(255,196,44);
        ellipse(flagpole.x_pos + 35,floorPos_y - 262,38,12);
        stroke(0);
        strokeWeight(1);
        line(flagpole.x_pos + 16,floorPos_y - 262,flagpole.x_pos + 53,floorPos_y - 262);
    }else{
        rect(flagpole.x_pos,floorPos_y - 50,70,50);
        fill(255);
        stroke(0);
        strokeWeight(1);
        ellipse(flagpole.x_pos + 23,floorPos_y - 30,15);
        ellipse(flagpole.x_pos + 48,floorPos_y - 30,15);
        noStroke();
        fill(0);
        ellipse(flagpole.x_pos + 23,floorPos_y - 30,5);
        ellipse(flagpole.x_pos + 48,floorPos_y - 30,5);
        fill(255,196,44);
        ellipse(flagpole.x_pos + 35,floorPos_y - 12,38,12);
        stroke(0);
        strokeWeight(1);
        line(flagpole.x_pos + 16,floorPos_y - 12,flagpole.x_pos + 53,floorPos_y - 12);
    }
    pop();
}

function checkFlagpole(){
    let d  = abs(gameChar_world_x - flagpole.x_pos);
    if(d < 15){
        flagpole.isReached = true;
    }
}

function createPlatforms(x, y, length){
    let p = {
        x:x,
        y:y,
        length:length,
        draw: function(){
            fill(181, 129, 74);
            rect(this.x,this.y,this.length,20);
        },
        checkContact: function(gc_x, gc_y){
            if(gc_x > this.x && gc_x < this.x + this.length){
                let d = this.y - gc_y;
                if(d >= 0 && d < 5){
                    return true;
                }
            }

            return false;
        }
    }

    return p;
}

function Enemy(x,y,range){
    this.x = x;
    this.y = y;
    this.range = range;

    this.currentX = x;
    this.inc = 1;

    this.update = function(){
        this.currentX += this.inc;

        if(this.currentX >= this.x + this.range){
            this.inc = -1;
        }else if(this.currentX < this.x){
            this.inc = 1;
        }
    }

    this.draw = function() {
        this.update();
        noStroke();
        fill(135)
        rect(this.currentX, this.y, 50, 50, 8);
        fill(180)
        triangle(this.currentX + 5, this.y, this.currentX + 10, this.y - 10, this.currentX + 15, this.y);
        triangle(this.currentX + 15, this.y, this.currentX + 20, this.y - 10, this.currentX + 25, this.y);
        triangle(this.currentX + 25, this.y, this.currentX + 30, this.y - 10, this.currentX + 35, this.y);
        triangle(this.currentX + 35, this.y, this.currentX + 40, this.y - 10, this.currentX + 45, this.y);

        triangle(this.currentX + 50, this.y + 5, this.currentX + 60, this.y + 10, this.currentX + 50, this.y + 15);
        triangle(this.currentX + 50, this.y + 15, this.currentX + 60, this.y + 20, this.currentX + 50, this.y + 25);
        triangle(this.currentX + 50, this.y + 25, this.currentX + 60, this.y + 30, this.currentX + 50, this.y + 35);
        triangle(this.currentX + 50, this.y + 35, this.currentX + 60, this.y + 40, this.currentX + 50, this.y + 45);

        triangle(this.currentX + 5, this.y + 50, this.currentX + 10, this.y + 60, this.currentX + 15, this.y + 50);
        triangle(this.currentX + 15, this.y + 50, this.currentX + 20, this.y + 60, this.currentX + 25, this.y + 50);
        triangle(this.currentX + 25, this.y + 50, this.currentX + 30, this.y + 60, this.currentX + 35, this.y + 50);
        triangle(this.currentX + 35, this.y + 50, this.currentX + 40, this.y + 60, this.currentX + 45, this.y + 50);

        triangle(this.currentX + 50, this.y + 5, this.currentX + 60, this.y + 10, this.currentX + 50, this.y + 15);
        triangle(this.currentX + 50, this.y + 15, this.currentX + 60, this.y + 20, this.currentX + 50, this.y + 25);
        triangle(this.currentX + 50, this.y + 25, this.currentX + 60, this.y + 30, this.currentX + 50, this.y + 35);
        triangle(this.currentX + 50, this.y + 35, this.currentX + 60, this.y + 40, this.currentX + 50, this.y + 45);

        triangle(this.currentX, this.y + 5, this.currentX - 10, this.y + 10, this.currentX, this.y + 15);
        triangle(this.currentX, this.y + 15, this.currentX - 10, this.y + 20, this.currentX, this.y + 25);
        triangle(this.currentX, this.y + 25, this.currentX - 10, this.y + 30, this.currentX, this.y + 35);
        triangle(this.currentX, this.y + 35, this.currentX - 10, this.y + 40, this.currentX, this.y + 45);

        fill(50);
        push();
        translate(this.currentX + 5, this.y + 15);
        rotate(PI / 6);
        rect(0, -8, 15, 5);
        rotate(PI / -3);
        rect(20, 12, 15, 5);
        pop();


        ellipse(this.currentX + 15, this.y + 20, 12);
        ellipse(this.currentX + 35, this.y + 20, 12);
        fill(255);
        ellipse(this.currentX + 17, this.y + 20, 8);
        ellipse(this.currentX + 33, this.y + 20, 8);
        fill(223, 48, 48);
        ellipse(this.currentX + 20, this.y + 21, 4, 6);
        ellipse(this.currentX + 30, this.y + 21, 4, 6);

        fill(50);
        rect(this.currentX + 12, this.y + 28, 25, 14);

        fill(255);
        rect(this.currentX + 13, this.y + 29, 5, 3);
        rect(this.currentX + 19, this.y + 29, 5, 3);
        rect(this.currentX + 25, this.y + 29, 5, 3);
        rect(this.currentX + 31, this.y + 29, 5, 3);

        rect(this.currentX + 13, this.y + 38, 5, 3);
        rect(this.currentX + 19, this.y + 38, 5, 3);
        rect(this.currentX + 25, this.y + 38, 5, 3);
        rect(this.currentX + 31, this.y + 38, 5, 3);
    }

        this.checkContact = function(gc_x,gc_y){
        let d = dist(gc_x,gc_y,this.currentX,this.y + 40);
        if(d < 30){
            return true;
        }

        return false;
    }
}

function drawScoreBoard(){
    fill(196, 158, 116);
    noStroke();
    beginShape();
    vertex(15, 23);
    vertex(170, 20);
    vertex(163, 105);
    vertex(15, 90);
    endShape();
    fill(249, 244, 240);
    beginShape();
    vertex(10, 30);
    vertex(160, 15);
    vertex(160, 95);
    vertex(23, 94);
    endShape();

    fill(111, 74, 45);
    noStroke();
    textStyle(BOLD);
    text("SCORE : " + game_score, 30, 50);
    text("LIFE : ", 30, 75);
}

function drawHeart(x, y, size) {
    beginShape();
    vertex(x, y);
    fill(255,117,117)
    bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    endShape(CLOSE);
}

function checkPlayerDie(){
    if(gameChar_y > height){
        lives -= 1;
        if(lives > 0){
            startGame();
        }
        if(lives < 1){
            reset = true;
            lives = 0;
        }
    }

    if(reset){
        push();
        fill(255);
        textSize(50);
        stroke(123, 89, 52);
        strokeWeight(8);
        text("GAME OVER...", width/8, height/2);
        text("Press space to continue.", width/8, height/2 + 50);
        pop();
    }
}

function setGradient(x, y, w, h, c1, c2) {
    noFill();

    // Left to right gradient
    for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
    }
}

function startGame(){
    gameChar_x = 80;
    gameChar_y = floorPos_y;

    // letiable to control the background scrolling.
    scrollPos = 0;

    // letiable to store the real position of the gameChar in the game
    // world. Needed for collision detection.
    gameChar_world_x = gameChar_x - scrollPos;

    // Boolean letiables to control the movement of the game character.
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;

    // Initialise arrays of scenery objects.
    trees = [{x_pos:100, width:40}, {x_pos:430, width:40}, {x_pos:580, width:40}, {x_pos:730, width:40}, {x_pos:940, width:40}, {x_pos:1110, width:40}, {x_pos:1380, width:40}, {x_pos:1600, width:40}, {x_pos:1760, width:40}, {x_pos:1930, width:40}, {x_pos:2100, width:40}, {x_pos:2250, width:40}, {x_pos:2400, width:40}, {x_pos:2600, width:40}, {x_pos:2750, width:40}, {x_pos:2900, width:40}];

    clouds = [{x_pos: 400, y_pos: 100, size: 80},{x_pos: 700, y_pos: 150, size: 80},{x_pos: 950, y_pos: 100, size: 80},{x_pos: 1300, y_pos: 80, size: 80},{x_pos: 1800, y_pos: 110, size: 80},{x_pos: 2000, y_pos: 100, size: 80},{x_pos: 2300, y_pos: 80, size: 80},{x_pos: 2600, y_pos: 120, size: 80}];

    mountains = [{x_pos:200, y_pos:400}, {x_pos:700}, {x_pos:1200}, {x_pos:1900}, {x_pos:2000}, {x_pos:2500}, {x_pos:3000}, {x_pos:3300}, {x_pos:3600}];

    platforms = [];
    platforms.push(createPlatforms(500,floorPos_y - 100,200));
    platforms.push(createPlatforms(900,floorPos_y - 100,150));
    platforms.push(createPlatforms(1300,floorPos_y - 100,200));
    platforms.push(createPlatforms(1400,floorPos_y - 100,200));

    enemies = [];
    enemies.push(new Enemy(530,floorPos_y - 60, 200));
    enemies.push(new Enemy(1400,floorPos_y - 60, 100));
    enemies.push(new Enemy(2800,floorPos_y - 60, 200));
    enemies.push(new Enemy(3200,floorPos_y - 60, 200));

    collectable = [];
    collectable.push(createCollectable(500,410,false));
    collectable.push(createCollectable(600,310,false));
    collectable.push(createCollectable(900,310,false));
    collectable.push(createCollectable(950,310,false));
    collectable.push(createCollectable(1000,310,false));
    collectable.push(createCollectable(1100,310,false));
    collectable.push(createCollectable(1200,310,false));
    collectable.push(createCollectable(1500,310,false));
    collectable.push(createCollectable(1600,310,false));
    collectable.push(createCollectable(1800,410,false));
    collectable.push(createCollectable(2000,410,false));
    collectable.push(createCollectable(2100,410,false));
    collectable.push(createCollectable(2200,410,false));
    collectable.push(createCollectable(2500,410,false));
    collectable.push(createCollectable(3100,410,false));
    collectable.push(createCollectable(3400,410,false));
    collectable.push(createCollectable(3500,410,false));

    canyon = [];
    canyon.push(createCanyon(300,100));
    canyon.push(createCanyon(800,100));
    canyon.push(createCanyon(1200,100));
    canyon.push(createCanyon(1500,100));
    canyon.push(createCanyon(2000,100));
    canyon.push(createCanyon(2500,100));

    game_score = 0;

    flagpole = {isReached: false, x_pos: 3800};

    reset = false;

    clear = false;
}