var sesion = JSON.parse(sessionStorage.usuario);
document.querySelector('#sidebar .usuario .nombre').appendChild(document.createTextNode(sesion.nombre));

if (sesion.tipo != 'administrador')
    location.href = "index.html";

var btnCerrarSesion= document.querySelector("#btnCerrarSesion");
btnCerrarSesion.addEventListener("click", cerrarSesion, false);

document.querySelector('#btnCursos').addEventListener("click", function () { mostrarPagina('cursos'); });
document.querySelector('#btnAlumnos').addEventListener("click", function () { mostrarPagina('alumnos'); });
document.querySelector('#btnProfesores').addEventListener("click", function () { mostrarPagina('profesores'); });
document.querySelector('#btnAdministradores').addEventListener("click", function () { mostrarPagina('administradores'); });
document.querySelector('#btnMatriculas').addEventListener("click", function () { mostrarPagina('matriculaciones'); });

document.querySelector('#btnAddCurso').addEventListener("click", crearCurso);

mostrarPagina('cursos');

function mostrarPagina(pagina)
{
	if (pagina == 'cursos')
	{
		var tablaCursos = document.querySelector('#tablaCursos');

		for (var i=tablaCursos.rows.length-1; i>0; i--)
			tablaCursos.deleteRow(i);
	
		var cursos = academia.getCursos();
		for (var i=0; i<cursos.length; i++)
		{
			var fila = tablaCursos.insertRow(-1);
			fila.insertCell(-1).appendChild(document.createTextNode(cursos[i].codigo.toUpperCase()));
			fila.insertCell(-1).appendChild(document.createTextNode(capitalize(cursos[i].idioma)));
			fila.insertCell(-1).appendChild(document.createTextNode(cursos[i].nivel.toUpperCase()));
			fila.insertCell(-1).appendChild(document.createTextNode(capitalize(cursos[i].tipo)));
			fila.insertCell(-1).appendChild(document.createTextNode(cursos[i].duracion));
			fila.insertCell(-1).appendChild(document.createTextNode(cursos[i].precio+" €"));

			var swActivo = switchActivo();
			if (cursos[i].bArchivado == "si")
				swActivo.querySelector('.switch-activo').checked = "checked";

			swActivo.querySelector('.switch-activo').setAttribute("data-codigo", cursos[i].codigo);
			swActivo.querySelector('.switch-activo').addEventListener("click", desactivarCurso);

			fila.insertCell(-1).appendChild(swActivo);
			var btn = document.createElement("input");
			btn.type = "button";
			btn.value = "Editar";
			btn.classList.add("btn", "btn-danger", "btn-sm");
			btn.setAttribute("data-toggle", "modal");
			btn.setAttribute("data-target", "#modal");
			btn.setAttribute("data-codigo", cursos[i].codigo);
			btn.addEventListener("click", editarCurso);
			fila.insertCell(-1).appendChild(btn);
		}

		var capas = document.querySelectorAll('#content > .container-fluid');
		for (var i=0; i<capas.length; i++)
			capas[i].classList.add('hidden'); 

		var menus = document.querySelectorAll('nav li');
		for (var i=0; i<menus.length; i++)
			menus[i].classList.remove('active');

		document.querySelector('#paginaCursos').classList.remove('hidden');
		document.querySelector('#btnCursos').parentNode.classList.add('active');
	}
	else if (pagina == 'alumnos')
	{
		var tablaAlumnos = document.querySelector('#tablaAlumnos');

		for (var i=tablaAlumnos.rows.length-1; i>0; i--)
			tablaAlumnos.deleteRow(i);

		var alumnos = academia.getAlumnos();
		for (var i=0; i<alumnos.length; i++)
		{
			var fila = tablaAlumnos.insertRow(-1);
			fila.insertCell(-1).appendChild(document.createTextNode(alumnos[i].dni.toUpperCase()));
			fila.insertCell(-1).appendChild(document.createTextNode(alumnos[i].nombre));
			fila.insertCell(-1).appendChild(document.createTextNode(alumnos[i].apellido));
			fila.insertCell(-1).appendChild(document.createTextNode(alumnos[i].correo));
			fila.insertCell(-1).appendChild(document.createTextNode(alumnos[i].activo.toUpperCase()));
			var btn = document.createElement("input");
			btn.type = "button";
			btn.value = "Editar";
			btn.setAttribute("data-toggle", "modal");
			btn.setAttribute("data-target", "#modal");
			btn.classList.add("btn", "btn-danger", "btn-sm");
			btn.addEventListener("click", function() { editarAlumno(alumnos[i].dni); });
			fila.insertCell(-1).appendChild(btn);
		}

		var capas = document.querySelectorAll('#content > .container-fluid');
		for (var i=0; i<capas.length; i++)
			capas[i].classList.add('hidden'); 

		var menus = document.querySelectorAll('nav li');
		for (var i=0; i<menus.length; i++)
			menus[i].classList.remove('active');

		document.querySelector('#paginaAlumnos').classList.remove('hidden');
		document.querySelector('#btnAlumnos').parentNode.classList.add('active');
	}
	else if (pagina == 'profesores')
	{
		var tablaProfesores = document.querySelector('#tablaProfesores');

		for (var i=tablaProfesores.rows.length-1; i>0; i--)
			tablaProfesores.deleteRow(i);

		var profesores = academia.getProfesores();
		for (var i=0; i<profesores.length; i++)
		{
			var fila = tablaProfesores.insertRow(-1);
			fila.insertCell(-1).appendChild(document.createTextNode(profesores[i].dni.toUpperCase()));
			fila.insertCell(-1).appendChild(document.createTextNode(profesores[i].nombre));
			fila.insertCell(-1).appendChild(document.createTextNode(profesores[i].apellido));
			fila.insertCell(-1).appendChild(document.createTextNode(profesores[i].correo));
			fila.insertCell(-1).appendChild(document.createTextNode(profesores[i].activo.toUpperCase()));
			var btn = document.createElement("input");
			btn.type = "button";
			btn.value = "Editar";
			btn.setAttribute("data-toggle", "modal");
			btn.setAttribute("data-target", "#modal");
			btn.classList.add("btn", "btn-danger", "btn-sm");
			btn.addEventListener("click", function() { editarProfesor(profesores[i].dni); });
			fila.insertCell(-1).appendChild(btn);
		}

		var capas = document.querySelectorAll('#content > .container-fluid');
		for (var i=0; i<capas.length; i++)
			capas[i].classList.add('hidden'); 

		var menus = document.querySelectorAll('nav li');
		for (var i=0; i<menus.length; i++)
			menus[i].classList.remove('active');

		document.querySelector('#paginaProfesores').classList.remove('hidden');
		document.querySelector('#btnProfesores').parentNode.classList.add('active');
	}
	else if (pagina == 'administradores')
	{
		var tablaAdministradores = document.querySelector('#tablaAdministradores');

		for (var i=tablaAdministradores.rows.length-1; i>0; i--)
			tablaAdministradores.deleteRow(i);

		var administradores = academia.getAdministradores();
		for (var i=0; i<administradores.length; i++)
		{
			var fila = tablaAdministradores.insertRow(-1);
			fila.insertCell(-1).appendChild(document.createTextNode(administradores[i].dni.toUpperCase()));
			fila.insertCell(-1).appendChild(document.createTextNode(administradores[i].nombre));
			fila.insertCell(-1).appendChild(document.createTextNode(administradores[i].apellido));
			fila.insertCell(-1).appendChild(document.createTextNode(administradores[i].correo));
			fila.insertCell(-1).appendChild(document.createTextNode(administradores[i].activo.toUpperCase()));
			var btn = document.createElement("input");
			btn.type = "button";
			btn.value = "Editar";
			btn.setAttribute("data-toggle", "modal");
			btn.setAttribute("data-target", "#modal");
			btn.classList.add("btn", "btn-danger", "btn-sm");
			btn.addEventListener("click", function() { editarAdministrador(administradores[i].dni); });
			fila.insertCell(-1).appendChild(btn);
		}

		var capas = document.querySelectorAll('#content > .container-fluid');
		for (var i=0; i<capas.length; i++)
			capas[i].classList.add('hidden'); 

		var menus = document.querySelectorAll('nav li');
		for (var i=0; i<menus.length; i++)
			menus[i].classList.remove('active');

		document.querySelector('#paginaAdministradores').classList.remove('hidden');
		document.querySelector('#btnAdministradores').parentNode.classList.add('active');
	}
	else if (pagina == 'matriculaciones')
	{
		var tablaMatriculas = document.querySelector('#tablaMatriculas');

		if (tablaMatriculas.rows.length == 1)
		{
			var matriculas = academia.getMatriculas();
			for (var i=0; i<matriculas.length; i++)
			{
				var fila = tablaMatriculas.insertRow(-1);
				fila.insertCell(-1).appendChild(document.createTextNode(matriculas[i].numero));
				fila.insertCell(-1).appendChild(document.createTextNode(matriculas[i].oAlumno.dni.toUpperCase()));

					//para mostrar los códigos de las asignaturas de la matrícula
				sTexto="";
				for (var j = 0; j < matriculas[i].listaCursosMatri.length; j++)
				{
					oCurso= academia.getCursoPorCodigo(matriculas[i].listaCursosMatri[j]);
					sTexto+=  oCurso.idioma+" "+oCurso.nivel+" "+oCurso.tipo+"\n";
				}
				fila.insertCell(-1).appendChild(document.createTextNode(sTexto));
				fila.insertCell(-1).appendChild(document.createTextNode(matriculas[i].estado.toUpperCase()));

				var swActivo = switchActivo();
				if (cursos[i].bArchivado == "si")
					swActivo.querySelector('.switch-activo').checked = "checked";

				swActivo.querySelector('.switch-activo').setAttribute("data-numero", matriculas[i].numero);
				swActivo.querySelector('.switch-activo').addEventListener("click", desactivarMatricula);
				fila.insertCell(-1).appendChild(swActivo);

				var btn = document.createElement("input");
				btn.type = "button";
				btn.value = "Cambiar Estado";
				btn.setAttribute("onclick", "cambiarEstadoMatricula('"+matriculas[i].numero+"');");
				btn.setAttribute("data-toggle", "modal");
				btn.setAttribute("data-target", "#modal");
				btn.classList.add("btn");
				btn.classList.add("btn-danger");
				btn.classList.add("btn-sm");
				btn.id="cambiarEstadoMatri";
				fila.appendChild(btn);
			}
	     }

	    var capas = document.querySelectorAll('#content > .container-fluid');
		for (var i=0; i<capas.length; i++)
			capas[i].classList.add('hidden'); 

		var menus = document.querySelectorAll('nav li');
		for (var i=0; i<menus.length; i++)
			menus[i].classList.remove('active');

		document.querySelector('#paginaMatriculaciones').classList.remove('hidden');
		document.querySelector('#btnMatriculas').parentNode.classList.add('active');
	 }

}

