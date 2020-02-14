(function () {
  // Functions
  function buildQuiz() {
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for (letter in currentQuestion.answers) {

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults() {

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = '#28a745';
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[questionNumber].style.color = '##ff2f2f';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `ถูกทั้งหมด ${numCorrect} ข้อ จาก ${myQuestions.length} ข้อ นะจ้ะ`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = 'none';
    }
    else {
      previousButton.style.display = 'inline-block';
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else {
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "1. เราคุยกันครั้งแรก วันไหน จำได้มั้ยคะ ?",
      answers: {
        a: "วันจันทร์",
        b: "วันอังคาร",
        c: "วันพุธ",
        d: "วันพฤหัสบดี",
        e: "วันศุกร์",
      },
      correctAnswer: "a"
    },
    {
      question: "2. วันที่เท่าไหร่น้า ?",
      answers: {
        a: "26 พ.ค. 2562",
        b: "27 พ.ค. 2562",
        c: "28 พ.ค. 2562",
        c: "29 พ.ค. 2562"
      },
      correctAnswer: "b"
    },
    {
      question: "3. หนังเรื่องแรกที่เราดูด้วยกัน ?",
      answers: {
        a: "Alinda",
        b: "Adalin",
        c: "Aladin",
        d: "เอ๊ย ถูกแล้ว!"
      },
      correctAnswer: "c"
    },
    {
      question: "4. ประทับใจอะไรในตัวอาพี่ ?",
      answers: {
        a: "อาหมวย",
        b: "เปย์เก่ง",
        c: "น่ารัก",
        d: "ทั้งหมดเลยค่ะ อาหนูชอบอาพี่ไปหมด"
      },
      correctAnswer: "d"
    },
    {
      question: "5. อาพี่สูงเท่าไหร่คะ ?",
      answers: {
        a: "156",
        b: "157",
        c: "158",
        d: "160"
      },
      correctAnswer: "b"
    },
    {
      question: "6.  ?",
      answers: {
        a: "",
        b: "",
        c: "",
        d: ""
      },
      correctAnswer: "d"
    },
    {
      question: "7.  ?",
      answers: {
        a: "",
        b: "",
        c: "",
        d: ""
      },
      correctAnswer: "a"
    },
    {
      question: "8.  ?",
      answers: {
        a: "",
        b: "",
        c: "",
        d: ""
      },
      correctAnswer: "c"
    },
    {
      question: "9.  ?",
      answers: {
        a: "",
        b: "",
        c: "",
        d: ""
      },
      correctAnswer: "b"
    },
    {
      question: "10. จงเรียงรหัสลับนี้ให้อยู่ในลำดับที่ถูกต้อง",
      answers: {
        a: "507 421 510 319",
        b: "เปย์เก่ง",
        c: "510 319 421 507",
        d: "ทั้งหมดเลยค่ะ อาหนูชอบอาพี่ไปหมด"
      },
      correctAnswer: "c"
    },
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
