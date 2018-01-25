class Persona
{
	constructor(sNombre, sPassword, sApellido, sDni, iTelefono, sDireccion, sCorreo, bActivo)
	{
		this.nombre=sNombre;
		this.password=sPassword;
		this.apellido=sApellido;
		this.dni=sDni;
		this.telefono=iTelefono;
		this.direccion=sDireccion;
		this.correo=sCorreo;
		this.activo=bActivo;
	}
}

class Profesor extends Persona
{
	constructor(sNombre, sPassword, sApellido, sDni, iTelefono, sDireccion, sCorreo, bActivo, iSalario)
	{
		super(sNombre, sPassword, sApellido, sDni, iTelefono, sDireccion, sCorreo, bActivo);

		this.salario=iSalario;
		this.listaCurso=[];

	}
	addCursoProf(oCurso)
	{
this.listaCurso.push(oCurso);//Añade Curso
	}

}

class Alumno extends Persona
{
	constructor(sNombre, sPassword, sApellido, sDni, iTelefono, sDireccion, sCorreo, bActivo, bEstadoCobro)
	{
		super(sNombre, sPassword, sApellido, sDni, iTelefono, sDireccion, sCorreo, bActivo);

		this.estadoCobro=bEstadoCobro;
		this.listaCurso=[];
		this.listaCalificaciones=[];
		
	}

	addNota(oCalificacion)
	{
this.listaCalificaciones.push(oCalificacion);//Añade Calificacion
	}
	

}

class Administrador extends Persona
{
	constructor(sNombre, sPassword, sApellido, sDni, iTelefono, sDireccion, sCorreo, bActivo)
	{
		super(sNombre, sPassword, sApellido, sDni, iTelefono, sDireccion, sCorreo, bActivo);
	}
}

class Contabilidad
{
	constructor(stipo,bestado,fimporte,sasunto,dtfecha_ven)
	{
		this.tipo=stipo;
		this.estado=bestado;
		this.importe=fimporte;
		this.asunto=sasunto;
		this.fecha_ven=dtfecha_ven;
	}
}


class Calificaciones
{
	constructor(fNota,sCodigoCurso)
	{
		this.nota=fNota;
		this.codCurso=sCodigoCurso;
	}
}

class Curso
{
	constructor(sCodigo, sIdioma, sDuracion, fPrecio, sAñoAcademico, sTipo,sNivel, bArchivado)
	{
		this.codigo=sCodigo;
		this.idioma=sIdioma;
		this.duracion=sDuracion;
		this.precio=fPrecio;
		this.añoAcademico=sAñoAcademico;
		this.tipo=sTipo;
		this.nivel=sNivel;
		this.listaAlumno=[]; // una lista de los alumnos que están matriculados en el curso
		this.bArchivado=bArchivado; //boolean para saber si el curso sigue activo, o ya termino, o se canceló
	}

	matricularAlumno(oAlumno)
	{
		this.listaAlumno.push(oAlumno); //añade alumno al curso
	}

}

class Aula
{
	constructor(sCodigo, iEdificio, iPlanta, iAula, iCapacidad, sTipo)
	{
		this.codigo=sCodigo;
		this.edificio=iEdificio;
		this.planta=iPlanta;
		this.aula=iAula;
		this.capacidad=iCapacidad;
		this.tipo=sTipo;
	}
}

class Matricula
{
	constructor(sCodigoMatri, sEstado, oAlumno)
	{
		this.codigoMatri=sCodigoMatri;
		this.oAlumno=oAlumno;
		this.estado=sEstado;
	}
}




// Clase contenedora 
class Academia
{ 
	constructor ()
	{
		this._alumnos=[]; //atributo privado, array que contiene todos los alumnos de la academia
		this._usuarios=[]; //atributo privado, array que contiene todos los usuarios de la academia
		this._cursos=[]; //atributo privado, array que contiene todos los cursos de la academia
		this._profesores=[];//atributo privado, array que contiene todos los profesores de la academia
		this._matriculas=[]; //atributo privado, array que contiene todos las matrículas de la academia
	}

