String.prototype.transformaCaracteresEspeciales = function() {
    return unescape(escape(this).
                      replace(/%0A/g, '<br/>').
                      replace(/%3C/g, '&lt;').
                      replace(/%3E/g, '&gt;'));
  }
  
  var estadosPosibles = ['No inicializado', 'Cargando', 'Cargado', 'Interactivo', 'Completado'];
  var tiempoInicial = 0;
  
  window.onload = function() {
    // Cargar en el input text la URL del recurso actual
    document.getElementById('recurso').value = location.href;
    
    // Cargar el recurso
    document.getElementById('enviar').onclick = cargaContenido;
  }
  
  function cargaContenido() {
    
    document.getElementById('contenidos').innerHTML = "";
    document.getElementById('estados').innerHTML = "";
    
    // Instancia XMLHttpRequest
    if(window.XMLHttpRequest) {
      peticion = new XMLHttpRequest();
    }
    else {
      peticion = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    peticion.onreadystatechange = muestraContenido;
    
    //petición
    tiempoInicial = new Date();
    var recurso = document.getElementById('recurso').value;
    peticion.open('GET', recurso+'?nocache='+Math.random(), true);
    peticion.send(null);
  }
  // Muestar el contenido de la respuesta
  function muestraContenido() {
    var tiempoFinal = new Date();
    var milisegundos = tiempoFinal - tiempoInicial;
    
    var estados = document.getElementById('estados');
    estados.innerHTML += "[" + milisegundos + " mseg.] " + estadosPosibles[peticion.readyState] + "<br/>";
    
    if(peticion.readyState == 4) {
      if(peticion.status == 200) {
        var contenidos = document.getElementById('contenidos');
        contenidos.innerHTML = peticion.responseText.transformaCaracteresEspeciales();
      }
      muestraCodigoEstado();
    }
  }

  //Muestra el codigo de estado y el texto del mismo
  function muestraCodigoEstado() {
    var codigo = document.getElementById('codigo');
    codigo.innerHTML = peticion.status + "<br/>" + peticion.statusText;        
  }