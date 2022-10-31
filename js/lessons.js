
window.onload = (event) => {
    
};

function openTab(element, cityName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("tabText");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" choosedTab", ""); 
    }
    document.getElementById(cityName).style.display = "block";
    //evt.currentTarget.className += " choosedTab";
    element.className += " choosedTab";
}

function nextTab(n, cityName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("tabText");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" choosedTab", ""); 
    }
    document.getElementById(cityName).style.display = "block";
    //evt.currentTarget.className += " choosedTab";
    tablinks[n].className += " choosedTab";
}

function rgbToolChange(){
  let rgb = new RGB(
    document.getElementById("rInput").value,
    document.getElementById("gInput").value,
    document.getElementById("bInput").value
  )

  document.getElementById("colorCheck").style.backgroundColor = rgb.getString();

  let cmyk = rgbToCMYK(rgb);
  let hsl = rgbToHSL(rgb);
  document.getElementById("cmykField").innerText = cmyk.getString();
  document.getElementById("hslField").innerText = hsl.getString();
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









var myQuestions = [
    {
      question: "1. When was the term 'fractal' first used?",
      answers: {
        a: '1871',
        b: '1975',
        c: '1992'
      },
      correctAnswer: 'b'
    },
    {
      question: "2. When a fractal produces the same shape at smaller and smaller scales, it demonstrates what?",
      answers: {
        a: 'Complexity',
        b: 'Redundancy',
        c: 'Self-similarity'
      },
      correctAnswer: 'c'
    },
    {
        question: "3. According to fractal geometry, the coastline of the United Kingdom is how long?",
        answers: {
          a: '7,723 miles (12,429 kilometers)',
          b: 'infinite',
          c: '6,944 miles (11,175 kilometers)'
        },
        correctAnswer: 'b'
    },
    {
        question: "4. In the fractal equation z = z2 + c, the variable c stands for what?",
        answers: {
          a: 'A complex number',
          b: 'A real number',
          c: 'The speed of light'
        },
        correctAnswer: 'a'
    },
    {
        question: "5. In a colorful version of a Mandelbrot Set, what do the colors represent?",
        answers: {
          a: 'The value of z / log N',
          b: 'The speed at which the equation escapes towards infinity',
          c: 'Whatever the artist is trying to tell you'
        },
        correctAnswer: 'b'
    }
    
  ];
  
  var quizContainer = document.getElementById('quiz');
  var resultsContainer = document.getElementById('results');
  var submitButton = document.getElementById('submit');
  
  generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);
  
  function generateQuiz(questions, quizContainer, resultsContainer, submitButton){
  
    function showQuestions(questions, quizContainer){
      // we'll need a place to store the output and the answer choices
      var output = [];
      var answers;
  
      // for each question...
      for(var i=0; i<questions.length; i++){
        
        // first reset the list of answers
        answers = [];
  
        // for each available answer...
        for(letter in questions[i].answers){
  
          // ...add an html radio button
          answers.push(
            '<label class="quizLabel" id="label'+ letter + i + '">'
              + '<input type="radio" class="quizRadio" name="question'+i+'" value="'+letter+'">'
              
              + questions[i].answers[letter]
            + '</label>'
          );
        }
  
        // add this question and its answers to the output
        output.push(
          '<div class="question">' + questions[i].question + '</div>'
          + '<div class="answers">' + answers.join('') + '</div>'
        );
      }
  
      // finally combine our output list into one string of html and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
  
    function showResults(questions, quizContainer, resultsContainer){
      
        let answers = document.getElementsByClassName("quizLabel");
        for(let i = 0; i<answers.length; i++){
            answers[i].style.color = "rgba(255, 255, 255, 0.55)";
        }
      // gather answer containers from our quiz
      var answerContainers = quizContainer.querySelectorAll('.answers');
      
      // keep track of user's answers
      var userAnswer = '';
      var numCorrect = 0;
      
      // for each question...
      for(var i=0; i<questions.length; i++){
  
        // find selected answer
        userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||"").value;
        let labelText = document.getElementById("label" + userAnswer + i);
        // if answer is correct
        if(userAnswer === questions[i].correctAnswer ){
          // add to the number of correct answers
          numCorrect++;
          
          if(labelText != null){
            // color the answers green
            labelText.style.color = 'lightgreen';
          }
        }
        // if answer is wrong or blank
        else if(userAnswer != ""){
          // color the answers red
          if(labelText != null){
            labelText.style.color = 'red';
        }
        }
      }
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    }
  
    // show questions right away
    showQuestions(questions, quizContainer);
    
    // on submit, show results
    submitButton.onclick = function(){
      showResults(questions, quizContainer, resultsContainer);
    }
  
  }