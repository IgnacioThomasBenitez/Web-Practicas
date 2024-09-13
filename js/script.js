$(document).ready(function() {
    // on ready
  });


async function eliminarTodo(){

    try{
        
        var fechaActual = new Date();

        if (!confirm('¿Desea elimiar a los alumnos?')){
            return;
        }

        if (fechaActual.getDate() >= 24 && fechaActual.getMonth() === 11) { // verifica si la fecha es igual o mayor al 24/12 para poder disparar la accion 

            // Es el 24 de diciembre
            const request = await fetch('/api/borrarTodos',{
            method: 'DELETE',
                headers: getHeaders()
            });
            
            location.reload()

        } else {
            alert("Hoy no es el 24 de diciembre.");
        }
    
        
            
        
    }
    catch (error) {
        console.log(error);
    }
}


function getHeaders(){ // incluye el token..
    return { 
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.token
    }
};