(function () {
  "use strict";

  var respuestas = [],
    cantPoints = 0;

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

    var iframeTriva = window.parent.document.querySelector("div");
    iframeTriva.style.border = "1px solid #e0e0e0";
    iframeTriva.style.borderRadius = "10px";
    iframeTriva.style.overflow = "hidden";
    iframeTriva.style.position = "relative";
  }

  // Events
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

    setTimeout(() => {
      Reveal.classList.remove("hide");
      window.parent.postMessage(document.body.scrollHeight, window.location);

      setTimeout(() => {
        Reveal.scrollIntoView();

        window.requestAnimationFrame(() => {
          var message = {
            sentinel: "amp",
            type: "embed-size",
            height: document.body.scrollHeight,
          };
          window.parent.postMessage(message, "*");
        });
      }, "400");
    }, "400");

    var NumBig = getNumberBig(Answers);

    cantPoints = cantPoints + Number(this.dataset.points);
    var isTrue = this.dataset.points == NumBig ? true : false;
    agregarRespuesta(isTrue);

    //console.log(respuestas);

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

  function showNextItem() {
    const parent = this.parentElement.parentElement;
    const nextLi = parent.nextElementSibling;

    if (nextLi) {
      nextLi.classList.remove("hide");
      window.parent.postMessage(document.body.scrollHeight, window.location);
      setTimeout(() => {
        nextLi.scrollIntoView();

        window.requestAnimationFrame(() => {
          var message = {
            sentinel: "amp",
            type: "embed-size",
            height: document.body.scrollHeight,
          };
          window.parent.postMessage(message, "*");
        });
      }, "500");
    } else {
      showResult();
    }
  }

  function agregarRespuesta(respuesta) {
    respuestas.push(respuesta);
  }

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
    }

    window.parent.postMessage(document.body.scrollHeight, window.location);

    setTimeout(() => {
      Results.scrollIntoView();

      window.requestAnimationFrame(() => {
        var message = {
          sentinel: "amp",
          type: "embed-size",
          height: document.body.scrollHeight,
        };
        window.parent.postMessage(message, "*");
      });

      AnimConfetti();
    }, "800");

    countSuccess();
  }

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
      textResult.textContent =
        "Respondiste correctamente " + succesCount + " preguntas";
    } else {
      textResult.textContent = "No respondiste correctamente ninguna pregunta";
    }
  }

  function onButtonReset() {
    var Header = document.querySelector(".header"),
      Results = document.querySelector(".results"),
      answerElement = document.querySelectorAll(".answer__li"),
      revealElement = document.querySelectorAll(".container-reveal"),
      alertElement = document.querySelectorAll(".alert"),
      triviaLi = document.querySelectorAll(".trivia__li"),
      triviaLiFirst = triviaLi[0];

    Header.scrollIntoView();
    const Confetti = document.querySelector("body > div:last-child");

    Confetti.style.opacity = 0;
    Confetti.style.transition = "opacity .3s linear";
    Confetti.remove();

    for (let e = 0; e < answerElement.length; e++) {
      answerElement[e].classList.remove("succes");
      answerElement[e].classList.remove("error");
      answerElement[e].classList.remove("answer__li--disabled");
    }
    setTimeout(() => {
      const pointsUlElements = document.querySelectorAll(".points__ul > li");

      for (const pointsUlElement of pointsUlElements) {
        pointsUlElement.remove();
      }

      for (let i = 0; i < triviaLi.length; i++) {
        triviaLi[i].classList.add("hide");
      }

      for (let i = 0; i < revealElement.length; i++) {
        revealElement[i].classList.add("hide");
      }
      for (let i = 0; i < alertElement.length; i++) {
        alertElement[i].classList.remove("alert--error");
        alertElement[i].classList.remove("alert--succes");
      }

      Results.classList.add("hide");
      triviaLiFirst.classList.remove("hide");
    }, "800");

    respuestas = [];

    setTimeout(() => {
      var containerHeight = document.querySelector(".container").offsetHeight;
      window.parent.postMessage(containerHeight, window.location);

      setTimeout(() => {
        window.requestAnimationFrame(() => {
          var message = {
            sentinel: "amp",
            type: "embed-size",
            height: containerHeight,
          };
          window.parent.postMessage(message, "*");
        });
      }, "400");
    }, "800");
  }

  window.onload = function () {
    var triviaHeight = document.querySelector(".container").offsetHeight;

    setTimeout(() => {
      window.parent.postMessage(triviaHeight, window.location);

      setTimeout(() => {
        window.requestAnimationFrame(() => {
          var message = {
            sentinel: "amp",
            type: "embed-size",
            height: triviaHeight,
          };
          window.parent.postMessage(message, "*");
        });
      }, "400");
    }, "400");
  };

  function AnimConfetti() {
    // https://codepen.io/bananascript/pen/EyZeWm

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
      spread = 40,
      sizeMin = 3,
      sizeMax = 12 - sizeMin,
      eccentricity = 10,
      deviation = 100,
      dxThetaMin = -0.1,
      dxThetaMax = -dxThetaMin - dxThetaMin,
      dyMin = 0.13,
      dyMax = 0.18,
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
