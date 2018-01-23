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
	}
}

class Alumno extends Persona
{
	constructor(sNombre, sPassword, sApellido, sDni, iTelefono, sDireccion, sCorreo, bActivo, bEstadoCobro)
	{
		super(sNombre, sPassword, sApellido, sDni, iTelefono, sDireccion, sCorreo, bActivo);

		this.estadoCobro=bEstadoCobro;
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
	constructor(fNota,sTipoExamen)
	{
		this.nota=fNota;
		this.tipoExamen=sTipoExamen;
	}
}

class Curso
{
	constructor(sCodigo, sIdioma, sDuracion, fPrecio, sAñoAcademico, sTipo, bArchivado)
	{
		this.codigo=sCodigo;
		this.idioma=sIdioma;
		this.duracion=sDuracion;
		this.precio=fPrecio;
		this.añoAcademico=sAñoAcademico;
		this.tipo=sTipo;
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

// Clase contenedora 
class Academia
{ 
	constructor ()
	{
		this._alumnos=[]; //atributo privado, array que contiene todos los alumnos de la academia
		this._usuarios=[]; //atributo privado, array que contiene todos los usuarios de la academia
		this._cursos=[]; //atributo privado, array que contiene todos los cursos de la academia
	}

	addAlumno(oAlumno)
	{
		this._alumnos.push(oAlumno);
		this._usuarios.push(oAlumno);
	}


	addProfesor(oProfesor)
	{
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
}





