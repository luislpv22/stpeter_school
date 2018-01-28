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
document.querySelector('#btnAddAlumno').addEventListener("click", crearAlumno);
document.querySelector('#btnAddProfesor').addEventListener("click", crearProfesor);
document.querySelector('#btnAddAdministrador').addEventListener("click", crearAdministrador);

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
			fila.insertCell(-1).appendChild(document.createTextNode(alumnos[i].apellidos));
			fila.insertCell(-1).appendChild(document.createTextNode(alumnos[i].correo));
			fila.insertCell(-1).appendChild(document.createTextNode(alumnos[i].direccion));
			fila.insertCell(-1).appendChild(document.createTextNode(alumnos[i].activo.toUpperCase()));
			var btn = document.createElement("input");
			btn.type = "button";
			btn.value = "Editar";
			btn.classList.add("btn", "btn-danger", "btn-sm");
			btn.setAttribute("data-toggle", "modal");
			btn.setAttribute("data-target", "#modal");
			btn.setAttribute("data-dni", alumnos[i].dni);
			btn.addEventListener("click", editarAlumno);
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
			fila.insertCell(-1).appendChild(document.createTextNode(profesores[i].apellidos));
			fila.insertCell(-1).appendChild(document.createTextNode(profesores[i].correo));
			fila.insertCell(-1).appendChild(document.createTextNode(profesores[i].activo.toUpperCase()));
			var btn = document.createElement("input");
			btn.type = "button";
			btn.value = "Editar";
			btn.classList.add("btn", "btn-danger", "btn-sm");
			btn.setAttribute("data-toggle", "modal");
			btn.setAttribute("data-target", "#modal");
			btn.setAttribute("data-dni", profesores[i].dni);
			btn.addEventListener("click", editarProfesor);
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
			fila.insertCell(-1).appendChild(document.createTextNode(administradores[i].apellidos));
			fila.insertCell(-1).appendChild(document.createTextNode(administradores[i].correo));
			fila.insertCell(-1).appendChild(document.createTextNode(administradores[i].activo.toUpperCase()));

			if (administradores[i].dni != sesion.dni)
			{
				var btn = document.createElement("input");
				btn.type = "button";
				btn.value = "Editar";
				btn.classList.add("btn", "btn-danger", "btn-sm");
				btn.setAttribute("data-toggle", "modal");
				btn.setAttribute("data-target", "#modal");
				btn.setAttribute("data-dni", administradores[i].dni);
				btn.addEventListener("click", editarAdministrador);
				fila.insertCell(-1).appendChild(btn);
			}
			else
				fila.insertCell(-1);
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

		for (var i=tablaMatriculas.rows.length-1; i>0; i--)
			tablaMatriculas.deleteRow(i);

		var matriculas = academia.getMatriculas();
		for (var i=0; i<matriculas.length; i++)
		{
			var fila = tablaMatriculas.insertRow(-1);
			fila.insertCell(-1).appendChild(document.createTextNode(matriculas[i].numero));
			fila.insertCell(-1).appendChild(document.createTextNode(matriculas[i].dniAlumno));

			//para mostrar los códigos de las asignaturas de la matrícula
			var celdaCursos = fila.insertCell(-1);
			for (var j=0; j<matriculas[i].listaCursosMatri.length; j++)
			{
				var div = document.createElement("div");
				var oCurso = academia.getCurso(matriculas[i].listaCursosMatri[j]);
				div.textContent = oCurso.idioma+" "+oCurso.nivel+" "+oCurso.tipo;
				celdaCursos.appendChild(div);
			}
			oFila = fila.insertCell(-1);
			oFila.id="estado";
			oFila.setAttribute("data-estado", matriculas[i].estado);
			oFila.appendChild(document.createTextNode(matriculas[i].estado));
			

			var btn = document.createElement("input");
			btn.type = "button";
			btn.value = "Editar";
			btn.classList.add("btn", "btn-warning", "btn-sm");
			btn.setAttribute("data-toggle", "modal");
			btn.setAttribute("data-target", "#modal");
			btn.setAttribute("data-matricula", matriculas[i].numero);
			btn.addEventListener("click", editarMatricula);
			var acciones = fila.insertCell(-1);
			acciones.appendChild(btn);
			var btn = document.createElement("input");
			btn.type = "button";
			btn.value = "Eliminar";
			btn.classList.add("btn", "btn-danger", "btn-sm");
			btn.setAttribute("data-toggle", "confirmation");
			btn.setAttribute("data-btn-ok-label", "Eliminar");
			btn.setAttribute("data-btn-ok-class", "btn-danger btn-sm");
			btn.setAttribute("data-btn-cancel-label", "Cancelar");
			btn.setAttribute("data-btn-cancel-class", "btn-default btn-sm");
			btn.setAttribute("data-title", "¿Eliminar esta matrícula?");
			btn.setAttribute("data-btn-ok-icon", "");
			btn.setAttribute("data-btn-cancel-icon", "");
			btn.setAttribute("data-matricula", matriculas[i].numero);
			acciones.appendChild(btn);
		}

		jQuery('[data-toggle=confirmation]').confirmation({rootSelector: '[data-toggle=confirmation]'});
		jQuery('[data-toggle=confirmation]').on("confirmed.bs.confirmation", borrarMatricula);

	    var capas = document.querySelectorAll('#content > .container-fluid');
		for (var i=0; i<capas.length; i++)
			capas[i].classList.add('hidden'); 

		var menus = document.querySelectorAll('nav li');
		for (var i=0; i<menus.length; i++)
			menus[i].classList.remove('active');
		
		document.querySelector('#paginaMatriculaciones').classList.remove('hidden');
		document.querySelector('#btnMatriculas').parentNode.classList.add('active');
		filtrarTabla();
	 }

}

