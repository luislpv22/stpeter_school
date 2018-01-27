var sesion = JSON.parse(sessionStorage.usuario);

if (sesion.tipo != 'profesor')
    location.href = "index.html";

document.querySelector('#sidebar .usuario .nombre').appendChild(document.createTextNode(sesion.nombre));

var btnCerrarSesion = document.querySelector("#btnCerrarSesion");
btnCerrarSesion.addEventListener("click", cerrarSesion, false);

document.querySelector('#sidebarCollapse').addEventListener("click", mostrarSidebar, false);

function mostrarSidebar()
{
    var sidebar = document.querySelector('#sidebar');
    if (sidebar.classList.contains('active'))
        sidebar.classList.remove('active');
    else
        sidebar.classList.add('active');
}

var selectCursoCalificar = document.frmCalificar.selectCursoCalificar;
var selectCursoModificar = document.frmModificar.selectCursoModificar;
var selectCursoConsultar = document.getElementById("selectCursoConsultar");
var btnCalificar = document.frmCalificar.calificar;
var btnModificar = document.frmModificar.modificar;

selectCursoCalificar.addEventListener("change", actualizaSelectCalificar, false);
selectCursoModificar.addEventListener("change", actualizaSelectModificar, false);
selectCursoConsultar.addEventListener("change", actualizaSelectConsultar, false);
btnCalificar.addEventListener("click", addCalificacion, false);
btnModificar.addEventListener("click", modificarCalificacion, false);

document.querySelector('#enlaceMisDatos').addEventListener("click", mostrarPagina, false);
document.querySelector('#enlaceCalificar').addEventListener("click", mostrarPagina, false);
document.querySelector('#enlaceModificar').addEventListener("click", mostrarPagina, false);
document.querySelector('#enlaceConsultar').addEventListener("click", mostrarPagina, false);


function actualizaSelectConsultar()
{
	var selectCursoConsultar = document.getElementById("selectCursoConsultar");
	var oTabla = academia.consultarNotas(sesion.dni, selectCursoConsultar.value);
	var oFieldset = document.querySelectorAll("div #capaNotas");
    oFieldset[0].appendChild(oTabla);
}

function mostrarPagina(oEvento)
{
	oE= oEvento || window.event;
	if (oE.target.id == "enlaceCalificar")
	{
		document.getElementById("capaConsultarNotas").classList.add("ocultar");
		document.getElementById("capaModificarNotas").classList.add("ocultar");
		document.getElementById("capaModificarAlu").classList.add("ocultar");
		document.getElementById("capaCalificarAlu").classList.remove("ocultar");

		var oProfesor = academia.getUsuario(sesion.dni);
		var oTablaActu = oProfesor.getCursos();
		var oSelec = document.querySelector("#selectCursoCalificar");
		var bEnc = false;

		for (var i=0; i<oTablaActu.length; i++)
		{
			var oOption = document.createElement("option");
	     	oOption.text = capitalize(oTablaActu[i].idioma)+" "+oTablaActu[i].nivel+" "+capitalize(oTablaActu[i].tipo);
	     	oOption.value = oTablaActu[i].codigo;
			for (var j=0; j<oSelec.options.length && !bEnc; j++)
	     		if(oSelec.options[j].value == oOption.value)
	                bEnc = true;

			if(!bEnc)
				oSelec.add(oOption);
	    }
	}
	else if (oE.target.id == "enlaceModificar")
	{
		document.getElementById("capaModificarNotas").classList.remove("ocultar");
		document.getElementById("capaCalificarAlu").classList.add("ocultar");
		document.getElementById("capaConsultarNotas").classList.add("ocultar");
		document.getElementById("capaModificarAlu").classList.add("ocultar");

		var oProfesor = academia.getUsuario(sesion.dni);
		var tCursos = oProfesor.getCursos();
		var oSelec = document.querySelector("#selectCursoModificar");
		var bEnc = false;

		for (var i=0; i<tCursos.length; i++)
		{
			var oOption = document.createElement("option");
			oOption.text = capitalize(tCursos[i].idioma)+" "+tCursos[i].nivel+" "+capitalize(tCursos[i].tipo);
			oOption.value = tCursos[i].codigo;

			for (var j=0; j<oSelec.options.length && !bEnc; j++)
				if(oSelec.options[j].value == oOption.value)
	          		bEnc = true;

			if(!bEnc)
				oSelec.add(oOption);
		}
	}
	else if (oE.target.id == "enlaceConsultar")
	{
		document.getElementById("capaCalificarAlu").classList.add("ocultar");
		document.getElementById("capaModificarNotas").classList.add("ocultar");
		document.getElementById("capaModificarAlu").classList.add("ocultar");
		document.getElementById("capaConsultarNotas").classList.remove("ocultar");
		var oTabla = academia.consultarNotas(sesion.dni, "todo");
		var oFieldset = document.querySelectorAll("div #capaNotas");
        oFieldset[0].appendChild(oTabla);

		var oProfesor = academia.getUsuario(sesion.dni);
		var tCursos = oProfesor.getCursos();
		var oSelec = document.querySelector("#selectCursoConsultar");
		var bEnc = false;

		for (var i=0; i<tCursos.length; i++)
		{
			var oOption = document.createElement("option");
			oOption.text = capitalize(tCursos[i].idioma)+" "+tCursos[i].nivel+" "+capitalize(tCursos[i].tipo);
			oOption.value = tCursos[i].codigo;
			for (var j=0; j<oSelec.options.length && !bEnc; j++)
				if(oSelec.options[j].value == oOption.value)
					bEnc = true;

			if(!bEnc)
				oSelec.add(oOption);
		}
	}
	else if (oE.target.id == "enlaceMisDatos")
    {
        document.getElementById("capaModificarNotas").classList.add("ocultar");
        document.getElementById("capaCalificarAlu").classList.add("ocultar");
        document.getElementById("capaConsultarNotas").classList.add("ocultar");
        document.getElementById("capaModificarAlu").classList.remove("ocultar");
        cargarDatosUsuario();
    }
}