function editarCurso()
{
	var codigo = this.getAttribute("data-codigo");
	var oCurso = academia.getCurso(codigo);
	var form = document.getElementById("formEditarCurso");
	form.codigo.value = oCurso.codigo;
	form.idioma.value = oCurso.idioma;
	form.nivel.value = oCurso.nivel;
	form.tipo.value = oCurso.tipo;

	var duracion = oCurso.duracion.split(" ");
	form.duracion1.value = duracion[0];
	form.duracion2.value = duracion[1];

	form.precio.value = oCurso.precio;
	form.activo.value = oCurso.bArchivado;

	document.querySelector('#modal .btn-success').id = "btnGuardarCurso";
	document.querySelector('#btnGuardarCurso').setAttribute("data-codigo", codigo);
	document.querySelector('#btnGuardarCurso').addEventListener("click", guardarCurso);

	form.style.display = "block";
}

function crearCurso()
{
	var form = document.getElementById("formEditarCurso");
	document.querySelector('#modal .btn-success').id = "btnGuardarCurso";
	document.querySelector('#btnGuardarCurso').removeAttribute("data-codigo");
	document.querySelector('#btnGuardarCurso').addEventListener("click", guardarCurso);
	form.codigo.removeAttribute("readonly");
	form.codigo.value = "";
	form.idioma.value = "Inglés";
	form.nivel.value = "A1";
	form.tipo.value = "Presencial";
	form.duracion1.value = "1";
	form.duracion2.value = "meses";
	form.precio.value = "0.00";
	form.activo.value = "si";
	form.style.display = "block";
}

