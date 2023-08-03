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

