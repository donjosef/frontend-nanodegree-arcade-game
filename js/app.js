
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

/*
----------------------
INSTANTIATE ENEMIES AND PLAYER
---------------------------*/
const allEnemies = [];
allEnemies.push(new Enemy(-100, 67), new Enemy(-90, 233), new Enemy(-200, 150));

const player = new Player(202, 399);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