function actualizaSelectCalificar()
{
	document.getElementById("selectAlumnoCalificar").remove(0);

    var oSelectCurso = document.getElementById("selectCursoCalificar");
    var oSelectAlumno = document.getElementById("selectAlumnoCalificar");
	var tAlumnos = academia.getCurso(oSelectCurso.value).listaAlumnos;

	document.getElementById("capaSelectAlumnoCalificar").classList.remove("ocultar");
	document.getElementById("CapNotaAluCalificar").classList.remove("ocultar");

	var bCursoEnc = false;
	var bAluEnc = false;
	for (var i=0; i<tAlumnos.length; i++)
	{
		var oAlumno = academia.getUsuario(tAlumnos[i]);
		var tCalificaciones = oAlumno.listaCalificaciones;

		for (var k=0; k<tCalificaciones.length && !bCursoEnc; k++)
			if(tCalificaciones[k].codCurso == oSelectCurso.value)
				bCursoEnc = true;

		if(!bCursoEnc)
		{
			var oOption = document.createElement("option");
			oOption.text = oAlumno.nombre+", "+oAlumno.apellidos;
			oOption.value = oAlumno.dni;
		}

		for (var j=0; j<oSelectAlumno.options.length && !bAluEnc; j++)
			if(oSelectAlumno.options[j].value == oOption.value)
				bAluEnc = true;

		if(!bAluEnc && oOption != null)
			oSelectAlumno.add(oOption);
	}
}

function actualizaSelectModificar()
{
	document.getElementById("selectAlumnoModificar").remove(0);

	var oSelectCurso = document.getElementById("selectCursoModificar");
	var oSelectAlumno = document.getElementById("selectAlumnoModificar");
	var tAlumnos = academia.getCurso(oSelectCurso.value).listaAlumnos;

	document.getElementById("capaSelectAlumnoModificar").classList.remove("ocultar");
	document.getElementById("CapNotaAluModificar").classList.remove("ocultar");

	var bAluEnc=false;
	for (var i=0; i<tAlumnos.length; i++)
	{
		var oAlumno = academia.getUsuario(tAlumnos[i]);
		var tCalificaciones = oAlumno.listaCalificaciones;

		for (var k=0; k<tCalificaciones.length; k++)
		{
			if(tCalificaciones[k].codCurso == oSelectCurso.value)
			{
				var oOption = document.createElement("option");
				oOption.text = oAlumno.nombre+", "+oAlumno.apellidos;
				oOption.value = oAlumno.dni;
			}
		}

		for (var j=0; j<oSelectAlumno.options.length && !bAluEnc; j++)
     		if(oSelectAlumno.options[j].value == oOption.value)
				bAluEnc = true;

     	if(!bAluEnc && oOption != null)
     		oSelectAlumno.add(oOption);
    }
}

function addCalificacion()
{
    var oSelectCurso = document.getElementById("selectCursoCalificar");
    var oSelectAlumno = document.getElementById("selectAlumnoCalificar");
    var nota = document.getElementById("NotaAlu");

	academia.addCalificacionesAlu(oSelectAlumno.value,new Calificaciones(nota.value,oSelectCurso.value));
	document.getElementById("capaSelectAlumnoCalificar").classList.add("ocultar");
	document.getElementById("CapNotaAluCalificar").classList.add("ocultar");
	nota.value = "";
}

function modificarCalificacion()
{
    var oSelectCurso = document.getElementById("selectCursoModificar").options[document.getElementById("selectCursoModificar").selectedIndex];
   	var oSelectAlumno = document.getElementById("selectAlumnoModificar").options[document.getElementById("selectAlumnoModificar").selectedIndex];
    var nota = document.getElementById("modTxtNotaAlu");

	academia.modificarNotaAlumno(oSelectAlumno.value, new Calificaciones(nota.value,oSelectCurso.value));
	document.getElementById("capaSelectAlumnoModificar").classList.add("ocultar");
	document.getElementById("CapNotaAluModificar").classList.add("ocultar");
	nota.value = "";
}