function resetearCamposCurso()
{
	var input = document.querySelectorAll('#formEditarCurso input');
    for (var i=0; i<input.length; i++)
    input[i].classList.remove("errorFormulario");

    var mensajes = document.querySelectorAll('#formEditarCurso .text-error');
    for (var i=0; i<mensajes.length; i++)
    mensajes[i].remove();
}

function editarCurso()
{
	document.querySelector('.modal-title').textContent = "Editar curso";
	var forms = document.querySelectorAll('#modal form');
	for (var i=0; i<forms.length; i++)
		forms[i].style.display = "none";

	var codigo = this.getAttribute("data-codigo");
	var oCurso = academia.getCurso(codigo);
	var form = document.getElementById("formEditarCurso");

	resetearCamposCurso();

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
	document.querySelector('.modal-title').textContent = "Crear curso";
	var forms = document.querySelectorAll('#modal form');
	for (var i=0; i<forms.length; i++)
		forms[i].style.display = "none";

	var form = document.getElementById("formEditarCurso");
	document.querySelector('#modal .btn-success').id = "btnGuardarCurso";
	document.querySelector('#btnGuardarCurso').removeAttribute("data-codigo");
	document.querySelector('#btnGuardarCurso').addEventListener("click", guardarCurso);


	resetearCamposCurso();


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

	if (comprobarFormCurso()==true)
	{
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

		mostrarPagina('cursos');
		document.querySelector('#modal .close').click();
	}
}

function resetearCamposAlumno()
{
	var input = document.querySelectorAll('#formEditarAlumno input');
    for (var i=0; i<input.length; i++)
    input[i].classList.remove("errorFormulario");

    var mensajes = document.querySelectorAll('#formEditarAlumno .text-error');
    for (var i=0; i<mensajes.length; i++)
    mensajes[i].remove();
}


function editarAlumno()
{
	document.querySelector('.modal-title').textContent = "Editar alumno";
	var forms = document.querySelectorAll('#modal form');
	for (var i=0; i<forms.length; i++)
		forms[i].style.display = "none";

	var dni = this.getAttribute("data-dni");
	var oAlumno = academia.getUsuario(dni);
	var form = document.getElementById("formEditarAlumno");

	resetearCamposAlumno();

	form.dni.value = oAlumno.dni;
	form.password.value = oAlumno.password;
	form.nombre.value = oAlumno.nombre;
	form.apellidos.value = oAlumno.apellidos;
	form.email.value = oAlumno.correo;
	form.telefono.value = oAlumno.telefono;
	form.direccion.value = oAlumno.direccion;

	document.querySelector('#modal .btn-success').id = "btnGuardarAlumno";
	document.querySelector('#btnGuardarAlumno').setAttribute("data-dni", dni);
	document.querySelector('#btnGuardarAlumno').addEventListener("click", guardarAlumno);



	form.style.display = "block";
}

