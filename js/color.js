var canvas = document.getElementById("myCanvas");
//canvas.addEventListener("click", zoom, false);
var context = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;

document.getElementById("form1").addEventListener("submit", function submitFunc(e) {
    e.preventDefault();
});

function importFile() {
    var filename = document.getElementById("file").value.replace("C:\\fakepath\\", "");

    document.getElementsByClassName("fileInput")[0].placeholder = filename;

    var img = new Image();

    img.onload = function () {
        context.drawImage(img, 0, 0, 800, 600);
    };
    img.src = filename.value;

    const file = document.querySelector("input[type=file]").files[0];

    const reader = new FileReader();

    reader.addEventListener(
        "load",
        () => {
            // convert image file to base64 string
            img.src = reader.result;
        },
        false
    );

    if (file) {
        reader.readAsDataURL(file);
    }
}

function importLink() {
    var url = document.getElementById("urlInput").value;

    var img = new Image();

    img.onload = function () {
        context.drawImage(img, 0, 0);
    };
    img.src = url;

    const file = document.querySelector("input[type=file]").files[0];

    const reader = new FileReader();

    reader.addEventListener(
        "load",
        () => {
            // convert image file to base64 string
            img.src = reader.result;
        },
        false
    );

    if (file) {
        reader.readAsDataURL(file);
    }
}

document.getElementsById("formFile").innerHTML = "Hello";

function hexToHSL(H, i) {
    // Convert hex to RGB first
    let r = 0,
        g = 0,
        b = 0;
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
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    h2 = h + Math.round((50 * i * 1.0) / iterations);

    //return "hsl(" + h2 + ", 100%, 50%)";
    return "hsl(" + h2 + "," + s + "%," + l + "%)";
}