	addAlumno(oAlumno)
	{
		this._alumnos.push(oAlumno);
		this._usuarios.push(oAlumno);
	}
	
		addMatricula(oMatricula)
	{
		this._matriculas.push(oMatricula);
	}


	addProfesor(oProfesor)
	{
		this._profesores.push(oProfesor);
		this._usuarios.push(oProfesor);
	}

	addAdministrador(oAdministrador)
	{
		this._usuarios.push(oAdministrador);
	}

	addCurso(oCurso)
	{
		this._cursos.push(oCurso);
	}


	inicioSesion(sDni,sPass)
	{
		var oUsuario = null;
		for (var i=0; i<this._usuarios.length && oUsuario==null; i++)
		{
			if (this._usuarios[i].dni == sDni && this._usuarios[i].password == sPass)
			{
				oUsuario = this._usuarios[i];
			}		
		}
		return oUsuario;
	}

	modificarUsuario(oUsuario)
	{
		// recorrer la array de usuarios hasta encontrar a los que tengan el mismo dni y modificarlo
		var bEncontrado=false;
		for (var i=0; i<this._usuarios.length && bEncontrado==false; i++) 
		{
			if (this._usuarios[i].dni == oUsuario.dni)
			{
				this._usuarios[i] = oUsuario;
				bEncontrado = true;
			}
		}
	}

	dameAlumno(dni)
	{
		var bEncontrado=false;
		var oAlu=null;
		for (var i=0; i<this._usuarios.length && bEncontrado==false; i++) 
		{
			
			if (this._usuarios[i].dni == dni)
			{
				oAlu= this._usuarios[i];
				bEncontrado = true;
			}
		}
		return oAlu;
	}

	dameListaCursos()
	{
		return this._cursos;
	}

	buscaCurso(sCodigo)
	{
		oCurso=null;
		for (var i = 0; i < this._cursos.length; i++) 
		{
			if (this._cursos[i].codigo== sCodigo)
			{
				oCurso= this._cursos[i];
			}
		}
		return oCurso;
	}

	loadXMLDoc(filename)
	{
		var xhttp = null;

		if (window.XMLHttpRequest)
			xhttp = new XMLHttpRequest();
		else // IE 5/6
			xhttp = new ActiveXObject("Microsoft.XMLHTTP");

		xhttp.open("GET", filename, false);
		xhttp.send();
		return xhttp.responseXML;
	}


