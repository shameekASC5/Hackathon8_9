//Canvas size variables
const canvasWidth = 1200;
const canvasHeight = 700;
//Variables for black and white rectangle position and size
let rectSize = 55;
let blackXPos = 5;
let blackYPos = canvasHeight - rectSize - 5;
let whiteXPos = canvasWidth - rectSize - 5;
let whiteYPos = canvasHeight - rectSize - 1;
let gunBarrellWidth = 10;
let gunBarrellHeight = 20;
let blackGunhandleXPos = blackXPos + rectSize;
let blackGunhandleYPos = (blackYPos - (rectSize/2 - 50));
let blackGunBarrellYPos = blackGunhandleYPos - gunBarrellHeight;
let whiteGunhandleXPos = whiteXPos - rectSize + 15;
let whiteGunhandleYPos = (whiteYPos - (rectSize/2 - 50));
let whiteGunBarrellXPos = whiteGunhandleXPos + 30;
let whiteGunBarrellYPos = whiteGunhandleYPos - gunBarrellHeight + 10;
//Bullet stuff
let blackBullet = [];
let blackBulletCooldown = 7.5;
let whiteBullet = [];
let whiteBulletCooldown = 7.5;
//Canvas Color
let canvasColor = 225;
//Player Health
let blackHealth = 100;
let whiteHealth = 100;
//game state var
let gameStateText = "";

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    img = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Yin_yang.svg/260px-Yin_yang.svg.png");
}
let fillVal;
let strokeVal;
let gameBegin = true;
let playGame = false;
let gameOver = false
let moveStuff = true;
let shootStuff = true;
let howToPlayScreen = false;

function draw() {
    if (gameBegin === true) {
        functionality.startScreen();
    }
    if (playGame === true) {
        functionality.drawEverything();
        functionality.moveBlack();
        functionality.shootBlackBullet(blackBullet);
        functionality.shootWhiteBullet(whiteBullet);
    }
    if (blackHealth <= 0 || whiteHealth <= 0) {
        gameOver = true;
    }
    if (gameOver === true) {
        functionality.gameOver();
    }
    if (howToPlayScreen === true) {
        functionality.howToPlay();
    }
}

