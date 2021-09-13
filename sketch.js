var bg, bgImg;
var player, playerImg;
var star, starImg, starG, starSound;
var rocket, rocketImg, rocketG;
var asteroid, asteroidG, asteroidImg1, asteroidImg2, asteroidImg3;
var gameOver, gameOverImg, gameOverSound;

// Game States
var SERVE = 0;
var PLAY = 1;
var END = 2;
var gameState = SERVE;

var score = 0;
var distance = 0;

function preload() {
    bgImg = loadImage("assets/background.png");
    playerImg = loadImage("assets/player.png");
    starImg = loadImage("assets/star.png");
    asteroidImg1 = loadImage("assets/asteroid1.png");
    asteroidImg2 = loadImage("assets/asteroid2.png");
    asteroidImg3 = loadImage("assets/asteroid3.png");
    gameOverImg = loadImage("assets/gameOver.png");
    rocketImg = loadImage("assets/rocket.png");

    starSound = loadSound("assets/star-collide.wav");
    gameOverSound = loadSound("assets/crash.wav");
}

function setup() {
    createCanvas(700, 400);

    bg = createSprite(0, 200);
    bg.addImage(bgImg);

    player = createSprite(50, 200);
    player.addImage(playerImg);

    gameOver = createSprite(350, 200);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 2;
    gameOver.visible = false;

    // Groups
    starG = new Group();
    asteroidG = new Group();
    rocketG = new Group();

    score = 0;
    distance = 0;
}

function draw() {
    background(0);
    drawSprites();
    textSize(20);
    fill(0, 0, 255);

    if (gameState == SERVE) {
        text("Click to Start", 350, 200);
        
    } else if (gameState == PLAY) {
        player.y = mouseY;

        score += parseInt(frameCount / 60);
        distance += parseInt(frameCount / 60);

        bg.velocityX = -3;

        if (bg.x <= -700) {
            bg.x = 0;
        }

        spawnAsteroids();
        spawnStars();
        spawnRockets();

        if (player.isTouching(starG)) {
            score += 100;
            starG.destroyEach();
            starSound.play();
        }
        if (player.isTouching(asteroidG) || player.isTouching(rocketG)) {
            gameState = END;
            player.visible = false;
            gameOverSound.play();
        }

    } else if (gameState == END) {
        bg.velocityX = 0;
        starG.destroyEach();
        asteroidG.destroyEach();
        rocketG.destroyEach();
        gameOver.visible = true;
        text("You Crashed Your Rocket!", 300, 300);
        text("Click to restart", 300, 120);
    }

    text("Score: " + score, 10, 20);
    text("Distance: " + distance, 10, 50)
}

function mouseClicked() {
    if (gameState == SERVE) {
        gameState = PLAY;
    }
    if (gameState == END) {
        gameState = SERVE;
        player.visible = true;
        gameOver.visible = false;
        score = 0;
        distance = 0;
    }
}

function spawnStars() {
    if (frameCount % 175 == 0) {
        star = createSprite(800, random(75, 325));
        star.addImage(starImg);

        star.velocityX = -5;

        star.lifetime = 350;

        starG.add(star);
    }
}

function spawnAsteroids() {
    if (frameCount % 90 == 0) {
        var rand_img = Math.round(random(1, 3));

        asteroid = createSprite(800, random(75, 325));
        switch (rand_img) {
            case 1:
                asteroid.addImage(asteroidImg1);
                break;
            case 2:
                asteroid.addImage(asteroidImg2);
                break;
            case 3:
                asteroid.addImage(asteroidImg3);
                break;
            default:
                break;
        }

        asteroid.velocityX = -5;

        asteroid.lifetime = 300;

        asteroidG.add(asteroid);
    }
}

function spawnRockets() {
    if (frameCount % 500 == 0) {
        rocket = createSprite(800, random(75, 325));
        rocket.addImage(rocketImg);

        rocket.velocityX = -5;

        rocket.lifetime = 300;

        rocketG.add(rocket);
    }
}