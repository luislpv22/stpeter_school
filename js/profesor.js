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

var btnAddNota= document.getElementById("btnAddNota");
btnAddNota.addEventListener("click", mostrarFormularioCalificar, false);

var guardarNota= document.getElementById("guardarNota");
guardarNota.addEventListener("click", addCalificacion, false);

var selectCursoConsultar = document.getElementById("selectCursoConsultar");

selectCursoConsultar.addEventListener("click", actualizaSelectConsultar, false);
document.querySelector('#enlaceMisDatos').addEventListener("click", mostrarPagina, false);
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
	
 if (oE.target.id == "enlaceConsultar")
	{

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

        document.getElementById("capaConsultarNotas").classList.add("ocultar");
        document.getElementById("capaModificarAlu").classList.remove("ocultar");
        cargarDatosUsuario();
    }
}

function actualizaSelectCalificar(sDni)
{
	var oAlumno = academia.getUsuario(sDni);
        var oTablaActu = oAlumno.listaCursos;
        var oSelec = document.querySelector("#selectCursoCalificar");
        var bEnc = false;

        for (var i=0; i<oTablaActu.length; i++)
        {
            var oOption = document.createElement("option");
            var oCurso =academia.getCurso(oTablaActu[i]);
             oOption.text = capitalize(oCurso.idioma)+" "+oCurso.nivel+" "+capitalize(oCurso.tipo);
             oOption.value = oCurso.codigo;
            for (var j=0; j<oSelec.options.length && !bEnc; j++)
                 if(oSelec.options[j].value == oOption.value)
                    bEnc = true;

            if(!bEnc)
                oSelec.add(oOption);
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
	
    var sCurso = document.getElementById("selectCursoCalificar").value;
    var dni = this.getAttribute("data-dni");
    var sDescripcion = document.getElementById("txtDescr").value;
    var fNota = document.getElementById("txtNota").value;
    var bEnc= false;
      var oAlumno= academia.getUsuario(dni);
      var oListaNotas= oAlumno.listaCalificaciones;

      for (var i = 0; i < oListaNotas.length; i++) {
      	      if(oListaNotas[i].curso==sCurso && oListaNotas[i].descripcion==sDescripcion)
                bEnc=true;
      }
if(!bEnc)
{
	academia.addCalificacionesAlu(dni,new Calificacion(sDescripcion, fNota, sCurso));
	var oTabla = document.querySelector("#modal #tablaNotasAlumno");
    oTabla.classList.remove("ocultar");
    var oForm = document.querySelector("#modal #addNotaAlumno");
    oForm.classList.add("ocultar");
}else{

document.querySelector("#modal .alert span").textContent="Ya existe una tarea con ese nombre";
document.querySelector('#modal .alert').classList.remove('alert-success', 'alert-danger', 'alert-warning', 'alert-info', 'ocultar');
document.querySelector('#modal .alert').classList.add('alert-warning');
}



}

function modificarCalificacion()
{
	var dni = this.getAttribute("data-dni");
	var oAlumno = academia.getUsuario(dni);
	var desc =this.getAttribute("data-desc");
	var nota = this.parentNode.parentNode.querySelector("#inputNota");
	var curso =this.getAttribute("data-curso");

	academia.modificarNotaAlumno(oAlumno.dni, new Calificacion(desc,nota.value,curso));

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
		var oCeldaboton=fila.insertCell(-1)
		var boton=document.createElement("input");
			boton.setAttribute("data-numero", i);
			boton.type = "text";
			boton.id   = "inputNota";
			boton.value = tNotas[i].nota;
			boton.classList.add("col-sm-2");
			oCeldaboton.appendChild(boton);

		fila.insertCell(-1).appendChild(document.createTextNode(tNotas[i].curso));
		var oCelda=fila.insertCell(-1);
		var btn = document.createElement("input");
				btn.type = "button";
				btn.value = "Modificar";
				btn.classList.add("btn", "btn-warning", "btn-sm");
				btn.setAttribute("data-toggle", "modal");
				btn.setAttribute("data-target", "#modal");
				btn.setAttribute("data-dni", oAlumno.dni);
				btn.setAttribute("data-desc", tNotas[i].descripcion);
				btn.setAttribute("data-curso", tNotas[i].curso);
				btn.addEventListener("click", modificarCalificacion);
				oCelda.appendChild(btn);
		var oCelda2=fila.insertCell(-1);
		var btn2 = document.createElement("input");
				btn2.type = "button";
				btn2.value = "Borrar";
				btn2.classList.add("btn", "btn-danger", "btn-sm");
				btn2.setAttribute("data-dni", oAlumno.dni);
				btn2.setAttribute("data-desc", tNotas[i].descripcion);
				btn2.setAttribute("data-curso", tNotas[i].curso);
				btn2.addEventListener("click", BorrarNota);
				oCelda2.appendChild(btn2);

	}


	document.getElementById("guardarNota").setAttribute("data-dni", oAlumno.dni);
	actualizaSelectCalificar(oAlumno.dni);


}


	function BorrarNota()
{

	var fila = this.parentNode.parentNode;
    fila.classList.add("ocultar");



}
function mostrarFormularioCalificar()
{

var oTabla = document.querySelector("#modal #tablaNotasAlumno");
oTabla.classList.add("ocultar");

var oForm = document.querySelector("#modal #addNotaAlumno");
oForm.classList.remove("ocultar");



}


