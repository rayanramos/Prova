const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".restart");
const btnCopy = document.querySelector(".copy");
const btnCopyAnt = document.querySelector(".copyAnt");
const spnScore = document.querySelector(".scoreRealTime");
const form = document.getElementById("form")
const name = document.getElementById("name");
const rg = document.getElementById("rg");

import questions from "./questions.js";

function shuffle(array) {
  var m = array.length, t, i;

  while (m) {

    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
shuffle(questions)

let currentIndex = 0;
let questionsCorrect = 0;

function nextQuestion(e) {
  if (e.target.getAttribute("data-correct") === "true") {
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
    textFinish.style.color = "#50C878"
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
      btnCopy.style.color = "#50C878"
      btnCopy.innerHTML = "Copiado ✅"
    }
  }
}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  if(questionsCorrect < Math.round(questions.length * 0.7) && currentIndex < Math.round(questions.length * 0.7)) {
    spnScore.innerHTML = `Acertou ${questionsCorrect} de ${questions.length}`
    spnScore.style.fontSize = "20px"
    spnScore.style.color = "orange"
  }else if(questionsCorrect < Math.round(questions.length * 0.7) && currentIndex >= Math.round(questions.length * 0.7)){
    spnScore.innerHTML = `Reprovado (Acertou ${questionsCorrect} de ${questions.length})`
    spnScore.style.fontSize = "20px"
    spnScore.style.color = "#FF0000"
  } else if(questionsCorrect >= Math.round(questions.length * 0.7)){
    spnScore.innerHTML = `Aprovado (Acertou ${questionsCorrect} de ${questions.length})`
    spnScore.style.color = "#00FF00"
    spnScore.style.fontSize = "20px"
  }
  
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
  if(confirm("Tem certeza que deseja reiniciar?") === true) {
    location.reload()
  } else{
    return
  }
};

loadQuestion();
