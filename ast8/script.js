var $body = document.getElementsByTagName("body")[0];
var speed = 0;
var speed_dy = 1;
var counter = 0;
var bullet_count = 0;
var bullets = [];
var enemies_car = [];
var invunerables_array = [];
var gamestatus = false;
var score = 0;
var run;

var $main = document.getElementById('main');
var $homescreen = document.getElementById('homescreen-wrapper');
var $background = document.getElementById('background');
var $scoreboard = document.getElementById('scoreboard');
var $button = document.getElementById('fly-button');

var frame = new Frame();

$button.onclick = function() {
    console.log('clicked');
    $homescreen.style.display = 'block';
    $background.style.display = 'block';

    this.style.display = 'none';
    main();
}

function main() {
    console.log('main started');
    resetGame();
    car.resetCarPosition();
    gamestatus = true;
    run = setInterval(MainGameLoop, 30);
}

function MainGameLoop() {
    // console.log('MainGameLoop Entered');
    $scoreboard.style.display = 'block';
    createEnemies();
    updateEnemies();
    updateBullets();

    collisionCheck();

    frame.updateBackgroundPostion();

    counter++;
    bullet_count++;
    // console.log(bullet_count);
}

function Frame() {
    this.backgroundY = 0;
    this.background_dY = 0;

    var self = this;

    this.updateBackgroundPostion = function() {
        self.background_dY = speed_dy;
        $background.style.backgroundPosition = "0px " + self.backgroundY + "px";
        self.backgroundY = self.backgroundY + self.background_dY;
        if (counter % 2 == 0) {
            score += 1;
        }
        $scoreboard.innerHTML = score;
    }
}

function HeroCar() {
    this.$car = document.getElementById('car');
    this.carY = 0;
    this.carX = 0;
    var self = this;

    this.resetCarPosition = function() {
        self.carY = 500;
        self.carX = 150;
        self.$car.style.top = self.carY + 'px';
        self.$car.style.left = self.carX + 'px';
    }
    this.updateCarPostion = function(e) {
        var value = 0;
        if (e == 1 && self.carX < 260) {
            value = 110;
        } else if (e == -1 && self.carX > 140) {
            value = -110;
        } else {
            value = 0;
        }

        self.carX = self.carX + value;
        self.$car.style.left = self.carX + 'px';
    }
}


function Enemy() {
    this.x = 0;
    this.y = -100;
    this.dy = 0;
    this.health = 500;
    var self = this;
    this.new_enemy = document.createElement('div');

    this.createEnemy = function() {
        // console.log(self.$new_enemy);
        self.new_enemy.className = 'enemy';
        self.x = self.getRandom();
        self.new_enemy.style.left = self.x + 'px';
        self.new_enemy.style.top = self.y + 'px';
        $background.appendChild(self.new_enemy);
    }
    this.getRandom = function() {
        var random = Math.random();
        if (random >= 0 && random < 0.33) {
            return 40;
        } else if (random >= 0.33 && random < 0.66) {
            return (150);
        } else {
            return (260);
        }
    }

    this.updateEnemy = function() {
        self.dy = speed_dy;
        self.y = self.y + self.dy;
        self.new_enemy.style.top = self.y + 'px';
    }
    this.deleteEnemy = function() {
        $background.removeChild(self.new_enemy);
    }
}

function createEnemies() {
    console.log("IN CREATE ENEMIES");
    if (counter > 80 - (speed_dy * 3)) {
        var e = new Enemy();
        (enemies_car).push(e);
        e.createEnemy();
        counter = 0;
    }
}

function updateEnemies() {
    console.log("IN UPDATE ENEMIES");
    console.log(enemies_car);
    for (var i = 0; i < enemies_car.length; i++) {
        if (enemies_car[i] !== null) {
            enemies_car[i].updateEnemy();
            if (enemies_car[i].y > 500) {
                enemies_car[i].deleteEnemy();
                enemies_car[i] = null;
            }
        }
        // console.log(enemies[i]);
    }
    enemies_car = clearArray(enemies_car);
}


function Bullet() {
    this.bulletX = 0;
    this.bulletY = 0;
    this.dy = 10;

    var self = this;
    this.new_bullet = document.createElement('div');

    this.createBullet = function() {
        // console.log($new_bullet);
        self.new_bullet.className = 'bullet';
        self.bulletX = car.carX + 45;
        self.bulletY = car.carY;
        self.new_bullet.style.left = self.bulletX + 'px';
        self.new_bullet.style.top = self.bulletY + 'px';
        $main.appendChild(self.new_bullet);
    }
    this.updateBullet = function() {
        var t = self.bulletY - self.dy;
        self.bulletY = t;
        self.new_bullet.style.top = self.bulletY + "px";
    }
    this.deleteBullet = function() {
        $main.removeChild(self.new_bullet);
    }
}

function updateBullets() {
    console.log("IN UPDATE BULLETS");
    for (var i = 0; i < bullets.length; i++) {
        if (bullets[i] !== null) {
            bullets[i].updateBullet();
            if (bullets[i].bulletY < 0) {
                bullets[i].deleteBullet();
                bullets[i] = null;
                bullets = clearArray(bullets);
            }
        }
    }
}

function resetGame() {
    var enemies = enemies_car;
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].deleteEnemy();
        enemies[i] = null;
    }
    enemies_car = clearArray(enemies);

    var bullets_temp = bullets;
    for (var i = 0; i < bullets_temp.length; i++) {
        bullets_temp[i].deleteBullet();
        bullets_temp[i] = null;
    }
    bullets = clearArray(bullets_temp);

    gamestatus = true;
    Frame.backgroundY = 0;
    counter = 0;
    bullet_count = 0;
    speedcounter = 0;
    invulcounter = 0;
    speed_dy = 1;
    score = 0;

    var gameover_background = document.getElementById("gameover");
    gameover_background.style.display = "none";
    $scoreboard.style.display = 'none';
}

