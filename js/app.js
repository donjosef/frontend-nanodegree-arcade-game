"use strict"

const btn = document.querySelector("button");
const layer = document.querySelector(".layer"); //layer html
const win_text = document.querySelector(".win");
const playAgain = document.querySelector(".playAgainHidden");
const title = document.querySelector("h1");
const gameOver_text = document.querySelector(".gameOver");

/*
-----------------------------------
ENEMY CONSTRUCTOR/PROTOTYPE SECTION
-----------------------------------*/
var Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';
  this.initialPosition = x;
  this.initialSpeed = speed;
};


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function moveBugs(dt) {

    this.x += this.speed * dt * 100;
    //if the position of bugs cross the grid edges, set their x-position back to beginning and increase their speed
    if( (this.x - 101) > 505) {
      this.x = - 100;
      this.speed++;

      if(this.speed > 6) {
        this.speed = 1;
      }//avoid extreme speeds
    }
};

//Reset the position and speed of enemies
Enemy.prototype.reset = function(x, speed) {
    this.x = x;
    this.speed = speed;
};


/*
-----------------------------------
PLAYER CONSTRUCTOR/PROTOTYPE SECTION
-----------------------------------*/
function Player(x, y) {
  Enemy.call(this, x, y); //Call the super Contructor to avoid duplicated logic
  this.sprite = 'images/char-boy.png';
    this.lives = 3;
}

//Extending prototype chain
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

//Change the update of player , otherwise the player will move like the bugs
Player.prototype.update = function() {

  // perform a check on the coords of player and bugs, and if there is a match, invoke reset
  for(let enemy of allEnemies) {
       if( (this.x >= enemy.x - 60) && (this.x <= enemy.x + 60) ) {
         if(enemy.y === this.y) {
            this.reset();
            this.lives--;
             if(this.lives === 0) {
                 this.gameOver();
                 this.lives = 3;
             }
         }
       }
     }
};

Player.prototype.reset = function() {
  this.x = 202;
  this.y = 399;
};

Player.prototype.gameOver = function() {
  layer.classList.remove("hidden"); //Show the layer
  Array.from(layer.children).forEach(child => child.classList.add("hidden")); //Hide all the children of the layer element
  allEnemies.forEach(enemy => enemy.speed = 0); //stop the enemies from updating thei position
  document.removeEventListener("keyup", movePlayer); //remove the input fro moving the player
  win_text.style.cssText = "display: none;";
  playAgain.classList.add("playAgain");
  playAgain.classList.remove("playAgainHidden");
    gameOver_text.classList.add("show"); //show the text game over
}

//The input is the keyCode of the keyboard's arrows
Player.prototype.handleInput = function(input) {
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

    //if the user reaches the water come back to initial position. Important to put this if statement at the very end of handleInput for a correct behavior
      if(this.y === -16) {
        victory();
      }
  };

Player.prototype.playAgain = function() {
  player.reset();
  allEnemies.forEach(enemy => enemy.reset( enemy.initialPosition, enemy.initialSpeed ));
  document.addEventListener("keyup", movePlayer); 
  layer.classList.add("hidden"); 
  playAgain.classList.remove("playAgain"); //remove the button playagain
    gameOver_text.classList.remove("show"); //hide the game over message
  
};

/*
----------------------
INSTANTIATE ENEMIES AND PLAYER
---------------------------*/
const allEnemies = [];
allEnemies.push(new Enemy(-100, 67, 1), new Enemy(-90, 233, 2), new Enemy(-200, 67, 3 ), new Enemy(-200, 150, 2.5 ), new Enemy(-200, 150, 1.5 ));

const player = new Player(202, 399);


function victory() {
  layer.classList.remove("hidden");
  Array.from(layer.children).forEach(child => child.classList.add("hidden"));
  allEnemies.forEach(enemy => enemy.speed = 0);
  document.removeEventListener("keyup", movePlayer);
  win_text.style.cssText = "display: block; margin-top: 200px; color: #fff; font-size: 1.5em;"; /*important! otherwise, adding hidden to all of the children, this text will never be visible*/
  playAgain.classList.add("playAgain");
  playAgain.classList.remove("playAgainHidden");
};


playAgain.addEventListener("click", player.playAgain);


function movePlayer(e) {
  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
}
// This listens for key presses and sends the keys to your Player.handleInput() method.
document.addEventListener('keyup', movePlayer);

btn.addEventListener("click", function() {
    layer.classList.add("hidden");
    title.style.animationIterationCount = 0;
    
  });