    consultarNotas(sDni,SFiltro)
    {

    	var oTablaCurProv;
    	var oTablaCurAlumProv;
    	for (var i = 0; i < this._profesores.length; i++) {

    		if(this._profesores[i].dni==sDni)
    		{
    			oTablaCurProv=this._profesores[i].listaCurso;


    		}

    	}


            var oTablas = document.querySelectorAll("table");

            if (oTablas != null) {
                for (i = 0; i < oTablas.length; i++) {

                    var iNumFilas = oTablas[i].rows.length;
                    for (j = 0; j < iNumFilas; j++) {
                        oTablas[i].deleteRow(0);
                    }
                }
            }





    var oTabla = document.createElement("table");
    oTabla.classList.add("table");
    oTabla.classList.add("table-hover");

    var oTHead = oTabla.createTHead();
    var oFila = oTHead.insertRow(-1);
    var oTH = document.createElement("th");
    oTH.textContent = "Curso";
    oFila.appendChild(oTH);

    oTH = document.createElement("th");
    oTH.textContent = "Idioma";
    oFila.appendChild(oTH);
    oTH = document.createElement("th");
    oTH.textContent = "Duracion";
    oFila.appendChild(oTH);
    oTH = document.createElement("th");
    oTH.textContent = "Tipo";
    oFila.appendChild(oTH);
    oTH = document.createElement("th");
    oTH.textContent = "Nivel";
    oFila.appendChild(oTH);
    oTH = document.createElement("th");
    oTH.textContent = "Alumno";
    oFila.appendChild(oTH);
    oTH = document.createElement("th");
    oTH.textContent = "Nota";
    oFila.appendChild(oTH);


    // Cuerpo de la tabla
    var oTBody = oTabla.createTBody();
    


for (var i = 0; i < oTablaCurProv.length; i++) {
	if(oTablaCurProv[i].codigo==SFiltro || SFiltro=="todo"){
	oFila = oTBody.insertRow(-1);
	var oCelda = oFila.insertCell(-1);
	 oCelda.textContent = oTablaCurProv[i].codigo;
	 oCelda = oFila.insertCell(-1);
	  oCelda.textContent = oTablaCurProv[i].idioma;
	  	 oCelda = oFila.insertCell(-1);
	  oCelda.textContent = oTablaCurProv[i].duracion;
	  	 oCelda = oFila.insertCell(-1);
	  oCelda.textContent = oTablaCurProv[i].tipo;
	   	 oCelda = oFila.insertCell(-1);
	  oCelda.textContent = oTablaCurProv[i].nivel;
	  oTablaCurAlumProv=oTablaCurProv[i].listaAlumno;


    for (var j = 0; j < oTablaCurAlumProv.length; j++) {
            oCelda = oFila.insertCell(-1);
        oCelda.textContent = oTablaCurAlumProv[j].nombre;

        var oTablaCalif= oTablaCurAlumProv[j].listaCalificaciones;
        
        for (var k = 0; k < oTablaCalif.length; k++) {
        	
        	if(oTablaCalif[k].codCurso==oTablaCurProv[i].codigo)
        	{
                    oCelda = oFila.insertCell(-1);
        oCelda.textContent = oTablaCalif[k].nota;
                          
        	}
        }
    }
}

}


return oTabla;
    }

getCursosProf(sDni)
{

    	var oTablaCurProv;
    	for (var i = 0; i < this._profesores.length; i++) {

    		if(this._profesores[i].dni==sDni)
    		{
    			oTablaCurProv=this._profesores[i].listaCurso;


    		}

    	}

return oTablaCurProv;

}



getListaAlumCurso(sCodigo,sDni)
{

var oTablaCurProv=this.getCursosProf(sDni);
var oTablaAlumnoCurso;

    	for (var i = 0; i < oTablaCurProv.length; i++) {

    		if(oTablaCurProv[i].codigo==sCodigo)
    		{
    			oTablaAlumnoCurso=oTablaCurProv[i].listaAlumno;
               

    		}

    	}

return oTablaAlumnoCurso;



}

calificarAlumno(sCodigo,sDni,fNota)
{


      // var oAlum=this.getListaAlumCurso(sCodigo);
     //  var oAlum;
                
for (var i=0; i<this._profesores[0].listaCurso.length; i++) 
		{
			
			if (this._profesores[0].listaCurso[i].codigo == sCodigo)
			{
				var oTR=this._profesores[0].listaCurso[i].listaAlumno;
           for (var j=0; j<oTR.length; j++) 
		{
			
			if (this._profesores[0].listaCurso[i].listaAlumno[j].dni == sDni)
			{
				
				this._profesores[0].listaCurso[i].listaAlumno[j].addNota(new Calificaciones(fNota,sCodigo));

				 
			}
		}
			}
		}



       //oAlum.addNota(new Calificaciones(fNota,sCodigo));



}

modificarNotaAlumno(sCodigo,sDni,fNota)
{

for (var i=0; i<this._profesores[0].listaCurso.length; i++) 
		{
			
			if (this._profesores[0].listaCurso[i].codigo == sCodigo)
			{
				var oTR=this._profesores[0].listaCurso[i].listaAlumno;
for (var j=0; j<oTR.length; j++) 
		{
			
			if (this._profesores[0].listaCurso[i].listaAlumno[j].dni == sDni)
			{
				
				var oTR2=this._profesores[0].listaCurso[i].listaAlumno[j].listaCalificaciones;
				for (var k=0; k<oTR.length; k++){

		if (this._profesores[0].listaCurso[i].listaAlumno[j].listaCalificaciones[k].codCurso == sCodigo)
		{
			this._profesores[0].listaCurso[i].listaAlumno[j].listaCalificaciones[k].nota=fNota;

		}


		}


				 
			}
		}
			}
		}




}





}





