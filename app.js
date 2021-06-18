window.onload = function() {
    init();
}

let isDrawing = false;
let x = 0;
let y = 0;
const height = document.body.clientHeight;
const width = document.body.clientWidth;
var amountCircles = 5;
var circles = [];


const canvas = document.getElementById("myCanvas");
const context = canvas.getContext('2d');


canvas.addEventListener('mousedown', e => {
    x = e.offsetX;
    y = e.offsetY;
    circles.forEach((circle) => {
        if ((x > circle.getX() - circle.getRadius() / 2) && x < circle.getX() + circle.getRadius() / 2) {
            if ((y < circle.getY() + circle.getRadius() / 2) && y > circle.getY() - circle.getRadius() / 2) {
                circle.getBoost();
            }
        }

    })

})

function init() {
    canvas.width = width;
    canvas.height = height;
    canvas.style.margin = "auto";
    canvas.style.display = "block";
    createCircles();
    document.getElementById('amountID').innerHTML = amountCircles;

}

function draw(context, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.closePath();
}

function moveCircles() {
    requestAnimationFrame(moveCircles);
    context.clearRect(0, 0, width, height);
    for (var n = 0; n < circles.length; n++) {

        circles.forEach((otherCircle) => {
            if (Math.abs(circles[n].getX() - otherCircle.getX()) < 200 && Math.abs(circles[n].getY() - otherCircle.getY()) < 200) {
                circles[n].drawLineToOtherCircle(otherCircle.getX(), otherCircle.getY(), otherCircle.getRadius());
            }
        })
        circles[n].drawCircle();
        circles[n].changeCoordinates();



    }
}



function createCircles() {
    var xPos = 0;
    var yPos = 0;
    for (var n = 0; n < amountCircles; n++) {
        xPos = Math.floor(Math.random() * (width - 200 + 1)) + 200;
        yPos = Math.floor(Math.random() * (height - 200 + 1)) + 200;
        circles.push(new Circle(xPos, yPos));
    }

    circles.forEach((circle) => {
        circle.drawCircle();

    })
}



function randomColor() {
    return (
        "rgba(" +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        "," +
        Math.ceil(Math.random() * 10) / 10 +
        ")"
    );
}


class Circle {
    constructor(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.randomRadius = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
        this.color = randomColor();
        this.dx = Math.floor(Math.random() * (3 - (-3)) + (-3));
        this.dy = Math.floor(Math.random() * (3 - (-3)) + (-3));
        this.defaultSpeedX = 0;
        this.defaultSpeedY = 0;
        while(this.dx == 0 || this.dy == 0){
            this.dx = Math.floor(Math.random() * (3 - (-3)) + (-3));
            this.dy = Math.floor(Math.random() * (3 - (-3)) + (-3));
        }
    }

    getX() {
        return this.xPos;
    }

    getY() {
        return this.yPos;
    }

    getRadius() {
        return this.randomRadius;
    }

    checkCollision() {
        if (this.xPos - (this.randomRadius) < 0) {
            this.dx = this.dx * -1;
        }
        if (this.xPos + (this.randomRadius) > width) {
            this.dx = this.dx * -1;
        }
        if (this.yPos - (this.randomRadius) < 0) {
            this.dy = this.dy * -1;
        }
        if (this.yPos + (this.randomRadius) > height) {
            this.dy = this.dy * -1;
        }
    }

    getBoost() {
        this.defaultSpeedX = this.dx;
        this.defaultSpeedY = this.dy;
        this.dx = this.dx * 10;
        this.dy = this.dy * 10;
    }



    drawCircle() {
        context.beginPath();
        context.arc(this.xPos, this.yPos, this.randomRadius, 0, 2 * Math.PI);
        context.arc(this.xPos-this.randomRadius, this.yPos, this.randomRadius, 0, 2 * Math.PI);

        context.ellipse(this.xPos-this.randomRadius/2, this.yPos, this.randomRadius/1.5, 125, 22, 0, Math.PI*1);
        context.fillStyle = this.color;
        context.fill();
    }

    check

    changeCoordinates() {
        this.checkCollision();

        this.xPos = this.xPos + this.dx;
        this.yPos = this.yPos + this.dy;
    }

    drawLineToOtherCircle(xPosition, yPosition, radius) {
        context.beginPath();
        context.moveTo(this.xPos-this.randomRadius/2, this.yPos)
        context.lineTo(xPosition-radius/2, yPosition);
        context.strokeStyle = randomColor();
        context.stroke();
    }

}

moveCircles();

function createNewCircle() {
    xPos = Math.floor(Math.random() * (width - 200 + 1)) + 200;
    yPos = Math.floor(Math.random() * (height - 200 + 1)) + 200;
    circles.push(new Circle(xPos, yPos));
    document.getElementById('amountID').innerHTML = amountCircles;
    amountCircles++;
    console.log("more");
}

document.getElementById('moreID').onclick = function() {
    createNewCircle();

}

function removeCircle() {
    circles.shift();
    amountCircles = amountCircles - 1;
    document.getElementById('amountID').innerHTML = amountCircles;
    console.log("less");
}

document.getElementById('lessID').onclick = function() {
    removeCircle();
}

$("input").on("keydown", function search(e) {
    if (e.keyCode == 13) {
        let newAmountCircles = document.getElementById('inputID').value;
        if (newAmountCircles > amountCircles) {
            while (newAmountCircles > amountCircles) {
                createNewCircle();
            }
        } else if (amountCircles > newAmountCircles) {
            while (newAmountCircles < amountCircles) {
                removeCircle();
            }
        }

    }
});


//plus button
//collision
//nur 5 Connections