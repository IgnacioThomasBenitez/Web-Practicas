$(document).ready(function() {
    $("#regis1").click(function(){
        registrarAlumnos1();
    });
});


async function registrarAlumnos1(){

  try{


    let datos = {}; 
    datos.nombre = document.getElementById('nombre').value;
    datos.apellido = document.getElementById('apellido').value;
    datos.dni = document.getElementById('dni').value;
    datos.curso_id = document.getElementById('curso').value;


    const request = await fetch('api/registarAlumnos', {
        method: 'POST',
        headers:getHeaders(),

        body: JSON.stringify(datos)
    });



  }catch (error){
    console.log(error);
  }
}

function getHeaders(){ // incluye el token..
  return { 
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.token
  }
}

