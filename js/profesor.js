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
	var oTabla = consultarNotas(sesion.dni, selectCursoConsultar.value);
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
		var oTabla = consultarNotas(sesion.dni, "todo");
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

		var oOption = document.createElement("option");
		oOption.text = oAlumno.nombre+", "+oAlumno.apellidos;
		oOption.value = oAlumno.dni;

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
    var oSelectCurso = frmCalificar.selectCursoCalificar.value;
    var oSelectAlumno = frmCalificar.selectAlumnoCalificar.value;
    var sDescripcion = frmCalificar.descripcion.value;
    var fNota = frmCalificar.NotaAlu.value;

	academia.addCalificacionesAlu(oSelectAlumno.value,new Calificacion(sDescripcion, nota, oSelectCurso));
	document.getElementById("capaSelectAlumnoCalificar").classList.add("ocultar");
	document.getElementById("CapNotaAluCalificar").classList.add("ocultar");
	sDescripcion = "";
	fNota = "";
}

function modificarCalificacion()
{
    var oSelectCurso = document.getElementById("selectCursoModificar").options[document.getElementById("selectCursoModificar").selectedIndex];
   	var oSelecAlumno = document.getElementById("selectAlumnoModificar").options[document.getElementById("selectAlumnoModificar").selectedIndex];
    var nota = document.getElementById("modTxtNotaAlu");

	academia.modificarNotaAlumno(oSelectCurso.value, oSelectAlumno.value, nota.value);
	document.getElementById("capaSelectAlumnoModificar").classList.add("ocultar");
	document.getElementById("CapNotaAluModificar").classList.add("ocultar");
	nota.value = "";
}

function consultarNotas(sDni,SFiltro)
{
	var oTablaCurProv;
	var oTablaCurAlumProv;

	var oProfesor = academia.getUsuario(sDni);
	oTablaCurProv = oProfesor.getCursos();

    var oTabla = document.querySelector("#tablaListadoAlumnos");
    if (oTabla != null)
    	oTabla.remove();

	// Creacion de la tabla 
    oTabla = document.createElement("table");
    oTabla.id = "tablaListadoAlumnos";
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
    oTH.textContent = "Acciones";
    oFila.appendChild(oTH);

    // Cuerpo de la tabla
    var oTBody = oTabla.createTBody();

	for (var i=0; i<oTablaCurProv.length; i++)
	{
		if(oTablaCurProv[i].codigo == SFiltro || SFiltro == "todo")
		{
		  	oTablaCurAlumProv=oTablaCurProv[i].listaAlumnos;

	    	for (var j=0; j<oTablaCurAlumProv.length; j++)
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

	            var oUsuario = academia.getUsuario(oTablaCurAlumProv[j]);
	            oCelda = oFila.insertCell(-1);
	        	oCelda.textContent = oUsuario.nombre;

	        	oCelda = oFila.insertCell(-1);
				var btn = document.createElement("input");
				btn.type = "button";
				btn.value = "Ver notas";
				btn.classList.add("btn", "btn-warning", "btn-sm");
				btn.setAttribute("data-toggle", "modal");
				btn.setAttribute("data-target", "#modal");
				btn.setAttribute("data-dni", oUsuario.dni);
				btn.addEventListener("click", verNotasAlumno);
				oCelda.appendChild(btn);
	    	}
		}
	}

	return oTabla;
}

function verNotasAlumno()
{
	var dni = this.getAttribute("data-dni");
	var oAlumno = academia.getUsuario(dni);

	document.querySelector('.modal-title').textContent = "Notas de "+oAlumno.nombre+" "+oAlumno.apellidos;

	var oTabla = document.querySelector("#modal #tablaNotasAlumno");

	for (var i=oTabla.rows.length-1; i>0; i--)
		oTabla.deleteRow(i);

	var tNotas = oAlumno.listaCalificaciones;
	for (var i=0; i<tNotas.length; i++)
	{
		var fila = oTabla.insertRow(-1);
		fila.insertCell(-1).appendChild(document.createTextNode(tNotas[i].descripcion));
		fila.insertCell(-1).appendChild(document.createTextNode(tNotas[i].nota));
		fila.insertCell(-1).appendChild(document.createTextNode(tNotas[i].curso));
	}
}

