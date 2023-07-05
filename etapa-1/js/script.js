(function () {
  "use strict";

  //Constructor
  function Constructor() {
    var ButtonAnswer = document.querySelectorAll(".answer__li");
    for (let i = 0; i < ButtonAnswer.length; i++) {
      ButtonAnswer[i].addEventListener("click", onButtonAnswer, false);
    }
  }

  // Events
  function onButtonAnswer() {
    var Parent = this.parentNode;

    if (this.classList.contains("answer__li--disabled")) {
      return;
    }
    var Answers = Parent.querySelectorAll(".answer__li"),
      Reveal = Parent.parentNode.querySelector("[data-reveal]"),
      Alert = Parent.parentNode.querySelector(".alert"),
      Alert = Parent.parentNode.querySelector(".alert"),
      AlertTitle = Alert.querySelector(".alert__title");

    for (let i = 0; i < Answers.length; i++) {
      Answers[i].classList.add("answer__li--disabled");
    }

    setTimeout(() => {
      Reveal.classList.remove("hide");
      Reveal.scrollIntoView();
    }, "1000");

    if (this.dataset.answer == "true") {
      this.classList.add("answer__li--success");
      Alert.classList.add("alert--succes");
      AlertTitle.innerHTML = "¡Correcto!";
      return;
    }

    for (let i = 0; i < Answers.length; i++) {
      if (Answers[i].dataset.answer == "true") {
        Answers[i].classList.add("answer__li--success");
      }
    }

    this.classList.add("answer__li--error");
  }

  //Export
  window.Trivia = new Constructor();
})(window, document);
