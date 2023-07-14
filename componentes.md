### Respuesta sin estado

```
<li class="answer__li" data-points="5">
    <figure class="answer__figure">
        <img src="https://via.placeholder.com/57x57" class="answer__img" alt="answer" width="57"
            height="57">
    </figure>
    <p class="answer__title">Claudia Sheinbauma </p>
    <span class="answer__badge badge"></span>
</li>
```

<img width="372" alt="Captura de Pantalla 2023-07-14 a la(s) 17 20 36" src="https://github.com/paddybalinia/debate-trivia/assets/20441533/61e65c11-c747-4cac-bb84-0fdc43b0c776">

### Respuesta correcto
```
<li class="answer__li answer__li--disabled succes" data-points="8">
    <figure class="answer__figure">
        <img src="https://via.placeholder.com/57x57" class="answer__img" alt="answer" width="57" height="57">
    </figure>
    <p class="answer__title">Claudia </p>
    <span class="answer__badge badge"></span>
</li>
```
<img width="383" alt="Captura de Pantalla 2023-07-14 a la(s) 17 20 54" src="https://github.com/paddybalinia/debate-trivia/assets/20441533/b465b669-5d35-4ebd-8bee-f45be3401c2e">

### Respuesta deshabilitada (ya se voto)
```
<li class="answer__li answer__li--disabled" data-points="1">
    <figure class="answer__figure">
        <img src="https://via.placeholder.com/57x57" class="answer__img" alt="answer" width="57" height="57">
    </figure>
    <p class="answer__title">Claudia Sheinbauma dos lineas</p>
    <span class="answer__badge badge"></span>
</li>
```
<img width="361" alt="Captura de Pantalla 2023-07-14 a la(s) 17 38 53" src="https://github.com/paddybalinia/debate-trivia/assets/20441533/05859317-6c5f-43f0-b343-f456cb6a32b4">

### Respuesta de error
```
<li class="answer__li answer__li--disabled error" data-points="8">
    <figure class="answer__figure">
        <img src="https://via.placeholder.com/57x57" class="answer__img" alt="answer" width="57" height="57">
    </figure>
    <p class="answer__title">Claudia </p>
    <span class="answer__badge badge"></span>
</li>
```
<img width="364" alt="Captura de Pantalla 2023-07-14 a la(s) 17 20 49" src="https://github.com/paddybalinia/debate-trivia/assets/20441533/1d71a7db-2440-488b-8f60-cae7d3c58873">

### Alerta de resultado erróneo
```
<div class="alert alert--error">
    <div class="alert__badge"></div>
    <div class="alert__data">
        <h4 class="alert__title">¡Incorrecto!</h4>
        <p class="alert__text">La respuesta correcta es <strong>Claudia Sheinbauma</strong></p>
    </div>
</div>
```
<img width="758" alt="Captura de Pantalla 2023-07-14 a la(s) 17 21 13" src="https://github.com/paddybalinia/debate-trivia/assets/20441533/ceaf6b0d-2707-474c-82b3-61dfa9250ba2">

### Alerta de resultado correcto
```
<div class="alert alert--error alert--succes">
    <div class="alert__badge"></div>
    <div class="alert__data">
        <h4 class="alert__title">¡Correcto!</h4>
        <p class="alert__text">La respuesta correcta es <strong>Claudia Sheinbauma</strong></p>
    </div>
</div>
```
<img width="767" alt="Captura de Pantalla 2023-07-14 a la(s) 17 21 26" src="https://github.com/paddybalinia/debate-trivia/assets/20441533/494622ee-2ede-4f00-acf7-2e62393b454b">



```
<ul class="points__ul">
    <li class="points__li error">
        <div class="points__text">Pregunta 1</div>
        <div class="badge badge--small"></div>
    </li>
    <li class="points__li error">
        <div class="points__text">Pregunta 2</div>
        <div class="badge badge--small"></div>
    </li>
    <li class="points__li succes">
        <div class="points__text">Pregunta 3</div>
        <div class="badge badge--small"></div>
    </li>
    <li class="points__li succes">
        <div class="points__text">Pregunta 4</div>
        <div class="badge badge--small"></div>
    </li>
    <li class="points__li succes">
        <div class="points__text">Pregunta 5</div>
        <div class="badge badge--small"></div>
    </li>
</ul>
```

<img width="819" alt="Captura de Pantalla 2023-07-14 a la(s) 17 50 28" src="https://github.com/paddybalinia/debate-trivia/assets/20441533/b1d2be68-c08f-463b-99a9-e246908a44e9">
