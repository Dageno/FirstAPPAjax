String.prototype.transformaCaracteresEspeciales = function() {
    return unescape(escape(this).
                      replace(/%0A/g, '<br/>').
                      replace(/%3C/g, '&lt;').
                      replace(/%3E/g, '&gt;'));
  }
  
  var estadosPosibles = ['No inicializado', 'Cargando', 'Cargado', 'Interactivo', 'Completado'];
  var tiempoInicial = 0;
  
 $(document).ready(function() {
    // Cargar en el input text la URL del recurso actual
    $('#recurso').val(window.location.href);
    // Cargar el recurso
    $('#enviar').on("click", cargaContenido);
});
  
  function cargaContenido() {
    
    $('#contenidos').html("");
    $('#estados').html("");
    
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
    var recurso = $('#recurso').val();
    peticion.open('GET', recurso+'?nocache='+Math.random(), true);
    peticion.send(null);
  }
  // Muestar el contenido de la respuesta
  function muestraContenido() {
    var tiempoFinal = new Date();
    var milisegundos = tiempoFinal - tiempoInicial;
    
    $('#estados').append("["+milisegundos+" mseg.] "+estadosPosibles[peticion.readyState]+"<br/>");

    
    if(peticion.readyState == 4) {
      if(peticion.status == 200) {
        $('#contenidos').html(peticion.responseText.transformaCaracteresEspeciales());
      }
      muestraCodigoEstado();
    }
  }

  //Muestra el codigo de estado y el texto del mismo
  function muestraCodigoEstado() {
    $('#codigo').html(peticion.status+"<br/>"+peticion.statusText);
           
  }