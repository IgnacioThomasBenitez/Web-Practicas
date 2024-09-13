$(document).ready(function() {

  cargarAlumnos();
  $('#Alumnos');

});

async function cargarAlumnos(){

  try{

    const request = await fetch('api/generarAlumnos75', {
      method: 'GET',
      headers: getHeaders()
      
    });
    const alumnos = await request.json();

    
    n = 0; // inicializar la variable global en 0 
    let listadoHTML = '';
    for (let alumno of alumnos) {

      n++; // variable para que incremente 

      let botonEliminar = '<button class="borra" onclick="eliminarAlumno('+ alumno.id_alumno+')"></button>';
      let botonEditar = '<button class="edit" onclick="editarAlumno('+ alumno.id_alumno + ',\'tr' + n+'\')"></button>'; //se agrego el ',\'tr' + n+'\' para agregar el argumento "tr n" y lo resiva el boton los dos parametros. 
      let botonHora = '<input type="number" required="" value="0" id="horas" class="horacss">';
      let botonFalta = '<select id="Presente" class="faltacss"> <option value="Ausente" ">Ausente</option> <option value="Presente"">Presente</option> </select>';

      //  le damos un id al tr y le ponemos la variable incremental para que los "tr" tengan distinto numero
      let alumnoHTML = '<tr id="tr'+n+'"> <td>'+n+'</td><td>'+alumno.nombre+' '+alumno.apellido+'</td><td>'
      +alumno.h_cumplidas +'</td><td>'+alumno.h_incumplidas+'</td><td>'+alumno.faltas+
      '</td><td>'+botonHora+'</td> <td>'+botonFalta+'</td><td>'+botonEditar+'</td> <td>'+botonEliminar+'</td></tr>';

      listadoHTML += alumnoHTML;

    }
      
    document.querySelector('#Alumnos tbody').outerHTML = listadoHTML; //modifica la tabla de alumnos
    

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


async function eliminarAlumno(id_alumno){

  if (!confirm('¿Desea elimiar al alumno?')){
    return;
  }

  const request = await fetch('api/generarAlumnos75/' + id_alumno , {
    method: 'DELETE',
      headers: getHeaders()
  });

  location.reload()
  
}


//le damos los dos argumentos necesario, id_alumno para traer al alumno en cuestion y id_fila es el nombre que le damos al parametro que nos entrega
async function editarAlumno(id_alumno, id_fila){

  try{
    if (!confirm('¿Desea editar al alumno?')){//true = false  -- false = true
      return;         
    }

    const request = await fetch('api/buscarA/'+ id_alumno, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
        //headers: getHeaders()
    });
    let alumnos = await request.json();
    //let alumno=[alumnos];  nose que paso pero se tuvo que comentar esta linea

    var datos = {};
    var editAlumno= {};

    
    datos.Presente = document.querySelector('#'+id_fila + ' #Presente').value; // usamos '#'+id_fila + ' para que sepa a que fila pertenece el #Presente
    datos.hora = document.querySelector('#'+id_fila + ' #horas').value;  // usamos '#'+id_fila + ' para que sepa a que fila pertenece el #Horas



    if(datos.Presente != "Presente"){

      editAlumno.faltas = 1 + parseInt(alumnos.faltas);

      editAlumno.h_cumplidas = alumnos.h_cumplidas;
      editAlumno.h_incumplidas = alumnos.h_incumplidas;
      console.log("ausente");

    }

    if(datos.Presente != "Presente" && datos.hora > 0){
      
      alert("El alumno no esta presente");
      return;

    }

    if(datos.Presente == "Presente" && datos.hora <= 0){
      
      alert("El alumno esta presente pero no tiene horas");
      console.log("esta presente pero no tiene horas");
      return;

    }

    if(datos.Presente == "Presente" && datos.hora >= 0 ){

      editAlumno.faltas = alumnos.faltas

      editAlumno.h_cumplidas = parseInt(datos.hora) + parseInt(alumnos.h_cumplidas); //usamos "parceInt()" para pasar los datos de String a numero.
      editAlumno.h_incumplidas = alumnos.h_incumplidas - datos.hora;

      console.log("Horas cumplidas= " + editAlumno.h_cumplidas);
      console.log("Horas incumplidas= " + editAlumno.h_incumplidas);

    }

     

    if(editAlumno != ""){

      const request = await fetch('api/generarAlumnos75/' + id_alumno, {
        method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          //headers: getHeaders()
          body: JSON.stringify(editAlumno)
      });
    };
    //location.reload()

  }catch (error){
    console.log(error);
  }
  
}

  




