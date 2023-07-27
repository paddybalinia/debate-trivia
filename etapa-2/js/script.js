(function () {
  "use strict";

  var respuestas = [],
    cantPoints = 0,
    FormNewsletter = document.querySelector(".suscribe"),
    FormEmail = FormNewsletter.querySelector(".suscribe__input");

  //Constructor
  function Constructor() {
    var ButtonAnswer = document.querySelectorAll(".answer__li");
    var ButtonReset = document.querySelector(".button__reset");
    for (let i = 0; i < ButtonAnswer.length; i++) {
      ButtonAnswer[i].addEventListener("click", onButtonAnswer, false);
    }

    var ButtonShare = document.querySelectorAll(".share__a");
    for (let i = 0; i < ButtonShare.length; i++) {
      ButtonShare[i].addEventListener("click", onButtonShare, false);
    }

    ButtonReset.addEventListener("click", onButtonReset, false);

    FormNewsletter.addEventListener("submit", onSubmitNewsltter, false);
    FormEmail.addEventListener("keypress", onTypeEmail, false);
    FormEmail.addEventListener("keyup", onTypeEmail, false);
  }

  /**
   * Suscribe
   * @param {*} email
   * @returns
   */
  function isValidEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  function showErrorHint() {
    FormEmail.parentNode.parentNode.classList.add("newsletter-invalid");
  }
  function hideErrorHint() {
    FormEmail.parentNode.parentNode.classList.remove("newsletter-invalid");
  }
  function showSuccess() {
    FormNewsletter.classList.add("form-succes");

    iframeResize();

    setTimeout(function () {
      FormNewsletter.classList.remove("form-succes");

      iframeResize();
    }, 3000);
  }
  function onTypeEmail() {
    if (isValidEmail(FormEmail.value)) {
      hideErrorHint();
    } else {
      showErrorHint();
    }
    iframeResize();
  }

  function iframeResize() {
    var IframeHeight = document.body.scrollHeight;
    window.parent.postMessage(IframeHeight, window.location);

    setTimeout(() => {
      window.requestAnimationFrame(() => {
        var message = {
          sentinel: "amp",
          type: "embed-size",
          height: IframeHeight,
        };
        window.parent.postMessage(message, "*");
      });
    }, "200");
  }

  /**
   *
   * @param {*} delay1 es el delay del primer intervalo de tiempo
   * @param {*} delay2 es el delay del segundo intervalo de tiempo
   * @param {*} delay3 es el delay del tercero intervalo de tiempo, es falso por default
   * @param {*} elementScroll elemento al que se le hace Scroll, null por dafault
   * @param {*} showConfetti boolean por defecto no se muestra
   * @param {*} ShowElement Elemento a mostrar
   */
  function resizeTrivia({
    delay1 = "800",
    delay2 = "400",
    delay3 = false,
    elementScroll = null,
    showConfetti = false,
    ShowElement = false,
  }) {
    setTimeout(() => {
      if (ShowElement) {
        ShowElement.classList.remove("hide");
      }

      setTimeout(() => {
        iframeResize();

        if (delay3 && elementScroll) {
          setTimeout(() => {
            elementScroll.scrollIntoView();

            if (showConfetti) {
              AnimConfetti();
            }
          }, delay3);
        }
      }, delay2);
    }, delay1);
  }

  /**
   * Mailchimp ajax request
   * @param {*} event
   * @returns response
   */
  function onSubmitNewsltter(event) {
    event.preventDefault();

    if (!isValidEmail(FormEmail.value)) {
      showErrorHint();
      return;
    }

    var params = {
      u: "e4231a24b452b97d090ececc9",
      id: "1412f9067f",
      tags: "414022",
      MERGE0: FormEmail.value,
    };

    fetch(
      "https://debate.us13.list-manage.com/subscribe/post?" +
        new URLSearchParams(params).toString()
    )
      .then(function (response) {
        return response.text();
      })
      .then(function (html) {
        showSuccess();
      })
      .catch(function (error) {
        showSuccess();
      });
  }

  // Events

  /**
   * Event on click Answer
   * @returns
   */
  function onButtonAnswer() {
    var Parent = this.parentNode;

    if (this.classList.contains("answer__li--disabled")) {
      return;
    }
    var Answers = Parent.querySelectorAll("li[data-points]"),
      ButtonNext = document.querySelectorAll("button[data-next]"),
      Reveal = Parent.parentNode.querySelector("[data-reveal]"),
      Alert = Parent.parentNode.querySelector(".alert"),
      Alert = Parent.parentNode.querySelector(".alert"),
      AlertTitle = Alert.querySelector(".alert__title");

    for (let i = 0; i < ButtonNext.length; i++) {
      ButtonNext[i].addEventListener("click", showNextItem, false);
    }

    for (let i = 0; i < Answers.length; i++) {
      Answers[i].classList.add("answer__li--disabled");
    }

    resizeTrivia({
      delay1: "100",
      delay2: "200",
      delay3: "300",
      elementScroll: Reveal,
      ShowElement: Reveal,
    });

    var NumBig = getNumberBig(Answers);

    cantPoints = cantPoints + Number(this.dataset.points);
    var isTrue = this.dataset.points == NumBig ? true : false;
    agregarRespuesta(isTrue);

    if (this.dataset.points == NumBig) {
      this.classList.add("succes");
      Alert.classList.add("alert--succes");
      AlertTitle.innerHTML = "¡Correcto!";
      return;
    }

    for (let i = 0; i < Answers.length; i++) {
      if (Answers[i].dataset.points == NumBig) {
        Answers[i].classList.add("succes");
      }
    }

    this.classList.add("error");
    Alert.classList.add("alert--error");
    AlertTitle.innerHTML = "¡Incorrecto!";
  }

  /**
   *
   * @param {*} arrayNumbers points from the answers of the active question
   * @returns returns the largest number
   */
  function getNumberBig(arrayNumbers) {
    let mayor = null;
    arrayNumbers.forEach((elemento) => {
      const number = parseInt(elemento.getAttribute("data-points"));
      if (mayor === null || number > mayor) {
        mayor = number;
      }
    });
    return mayor;
  }

  /**
   *
   * Event on click Buttons de share
   */
  function onButtonShare(e) {
    e.preventDefault();

    var ShareUrl =
        window.location != window.parent.location
          ? document.referrer
          : document.location.href,
      ShareText = "¿Te atreves a jugar a esta trivia?",
      ShareSocial = this.dataset.share;

    if (ShareSocial == "whatsapp") {
      window.open("whatsapp://send?text=%20" + ShareText + "%20" + ShareUrl);
    }
    if (ShareSocial == "facebook") {
      window.open(
        "https://www.facebook.com/sharer/sharer.php?u=" + ShareUrl,
        "_blank",
        "height=368,width=600,left=100,top=100,menubar=0"
      );
    }
    if (ShareSocial == "twitter") {
      window.open(
        "https://twitter.com/intent/tweet?text= " +
          ShareText +
          "&url=" +
          ShareUrl +
          "_blank",
        "height=260,width=500,left=100,top=100,menubar=0"
      );
    }
    if (ShareSocial == "mail") {
      window.open(
        "mailto:?subject=¡Participa en la trivia!&body=" +
          ShareText +
          " %20 " +
          ShareUrl
      );
    }
  }

  /**
   *
   * Event on click Buttons Next item
   */
  function showNextItem() {
    const parent = this.parentElement.parentElement;
    const nextLi = parent.nextElementSibling;

    if (nextLi) {
      resizeTrivia({
        delay1: "100",
        delay2: "200",
        delay3: "300",
        elementScroll: nextLi,
        ShowElement: nextLi,
      });
    } else {
      if (this.classList.contains("showresult")) {
        return;
      }
      this.classList.add("showresult");

      var Header = document.querySelector(".header"),
        triviaLi = document.querySelectorAll(".trivia__li");

      // Ocultamos tods las preguntas
      for (let i = 0; i < triviaLi.length; i++) {
        triviaLi[i].classList.add("hide");
      }
      Header.scrollIntoView();
      showResult();
    }
  }

  /**
   *
   * @param {*} respuesta boolean
   * @returns array respuestas
   */
  function agregarRespuesta(respuesta) {
    respuestas.push(respuesta);
  }

  /**
   *
   * Event on click last question Button
   * and show de results
   */
  function showResult() {
    var Results = document.querySelector(".results");
    Results.classList.remove("hide");

    const ulRespuestas = document.querySelector(".points__ul");

    var indice = 0;
    for (const respuesta of respuestas) {
      const liRespuesta = document.createElement("li");
      liRespuesta.className = "points__li";

      if (respuesta) {
        liRespuesta.classList.add("succes");
      } else {
        liRespuesta.classList.add("error");
      }

      const divText = document.createElement("div");
      divText.className = "points__text";
      divText.textContent = `Pregunta ${indice + 1}`;

      const divBadge = document.createElement("div");
      divBadge.className = "badge badge--small";

      liRespuesta.appendChild(divText);
      liRespuesta.appendChild(divBadge);
      ulRespuestas.appendChild(liRespuesta);
      indice++;

      var boxResult = document.querySelectorAll(".points__result");

      boxResult.forEach((div) => {
        var min = parseInt(div.getAttribute("data-min"));
        var max = parseInt(div.getAttribute("data-max"));

        if (cantPoints >= min && cantPoints <= max) {
          div.classList.remove("hide");
        }
      });
    }

    resizeTrivia({
      delay1: "100",
      delay2: "200",
      delay3: "300",
      elementScroll: Results,
      showConfetti: true,
      ShowElement: Results,
    });

    countSuccess();
  }

  /**
   * Show the text according to the correct answers
   */
  function countSuccess() {
    var textResult = document.querySelector(".points__texto"),
      liElements = document.querySelectorAll(".points__li"),
      succesCount = 0;

    for (var liElement of liElements) {
      if (liElement.classList.contains("succes")) {
        succesCount++;
      }
    }

    if (succesCount > 0) {
      if (succesCount == 1) {
        textResult.textContent =
          "Respondiste correctamente " + succesCount + " pregunta";
      } else {
        textResult.textContent =
          "Respondiste correctamente " + succesCount + " preguntas";
      }
    } else {
      textResult.textContent = "No respondiste correctamente ninguna pregunta";
    }
  }

  /**
   *
   * Event on click reset Button
   * Reset all items of the trivia
   */
  function onButtonReset() {
    var Header = document.querySelector(".header"),
      Results = document.querySelector(".results"),
      BtnResult = document.querySelector(".showresult"),
      answerElement = document.querySelectorAll(".answer__li"),
      revealElement = document.querySelectorAll(".container-reveal"),
      alertElement = document.querySelectorAll(".alert"),
      triviaLi = document.querySelectorAll(".trivia__li"),
      triviaLiFirst = triviaLi[0];

    Header.scrollIntoView();
    const Confetti = document.querySelector("body > div:last-child");

    // Reset Confetti on Fade
    Confetti.style.opacity = 0;
    Confetti.style.transition = "opacity .3s linear";
    Confetti.remove();

    // Hide table result
    Results.classList.add("hide");

    // Reset all answers
    for (let e = 0; e < answerElement.length; e++) {
      answerElement[e].classList.remove("succes");
      answerElement[e].classList.remove("error");
      answerElement[e].classList.remove("answer__li--disabled");
    }

    // Reset result table
    const pointsUlElements = document.querySelectorAll(".points__ul > li");

    for (const pointsUlElement of pointsUlElements) {
      pointsUlElement.remove();
    }

    // Hide all questions
    for (let i = 0; i < triviaLi.length; i++) {
      triviaLi[i].classList.add("hide");
    }

    // Hide all answers
    for (let i = 0; i < revealElement.length; i++) {
      revealElement[i].classList.add("hide");
    }

    // Reset alerts
    for (let i = 0; i < alertElement.length; i++) {
      alertElement[i].classList.remove("alert--error");
      alertElement[i].classList.remove("alert--succes");
    }

    // Show first question
    triviaLiFirst.classList.remove("hide");

    // Reset Button result
    BtnResult.classList.remove("showresult");

    respuestas = [];

    cantPoints = 0;

    // Reset de el texto segun puntos
    var pointsResult = document.querySelectorAll(".points__result");
    pointsResult.forEach((div) => {
      div.classList.add("hide");
    });

    // Resize de iframe
    iframeResize();
  }

  window.onload = function () {
    iframeResize();
  };

  /**
   * Confetti Animation
   * @autor https://codepen.io/bananascript/pen/EyZeWm
   */
  function AnimConfetti() {
    // Globals
    var random = Math.random,
      cos = Math.cos,
      sin = Math.sin,
      PI = Math.PI,
      PI2 = PI * 2,
      timer = undefined,
      frame = undefined,
      confetti = [];

    var particles = 10,
      spread = 20,
      sizeMin = 3,
      sizeMax = 12 - sizeMin,
      eccentricity = 10,
      deviation = 100,
      dxThetaMin = -0.1,
      dxThetaMax = -dxThetaMin - dxThetaMin,
      dyMin = 0.18,
      dyMax = 0.23,
      dThetaMin = 0.4,
      dThetaMax = 0.7 - dThetaMin;

    var colorThemes = [
      function () {
        return color(
          (200 * random()) | 0,
          (200 * random()) | 0,
          (200 * random()) | 0
        );
      },
      function () {
        var black = (200 * random()) | 0;
        return color(200, black, black);
      },
      function () {
        var black = (200 * random()) | 0;
        return color(black, 200, black);
      },
      function () {
        var black = (200 * random()) | 0;
        return color(black, black, 200);
      },
      function () {
        return color(200, 100, (200 * random()) | 0);
      },
      function () {
        return color((200 * random()) | 0, 200, 200);
      },
      function () {
        var black = (256 * random()) | 0;
        return color(black, black, black);
      },
      function () {
        return colorThemes[random() < 0.5 ? 1 : 2]();
      },
      function () {
        return colorThemes[random() < 0.5 ? 3 : 5]();
      },
      function () {
        return colorThemes[random() < 0.5 ? 2 : 4]();
      },
    ];
    function color(r, g, b) {
      return "rgb(" + r + "," + g + "," + b + ")";
    }

    // Cosine interpolation
    function interpolation(a, b, t) {
      return ((1 - cos(PI * t)) / 2) * (b - a) + a;
    }

    // Create a 1D Maximal Poisson Disc over [0, 1]
    var radius = 1 / eccentricity,
      radius2 = radius + radius;
    function createPoisson() {
      // domain is the set of points which are still available to pick from
      // D = union{ [d_i, d_i+1] | i is even }
      var domain = [radius, 1 - radius],
        measure = 1 - radius2,
        spline = [0, 1];
      while (measure) {
        var dart = measure * random(),
          i,
          l,
          interval,
          a,
          b,
          c,
          d;

        // Find where dart lies
        for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
          (a = domain[i]), (b = domain[i + 1]), (interval = b - a);
          if (dart < measure + interval) {
            spline.push((dart += a - measure));
            break;
          }
          measure += interval;
        }
        (c = dart - radius), (d = dart + radius);

        // Update the domain
        for (i = domain.length - 1; i > 0; i -= 2) {
          (l = i - 1), (a = domain[l]), (b = domain[i]);
          // c---d          c---d  Do nothing
          //   c-----d  c-----d    Move interior
          //   c--------------d    Delete interval
          //         c--d          Split interval
          //       a------b
          if (a >= c && a < d)
            if (b > d) domain[l] = d; // Move interior (Left case)
            else domain.splice(l, 2);
          // Delete interval
          else if (a < c && b > c)
            if (b <= d) domain[i] = c; // Move interior (Right case)
            else domain.splice(i, 0, c, d); // Split interval
        }

        // Re-measure the domain
        for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
          measure += domain[i + 1] - domain[i];
      }

      return spline.sort();
    }

    // Create the overarching container
    var container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "0";
    container.style.overflow = "visible";
    container.style.zIndex = "9999";

    // Confetto constructor
    function Confetto(theme) {
      this.frame = 0;
      this.outer = document.createElement("div");
      this.inner = document.createElement("div");
      this.outer.appendChild(this.inner);

      var outerStyle = this.outer.style,
        innerStyle = this.inner.style;
      outerStyle.position = "absolute";
      outerStyle.width = sizeMin + sizeMax * random() + "px";
      outerStyle.height = sizeMin + sizeMax * random() + "px";
      innerStyle.width = "100%";
      innerStyle.height = "100%";
      innerStyle.backgroundColor = theme();

      outerStyle.perspective = "50px";
      outerStyle.transform = "rotate(" + 360 * random() + "deg)";
      this.axis =
        "rotate3D(" + cos(360 * random()) + "," + cos(360 * random()) + ",0,";
      this.theta = 360 * random();
      this.dTheta = dThetaMin + dThetaMax * random();
      innerStyle.transform = this.axis + this.theta + "deg)";

      this.x = window.innerWidth * random();
      this.y = -deviation;
      this.dx = sin(dxThetaMin + dxThetaMax * random());
      this.dy = dyMin + dyMax * random();
      outerStyle.left = this.x + "px";
      outerStyle.top = this.y + "px";

      // Create the periodic spline
      this.splineX = createPoisson();
      this.splineY = [];
      for (var i = 1, l = this.splineX.length - 1; i < l; ++i)
        this.splineY[i] = deviation * random();
      this.splineY[0] = this.splineY[l] = deviation * random();

      this.update = function (height, delta) {
        this.frame += delta;
        this.x += this.dx * delta;
        this.y += this.dy * delta;
        this.theta += this.dTheta * delta;

        // Compute spline and convert to polar
        var phi = (this.frame % 7777) / 7777,
          i = 0,
          j = 1;
        while (phi >= this.splineX[j]) i = j++;
        var rho = interpolation(
          this.splineY[i],
          this.splineY[j],
          (phi - this.splineX[i]) / (this.splineX[j] - this.splineX[i])
        );
        phi *= PI2;

        outerStyle.left = this.x + rho * cos(phi) + "px";
        outerStyle.top = this.y + rho * sin(phi) + "px";
        innerStyle.transform = this.axis + this.theta + "deg)";
        return this.y > height + deviation;
      };
    }

    function poof() {
      if (!frame) {
        // Append the container
        document.body.appendChild(container);

        // Add confetti
        var theme = colorThemes[0],
          count = 0;
        (function addConfetto() {
          var confetto = new Confetto(theme);
          confetti.push(confetto);
          container.appendChild(confetto.outer);
          timer = setTimeout(addConfetto, spread * random());
        })(0);

        // Start the loop
        var prev = undefined;
        requestAnimationFrame(function loop(timestamp) {
          var delta = prev ? timestamp - prev : 0;
          prev = timestamp;
          var height = window.innerHeight;

          for (var i = confetti.length - 1; i >= 0; --i) {
            if (confetti[i].update(height, delta)) {
              container.removeChild(confetti[i].outer);
              confetti.splice(i, 1);
            }
          }

          if (timer || confetti.length)
            return (frame = requestAnimationFrame(loop));

          // Cleanup
          document.body.removeChild(container);
          frame = undefined;
        });
      }
    }

    poof();
  }
  //Export
  window.Trivia = new Constructor();
})(window, document);
