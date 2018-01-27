class Persona
{
	constructor(sNombre, sPassword, sApellido, sDni, iTelefono, sDireccion, sCorreo, bActivo)
	{
		this.nombre    = sNombre;
		this.password  = sPassword;
		this.apellido  = sApellido;
		this.dni       = sDni;
		this.telefono  = iTelefono;
		this.direccion = sDireccion;
		this.correo    = sCorreo;
		this.activo    = bActivo;
	}
}

class Profesor extends Persona
{
	constructor(sNombre, sPassword, sApellido, sDni, iTelefono, sDireccion, sCorreo, bActivo, iSalario)
	{
		super(sNombre, sPassword, sApellido, sDni, iTelefono, sDireccion, sCorreo, bActivo);

		this.salario     = iSalario;
		this.listaCursos = [];
	}

	addCurso(codigo)
	{
		if (this.listaCursos.indexOf(codigo) == -1)
			this.listaCursos.push(codigo); // Añade un curso al profesor
	}

	getCursos()
	{
		var tCursos = [];
		var cursos = academia.getCursos();

		for(var i=0; i<this.listaCursos.length; i++)
			for (var j=0; j<cursos.length; j++)
				if (this.listaCursos[i] == cursos[j].codigo)
					tCursos.push(cursos[j]);

		return tCursos;
	}
}

class Alumno extends Persona
{
	constructor(sNombre, sPassword, sApellido, sDni, iTelefono, sDireccion, sCorreo, bActivo, bEstadoCobro)
	{
		super(sNombre, sPassword, sApellido, sDni, iTelefono, sDireccion, sCorreo, bActivo);

		this.estadoCobro         = bEstadoCobro;
		this.listaCursos         = [];
		this.listaCalificaciones = [];
	}

	addNota(oCalificacion)
	{
		this.listaCalificaciones.push(oCalificacion); // Añade una calificacion al alumno
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
	constructor(sTipo, bEstado, fImporte, sAsunto, dtFecha_ven)
	{
		this.tipo      = sTipo;
		this.estado    = bEstado;
		this.importe   = fImporte;
		this.asunto    = sAsunto;
		this.fecha_ven = dtFecha_ven;
	}
}


class Calificaciones
{
	constructor(fNota, sCodigoCurso)
	{
		this.nota     = fNota;
		this.codCurso = sCodigoCurso;
	}
}

class Curso
{
	constructor(sCodigo, sIdioma, sDuracion, fPrecio, sTipo, sNivel, bArchivado)
	{
		this.codigo       = sCodigo;
		this.idioma       = sIdioma;
		this.duracion     = sDuracion;
		this.precio       = fPrecio;
		this.tipo         = sTipo;
		this.nivel        = sNivel;
		this.listaAlumnos = []; // una lista de los alumnos que están matriculados en el curso
		this.bArchivado   = bArchivado; // boolean para saber si el curso sigue activo, o ya termino, o se canceló
	}

	matricularAlumno(oAlumno)
	{
		this.listaAlumnos.push(oAlumno); // añade un alumno al curso
	}
}

class Aula
{
	constructor(sCodigo, iEdificio, iPlanta, iAula, iCapacidad, sTipo)
	{
		this.codigo    = sCodigo;
		this.edificio  = iEdificio;
		this.planta    = iPlanta;
		this.aula      = iAula;
		this.capacidad = iCapacidad;
		this.tipo      = sTipo;
	}
}

class Matricula
{
	constructor(iNumero, sEstado, oAlumno, sListaCursosMatri)
	{
		this.numero  = iNumero;
		this.oAlumno = oAlumno;
		this.estado  = sEstado;
		this.listaCursosMatri= sListaCursosMatri;
	}
}


// Clase contenedora 
class Academia
{ 
	constructor()
	{
		this._alumnos    = []; // atributo privado, array que contiene todos los alumnos de la academia
		this._usuarios   = []; // atributo privado, array que contiene todos los usuarios de la academia
		this._cursos     = []; // atributo privado, array que contiene todos los cursos de la academia
		this._profesores = []; // atributo privado, array que contiene todos los profesores de la academia
		this._matriculas = []; // atributo privado, array que contiene todos las matrículas de la academia
	}