function collisionCheck() {
    var carY = car.carY;
    var carX = car.carX;
    var ex;
    var ey;
    var bx;
    var by;

    //Collision check for game-over
    var etemp = enemies_car;
    var el = etemp.length;
    var itemp = invunerables_array;
    var il = itemp.length;
    var btemp = bullets;
    var bl = btemp.length;

    for (var i = 0; i < el; i++) {
        if (etemp[i] !== null && etemp[i] !== undefined) {
            ex = etemp[i].x;
            ey = etemp[i].y;
            if ((ex + 90) > carX //right edge of e > left edge of car
                &&
                ex <= (carX + 90) //left edge of e < right edge of car
                &&
                (ey + 90) > carY //bottom edge of e > top edge of car
                &&
                ey <= (carY + 90) //top edge of e > bottom edge of car
            ) {
                explodeAnim(carX, carY);
                // alert('Game Over!!!!');

                var gameovermsg = document.getElementById("gameovermsg");
                gameovermsg.innerHTML = "Game Over";
                gameOver();
                // gamestatus = false;
            }

            // 		//Collision check for bullets
            for (var j = 0; j < bl; j++) {
                if (btemp[j] != null) {
                    bx = btemp[j].bulletX;
                    by = btemp[j].bulletY;

                    if ((ex + 90) > bx //right edge of e > left edge of bullet
                        &&
                        ex <= (bx + 10) //left edge of e < right edge of bullet
                        &&
                        (ey + 70) > by //bottom edge of e > top edge of bullet
                        &&
                        ey <= (by + 10) //top edge of e > bottom edge of bullet
                    ) {
                        btemp[j].deleteBullet();
                        btemp[j] = null;

                        hitAnim(ex, ey);
                        etemp[i].health = etemp[i].health - 100;
                        if (etemp[i].health <= 0) {
                            explodeAnim(ex, ey);
                            // enemies_car.splice(i, 1);
                            etemp[i].deleteEnemy();
                            etemp[i] = null;
                            score = score + 50;
                        }

                    }
                }
            }
        } //for j end
    } //for i end

    bullets = clearArray(btemp);
    enemies_car = clearArray(etemp);
}

function hitAnim(ex, ey) {
    var hit_id = document.createElement('div');
    hit_id.className = "explosion"; //style
    hit_id.style.left = (ex - 10) + "px";
    hit_id.style.top = (ey) + "px";
    $main.appendChild(hit_id);
    hit_id.style.backgroundPosition = "0px " + "0px";

    var animate = setInterval(updateAnimate, 13);
    var animcounter = 0;

    function updateAnimate() {

        if (animcounter >= 1) {
            $main.removeChild(hit_id);
            clearInterval(animate);
        }
        animcounter++;
    }
}

function explodeAnim(ex, ey) {
    var explode_id = document.createElement('div');
    explode_id.className = "explosion"; //style
    explode_id.style.left = (ex) + "px";
    explode_id.style.top = (ey) + "px";
    $main.appendChild(explode_id);

    var animate = setInterval(updateAnimate, 15);
    var animcounter = 0;

    function updateAnimate() {
        if (animcounter == 2) {
            explode_id.style.backgroundPosition = "0px " + "0px";
        }
        if (animcounter == 4) {
            explode_id.style.backgroundPosition = "118px " + "0px";
        }
        if (animcounter == 6) {
            explode_id.style.backgroundPosition = "236px " + "0px";
        }
        if (animcounter == 8) {
            explode_id.style.backgroundPosition = "354px " + "0px";
        }
        if (animcounter == 10) {
            explode_id.style.backgroundPosition = "472px " + "0px";
        }
        if (animcounter >= 12) {
            $main.removeChild(explode_id);
            clearInterval(animate);
        }
        // console.log(animcounter);
        animcounter++;
    }
}

function gameOver() {
    clearInterval(run);
    var gameover_background = document.getElementById("gameover");
    gameover_background.style.display = "block";

    var score_display = document.getElementById("display-score");
    score_display.innerHTML = score;
}


function clearArray(input) {
    return input.filter(function(e) {
        return e !== null
    })
}

function keydownEventHandler(e) {
    // var homescreen = document.getElementById("homescreen-wrapper");
    console.log(e.keyCode);
    if (gamestatus) {
        if (e.keyCode == 37) {
            //left
            car.updateCarPostion(-1);
        }

        if (e.keyCode == 39) {
            //right
            car.updateCarPostion(+1);
        }


        if (e.keyCode == 32) {
            //left
            if (bullet_count >= 5) {
                // console.log('bullet created');
                var e = new Bullet();
                (bullets).push(e);
                e.createBullet();
                bullet_count = 0;
            }
        }

        if (e.keyCode == 27) {
            console.log("ESC PRESSED!!!");
            resetGame();
            $homescreen.style.display = "block";
            $background.style.display = "none";
            $button.style.display = "block";
        }
    } else {
        if (e.keyCode == 27) {
            $homescreen.style.display = "block";
        }
    }
}

function keyupEventHandler(e) {
    return undefined;
}


document.onkeydown = keydownEventHandler;
document.onkeyup = keyupEventHandler;

/*OBJECTS*/
var car = new HeroCar();
car.updateCarPostion();
car.resetCarPosition();