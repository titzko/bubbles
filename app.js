window.onload = function() {
    init();
}

let isDrawing = false;
let x = 0;
let y = 0;
const height = document.body.clientHeight;
const width = document.body.clientWidth;
var amountCircles = 2;
var circles = [];
var max_bubble_connections = 5;


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



function moveCircles() {
    requestAnimationFrame(moveCircles);
    context.clearRect(0, 0, width, height);

    for (var n = 0; n < circles.length; n++) {

        circles.forEach((otherCircle) => {
            if (Math.abs(circles[n].getX() - otherCircle.getX()) < 200 &&
                Math.abs(circles[n].getY() - otherCircle.getY()) < 200 &&
                circles[n].getConnectedBubbles() < max_bubble_connections - 1 &&
                otherCircle.getConnectedBubbles() < max_bubble_connections - 1) {
                circles[n].drawLineToOtherCircle(otherCircle.getX(), otherCircle.getY());
                circles[n].incrConnectedBublles();
                otherCircle.incrConnectedBublles();
            }
        })
        circles[n].drawCircle();
        circles[n].changeCoordinates();
    }

    circles.forEach((circle) => {
        circle.clearConnectedBubbles();
    })
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
        this.dx = Math.floor(1 + Math.random() * 3) * (Math.round(Math.random()) ? 1 : -1); //+ (-3));
        this.dy = Math.floor(1 + Math.random() * 3) * (Math.round(Math.random()) ? 1 : -1); //+ (-3));
        this.defaultSpeedX = 0;
        this.defaultSpeedY = 0;
        this.connectedBubbles = 0;
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

    getConnectedBubbles() {
        return this.connectedBubbles;
    }

    incrConnectedBublles() {
        this.connectedBubbles++;
    }

    clearConnectedBubbles() {
        this.connectedBubbles = 0;
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
        context.fillStyle = this.color;
        context.fill();
    }

    check

    changeCoordinates() {
        this.checkCollision();

        this.xPos = this.xPos + this.dx;
        this.yPos = this.yPos + this.dy;
    }

    drawLineToOtherCircle(xPosition, yPosition) {
        context.beginPath();
        context.moveTo(this.xPos, this.yPos)
        context.lineTo(xPosition, yPosition);
        context.strokeStyle = randomColor();
        context.lineWidth = 3;

        context.stroke();
    }

}

moveCircles();

function createNewCircle() {
    xPos = Math.floor(Math.random() * (width - 200 + 1)) + 200;
    yPos = Math.floor(Math.random() * (height - 200 + 1)) + 200;
    circles.push(new Circle(xPos, yPos));
    document.getElementById('amountID').innerHTML = amountCircles + 1;
    amountCircles++;
    console.log("more");
}

document.getElementById('moreID').onclick = function() {
    createNewCircle();

}

function removeCircle() {
    circles.shift();
    amountCircles = amountCircles - 1;
    document.getElementById('amountID').innerHTML = amountCircles + 1;
    console.log("less");
}

document.getElementById('lessID').onclick = function() {
    removeCircle();
}

$("input").on("keydown", function search(e) {
    if (e.keyCode == 13) {
        let newAmountCircles = document.getElementById('inputID').value;
        while (newAmountCircles > amountCircles) {
            createNewCircle();
        }
        while (newAmountCircles < amountCircles) {
            removeCircle();
        }
    }
});

document.getElementById('numberAmountID').onclick = function() {
    let newAmountCircles = document.getElementById('inputID').value;
    while (newAmountCircles > amountCircles) {
        createNewCircle();
    }
    while (newAmountCircles < amountCircles) {
        removeCircle();
    }
}


//collision
//nur 5 Connections
//bigger Radius on mouseover