var canvas = document.getElementById("affine");
var context = canvas.getContext("2d");
context.transform(1, 0, 0, -1, 0, canvas.height);
context.translate(400, 300);
//context.rotate(180);
let point1 = new Coordinate(0, 0);
let point2 = new Coordinate(0, 0);
let square;
let shapeColor = "#d84b4b";
let isMoving = false;

window.onload = (event) => {
    context.clearRect(-400, -300, canvas.width, canvas.height);
    context.beginPath();
    context.moveTo(50, 50);
    context.lineTo(50, -50);
    context.lineTo(-50, -50);
    context.lineTo(-50, 50);
    context.fillStyle = "#d84b4b";
    context.fill();
    context.closePath();
};

document.getElementById("form1").addEventListener("submit", function submitFunc(e) {
    e.preventDefault();
    if(isMoving == true){
        isMoving = false;
        return;
    }

    point1.x = +document.getElementById("point1X").value;
    point1.y = +document.getElementById("point1Y").value;
    point2.x = +document.getElementById("point2X").value;
    point2.y = +document.getElementById("point2Y").value;
    if(point1.x == point2.x && point1.y == point2.y){
        alert("Coordinate can't be the same!");
        //return;
    }
    shapeColor = document.getElementById("exampleColorInput").value;
    square = CalculateSquareAngles(point1, point2);
    //document.getElementById("info").innerText = point1.x + " " + point2.y;
    isMoving = true;

    drawSquare();
    document.getElementById("rotateButton").innerHTML = "Stop";
    window.setTimeout(drawAndRotateSquare, 300);
});


function drawAndRotateSquare(){

    drawSquare();
    if(square.getMiddle().y > 400 || isMoving == false){
        document.getElementById("rotateButton").innerHTML = "Start";
        isMoving = false;
        if(square.getMiddle().y > 400){
            square = CalculateSquareAngles(point1, point2);
            drawSquare();
        }
        return;
    }
    rotateSquare();
    window.setTimeout(drawAndRotateSquare, 20);
}

function drawSquare(){
    context.clearRect(-400, -300, canvas.width, canvas.height);
    context.beginPath();
    context.moveTo(square.a.x, square.a.y);
    context.lineTo(square.b.x, square.b.y);
    context.lineTo(square.c.x, square.c.y);
    context.lineTo(square.d.x, square.d.y);
    context.fillStyle = shapeColor;
    context.fill();
    context.closePath();
}

function rotateSquare(){
    square.a.y += 3;
    square.b.y += 3;
    square.c.y += 3;
    square.d.y += 3;

    let middle = square.getMiddle();
    //middle.x = 0;
    //middle.y = 0;

    square.a.x = middle.x + (square.a.x-middle.x) * Math.cos(0.03) - (square.a.y-middle.y) * Math.sin(0.03);
    square.a.y = middle.y + (square.a.x-middle.x) * Math.sin(0.03) + (square.a.y-middle.y) * Math.cos(0.03);
    
    square.b.x = middle.x + (square.b.x-middle.x) * Math.cos(0.03) - (square.b.y-middle.y) * Math.sin(0.03);
    square.b.y = middle.y + (square.b.x-middle.x) * Math.sin(0.03) + (square.b.y-middle.y) * Math.cos(0.03);

    square.c.y = middle.y + (square.c.x-middle.x) * Math.sin(0.03) + (square.c.y-middle.y) * Math.cos(0.03);
    square.c.x = middle.x + (square.c.x-middle.x) * Math.cos(0.03) - (square.c.y-middle.y) * Math.sin(0.03);

    square.d.x = middle.x + (square.d.x-middle.x) * Math.cos(0.03) - (square.d.y-middle.y) * Math.sin(0.03);
    square.d.y = middle.y + (square.d.x-middle.x) * Math.sin(0.03) + (square.d.y-middle.y) * Math.cos(0.03);

    //square.d.x = middle.x + square.d.x * Math.cos(0.03) - square.d.y * Math.sin(0.03);
    //square.d.y = middle.y + square.d.x * Math.sin(0.03) + square.d.y * Math.cos(0.03);


}


function CalculateSquareAngles(p1, p2){

    let a = new Coordinate(p1.x, p1.y);
    let c = new Coordinate(p2.x, p2.y);
    let b = new Coordinate((p1.x + p2.x + p1.y - p2.y)/2, (p2.x - p1.x + p1.y + p2.y)/2);
    let d = new Coordinate((p1.x + p2.x + p2.y - p1.y)/2, (p1.x - p2.x + p1.y + p2.y)/2);

    return new Square(a,b,c,d);
}

function Square(a, b, c, d) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.getMiddle = function () {
        let middle = new Coordinate((+a.x + c.x) / 2, (+a.y + c.y) / 2);
        return middle;
    };
}

function Coordinate(x, y) {
    this.x = x;
    this.y = y;
}