	addMatricula(oMatricula)
	{
		var bEncontrado = false;
		for (var i=0; i<this._matriculas.length && !bEncontrado; i++)
			if (this._matriculas[i].numero == oMatricula.numero)
				bEncontrado = true;

		if (!bEncontrado)
			this._matriculas.push(oMatricula);

		return !bEncontrado;
	}

	addUsuario(oUsuario)
	{
		var bEncontrado = false;
		for (var i=0; i<this._usuarios.length && !bEncontrado; i++)
			if (this._usuarios[i].dni == oUsuario.dni)
				bEncontrado = true;

		if (!bEncontrado) {
			this._usuarios.push(oUsuario);
			sessionStorage.setItem('tUsuarios', JSON.stringify(this._usuarios));
		}

		return !bEncontrado;
	}

	addCurso(oCurso)
	{
		var bEncontrado = false;
		for (var i=0; i<this._cursos.length && !bEncontrado; i++)
			if (this._cursos[i].codigo == oCurso.codigo)
				bEncontrado = true;

		if (!bEncontrado) {
			this._cursos.push(oCurso);
			sessionStorage.setItem('tCursos', JSON.stringify(this._cursos));
		}

		return !bEncontrado;
	}

	inicioSesion(sDni,sPass)
	{
		var oUsuario = null;
		for (var i=0; i<this._usuarios.length && oUsuario==null; i++)
		{
			if (this._usuarios[i].dni == sDni && this._usuarios[i].password == sPass)
				oUsuario = this._usuarios[i];	
		}
		return oUsuario;
	}

	modificarUsuario(oUsuario)
	{
		// recorrer la array de usuarios hasta encontrar a los que tengan el mismo dni y modificarlo
		var bEncontrado = false;
		for (var i=0; i<this._usuarios.length && bEncontrado==false; i++) 
		{
			if (this._usuarios[i].dni == oUsuario.dni)
			{
				this._usuarios[i] = oUsuario;
				bEncontrado = true;
			}
		}
		sessionStorage.setItem('tUsuarios', JSON.stringify(this._usuarios));
	}

	modificarCurso(oCurso)
	{
		// recorrer la array de cursos hasta encontrar a los que tengan el mismo codigo y modificarlo
		var bEncontrado = false;
		for (var i=0; i<this._cursos.length && bEncontrado==false; i++) 
		{
			if (this._cursos[i].codigo == oCurso.codigo)
			{
				this._cursos[i] = oCurso;
				bEncontrado = true;
			}
		}
		sessionStorage.setItem('tCursos', JSON.stringify(this._cursos));
	}

	modificarMatricula(oMatricula)
	{
		// recorrer la array de cursos hasta encontrar a los que tengan el mismo codigo y modificarlo
		var bEncontrado = false;
		for (var i=0; i<this._matriculas.length && bEncontrado==false; i++) 
		{
			if (this._matriculas[i].numero == oMatricula.numero)
			{
				this._matriculas[i] = oMatricula;
				bEncontrado = true;
			}
		}
		sessionStorage.setItem('tMatriculas', JSON.stringify(this._matriculas));
	}

	getUsuarios()
	{
		return this._usuarios;
	}

	getUsuario(dni)
	{
		var oUsuario = null;
		for (var i=0; i<this._usuarios.length && oUsuario==null; i++) 
			if (this._usuarios[i].dni == dni)
				oUsuario = this._usuarios[i];
		return oUsuario;
	}

	getAlumnos()
	{
		var alumnos = [];
		for (var i=0; i<this._usuarios.length; i++)
			if (this._usuarios[i] instanceof Alumno)
				alumnos.push(this._usuarios[i]);

		return alumnos;
	}

	getProfesores()
	{
		var profesores = [];
		for (var i=0; i<this._usuarios.length; i++)
			if (this._usuarios[i] instanceof Profesor)
				profesores.push(this._usuarios[i]);

		return profesores;
	}

