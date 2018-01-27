/* TODO: */
// Comprobar estado del usuario al iniciar sesión
// Guardar resto de tablas en sesión

var academia = new Academia();

datosIniciales();

function datosIniciales()
{
	if (typeof sessionStorage.tUsuarios === 'undefined')
	{
	    var oXMLAlumnos = academia.loadXMLDoc("xml/alumnos.xml");
		var oAlumnos = oXMLAlumnos.getElementsByTagName("alumno");
		cargarAlumnos(oAlumnos);
	    var oXMLProfesores = academia.loadXMLDoc("xml/profesores.xml");
		var oProfesores = oXMLProfesores.getElementsByTagName("profesor");
		cargarProfesores(oProfesores);
	    var oXMLAdministradores = academia.loadXMLDoc("xml/administradores.xml");
		var oAdministradores = oXMLAdministradores.getElementsByTagName("administrador");
		cargarAdministradores(oAdministradores);

		var tUsuarios = academia.getUsuarios();
		for (var i=0; i<tUsuarios.length; i++)
		{
	    	if (tUsuarios[i] instanceof Administrador)
	    		tUsuarios[i].tipo = 'administrador';
	    	else if (tUsuarios[i] instanceof Profesor)
	    		tUsuarios[i].tipo = 'profesor';
	    	else
	    		tUsuarios[i].tipo = 'alumno';
		}
		sessionStorage.setItem('tUsuarios', JSON.stringify(tUsuarios));
	}
	else
	{
		var tUsuarios = JSON.parse(sessionStorage.tUsuarios);

		for (var i=0; i<tUsuarios.length; i++)
		{
			var oUsuario = null;
			var us = tUsuarios[i];
	    	if (us.tipo == 'administrador')
	    		oUsuario = new Administrador(us.nombre, us.password, us.apellido, us.dni, us.telefono, us.direccion, us.correo, us.activo, us.salario);
	    	else if (us.tipo == 'profesor')
	    		oUsuario = new Profesor(us.nombre, us.password, us.apellido, us.dni, us.telefono, us.direccion, us.correo, us.activo, us.salario);
	    	else
	    		oUsuario = new Alumno(us.nombre, us.password, us.apellido, us.dni, us.telefono, us.direccion, us.correo, us.activo, us.estadoCobro);

	    	academia.addUsuario(oUsuario);
    	}
	}

	var oXMLCursos= academia.loadXMLDoc("xml/cursos.xml");
	var oCursos=oXMLCursos.getElementsByTagName("curso");
	cargarCursos(oCursos);

	var oXMLMatriculas= academia.loadXMLDoc("xml/matriculas.xml");
	var oMatriculas=oXMLMatriculas.getElementsByTagName("matricula");
	cargarMatriculas(oMatriculas);

	var oXMLCalificaciones= academia.loadXMLDoc("xml/calificaciones.xml");
	var oCalificaciones=oXMLCalificaciones.getElementsByTagName("alumno");
	cargarCalificaciones(oCalificaciones);

}

function iniciarSesion(oEvento)
{
    var sDni= document.querySelector("#dniAlu").value;
    var sPass= document.querySelector("#passAlu").value;

    oUsuario = academia.inicioSesion(sDni,sPass);

    if (oUsuario == null)
    {
        mensaje(document.createTextNode("Fallo al iniciar sesión"));
	    return false;
    }
    else
    {
    	if (oUsuario instanceof Administrador)
    		oUsuario.tipo = 'administrador';
    	else if (oUsuario instanceof Profesor)
    		oUsuario.tipo = 'profesor';
    	else
    		oUsuario.tipo = 'alumno';

        sessionStorage.setItem('usuario', JSON.stringify(oUsuario));
    }

    return true;
}

function cerrarSesion()
{
    sessionStorage.removeItem('usuario');
    location.href = "login.html";
}



