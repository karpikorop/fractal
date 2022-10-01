var xmin=-2,ymin=-1.2,scale=250;
var x,y,i;
var cx,cy;
var color;
var outerColor = "#ffae00";
var innerColor = "#000";
var iterations = 25;
var canvas = document.getElementById('myCanvas');
canvas.addEventListener("click",zoom,false);
var context = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;

document.getElementById("form1").addEventListener('submit', function submitFunc(e){
    e.preventDefault();
    xmin=-2,ymin=-1.2,scale=250;
    document.getElementById("sbutton").innerHTML = "...Fractal Drawing...";
    iterations = document.getElementById("iterations").value;
    outerColor = document.getElementById("exampleColorInput1").value;
    innerColor = document.getElementById("exampleColorInput2").value;
    window.setTimeout(mandel, 10);
});

function showAlert(){
    alert("That was really slow!");
}

function zoom(event){
    var rect = canvas.getBoundingClientRect();
    var xPos = event.clientX - rect.left;
    var yPos = event.clientY - rect.top;

    xmin=xmin+(Math.floor(xPos)/scale) - (w/scale)/4;
    ymin=ymin+(Math.floor(yPos)/scale) - (h/scale)/4;

    scale=scale*2;

    document.getElementById("sbutton").innerHTML = "...Fractal Drawing...";
    window.setTimeout(mandel, 10);
}


function mandel(){
    
    for(x=0; x<w; x++){
        
        for(y=0; y<h; y++){
            i=0;
            cx=xmin+x/scale;
            cy=ymin+y/scale;

            zx=0; 
            zy=0;
            do{
                temp = zx*zy;
                zx= zx*zx - zy*zy + cx;
                zy= temp + temp + cy;
                i++;
            }while(i<iterations && (zx*zx+zy*zy)<4);
            //  FORMULA
            //(a + bi)(c + di) = ac + adi + bci + bd(i^2) = 
            // = (ac - bd) + (ad + bc)i    because   i^2 = -1

            if(i == iterations){
                color = innerColor;
            }else{
                color = hexToHSL(outerColor, i);
            }

            context.beginPath();
            context.rect(x, y, 1, 1);
            context.fillStyle = color; 
            context.fill();
        }
    }
    document.getElementById("sbutton").innerHTML = "Draw";
}
function hexToHSL(H, i) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    h2 = h + Math.round(50 * i * 1.0 / iterations);
    
    //return "hsl(" + h2 + ", 100%, 50%)";
    return "hsl(" + h2 + "," + s + "%," + l + "%)";
  }
