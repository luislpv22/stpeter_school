class Persona{
constructor(snombre,spassword, sapellido,sdni,stelefono,sdireccion,scorreo, sActivo){

	this.Nombre=snombre;
	this.Password=spassword;
	this.Apellido=sapellido;
	this.Dni=sdni;
	this.Telefono=stelefono;
	this.Direccion=sdireccion;
	this.Correo=scorreo;
	this.Activo=sActivo;


}

}


class Profesor extends Persona{

constructor(snombre,spassword, sapellido,sdni,stelefono,sdireccion,scorreo, bActivo, scargo,sdespacho,bestadoPago,dtinicioTutoria,dtfinTutoria)
{

super(snombre,spassword, sapellido,sdni,stelefono,sdireccion,scorreo, bActivo);

	this.cargo=scargo;
	this.despacho=sdespacho;
	this.estadoPago=bestadoPago;
	this.inicioTutoria=dtinicioTutoria;
	this.finTutoria=dtfinTutoria;

}
}

class Alumno extends Persona{

constructor(snombre,spassword, sapellido,sdni,stelefono,sdireccion,scorreo,bActivo, bestadoCobro)
{

super(snombre,spassword,sapellido,sdni,stelefono,sdireccion,scorreo,bActivo);

	this.estadoCobro=bestadoCobro;


}

}

class ApunteContable{

constructor(stipo,bestado,fimporte,sasunto,dtfecha_ven)
{



	this.tipo=stipo;
	this.estado=bestado;
	this.importe=fimporte;
	this.asunto=sasunto;
	this.fecha_ven=dtfecha_ven;


}

}

class Calificaciones{

constructor(fnota,stipoExamen)
{



	this.nota=fnota;
	this.tipoExamen=stipoExamen;


}

}

class Curso{

constructor(sidioma,sduracion,fprecio,sañoAcademico,stipo, bArchivado)
{



	this.idioma=sidioma;
	this.duracion=sduracion;
	this.precio=fprecio;
	this.añoAcademico=sañoAcademico;
	this.tipo=stipo;
	this.listaAlumno=[]; // una lista de los alumnos que están matriculados en el curso
	this.bArchivado=bArchivado; //boolean para saber si el curso sigue activo, o ya termino, o se canceló
}

	addAlumnoCurso(oAlumno)
	{
		this.listaAlumno.push(oAlumno); //añade alumno al curso
	}

}

class Horario{

constructor(scodigo,sdias,thoraInicio,thoraFin)
{



	this.codigo=scodigo;
	this.dias=sdias;
	this.horaInicio=thoraInicio;
	this.horaFin=thoraFin;


}

}


class Aula{

constructor(scodigo,iedificio,iplanta,iaula,icapacidad,stipo)
{



	this.codigo=scodigo;
	this.edificio=iedificio;
	this.planta=iplanta;
	this.aula=iaula;
	this.capacidad=icapacidad;
	this.tipo=stipo;


}

}

class Equipamiento{

constructor(scodigo,stipo,sdescripcion,dtfechaCompra)
{



	this.codigo=scodigo;
	this.tipo=stipo;
	this.descripcion=sdescripcion;
	this.fechaCompra=dtfechaCompra;


}

}

class Academia{ //clase contenedora 

	constructor ()
	{
		this._alumnos=[]; //atributo privado, array que contiene todos los alumnos de la academia
	}

	addAluAcademia(oAlumno)
	{
		this._alumnos.push(oAlumno);
	}


}