function crearAlumno()
{
	document.querySelector('.modal-title').textContent = "Nuevo alumno";
	var forms = document.querySelectorAll('#modal form');
	for (var i=0; i<forms.length; i++)
		forms[i].style.display = "none";

	var form = document.getElementById("formEditarAlumno");
	document.querySelector('#modal .btn-success').id = "btnGuardarAlumno";
	document.querySelector('#btnGuardarAlumno').removeAttribute("data-dni");
	document.querySelector('#btnGuardarAlumno').addEventListener("click", guardarAlumno);

	resetearCamposAlumno();

	form.dni.removeAttribute("readonly");
	form.dni.value = "";
	form.password.value = "";
	form.nombre.value = "";
	form.apellidos.value = "";
	form.email.value = "";
	form.telefono.value = "";
	form.direccion.value = "";
	form.style.display = "block";
}

function guardarAlumno()
{
	var form = document.getElementById("formEditarAlumno");

	if (comprobarAltaAlu()==true)
	{
		var sDNI = form.dni.value;

		var dataDNI = this.getAttribute("data-dni");
		if (dataDNI != null)
			sDNI = dataDNI;

		var sPassword = form.password.value;
		var sNombre = form.nombre.value;
		var sApellidos = form.apellidos.value;
		var sCorreo = form.email.value;
		var sTelefono = form.telefono.value;
		var sDireccion = form.direccion.value;

		var oAlumno = new Alumno(sNombre, sPassword, sApellidos, sDNI, sTelefono, sDireccion, sCorreo, "si", "");

		if (dataDNI != null)
			academia.modificarUsuario(oAlumno);
		else
			academia.addUsuario(oAlumno);

		mostrarPagina('alumnos');
		document.querySelector('#modal .close').click();
	}
	
}


function resetearCamposProfesor()
{
	var input = document.querySelectorAll('#formEditarProfesor .errorFormulario');
    for (var i=0; i<input.length; i++)
    input[i].classList.remove("errorFormulario");

    var mensajes = document.querySelectorAll('#formEditarProfesor .text-error');
    for (var i=0; i<mensajes.length; i++)
    mensajes[i].remove();
}


function editarProfesor()
{
	document.querySelector('.modal-title').textContent = "Editar profesor";
	var forms = document.querySelectorAll('#modal form');
	for (var i=0; i<forms.length; i++)
		forms[i].style.display = "none";

	var dni = this.getAttribute("data-dni");
	var oProfesor = academia.getUsuario(dni);
	var form = document.getElementById("formEditarProfesor");

	resetearCamposProfesor();

	form.dni.value = oProfesor.dni;
	form.password.value = oProfesor.password;
	form.nombre.value = oProfesor.nombre;
	form.apellidos.value = oProfesor.apellidos;
	form.email.value = oProfesor.correo;
	form.telefono.value = oProfesor.telefono;
	form.direccion.value = oProfesor.direccion;

	var tCursos = academia.getCursos();
	var options = document.querySelectorAll('#formEditarProfesor #selectCursosProf option');
	for (var i=0; i<options.length; i++)
		options[i].parentNode.removeChild(options[i]);

	for (var i=0; i<tCursos.length; i++) 
	{
		var option = document.createElement("option");
		option.value = tCursos[i].codigo;
		option.textContent = tCursos[i].idioma+", "+tCursos[i].nivel+", "+tCursos[i].tipo;

		if (oProfesor.listaCursos.includes(tCursos[i].codigo))
			option.selected = "selected";

		form.cursos.appendChild(option);
	}

	document.querySelector('#modal .btn-success').id = "btnGuardarProfesor";
	document.querySelector('#btnGuardarProfesor').setAttribute("data-dni", dni);
	document.querySelector('#btnGuardarProfesor').addEventListener("click", guardarProfesor);

	form.style.display = "block";
}

function crearProfesor()
{
	document.querySelector('.modal-title').textContent = "Nuevo profesor";
	var forms = document.querySelectorAll('#modal form');
	for (var i=0; i<forms.length; i++)
		forms[i].style.display = "none";

	var form = document.getElementById("formEditarProfesor");
	document.querySelector('#modal .btn-success').id = "btnGuardarProfesor";
	document.querySelector('#btnGuardarProfesor').removeAttribute("data-dni");
	document.querySelector('#btnGuardarProfesor').addEventListener("click", guardarProfesor);

	resetearCamposProfesor();

	form.dni.removeAttribute("readonly");
	form.dni.value = "";
	form.password.value = "";
	form.nombre.value = "";
	form.apellidos.value = "";
	form.email.value = "";
	form.telefono.value = "";
	form.direccion.value = "";

	var tCursos = academia.getCursos();
	var options = document.querySelectorAll('#formEditarProfesor #selectCursosProf option');
	for (var i=0; i<options.length; i++)
		options[i].parentNode.removeChild(options[i]);

	for (var i=0; i<tCursos.length; i++) 
	{
		var option = document.createElement("option");
		option.value = tCursos[i].codigo;
		option.textContent = tCursos[i].idioma+", "+tCursos[i].nivel+", "+tCursos[i].tipo;
		form.cursos.appendChild(option);
	}

	form.style.display = "block";
}

