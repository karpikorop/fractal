var canvas = document.getElementById("imgCanvas");
var context = canvas.getContext("2d");
var img;
var radioPos = 1; //1 = rgb, 2 = hsl, 3 = cmyk
var lightness = 0;
document.getElementById("option1").disabled = true;
document.getElementById("option2").disabled = true;
document.getElementById("option3").disabled = true;

document.getElementById("form1").addEventListener("submit", function submitFunc(e) {
    e.preventDefault();
    importLink();
});
function lightnessChange(range) {
    lightness = range.value;
    if (radioPos == 3) {
        document.body.style.cursor = "wait";
        document.body.classList.add("inheritCursors");
        window.setTimeout(imgToHSL, 10);
    }
}
function radioClick(radio) {
    //change buttons look

    if (radio.value != radioPos) {
        checkOption(radio.value);

        if (radioPos == 2) {
            document.body.style.cursor = "wait";
            document.body.classList.add("inheritCursors");
            window.setTimeout(imgToCMYK, 200);
        } else if (radioPos == 3) {
            document.body.style.cursor = "wait";
            document.body.classList.add("inheritCursors");
            window.setTimeout(imgToHSL, 200);
        } else {
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
    }
}
function imgToHSL() {
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            let ImageData = context.getImageData(x, y, 1, 1);

            let rgb = new RGB(ImageData.data[0], ImageData.data[1], ImageData.data[2]);

            let hsl = rgbToHSL(rgb);

            if (hsl.s <= 15 && hsl.l > 3 && hsl.l < 90) hsl.l += Math.round(lightness);

            context.beginPath();
            context.rect(x, y, 1, 1);
            context.fillStyle = hsl.getString();
            context.fill();
        }
    }
    document.body.style.cursor = "default";
    document.body.classList.remove("inheritCursors");

    //document.getElementById("info").innerText = "Hello";
}
function imgToCMYK() {
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            let ImageData = context.getImageData(x, y, 1, 1);

            let rgb = new RGB(ImageData.data[0], ImageData.data[1], ImageData.data[2]);
            alpha = ImageData.data[3];

            let cmyk = rgbToCMYK(rgb);
            rgb = cmykToRGB(cmyk);

            ImageData.data[0] = Math.round(cmyk.c * 2.55);
            ImageData.data[1] = Math.round(cmyk.m * 2.55);
            ImageData.data[2] = Math.round(cmyk.k * 2.55);
            ImageData.data[3] = 255;

            //ImageData.data[0] = rgb.r;
            //ImageData.data[1] = rgb.g;
            //ImageData.data[2] = rgb.b;

            context.putImageData(ImageData, x, y);
        }
    }
    document.body.style.cursor = "default";
    document.body.classList.remove("inheritCursors");
}

