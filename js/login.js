$(document).ready(function() {
    // on ready
  });
  
 
async function iniciarSesion(){

  try{

    let datos = {};

    datos.nombre = document.getElementById('txtnombre').value;
    datos.password = document.getElementById('txtpassword').value;
    
      const request = await fetch('api/login', {
        method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });
      const respuesta = await request.text();

    if (respuesta != 'FAIL') {
      alert("Profesor logueado correctamente")
      localStorage.token = respuesta;

      localStorage.nombre = datos.nombre;

      window.location.href = 'http://localhost:8080/Inicio.html'
    }else{
      
      alert('Nombre o password incorrectos');
    
    }

  }catch (error){
    console.log(error);
  }
  
}