function guardarProfesor()
{
	if (comprobarFormProf()==true)
	{
		var form = document.getElementById("formEditarProfesor");

		var sDNI = form.dni.value;

		var dataDNI = this.getAttribute("data-dni");
		if (dataDNI != null)
			sDNI = dataDNI;

		var sPassword = form.password.value;
		var sNombre = form.nombre.value;
		var sApellidos = form.apellidos.value;
		var sCorreo = form.email.value;
		var sTelefono = form.telefono.value;
		var sDireccion = form.direccion.value;
		var listaCursos = form.cursos.options;

		var oProfesor = new Profesor(sNombre, sPassword, sApellidos, sDNI, sTelefono, sDireccion, sCorreo, "si", "");

		for (var i=0; i<listaCursos.length; i++)
			if (listaCursos[i].selected)
				oProfesor.addCurso(listaCursos[i].value);

		if (dataDNI != null)
			academia.modificarUsuario(oProfesor);
		else
			academia.addUsuario(oProfesor);

		mostrarPagina('profesores');
		document.querySelector('#modal .close').click();
	}
}

function resetearCamposAdmin()
{
	var input = document.querySelectorAll('#formEditarAdministrador input');
    for (var i=0; i<input.length; i++)
    input[i].classList.remove("errorFormulario");

    var mensajes = document.querySelectorAll('#formEditarAdministrador .text-error');
    for (var i=0; i<mensajes.length; i++)
    mensajes[i].remove();
}


function editarAdministrador()
{
	document.querySelector('.modal-title').textContent = "Editar administrador";
	var forms = document.querySelectorAll('#modal form');
	for (var i=0; i<forms.length; i++)
		forms[i].style.display = "none";

	var dni = this.getAttribute("data-dni");
	var oAdministrador = academia.getUsuario(dni);
	var form = document.getElementById("formEditarAdministrador");

	resetearCamposAdmin();

	form.dni.value = oAdministrador.dni;
	form.password.value = oAdministrador.password;
	form.nombre.value = oAdministrador.nombre;
	form.apellidos.value = oAdministrador.apellidos;
	form.email.value = oAdministrador.correo;
	form.telefono.value = oAdministrador.telefono;
	form.direccion.value = oAdministrador.direccion;

	document.querySelector('#modal .btn-success').id = "btnGuardarAdministrador";
	document.querySelector('#btnGuardarAdministrador').setAttribute("data-dni", dni);
	document.querySelector('#btnGuardarAdministrador').addEventListener("click", guardarAdministrador);

	form.style.display = "block";
}

function crearAdministrador()
{
	document.querySelector('.modal-title').textContent = "Nuevo administrador";
	var forms = document.querySelectorAll('#modal form');
	for (var i=0; i<forms.length; i++)
		forms[i].style.display = "none";

	var form = document.getElementById("formEditarAdministrador");
	document.querySelector('#modal .btn-success').id = "btnGuardarAdministrador";
	document.querySelector('#btnGuardarAdministrador').removeAttribute("data-dni");
	document.querySelector('#btnGuardarAdministrador').addEventListener("click", guardarAdministrador);

	resetearCamposAdmin();

	form.dni.removeAttribute("readonly");
	form.dni.value = "";
	form.password.value = "";
	form.nombre.value = "";
	form.apellidos.value = "";
	form.email.value = "";
	form.telefono.value = "";
	form.direccion.value = "";
	form.style.display = "block";
}

function guardarAdministrador()
{
	var form = document.getElementById("formEditarAdministrador");

	if (comprobarFormAdmin()==true)
	{
		var sDNI = form.dni.value;

		var dataDNI = this.getAttribute("data-dni");
		if (dataDNI != null)
			sDNI = dataDNI;

		var sPassword = form.password.value;
		var sNombre = form.nombre.value;
		var sApellidos = form.apellidos.value;
		var sCorreo = form.email.value;
		var sTelefono = form.telefono.value;
		var sDireccion = form.direccion.value;

		var oAdministrador = new Administrador(sNombre, sPassword, sApellidos, sDNI, sTelefono, sDireccion, sCorreo, "si", "");

		if (dataDNI != null)
			academia.modificarUsuario(oAdministrador);
		else
			academia.addUsuario(oAdministrador);

		mostrarPagina('administradores');
		document.querySelector('#modal .close').click();
	}
}

