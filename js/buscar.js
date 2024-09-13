$(document).ready(function() {

    
});


async function buscarAlumnos(){

    try{

        dni = document.getElementById('dni').value;

        console.log(dni);

        const request = await fetch('api/buscar/' + dni, {
            method: 'GET',
            headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        });
        const lista = await request.json();


        if(lista.status == 500){
            //verificamos si existe el alumno
            console.log("No se encontro al alumno")
            alert("No se encontro al alumno");
            return;
        }

        // aprender mucho, si la constante "lista" sale como interable es porque viene sin corteches desde la base de datos y hay que agregarle desde acá.
        // la proxima hacer esto antes de clavarte 4 horas para resolverlo 
        //si haces un metodo de buscaqueda, agrega "let us=[lista]" para que le agregue los corteches =D
        let us=[lista]

        
        let listadoHTML = '';
        
        for (let alumno of us) {
        
        console.log(alumno);

        let alumnoHTML = '<tr><td>'+alumno.id_alumno+'</td><td>'+alumno.nombre+' '+alumno.apellido+'</td><td>'
        +alumno.h_cumplidas +'</td><td>'+alumno.h_incumplidas+'</td><td>'+alumno.faltas+'</td></tr>';

        listadoHTML += alumnoHTML;

        }

        document.querySelector('#Alumnos tbody').outerHTML = listadoHTML; //modifica la tabla de alumnos


    }catch (error){
    console.log(error);
    }
}
