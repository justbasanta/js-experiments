var $body = document.getElementsByTagName("body")[0];
console.log($body);
var n = 4; //no. of boxes
function getRandom() {
    return (Math.floor(Math.random() * 250));
}

function Container(props) {
    this.height = props.height;
    this.width = props.width;
    this.$parent = props.$parent;
    this.$elem = document.createElement("div");
    this.boxes = [];

    var self = this;

    this.plot = function() {
        self.$elem.className = "container";
        self.$elem.style.height = self.height + "px";
        self.$elem.style.width = self.width + "px";
        self.$parent.appendChild(self.$elem);
    };

    this.addBox = function(box) {
        this.boxes.push(box);
    };

    this.interval = function() {
        setInterval(function() {
            for (var i = 0; i < n; i++) {
                self.boxes[i].incrementPosition();
                self.boxes[i].updateElement();
                self.boxes[i].checkCollisionWall();
            }
            for (i = 0; i < n; i++) {
                for (j = 0; j < n - 1; j++) {
                    if (self.boxes[i].checkCollision(self.boxes[j])) {
                        //console.log("BOOM");
                        self.boxes[i].reversePosition();
                        self.boxes[j].reversePosition();
                    }

                }
            }
        }, 100);

    };
}

function Box(props) {
    this.x = props.x || getRandom();
    this.y = props.y || getRandom();
    this.dx = props.dx || 1
    this.dy = props.dy || 1
    this.size = props.size || 20
    this.speed = props.speed || 5
    this.container = props.container || container;
    this.backgroundColor = props.backgroundColor || 'black';
    this.$elem = document.createElement("div");

    var self = this;
    this.$elem.onclick = function() {
        console.log('clicked');
        console.log(this);
        this.remove();
    }

    var self = this;

    var updateElement = function() {
        self.$elem.style.top = self.y + "px";
        self.$elem.style.left = self.x + "px";
    };

    this.plot = function() {
        self.$elem.className = "box";
        self.$elem.style.height = self.size + "px";
        self.$elem.style.width = self.size + "px";
        self.$elem.style.backgroundColor = self.backgroundColor;
        self.container.$elem.appendChild(self.$elem);
        updateElement();
    };

    this.incrementPosition = function() {
        self.x += self.dx * self.speed;
        self.y += self.dy * self.speed;
    };

    this.updateElement = function() {
        updateElement();
    };

    this.reversePosition = function() {
        self.dx *= -1;
        self.dy *= -1;
    };
    this.checkCollisionWall = function() {
        var ballLeft = this.x;
        var ballRight = this.x + 20;
        var ballTop = this.y;
        var ballBottom = this.y + 20;

        var containerTop = 10;
        var containerLeft = 10;
        var containerRight = 480;
        var containerBottom = 480;

        //ball.right = ball.left + ball.width

        if (ballRight > containerRight) {
            this.dx = -this.dx;
            // console.log(ball.y)
        }
        if (ballBottom > containerBottom) {
            this.dy = -this.dy;
        }
        if (ballTop < containerTop) {
            this.dy = -this.dy;
        }
        if (ballLeft < containerLeft) {
            this.dx = -this.dx;
            // alert('Left ma gayo');
        }

    }

    this.checkCollision = function(box2) {
        var b1Left = this.x;
        var b1Right = this.x + this.size;
        var b1Top = this.y;
        var b1Bottom = this.y + this.size;

        var b2Left = box2.x;
        var b2Right = box2.x + this.size;
        var b2Top = box2.y;
        var b2Bottom = box2.y + this.size;

        //right edge of 1 > left edge of 2
        //left edge of 1 < right edge of 2
        //bottom edge of 1 > top edge of 2
        //top edge of 1 < bottom edge of 2
        return (
            b1Right > b2Left &&
            b1Left < b2Right &&
            b1Bottom > b2Top &&
            b1Top < b2Bottom
        );
    };
}

var container = new Container({
    height: 500,
    width: 500,
    $parent: $body
});
container.plot();
container.interval(); 

// var container1 = new Container({
//     height: 500,
//     width: 500,
//     $parent: $body
// });
// container1.plot();
// container1.interval(); 

// var container2 = new Container({
//     height: 500,
//     width: 500,
//     $parent: $body
// });
// container1.plot();
// container1.interval();


//var box1 = new Box({
//x: 0,
// y: 10,
// size: 50,
// dx: 1,
// dy: 0,
// speed: 10,
// container: container,
// backgroundColor: "blue"
// });
// container.addBox(box1);
// box1.plot();

// var box2 = new Box({
//   x: 500,
//   y: 10,
//   size: 50,
//   dx: -1,
//   dy: 0,
//   speed: 10,
//   container: container,
//   backgroundColor: "red"
// });
// container.addBox(box2);
// box2.plot();


var box = {}
for (var i = 0; i < n; ++i) {
    box[i] = new Box({})
    container.addBox(box[i]);
    console.log(box[i]);
    box[i].plot();
}



// setInterval(function() {
//   container.boxes.forEach(box => {
//     box.incrementPosition();
//     box.updateElement();
//     box.checkCollisionWall()
//   });
//   for(i = 0; i<n; i++){
//     for(j = 0; j<n-1; j++){
//       if (box[i].checkCollision(box[j])) {
//       //console.log("BOOM");

//       box[i].reversePosition();
//       box[j].reversePosition();
//     }

//     }
//   }
// }, 100);

// if (box1.checkCollision(box2)) {
//   console.log("BOOM");

//   box1.reversePosition();
//   box2.reversePosition();
// }


//console.log(box1);