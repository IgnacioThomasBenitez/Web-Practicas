$(document).ready(function() {
    // on ready
  });
  
  async function registrarProfesor(){

    try{

      let datos = {}; 
      datos.nombre = document.getElementById('txtNombre').value;
      datos.password = document.getElementById('txtPassword').value;

      let repetirpassword = document.getElementById('txtRepetirPassword').value;

      if(repetirpassword != datos.password){
        alert('Las contraseñas no coinciden');
        return;
      }
      console.log(datos)

      const request = await fetch('api/profesor', {
        //fetch('http://192.168.0.126/api/usuarios', { // para enviar una peticion a otro host

        method: 'POST',
        //mode:"no-cors", //para permitir los cors
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });


    alert("La cuenta fue creada con exito");      
     window.location.href = 'login.html';


  }catch (error){
    console.log(error);
  }
}
