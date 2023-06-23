const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".restart");
const btnCopy = document.querySelector(".copy");
const name = document.getElementById("name");
const rg = document.getElementById("rg");

import questions from "./questions.js";

let currentIndex = 0;
let questionsCorrect = 0;

function nextQuestion(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    var randomQuestion = questions[Math.floor(Math.random()*questions.length)]
    console.log(randomQuestion)
    questionsCorrect++;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

function finish() {
  if(questionsCorrect >= Math.round(questions.length * 0.7)) {
    textFinish.innerHTML = `Aprovado, acertou ${questionsCorrect} de ${questions.length}`;
    textFinish.style.color = "green"
    content.style.display = "none";
    contentFinish.style.display = "flex";
    btnCopy.onclick = () => {
      navigator.clipboard.writeText(`\`\`\`\nNOME CONSCRITO: ${name.value}\nRG CONSCRITO: ${rg.value}\nNOTA CONSCRITO: ${questionsCorrect}/${questions.length}\nSTATUS: Aprovado\`\`\``)
      btnCopy.style.color = "green"
      btnCopy.innerHTML = "Copiado ✅"
    }
  }else {
    textFinish.innerHTML = `Reprovado, acertou ${questionsCorrect} de ${questions.length}`;
    textFinish.style.color = "red"
    content.style.display = "none";
    contentFinish.style.display = "flex";
    btnCopy.onclick = () => {
      navigator.clipboard.writeText(`\`\`\`\nNOME CONSCRITO: ${name.value}\nRG CONSCRITO: ${rg.value}\nNOTA CONSCRITO: ${questionsCorrect}/${questions.length}\nSTATUS: Reprovado\`\`\``)
      btnCopy.style.color = "green"
      btnCopy.innerHTML = "Copiado ✅"
    }
  }
}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;

    answers.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
  btnCopy.style.color = "white";
  btnCopy.innerHTML = "Copiar"
}

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;
  // loadQuestion();
  location.reload()
};

loadQuestion();
