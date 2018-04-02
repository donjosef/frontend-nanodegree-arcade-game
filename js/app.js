
/*
-----------------------------------
ENEMY CONSTRUCTOR/PROTOTYPE SECTION
-----------------------------------*/
var Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/enemy-bug.png';
};


Enemy.prototype.update = function(dt) {

};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
-----------------------------------
PLAYER CONSTRUCTOR/PROTOTYPE SECTION
-----------------------------------*/
function Player(x, y) {
  Enemy.call(this, x, y); //Call the super Contructor to avoid duplicated logic
  this.sprite = 'images/char-boy.png';
}

//Extending prototype chain
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  this.handleInput();

};

Player.prototype.reset = function() {
  this.x = 202;
  this.y = 399;
};

//The input is the keyCode of the keyboard's arrows
Player.prototype.handleInput = function(input) {
  //if the user reaches the water come back to initial position
    if(this.y === -16) {
      this.reset();
    }

    switch(input) {
      case "left":
      if(this.x > 0) {
        this.x -= 101;
      } //Avoid the player goes outside/left of the grid
      break;
      case "right":
      if(this.x < 404) {
        this.x += 101;
      }//Avoid the player goes outside/right of the grid
      break;
      case "up":
      if(this.y > -16) {
        this.y -= 83;
      }//Avoid the player goes outside/up of the grid
      break;
      case "down":
      if(this.y < 399) {
        this.y += 83;
      }//Avoid the player goes outside/down of the grid
      break;
    }
  };

/*
----------------------
INSTANTIATE ENEMIES AND PLAYER
---------------------------*/
const allEnemies = [];
allEnemies.push(new Enemy(-100, 67), new Enemy(-90, 233), new Enemy(-200, 150));

const player = new Player(202, 399);


// This listens for key presses and sends the keys to your Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