/******** validación y alta de alumno*************************/
function cargarAlumnos(oAlumnos)
{
	for(var i=0; i<oAlumnos.length; i++)
	{
		nombre=oAlumnos[i].getElementsByTagName("nombre")[0].textContent;
		pass=oAlumnos[i].getElementsByTagName("password")[0].textContent;
		apellido=oAlumnos[i].getElementsByTagName("apellido")[0].textContent;
		dni=oAlumnos[i].getElementsByTagName("dni")[0].textContent;
		telefono=oAlumnos[i].getElementsByTagName("telefono")[0].textContent;
		direccion=oAlumnos[i].getElementsByTagName("direccion")[0].textContent;
		email=oAlumnos[i].getElementsByTagName("email")[0].textContent;
		activo=oAlumnos[i].getElementsByTagName("activo")[0].textContent;
		estadoCobro=oAlumnos[i].getElementsByTagName("estadoCobro")[0].textContent;

		academia.addUsuario(new Alumno(nombre, pass, apellido, dni, telefono, direccion, email, activo, estadoCobro));
	}
}
function cargarProfesores(oProfesores)
{
	for(var i=0; i<oProfesores.length; i++)
	{
		nombre=oProfesores[i].getElementsByTagName("nombre")[0].textContent;
		pass=oProfesores[i].getElementsByTagName("password")[0].textContent;
		apellido=oProfesores[i].getElementsByTagName("apellido")[0].textContent;
		dni=oProfesores[i].getElementsByTagName("dni")[0].textContent;
		telefono=oProfesores[i].getElementsByTagName("telefono")[0].textContent;
		direccion=oProfesores[i].getElementsByTagName("direccion")[0].textContent;
		email=oProfesores[i].getElementsByTagName("email")[0].textContent;
		activo=oProfesores[i].getElementsByTagName("activo")[0].textContent;
		salario=oProfesores[i].getElementsByTagName("estadoCobro")[0].textContent;

		academia.addUsuario(new Profesor(nombre, pass, apellido, dni, telefono, direccion, email, activo, salario));
	}
}
function cargarAdministradores(oAdministradores)
{
	for(var i=0; i<oAdministradores.length; i++)
	{
		nombre=oAdministradores[i].getElementsByTagName("nombre")[0].textContent;
		pass=oAdministradores[i].getElementsByTagName("password")[0].textContent;
		apellido=oAdministradores[i].getElementsByTagName("apellido")[0].textContent;
		dni=oAdministradores[i].getElementsByTagName("dni")[0].textContent;
		telefono=oAdministradores[i].getElementsByTagName("telefono")[0].textContent;
		direccion=oAdministradores[i].getElementsByTagName("direccion")[0].textContent;
		email=oAdministradores[i].getElementsByTagName("email")[0].textContent;
		activo=oAdministradores[i].getElementsByTagName("activo")[0].textContent;
		salario=oAdministradores[i].getElementsByTagName("estadoCobro")[0].textContent;

		academia.addUsuario(new Administrador(nombre, pass, apellido, dni, telefono, direccion, email, activo, salario));
	}
}

function cargarCursos(oCursos)
{
	for(var i=0; i<oCursos.length; i++)
	{
		codigo=oCursos[i].getElementsByTagName("codigo")[0].textContent;
		idioma=oCursos[i].getElementsByTagName("idioma")[0].textContent;
		duracion=oCursos[i].getElementsByTagName("duracion")[0].textContent;
		precio=oCursos[i].getElementsByTagName("precio")[0].textContent;
		tipo=oCursos[i].getElementsByTagName("tipo")[0].textContent;
		nivel=oCursos[i].getElementsByTagName("nivel")[0].textContent;
		activo=oCursos[i].getElementsByTagName("activo")[0].textContent;
		listadoAlumnos=oCursos[i].querySelector("listadoAlumnos").children;

		oCurso = new Curso (codigo, idioma, duracion, precio, tipo, nivel, activo);

		if (listadoAlumnos.length!=0)
		{
			for (var j=0; j<listadoAlumnos.length; j++) 
			{
				oAlumno = academia.getUsuario(listadoAlumnos[j].textContent)
				oCurso.listaAlumnos.push(oAlumno);
			}

			academia.addCurso(oCurso);
		}
	}
}

function cargarMatriculas(oMatriculas)
{
	for(var i=0; i<oMatriculas.length; i++)
	{
		dni=oMatriculas[i].getAttribute('dni');
		estado=oMatriculas[i].getElementsByTagName("estado")[0].textContent;
		codigoMatri=oMatriculas[i].getElementsByTagName("codigo")[0].textContent;

		oAlumno= academia.getUsuario(dni);

		listadoCursos=oMatriculas[i].querySelector("listaCursos");
		cursos=listadoCursos.querySelectorAll("codigo");

		if (cursos.length !=0)
		{
			for (var j=0; j<cursos.length; j++) 
				oAlumno.listaCursos.push(cursos[j].textContent);

			academia.addMatricula(new Matricula(codigoMatri, estado, oAlumno));
		}
	}
}

