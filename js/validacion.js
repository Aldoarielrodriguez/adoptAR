var formulario=
{
  onReady:function(){

    formulario.preCargaMsj();

    $('#formAdopcion').submit(function (event) {
      event.preventDefault(); 
      var emisor = document.getElementById("emisor").value;
      var email = document.getElementById("email").value;
      var tel = document.getElementById("number").value;
      let mensaje=document.getElementById("mensaje").value;

      let linkM=sessionStorage.linkMascota;
      let especieM=sessionStorage.especieMascota;

      if(!formulario.validarFormulario(email,emisor,tel)){ 
        //pass
      }
      else{
        formulario.mascotaLStorage(linkM,especieM);
        formulario.sendMail(emisor,email,tel,mensaje);
        window.location.href = "./panelAdopcion.html";
      }

    });

  },

  preCargaMsj: function(){
    let msj="Solicito se me contacte por la mascota de nombre \""+sessionStorage.nombreMascota+"\" la cual es un " + sessionStorage.especieMascota+ " de "+ sessionStorage.razaMascota + " y que tiene " + sessionStorage.edadMascota + "años. \n *Foto de la mascota aquí : "+ sessionStorage.fotoMascota + ". \n *Link de datos completos de la mascota aqui : "+ sessionStorage.linkMascota;
    document.getElementById("mensaje").value=msj;
  },

  mascotaLStorage:function(link,especie){
    if (typeof(Storage) !== 'undefined') { //Veo si acepta LocalStorage

      if (localStorage.getItem(especie+"adoptar") !== null) { //Verifico key, si existe es distinto de null
        
        var arrayLinks = JSON.parse(localStorage.getItem(especie+"adoptar"));
        var check= arrayLinks.includes(link);
        if( check == true ) // Si no existe en el array de adopciones lo agrego
        { 
         //pass
        }
        else{
          arrayLinks.push(link);
          localStorage.setItem( especie+"adoptar", JSON.stringify(arrayLinks) );       
        }

      }

      else{//si Verifico que no existe key es null, entonces crear key
        let adopciones=[link];
        localStorage.setItem(especie+"adoptar", JSON.stringify(adopciones) ); 
      }

    } else {
     alert("Navegador no compatible con local Storage");
    }
  },

  sendMail:function(name,email,tel,msj){
    var msj =msj + "\n Emisor: "+name+"\n Correo electrónico :"+email+"\n Tel:"+tel;
    var msjSpc= msj.replace(" ", "%20");
    $(".adoptar").attr('href', "aldoarielro@gmail.com?subject=Solicitud%20de%20adopcion"+ "&body=" + encodeURIComponent(msjSpc));
  
  },

  validarFormulario:function(email,name,number){
  
    if (name == "") {
      alert("Es necesario ingresar su nombre completo.");
      return false;
    }
  
    if (email == "") {
      alert("Es necesario ingresar una direccion de correo electrónico.");
      return false;
    }
  
    var expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!expresion.test(email)) {
      alert("El correo electronico ingresado no es válido.");
      return false;
    }
  
    if (number == "") {
      alert("Es necesario ingresar un telefono de contacto.");
      return false;
    }
  
    var numberFloat = parseFloat(number);
    if (isNaN(numberFloat)) {
      alert("El numero de telefono ingresado no es valido.");
      return false;
    }
  
    return true;
  }

}

$('document').ready(formulario.onReady);