function enableRadioButtons() {
    document.getElementById("option1").disabled = false;
    document.getElementById("option2").disabled = false;
    document.getElementById("option3").disabled = false;
}
function checkOption(n) {
    let radios = document.getElementsByName("options");

    if (n != radioPos) {
        n--;
        radios[n].checked = true;
        radios[n].parentElement.classList.add("defButton2");
        radios[n].parentElement.classList.remove("revButton2");

        for (i = 0; i < radios.length; i++) {
            if (radios[i].checked != true) {
                radios[i].parentElement.classList.add("revButton2");
                radios[i].parentElement.classList.remove("defButton2");
            }
        }
        radioPos = ++n;
    }
}
function importFile() {
    //back to rgb radio button
    checkOption(1);
    enableRadioButtons();
    context.clearRect(0, 0, canvas.width, canvas.height);
    var filename = document.getElementById("file").value.replace("C:\\fakepath\\", "");

    document.getElementsByClassName("fileInput")[0].placeholder = filename;

    img = new Image();

    img.onload = function () {
        let imgRatio = img.height / img.width;
        canvas.width = canvas.height / imgRatio;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    //img.src = filename.value;

    const file = document.querySelector("input[type=file]").files[0];

    const reader = new FileReader();

    //if file exist
    if (file) {
        reader.readAsDataURL(file);
    } else {
        canvas.width = 800;
        document.getElementsByClassName("fileInput")[0].placeholder = "No image choosen";
    }

    reader.addEventListener(
        "load",
        () => {
            // convert image file to base64 string
            img.src = reader.result;
        },
        false
    );
}
function importLink() {
    //https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg
    context.clearRect(0, 0, canvas.width, canvas.height);
    let url = document.getElementById("urlInput").value;

    img = new Image();

    img.src = url;

    //img.setAttribute("crossOrigin", "");

    img.onload = function () {
        let imgRatio = img.height / img.width;
        canvas.width = canvas.height / imgRatio;
        //img.crossOrigin = "Anonymous";
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    let data = canvas.toDataURL();
    alert(data);
    window.setTimeout(dataURL, 100);
}
function dataURL(data) {
    let img2 = new Image();

    img2.src = data;
    context.drawImage(img2, 0, 0, canvas.width, canvas.height);
    img2.onload = function () {
        let imgRatio = img.height / img.width;
        canvas.width = canvas.height / imgRatio;
        img2.crossOrigin = "Anonymous";
        document.getElementById("info").innerText = "Hello";
        context.drawImage(img2, 0, 0, canvas.width, canvas.height);
    };
}

function HSL(h, s, l) {
    if (h <= 0) {
        h = 0;
    }
    if (s <= 0) {
        s = 0;
    }
    if (l <= 0) {
        l = 0;
    }

    if (h > 360) {
        h = 360;
    }
    if (s > 100) {
        s = 100;
    }
    if (l > 1) {
        l = 1;
    }

    this.h = h;
    this.s = s;
    this.l = l;
    this.getString = function () {
        return "hsl(" + this.h + "," + this.s + "%," + this.l + "%)";
    };
}

function RGB(r, g, b) {
    if (r <= 0) {
        r = 0;
    }
    if (g <= 0) {
        g = 0;
    }
    if (b <= 0) {
        b = 0;
    }

    if (r > 255) {
        r = 255;
    }
    if (g > 255) {
        g = 255;
    }
    if (b > 255) {
        b = 255;
    }

    this.r = r;
    this.g = g;
    this.b = b;
    this.getString = function () {
        return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
    };
}

function CMYK(c, m, y, k) {
    if (c <= 0) {
        c = 0;
    }
    if (m <= 0) {
        m = 0;
    }
    if (y <= 0) {
        y = 0;
    }
    if (k <= 0) {
        k = 0;
    }

    if (c > 100) {
        c = 100;
    }
    if (m > 100) {
        m = 100;
    }
    if (y > 100) {
        y = 100;
    }
    if (k > 100) {
        k = 100;
    }

    this.c = c;
    this.m = m;
    this.y = y;
    this.k = k;
    this.getString = function () {
        return "cmyk(" + this.c + "," + this.m + "," + this.y + "," + this.k + ")";
    };
}
function hexToRGB(H) {
    var rgb = new RGB(0, 0, 0);

    if (H.length == 4) {
        rgb.r = "0x" + H[1] + H[1];
        rgb.g = "0x" + H[2] + H[2];
        rgb.b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
        rgb.r = "0x" + H[1] + H[2];
        rgb.g = "0x" + H[3] + H[4];
        rgb.b = "0x" + H[5] + H[6];
    }
    return rgb;
}
function rgbToHSL(rgb) {
    let r = rgb.r / 255,
        g = rgb.g / 255,
        b = rgb.b / 255;

    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        hsl = new HSL(0, 0, 0);

    // Calculate hue
    // No difference
    if (delta == 0) hsl.h = 0;
    // Red is max
    else if (cmax == r) hsl.h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g) hsl.h = (b - r) / delta + 2;
    // Blue is max
    else hsl.h = (r - g) / delta + 4;

    hsl.h = Math.round(hsl.h * 60);

    // Make negative hues positive behind 360°
    if (hsl.h < 0) {
        hsl.h += 360;
    }

    hsl.l = (cmax + cmin) / 2;

    hsl.s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * hsl.l - 1));

    hsl.l = Math.round(hsl.l * 100);
    hsl.s = Math.round(hsl.s * 100);

    return hsl;
}
function rgbToCMYK(rgb) {
    let cmyk = new CMYK(0, 0, 0, 0);

    let tempC = 1 - rgb.r / 255,
        tempM = 1 - rgb.g / 255,
        tempY = 1 - rgb.b / 255;

    cmyk.k = Math.min(tempC, tempM, tempY);
    if (cmyk.k == 1) {
        cmyk.c = Math.round(tempC * 100);
        cmyk.m = Math.round(tempM * 100);
        cmyk.y = Math.round(tempY * 100);
        cmyk.k = Math.round(cmyk.k * 100);
        return cmyk;
    }

    cmyk.c = Math.round(((tempC - cmyk.k) / (1 - cmyk.k)) * 100);
    cmyk.m = Math.round(((tempM - cmyk.k) / (1 - cmyk.k)) * 100);
    cmyk.y = Math.round(((tempY - cmyk.k) / (1 - cmyk.k)) * 100);
    cmyk.k = Math.round(cmyk.k * 100);

    return cmyk;
}
function cmykToRGB(cmyk) {
    let c = cmyk.c / 100,
        m = cmyk.m / 100,
        y = cmyk.y / 100,
        k = cmyk.k / 100;

    c = c * (1 - k) + k;
    m = m * (1 - k) + k;
    y = y * (1 - k) + k;

    var r = 1 - c;
    var g = 1 - m;
    var b = 1 - y;

    r = Math.round(255 * r);
    g = Math.round(255 * g);
    b = Math.round(255 * b);

    return new RGB(r, g, b);
}