function cargarCalificaciones(oCalificaciones)
{
	for(var i = 0; i<oCalificaciones.length; i++)
	{
		dni=oCalificaciones[i].getAttribute('dni');
		
		listaCursos=oCalificaciones[i].querySelectorAll("curso");
		
		//por si tiene notas de más de 1 curso
		for (var j = 0; j < listaCursos.length; j++) 
		{
			listaNotas=[];
			codCurso=oCalificaciones[i].querySelectorAll("curso")[j].getAttribute('codigo');
			//obtenemos las notas del curso  que recorre el for
			notas=listaCursos[j].querySelectorAll("nota");
			for (var k = 0; k < notas.length; k++) 
			{
				listaNotas[k]=notas[k].textContent;
			}
			oCalificacion= new Calificaciones (listaNotas, codCurso);
			academia.addCalificacionesAlu(dni, oCalificacion);
		}

	}
}

/*esta validación la dejo aqui porque puede servir casi perfecto tanto para crear alumnos, profesores, y administrativos*/
function comprobarEnvio(oEvento)
{
	var oE = oEvento || window.event;
	var bValido = true;
	var sError = "";

	//nombre
	var sNombre = document.frmAlu.nombreAlu.value.trim();
	if (sNombre != "")
	{
		/*El nombre debe tener entre 5 y 15 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios.*/
		var oExpReg = /^[a-z\s]{6,16}$/i;
		if (oExpReg.test(sNombre) == false)
		{
			document.frmAlu.nombreAlu.classList.add("errorFormulario");
			document.frmAlu.nombreAlu.focus();
			bValido = false;
			sError += "El nombre de usuario debe tener entre 5 y 15 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios \n"; 
		}
		else {
			document.frmAlu.nombreAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmAlu.nombreAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmAlu.nombreAlu.focus();
		bValido = false;
		sError += "El nombre no puede estar vacio \n";	
	}

	//password
	var sPassword = document.frmAlu.passAlu.value.trim();
	if (sPassword != "")
	{
		/*El campo apellido debe tener entre 5 y 30 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios.*/
		var oExpReg = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/i;
		if (oExpReg.test(sPassword) == false)
		{
			document.frmAlu.passAlu.classList.add("errorFormulario");
			document.frmAlu.passAlu.focus();
			bValido = false;
			sError += "La contraseña tiene que tener entre 6 y 15 caracteres, y debe haber números, letras mayusculas y letras minusculas \n";
		}
		else {
			document.frmAlu.passAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmAlu.passAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmAlu.passAlu.focus();
		bValido = false;
		sError += "La contraseña no puede estar vacia \n";		
	}

	//apellidos
	var sApellidos = document.frmAlu.apellidoAlu.value.trim();
	if (sApellidos != "")
	{
		/*El campo apellido debe tener entre 5 y 30 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios.*/
		var oExpReg = /^[a-z\s]{6,30}$/i;
		if (oExpReg.test(sApellidos) == false)
		{
			document.frmAlu.apellidoAlu.classList.add("errorFormulario");
			document.frmAlu.apellidoAlu.focus();
			bValido = false;
			sError += "El campo apellido debe tener entre 5 y 30 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios \n"; 
		}
		else {
			document.frmAlu.apellidoAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmAlu.apellidoAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmAlu.apellidoAlu.focus();
		bValido = false;
		sError += "El campo apellidos no puede estar vacio \n";		
	}

	//dni
	var sDni = document.frmAlu.dniAlu.value.trim();
	if (sDni != "")
	{
		/*El campo dni debe tener 8 dígitos y 1 letra mayúscula*/
		var oExpReg = /^\d{8}[a-zA-Z]$/i;
		if (oExpReg.test(sDni) == false){

				document.frmAlu.dniAlu.classList.add("errorFormulario");
				document.frmAlu.dniAlu.focus();
				bValido = false;
				sError += "El campo dni debe tener 8 dígitos y 1 letra  \n"; 
			} else {
				document.frmAlu.dniAlu.classList.remove("errorFormulario");
			}
	}
	else
	{
		document.frmAlu.dniAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmAlu.dniAlu.focus();
		bValido = false;
		sError += "El dni no puede estar vacio \n";		
	}


	//teléfono
	var sTelefono = document.frmAlu.telefonoAlu.value.trim();
	if (sTelefono != "")
	{	
		var oExpReg = /^[0-9]{2,3}-? ?[0-9]{6,7}$/i;
		if (oExpReg.test(sTelefono) == false)
		{
			document.frmAlu.telefonoAlu.classList.add("errorFormulario");
			document.frmAlu.telefonoAlu.focus();
			bValido = false;
			sError += "El campo teléfono solo puede tener 9 dígitos \n"; 
		}
		else {
			document.frmAlu.telefonoAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmAlu.telefonoAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmAlu.telefonoAlu.focus();
		bValido = false;
		sError += "El campo teléfono no puede estar vacio \n";		
	}


	//dirección
	var sDireccion = document.frmAlu.direAlu.value.trim();
	if (sDireccion != "")
	{
		var oExpReg = /^[a-z\d\s\,\º\/]{3,40}$/i;
		if (oExpReg.test(sDireccion) == false)
		{
			document.frmAlu.direAlu.classList.add("errorFormulario");
			document.frmAlu.direAlu.focus();
			bValido = false;
			sError += "El campo dirección debe tener entre 3 y 40 carácteres \n"; 
		}
		else {
			document.frmAlu.direAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmAlu.direAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmAlu.direAlu.focus();
		bValido = false;
		sError += "El campo dirección no puede estar vacio \n";		
	}

	//email
	var sEmail = document.frmAlu.emailAlu.value.trim();
	if (sEmail != "")
	{
		var oExpReg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i;
		if (oExpReg.test(sEmail) == false)
		{
			document.frmAlu.emailAlu.classList.add("errorFormulario");	
			if(bValido) 
				document.frmAlu.emailAlu.focus();
			bValido = false;
			sError += "El email debe tener la siguiente estructura: Caracteres_permitidos@caracteres_permitidos.caracteres_permitidos \n";
 
		}
		else {
			document.frmAlu.emailAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmAlu.emailAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmAlu.emailAlu.focus();
		bValido = false;
		sError += "El email no puede estar vacio \n";
	}

	if (bValido == false)
	{
		alert(sError);
		oE.preventDefault();
	}
	else
	{
		oE.preventDefault();
		alumno = new Alumno(sNombre,sPassword, sApellidos, sDni, sTelefono, sDireccion, sEmail, true, false);
		mensaje(document.createTextNode("Alumno creado con éxito"));
		btnCerrarMensaje.addEventListener("click", document.frmAlu.submit(), false);	
	}


}

function mensaje(sTexto)
{
	document.getElementById("pTextoMensaje").appendChild(sTexto);
	document.getElementById("panelMensajes").style.display = 'block';
}

function cerrarMensaje()
{
	document.getElementById("pTextoMensaje").textContent="";
	document.getElementById("panelMensajes").style.display = 'none';
}

document.querySelector('#sidebarCollapse').addEventListener("click", mostrarSidebar, false);

function mostrarSidebar()
{
	var sidebar = document.querySelector('#sidebar');
	if (sidebar.classList.contains('active'))
		sidebar.classList.remove('active');
	else
		sidebar.classList.add('active');
}

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

/*******************************Cargar datos Usuario ********************************/
/*este método lo dejo aqui porque puede servir casi identico para cargar los datos de profesores y administrativos
 para que puedan modificar sus datos*/
function cargarDatosUsuario()
{
	oNombre=document.querySelector("#frmModAlu #nombreAlu").value=sesion.nombre;
	oApellido=document.querySelector("#frmModAlu #apellidoAlu").value=sesion.apellido;
	oDni=document.querySelector("#frmModAlu #dniAlu").value=sesion.dni;
	oPass=document.querySelector("#frmModAlu #passAlu").value=sesion.password;
	oTelefono=document.querySelector("#frmModAlu #telefonoAlu").value=sesion.telefono;
	oDire=document.querySelector("#frmModAlu #direAlu").value=sesion.direccion;
	oEmail=document.querySelector("#frmModAlu #emailAlu").value=sesion.correo;
}