	getAdministradores()
	{
		var administradores = [];
		for (var i=0; i<this._usuarios.length; i++)
			if (this._usuarios[i] instanceof Administrador)
				administradores.push(this._usuarios[i]);

		return administradores;
	}

	getMatriculas()
	{
		return this._matriculas;
	}

	getMatricula(numero)
	{
		var oMatri= null;
		for (var i = 0; i < this._matriculas.length; i++) 
		{
			if (this._matriculas[i].numero == numero)
			{
				oMatri=this._matriculas[i];
			}
		}
		return oMatri;
	}

	getCursos()
	{
		return this._cursos;
	}

	getCurso(sCodigo)
	{
		var oCurso = null;
		for (var i=0; i<this._cursos.length && oCurso==null; i++) 
			if (this._cursos[i].codigo == sCodigo)
				oCurso= this._cursos[i];

		return oCurso;
	}

    consultarNotas(sDni,SFiltro)
    {
    	var oTablaCurProv;
    	var oTablaCurAlumProv;

		var oProfesor = this.getUsuario(sDni);
		oTablaCurProv = oProfesor.getCursos();

        var oTablas = document.querySelectorAll("table");

        if (oTablas != null)
        {
            for (i=0; i<oTablas.length; i++)
            {
                var iNumFilas = oTablas[i].rows.length;
                for (j=0; j<iNumFilas; j++)
                    oTablas[i].deleteRow(0);
            }
        }

		// Creacion de la tabla 
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

		for (var i=0; i<oTablaCurProv.length; i++)
		{
			if(oTablaCurProv[i].codigo == SFiltro || SFiltro == "todo")
			{
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
			  	oTablaCurAlumProv=oTablaCurProv[i].listaAlumnos;


		    	for (var j=0; j<oTablaCurAlumProv.length; j++)
		    	{
		            oCelda = oFila.insertCell(-1);
		        	oCelda.textContent = oTablaCurAlumProv[j].nombre;

		        	var oTablaCalif= oTablaCurAlumProv[j].listaCalificaciones;
		        
		        	for (var k=0; k<oTablaCalif.length; k++)
		        	{
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

/*    modificarNotaAlumno(sCodigo,sDni,fNota)
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
    }*/

	codNuevaMatri()
	{
		var oMatri=this._matriculas[this._matriculas.length -1]; //obteiene el último elemento de una array
		return parseInt(oMatri.numero)+1;
	}

	borrarUsuario(sDni)
	{
		for (var i=0; i<this._usuarios.length; i++) 
			if (this._usuarios[i].dni == sDni)
				this._usuarios[i].activo="no";
	}



	getCalificaciones(codCurso, dniAlu)
	{
		//buscamos en la lista de calificación del alumno que tiene la sesión, las notas que tenga el código del curso,
		//dichas notas las metemos en un array y la devolvemos
		var listaCalificaciones=[];
		var indice=0;
		var oAlu=null;
		for (var i=0; i<this._usuarios.length; i++) 
			if (this._usuarios[i].dni == dniAlu)
				oAlu=this._usuarios[i];


			for (var i = 0; i < oAlu.listaCalificaciones.length; i++) 
			{
				if (oAlu.listaCalificaciones[i].codCurso== codCurso)
				{
					for (var j=0; j< oAlu.listaCalificaciones[i].nota.length; j++)
					{
						listaCalificaciones[indice]=oAlu.listaCalificaciones[i].nota[j];
						indice++;
					}
					
				}
			}
				
		return listaCalificaciones;
	}

	addCalificacionesAlu(dni, oCalificacion)
	{
			for (var i = 0; i < this._usuarios.length; i++) 
			{
				if (this._usuarios[i].dni== dni)
				{
					this._usuarios[i].addNota(oCalificacion);
				}
			}

	}
/*
	cambiarEstadoMatri(oMatri)
	{
		for (var i = 0; i < this._matriculas.length; i++) 
		{
			if (this._matriculas[i] == oMatri)
			{
				if (oMatri.estado =="encurso")
				{
					this._matriculas[i].estado = "cerrado";
				}
				else
				{
					this._matriculas[i].estado = "encurso";
				}
			}
		}
	}
*/


}