const functionality = {
//Draws everything
    drawEverything :  function () {
        background(canvasColor);        
        image(img, canvasWidth/4, canvasHeight/4 - 50, canvasWidth/2 - 50, canvasHeight/2 + 100);
        //Black player
        stroke(0);
        fill(0);
        stroke(255);
        rect(blackXPos, blackYPos, rectSize, rectSize);
        fill(0);
        stroke(255);
        rect(blackGunhandleXPos, blackGunhandleYPos, gunBarrellWidth, gunBarrellHeight);
        stroke(255);
        rect(blackGunhandleXPos, blackGunBarrellYPos + 10, 40, 10);
        //white player
        fill(255);
        stroke(0);
        rect(whiteXPos, whiteYPos, rectSize, rectSize);
        fill(255)
        stroke(0);
        rect(whiteGunhandleXPos, whiteGunBarrellYPos, 40, 10);
        stroke(0);
        rect(whiteGunBarrellXPos, whiteGunhandleYPos, gunBarrellWidth, gunBarrellHeight);
        //Bullet shoots
        if (keyIsDown(32) && blackBulletCooldown <= 0) {
            blackBullet.push([blackXPos + rectSize + 40, blackGunhandleYPos]);
            blackBulletCooldown = 7.5;
        }
        blackBulletCooldown--;
        if (keyIsDown(191) && whiteBulletCooldown <= 0) {
            whiteBullet.push([whiteXPos - rectSize, whiteGunhandleYPos]);
            whiteBulletCooldown = 7.5;
        }
        whiteBulletCooldown--;
        fillVal = fill(0);
        strokeVal = stroke(255);
        fill("green");
        textSize(50);
        text(gameStateText, canvasWidth/2 - 270, canvasHeight/2);
    },
//Controls Black and White characters
    moveBlack : function () {
        if (keyIsDown(UP_ARROW) && whiteYPos - 5 >= 0 && moveStuff) {
            whiteYPos-=3;
        } 
        if (keyIsDown(DOWN_ARROW) && whiteYPos + rectSize + 3 <= canvasHeight && moveStuff) {
            whiteYPos+=3;
        } 
        if (keyIsDown(RIGHT_ARROW) && whiteXPos + rectSize + 3 <= canvasWidth && moveStuff) {
            whiteXPos+=3;
        } 
        if (keyIsDown(LEFT_ARROW) && whiteGunhandleXPos >= canvasWidth/2 && moveStuff) {
            whiteXPos-=3;
        } 
        if (keyIsDown(87) && blackYPos - 5 >= 0 && moveStuff) {
            blackYPos-=3;
        } 
        if (keyIsDown(83) && blackYPos + rectSize + 3 <= canvasHeight && moveStuff) {
            blackYPos+=3;
        } 
        if (keyIsDown(65) && blackXPos- 3 >= 0 && moveStuff) {
            blackXPos-=3;
        } 
        if (keyIsDown(68) && blackGunhandleXPos + 40 <= canvasWidth/2 && moveStuff) {
            blackXPos+=3;
        }
        blackGunhandleXPos = blackXPos + rectSize;
        blackGunhandleYPos = (blackYPos - (rectSize/2 - 50));
        blackGunBarrellYPos = blackGunhandleYPos - gunBarrellHeight;
        whiteGunhandleXPos = whiteXPos - rectSize + 15;
        whiteGunhandleYPos = (whiteYPos - (rectSize/2 - 50));
        whiteGunBarrellXPos = whiteGunhandleXPos + 30;
        whiteGunBarrellYPos = whiteGunhandleYPos - gunBarrellHeight + 10;
    },
//Controls bullet placement
    shootBlackBullet : function (array) {
        let bulletColor = 0;
        fill(bulletColor);
        for (let i = 0; i < array.length; i++) {
            bulletX = array[i][0];
            bulletY = array[i][1] - 10; 
            if (!(bulletX >= whiteXPos && bulletX <= whiteXPos + rectSize && bulletY >= whiteYPos && bulletY <= whiteYPos + rectSize) && shootStuff) {
                fillVal;
                strokeVal;
                rect(bulletX, bulletY, 15, 10, 20);
                array[i][0]+=5;
            } else if (bulletX >= whiteXPos && bulletX <= whiteXPos + rectSize && bulletY >= whiteYPos && bulletY <= whiteYPos + rectSize && shootStuff) {
                rect(bulletX, bulletY, 15, 10, 20);
                array[i][0]+= canvasWidth;
                whiteHealth -= 10;
            }
        }   
        fill(0);
        text(whiteHealth, canvasWidth - 100, 50);
    },
    shootWhiteBullet : function (array) {
        let bulletColor = 255;
        fill(bulletColor);
        for (let i = 0; i < array.length; i++) {
            bulletX = array[i][0];
            bulletY = array[i][1] - 10;
            if (!(bulletX >= blackXPos && bulletX <= blackXPos + rectSize && bulletY >= blackYPos && bulletY <= blackYPos + rectSize) && shootStuff) {
                fill(bulletColor);
                stroke(0);
                rect(bulletX, bulletY, 15, 10, 20);
                array[i][0]-=5;
            } else if (bulletX >= blackXPos && bulletX <= blackXPos + rectSize && bulletY >= blackYPos && bulletY <= blackYPos + rectSize  && shootStuff) {
                rect(bulletX, bulletY, 15, 10, 20);
                array[i][0]-= canvasWidth;
                blackHealth -= 10;
            }
        }
        fill(0);
        text(blackHealth, 10, 50);
    },
//Win Condition 
    gameOver : function () {
        if (blackHealth === 0) {
            canvasColor = 0;
            gameStateText = "White Wins....Game Over !!";
            moveStuff = false;
            shootStuff = false;
        } else if (whiteHealth === 0) {
            canvasColor = 0;
            gameStateText = "Black Wins....Game Over !!";
            moveStuff = false;
            shootStuff = false;
        }
        if (mouseIsPressed) {
            gameOver = false;
            playGame = false;
            gameBegin = true;
            location.reload();
        }
    },
//Start Screen
    startScreen : function () {
        function randomColor () {
            let randomNum = Math.ceil(Math.random() * 255);
            return randomNum;
        }
        let buttonWidth = 150;
        let buttonHeight = 75;
        let startButtonXPos = canvasWidth/2 - buttonWidth - 20;
        let startButtonYPos = canvasHeight - 200;

        let howToPlayButtonXPos = canvasWidth/2 + buttonWidth/2 - 20;
        let howToPlayButtonYPos = canvasHeight - 200;

        strokeWeight(1);
        //Draws text and creates startButton
        background(0);
        fill(255);
        textSize(90);
        text("Quick Draw", canvasWidth/2 - 210, 100);
        fill(randomColor(), randomColor(), randomColor());
        textSize(50);
        text("Shoot 'Em Up", canvasWidth/2 - 140, canvasHeight/2 - 100);
        noFill();
        stroke(255);
        rect(startButtonXPos, startButtonYPos, buttonWidth, buttonHeight);
        fill(255);
        textSize(20);
        text("Start Game", startButtonXPos + 25, startButtonYPos + 40);
        fill(255);
        stroke(0);
        rect(howToPlayButtonXPos, howToPlayButtonYPos, buttonWidth, buttonHeight);
        fill(0);
        textSize(20);
        text("How To Play", howToPlayButtonXPos + 20, howToPlayButtonYPos + 40);
        if (mouseX >= startButtonXPos && mouseX <= startButtonXPos + buttonWidth && mouseY >= startButtonYPos && mouseY <= startButtonYPos + buttonHeight && mouseIsPressed) {
           playGame = true;
        } else if (mouseX >= howToPlayButtonXPos && mouseX <= howToPlayButtonXPos + buttonWidth && mouseY >= howToPlayButtonYPos && mouseY <= howToPlayButtonYPos + buttonHeight && mouseIsPressed) {
            howToPlayScreen = true;
        }
        //Black and White guns
        // strokeWeight(5);
        // stroke("red");
        // line(100, 200, 65, 265);
        // line(65, 265, 213, 338);
        // line(213, 338, 247, 282);
        // line();
        // line();
        // line();
    }, 
    howToPlay: function () {
        background (0);
        fill(255);
        textSize(70);
        text("Instructions", 400, canvasWidth/8 )
        textSize(40);
        text("1. The black player is controlled with the WASD keys.", 100, canvasWidth/2 - 300);
        text("2. The white player is controlled with the arrow keys.", 100, canvasWidth/2 - 250);
        text("3. The black player shoots with space bar.", 100, canvasWidth/2 - 200);
        text("4. The white player shoots with the question mark key.", 100, canvasWidth/2 - 150);
        //Start game button
        let buttonWidth = 150;
        let buttonHeight = 75;
        let startButtonXPos = canvasWidth/2 - buttonWidth + 75;
        let startButtonYPos = canvasHeight - 200;
        noFill();
        stroke(255);
        rect(startButtonXPos, startButtonYPos, buttonWidth, buttonHeight);
        fill(255);
        textSize(20);
        text("Start Game", startButtonXPos + 25, startButtonYPos + 40);
        if (mouseX >= startButtonXPos && mouseX <= startButtonXPos + buttonWidth && mouseY >= startButtonYPos && mouseY <= startButtonYPos + buttonHeight && mouseIsPressed && howToPlayScreen) {
            howToPlayScreen = false;
            playGame = true;
        }
    }
};






        
    
