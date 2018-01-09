class Persona{
constructor(snombre,sapellido,sdni,stelefono,sdireccion,scorreo){

	this.nombre=snombre;
	this.apellido=sapellido;
	this.dni=sdni;
	this.telefono=stelefono;
	this.direccion=sdireccion;
	this.correo=scorreo;


}

}


class Profesor extends Persona{

constructor(snombre,sapellido,sdni,stelefono,sdireccion,scorreo,scargo,sdespacho,bestadoPago,dtinicioTutoria,dtfinTutoria)
{

super(snombre,sapellido,sdni,stelefono,sdireccion,scorreo);

	this.cargo=scargo;
	this.despacho=sdespacho;
	this.estadoPago=bestadoPago;
	this.inicioTutoria=dtinicioTutoria;
	this.finTutoria=dtfinTutoria;

}
}

class Alumno extends Persona{

constructor(snombre,sapellido,sdni,stelefono,sdireccion,scorreo,bestadoCobro)
{

super(snombre,sapellido,sdni,stelefono,sdireccion,scorreo);

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

constructor(sidioma,sduracion,fprecio,sañoAcademico,stipo)
{



	this.idioma=sidioma;
	this.duracion=sduracion;
	this.precio=fprecio;
	this.añoAcademico=sañoAcademico;
	this.tipo=stipo;


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





