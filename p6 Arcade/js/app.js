// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    this.beatleInitialX = -100;
    this.beatleEndX = 450; 
    this.beatleVerticalSpaces = 3;
    this.beatleHorizontalSpaces = 5;
    this.beatleVerticalStep = 85;
    
    this.beatleMinSpeed = 50;
    
    this.x = this.getRandomXPosition();
    this.y = this.getRandomYPosition();
    
    this.speed = this.getRandomSpeed();
};

Enemy.prototype.getRandomSpeed = function() {
    return ((Math.random() * 100) % 100) + this.beatleMinSpeed; // Random speed from 1-10
}

Enemy.prototype.getRandomYPosition = function() {
    waterBuffer = 60; // Avoid putting Beatle in water
    return ((Math.round((Math.random()*100)) % this.beatleVerticalSpaces) * this.beatleVerticalStep) + waterBuffer;
}

Enemy.prototype.getRandomXPosition = function() {
    return ((Math.round((Math.random()*100)) % this.beatleHorizontalSpaces) * this.beatleVerticalStep) - this.beatleInitialX;
}

Enemy.prototype.resetPosition = function() {
    this.x = this.beatleInitialX;
    this.speed = this.getRandomSpeed();
    this.y = this.getRandomYPosition();
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    // Move the Beattle
    this.x = this.x + (this.speed*dt);
    
    // If Beatle reaches end, reset.
    if(this.x > this.beatleEndX) {
        this.resetPosition();
    }
    
    // Handle a Collision
    if(this.Collision()) {
        player.setInitial();
    };
};

Enemy.prototype.Collision = function() {
    xHit = 60; //Hit Box
    yHit = 30; //Hit Box
    xCollide = false;
    yCollide = false;
    
    if(player.x < (this.x + xHit) && player.x > (this.x - xHit)) {
        xCollide = true;
    };
    if(player.y < (this.y + yHit) && player.y > (this.y - yHit)) {
        yCollide = true;
    };
    
    return (xCollide && yCollide);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    
    this.INITIALX = 200;        // Initial Position
    this.INITIALY = 400;        // Initial Position
    this.stepHorizontal = 100;  // Distance traverse horizontal
    this.stepVertical = 85;     // Distance traverse vertically
    
    this.sprite = 'images/char-boy.png';
    this.x = this.INITIALX; 
    this.y = this.INITIALY; 
    
};

Player.prototype.update = function(dt) {
  dummy = 1;  
    // Nothing to do with this method!!!
};

Player.prototype.setInitial = function() {
    this.x = this.INITIALX; 
    this.y = this.INITIALY; 
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  
};

Player.prototype.playerVictory = function() {
    this.setInitial();
}

Player.prototype.handleInput = function(key) {
    switch(key) {
        case "left":
            if(this.x > 50){
                this.x = this.x - this.stepHorizontal;
            }
            break;
        case "right":
            if(this.x < 350){
                this.x = this.x + this.stepHorizontal;
            }
            break;
        case "up":
            if(this.y > 0){
                this.y = this.y - this.stepVertical;
            }
            if(this.y < 50) { // Victory Condition
                this.playerVictory();
            }
            break;
        case "down":
            if(this.y < 400) {
                this.y = this.y + this.stepVertical;
            }
            break;
    } // Ends switch
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

numEnemies = 10;//Math.ceil(Math.random() * 10);

for (k = 0; k<numEnemies;k++){
    allEnemies.push(new Enemy);
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
