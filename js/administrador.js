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

mostrarPagina('cursos');

function mostrarPagina(pagina)
{
	if (pagina == 'cursos')
	{
		var tablaCursos = document.querySelector('#tablaCursos');
		
		if (tablaCursos.rows.length == 1)
		{
			var cursos = academia.getCursos();
			for (var i=0; i<cursos.length; i++)
			{
				var fila = tablaCursos.insertRow(-1);
				fila.insertCell(-1).appendChild(document.createTextNode(cursos[i].codigo.toUpperCase()));
				fila.insertCell(-1).appendChild(document.createTextNode(capitalize(cursos[i].idioma)));
				fila.insertCell(-1).appendChild(document.createTextNode(cursos[i].nivel.toUpperCase()));
				fila.insertCell(-1).appendChild(document.createTextNode(capitalize(cursos[i].tipo)));
				fila.insertCell(-1).appendChild(document.createTextNode(cursos[i].bArchivado.toUpperCase()));
				var btn = document.createElement("input");
				btn.type = "button";
				btn.value = "Editar";
				btn.setAttribute("onclick", "editarCurso('"+cursos[i].codigo+"');");
				btn.setAttribute("data-toggle", "modal");
				btn.setAttribute("data-target", "#modal");
				btn.classList.add("btn");
				btn.classList.add("btn-danger");
				btn.classList.add("btn-sm");
				fila.insertCell(-1).appendChild(btn);
			}
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

		if (tablaAlumnos.rows.length == 1)
		{
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
				btn.setAttribute("onclick", "editarAlumno('"+alumnos[i].codigo+"');");
				btn.setAttribute("data-toggle", "modal");
				btn.setAttribute("data-target", "#modal");
				btn.classList.add("btn");
				btn.classList.add("btn-danger");
				btn.classList.add("btn-sm");
				fila.insertCell(-1).appendChild(btn);
			}
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

		if (tablaProfesores.rows.length == 1)
		{
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
				btn.setAttribute("onclick", "editarAlumno('"+profesores[i].codigo+"');");
				btn.setAttribute("data-toggle", "modal");
				btn.setAttribute("data-target", "#modal");
				btn.classList.add("btn");
				btn.classList.add("btn-danger");
				btn.classList.add("btn-sm");
				fila.insertCell(-1).appendChild(btn);
			}
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

		if (tablaAdministradores.rows.length == 1)
		{
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
				btn.setAttribute("onclick", "editarAlumno('"+administradores[i].codigo+"');");
				btn.setAttribute("data-toggle", "modal");
				btn.setAttribute("data-target", "#modal");
				btn.classList.add("btn");
				btn.classList.add("btn-danger");
				btn.classList.add("btn-sm");
				fila.insertCell(-1).appendChild(btn);
			}
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
}

function editarCurso(codigo)
{
	var curso = academia.getCurso(codigo);
	document.getElementById("formEditarCurso").style.display = "block";
}