function desactivarCurso()
{
	var codigo = this.getAttribute("data-codigo");
	var oCurso = academia.getCurso(codigo);
	
	if (oCurso.bArchivado == "si")
		oCurso.bArchivado = "no";
	else
		oCurso.bArchivado = "si";

	academia.modificarCurso(oCurso);
}

function guardarCurso()
{
	var form = document.getElementById("formEditarCurso");

	var sCodigo = form.codigo.value;

	var dataCod = this.getAttribute("data-codigo");
	if (dataCod != null)
		sCodigo = dataCod;

	var sIdioma = form.idioma.value;
	var sNivel = form.nivel.value;
	var sTipo = form.tipo.value;
	var fPrecio = parseFloat(form.precio.value);
	var sDuracion = form.duracion1.value + " " + form.duracion2.value;
	var bActivo = form.activo.value;

	var oCurso = new Curso(sCodigo, sIdioma, sDuracion, fPrecio, sTipo, sNivel, bActivo);

	if (dataCod != null)
		academia.modificarCurso(oCurso);
	else
		academia.addCurso(oCurso);
}

function guardarCurso(codigo)
{
	var curso = academia.getCurso(codigo);
	document.getElementById("formEditarCurso").style.display = "block";
}


function switchActivo()
{ssList.add("switch-container");
	var chkActivo = document.createElement("input");
	chkActivo.type = "checkbox";
	chkActivo.classList.add("switch-activo");
	var divOuter = document.createElement("div");
	divOuter.classList.add("switch-outer");
	var divInner = document.createElement("div");
	divInner.classList.add("switch-inner");
	divOuter.appendChild(divInner);
	lblActivo.appendChild(chkActivo);
	lblActivo.appendChild(divOuter);

	return lblActivo;
}

/*
function desactivarMatricula()
{
	var numero = this.getAttribute("data-numero");
	var oMatric
	var lblActivo = document.createElement("label");
	lblActivo.claula = academia.getMatricula(numero);

	if (oMatricula.estado == "encurso")
		oMatricula.estado = "cerrado";
	else
		oMatricula.estado = "encurso";

	academia.modificarMatricula(oMatricula);
}*/
