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

    if (numCorrect >= 12) {
      resultsDescContainer.innerHTML = `อาหนูของอาพี่เก่งที่ซู๊ดดดดด ขอจุ๊บหน่อย ( •̀ ω •́ )✧`;
    } else if (numCorrect < 12 && numCorrect >= 9) {
      resultsDescContainer.innerHTML = `เยี่ยมครับผ๊ม อีกนิดจะถูกทั้งหมดแล้วน๊า (✿◡‿◡)`;
    } else if (numCorrect < 9 && numCorrect >= 5) {
      resultsDescContainer.innerHTML = `สบายสบาย กลางๆ กำลังดี เชื่อว่าเธอทำได้ดีกว่านี้น้า §(*￣▽￣*)§`;
    } else {
      resultsDescContainer.innerHTML = `w(ﾟДﾟ)w ได้น้อย แต่ก็รักค่ะ (กราบ) （＞人＜；）`;
    }
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
  const resultsDescContainer = document.getElementById('results-desc');
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
        d: "29 พ.ค. 2562"
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
      question: "6. แล้วอาหนูสูงเท่าไหร่นะคะ ?",
      answers: {
        a: "175",
        b: "170",
        c: "172",
        d: "180"
      },
      correctAnswer: "b"
    },
    {
      question: "7. คนไหนเป็นตัวปลอม ?",
      answers: {
        a: "บี๋",
        b: "อาพี่",
        c: "ที่รัก",
        d: "เจ้าหมี"
      },
      correctAnswer: "a"
    },
    {
      question: "8. คำต้องห้ามของอาหนู ?",
      answers: {
        a: "ไอ้เหี้ย",
        b: "งี่เง่า",
        c: "รำคาญ",
        d: "หยุด"
      },
      correctAnswer: "c"
    },
    {
      question: "9. อาหนูส่งโปสการ์ดมาให้อาพี่กี่อันแล้ว ?",
      answers: {
        a: "3",
        b: "4",
        c: "5",
        d: "6"
      },
      correctAnswer: "b"
    },
    {
      question: "10. เท่านี้ก็ได้ไปซบไหล่เค้าเลยคับ ..",
      answers: {
        a: "20.20",
        b: "520.00",
        c: "55.55",
        d: "100.00"
      },
      correctAnswer: "c"
    },
    {
      question: "11. วันที่ที่เราคบกันคับ ?",
      answers: {
        a: "6",
        b: "7",
        c: "8",
        d: "9"
      },
      correctAnswer: "c"
    },
    {
      question: "12. จงลำดับเหตุการณ์ .. (1) HOP INN | (2) SHANAPING IN MY AREA | (3) Serene Backyard Cafe & Eatery | (4) Tinder | (5) Nan | (6) TAIPEI",
      answers: {
        a: "(4) - (1) - (3) - (5) - (6) - (2)",
        b: "(4) - (1) - (5) - (6) - (3) - (2)",
        c: "(4) - (1) - (3) - (2) - (5) - (6)",
        d: "(4) - (1) - (5) - (3) - (2) - (6)"
      },
      correctAnswer: "d"
    },
    {
      question: "13. อาพี่รักอาหนูแค่ไหน ?",
      answers: {
        a: "เท่าโลก หมุนปั่นจิ้งหรีด 10 รอบ",
        b: "รักมาก แต่น้อยกว่าอาหนูนิดนึง",
        c: "เท่าบ้าน ปักษ์ใต้บ้านเฮา ลั่นล้า",
        d: "เท่าเดินทางจากโลกไปพระจันทร์ แล้วก็กลับมาจากพระจันทร์อีกที"
      },
      correctAnswer: "b"
    },
    {
      question: "14. จงเรียงรหัสลับนี้ให้อยู่ในลำดับที่ถูกต้อง",
      answers: {
        a: "507 421 510 319",
        b: "421 510 319 507",
        c: "510 319 421 507",
        d: "319 507 510 421"
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