function switchActivo()
{
	var lblActivo = document.createElement("label");
	lblActivo.classList.add("switch-container");
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

function resetearCamposMatricula()
{
	var input = document.querySelectorAll('#formModMatri .errorFormulario');
    for (var i=0; i<input.length; i++)
    input[i].classList.remove("errorFormulario");

	
    var mensajes = document.querySelectorAll('#formModMatri .text-error');
    for (var i=0; i<mensajes.length; i++)
    mensajes[i].remove();
}

function editarMatricula()
{
	var numero = this.getAttribute('data-matricula');
	oMatricula = academia.getMatricula(numero);
  	document.querySelector('.modal-title').textContent = "Editar matrícula";
	var forms = document.querySelectorAll('#modal form');

	for (var i=0; i<forms.length; i++)
		forms[i].style.display = "none";

	var codigo = numero;
	var dni = oMatricula.dniAlumno;
	var form = document.getElementById("formModMatri");
	form.numMatri.value = codigo;
	form.dniMatri.value = dni;
	var listaCursos = academia.getCursos();

	resetearCamposMatricula();

	var oP = document.querySelectorAll("OPTION");
	for (var i=0; i<oP.length; i++) 
		oP[i].parentNode.removeChild(oP[i]);

	for (var i=0; i<listaCursos.length; i++) 
	{
		oP = document.createElement("OPTION");
		oP.value = listaCursos[i].codigo;
		oP.textContent = listaCursos[i].idioma+", "+listaCursos[i].nivel+", "+listaCursos[i].tipo;

		if (oMatricula.listaCursosMatri.includes(listaCursos[i].codigo))
			oP.selected = "selected";

		form.seleCurMatri.appendChild(oP);
	}
	//academia.actualizarSesionMatriculas();
	document.querySelector('#modal .btn-success').id = "btnGuardarMatricula";
	document.querySelector('#btnGuardarMatricula').setAttribute("data-estado", oMatricula.estado);
	document.querySelector('#btnGuardarMatricula').addEventListener("click", guardarMatricula);
	form.style.display = "block";
}

function guardarMatricula()
{
	if (comprobarFormMatricula()==true)
	{
		var form = document.getElementById("formModMatri");

		var dataEstado = this.getAttribute("data-estado");

		var sNumero = form.numMatri.value;
		var sDni = form.dniMatri.value;
		var sLisCursos =[];

		listaOp=document.querySelectorAll("OPTION");
		for (var i = 0; i < listaOp.length; i++) {
			if (listaOp[i].selected)
				sLisCursos.push(listaOp[i].value);
		}

		var oMatricula = new Matricula (sNumero, dataEstado, sDni, sLisCursos);

		//quitar curso y notas que se hayan quitado
		var listCurOriginal = academia.getUsuario(sDni).listaCursos; 
		var cursosQuitarAlu = [];
		var indice=0;
		for (var i = 0; i < listCurOriginal.length; i++) 
		{
			if (!sLisCursos.includes(listCurOriginal[i]))
			{
				cursosQuitarAlu[indice] = listCurOriginal[i];
				indice++;
			}
		}

		if (sNumero != null)
		{
			academia.modificarMatricula(oMatricula);
			academia.borrarCursosAlumno(sDni, cursosQuitarAlu);
		}
		else
			academia.addMatricula(oMatricula);

		mostrarPagina('matriculaciones');
		document.querySelector('#modal .close').click();
	}
}

function borrarMatricula()
{
	var numero = this.getAttribute("data-matricula");
	var oMatricula = academia.getMatricula(numero);
	if (oMatricula.estado == "activa")
		oMatricula.estado = "inactiva";
	else
		oMatricula.estado = "activa";

	academia.modificarMatricula(oMatricula);
	mostrarPagina('matriculaciones');
}


function filtrarTabla()
{
	var filas = document.querySelectorAll("#estado");

	for (var i=0; i<filas.length; i++)
	{
		if (filas[i].dataset.estado == "inactiva")
			filas[i].parentNode.style.display = "none";
	}
}