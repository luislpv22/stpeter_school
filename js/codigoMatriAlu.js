datosIniciales();

function datosIniciales()
{
	academia = new Academia();
    var oXMLAlumnos = academia.loadXMLDoc("xml/alumnos.xml");
	var oAlumnos = oXMLAlumnos.getElementsByTagName("alumno");
	cargarAlumnos(oAlumnos);
    var oXMLProfesores = academia.loadXMLDoc("xml/profesores.xml");
	var oProfesores = oXMLProfesores.getElementsByTagName("profesor");
	cargarProfesores(oProfesores);
    var oXMLAdministradores = academia.loadXMLDoc("xml/administradores.xml");
	var oAdministradores = oXMLAdministradores.getElementsByTagName("administrador");
	cargarAdministradores(oAdministradores);
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

        sessionStorage.setItem('session', JSON.stringify(oUsuario));
    }

    return true;
}

function cerrarSesion()
{
    sessionStorage.removeItem('session');
    location.href = "login.html";
}



/******** validación y alta de alumno*************************/
function cargarAlumnos(oAlumnos)
{
	for(var j = 0; j<oAlumnos.length; j++)
	{
	  nombre=oAlumnos[j].getElementsByTagName("nombre")[0].textContent;
	  pass=oAlumnos[j].getElementsByTagName("password")[0].textContent;
	  apellido=oAlumnos[j].getElementsByTagName("apellido")[0].textContent;
	  dni=oAlumnos[j].getElementsByTagName("dni")[0].textContent;
	  telefono=oAlumnos[j].getElementsByTagName("telefono")[0].textContent;
	  direccion=oAlumnos[j].getElementsByTagName("direccion")[0].textContent;
	  email=oAlumnos[j].getElementsByTagName("email")[0].textContent;
	  activo=oAlumnos[j].getElementsByTagName("activo")[0].textContent;
	  estadoCobro=oAlumnos[j].getElementsByTagName("estadoCobro")[0].textContent;

	  academia.addAlumno(new Alumno(nombre, pass, apellido, dni, telefono, direccion, email, activo, estadoCobro));
	}
}
function cargarProfesores(oProfesores)
{
	for(var j = 0; j<oProfesores.length; j++)
	{
	  nombre=oProfesores[j].getElementsByTagName("nombre")[0].textContent;
	  pass=oProfesores[j].getElementsByTagName("password")[0].textContent;
	  apellido=oProfesores[j].getElementsByTagName("apellido")[0].textContent;
	  dni=oProfesores[j].getElementsByTagName("dni")[0].textContent;
	  telefono=oProfesores[j].getElementsByTagName("telefono")[0].textContent;
	  direccion=oProfesores[j].getElementsByTagName("direccion")[0].textContent;
	  email=oProfesores[j].getElementsByTagName("email")[0].textContent;
	  activo=oProfesores[j].getElementsByTagName("activo")[0].textContent;
	  salario=oProfesores[j].getElementsByTagName("estadoCobro")[0].textContent;

	  academia.addProfesor(new Profesor(nombre, pass, apellido, dni, telefono, direccion, email, activo, salario));
	}
}
function cargarAdministradores(oAdministradores)
{
	for(var j = 0; j<oAdministradores.length; j++)
	{
	  nombre=oAdministradores[j].getElementsByTagName("nombre")[0].textContent;
	  pass=oAdministradores[j].getElementsByTagName("password")[0].textContent;
	  apellido=oAdministradores[j].getElementsByTagName("apellido")[0].textContent;
	  dni=oAdministradores[j].getElementsByTagName("dni")[0].textContent;
	  telefono=oAdministradores[j].getElementsByTagName("telefono")[0].textContent;
	  direccion=oAdministradores[j].getElementsByTagName("direccion")[0].textContent;
	  email=oAdministradores[j].getElementsByTagName("email")[0].textContent;
	  activo=oAdministradores[j].getElementsByTagName("activo")[0].textContent;
	  salario=oAdministradores[j].getElementsByTagName("estadoCobro")[0].textContent;

	  academia.addAdministrador(new Administrador(nombre, pass, apellido, dni, telefono, direccion, email, activo, salario));
	}
}

function comprobarFrmModDatosAlu(oEvento)
{
	var oE = oEvento || window.event;
	var bValido=true;
	var sError = "";

	//password
	var sPassword = document.frmModAlu.passAlu.value.trim();
	if (sPassword !="")
	{
		/*El campo apellido debe tener entre 5 y 30 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios.*/
		var oExpReg = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/i;
		if (oExpReg.test(sPassword) == false)
		{
			document.frmModAlu.passAlu.classList.add("errorFormulario");
			document.frmModAlu.passAlu.focus();
			bValido = false;
			sError += "La contraseña tiene que tener entre 6 y 15 caracteres, y debe haber números, letras mayusculas y letras minusculas \n";
		}
		else {
			document.frmModAlu.passAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmModAlu.passAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmModAlu.passAlu.focus();
		bValido = false;
		sError += "La contraseña no puede estar vacia \n";		
	}

	//teléfono
	var sTelefono = document.frmModAlu.telefonoAlu.value.trim();
	if (sTelefono !="")
	{
		var oExpReg = /^[0-9]{2,3}-? ?[0-9]{6,7}$/i;
		if (oExpReg.test(sTelefono) == false)
		{
			document.frmModAlu.telefonoAlu.classList.add("errorFormulario");
			document.frmModAlu.telefonoAlu.focus();
			bValido = false;
			sError += "El campo teléfono solo puede tener 9 dígitos \n"; 
		}
		else {
			document.frmModAlu.telefonoAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmModAlu.telefonoAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmModAlu.telefonoAlu.focus();
		bValido = false;
		sError += "El campo teléfono no puede estar vacio \n";		
	}

	//dirección
	var sDireccion = document.frmModAlu.direAlu.value.trim();
	if (sDireccion !="")
	{
		var oExpReg = /^[a-z\d\s\,\º\/]{3,40}$/i;
		if (oExpReg.test(sDireccion) == false)
		{
			document.frmModAlu.direAlu.classList.add("errorFormulario");
			document.frmModAlu.direAlu.focus();
			bValido = false;
			sError += "El campo dirección debe tener entre 3 y 40 carácteres \n"; 
		}
		else {
			document.frmModAlu.direAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmModAlu.direAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmModAlu.direAlu.focus();
		bValido = false;
		sError += "El campo dirección no puede estar vacio \n";		
	}

	//email
	var sEmail = document.frmModAlu.emailAlu.value.trim();
	if (sEmail !="")
	{
		var oExpReg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i;
		if (oExpReg.test(sEmail) == false)
		{
			document.frmModAlu.emailAlu.classList.add("errorFormulario");
			if(bValido) 
				document.frmModAlu.emailAlu.focus();
			bValido = false;
			sError += "El email debe tener la siguiente estructura: Caracteres_permitidos@caracteres_permitidos.caracteres_permitidos \n";
		}
		else {
			document.frmModAlu.emailAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmModAlu.emailAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmModAlu.emailAlu.focus();
		bValido = false;
		sError += "El email no puede estar vacio \n";
	}

	if (bValido == false){
		alert(sError);
		oE.preventDefault();
	}
	else
	{
		//modificar los daos del alumno
		oE.preventDefault();
		sNombre= document.frmModAlu.nombreAlu.value.trim();
		sApellido= document.frmModAlu.apellidoAlu.value.trim();
		sDni= document.frmModAlu.dniAlu.value.trim();

		oAlMod= new Alumno(sNombre, sPassword, sApellido, sDni, sTelefono, sDireccion, sEmail, true, false);//objeto alumno con los datos modificados
		academia.modDatosAlu(oAlMod);
		//modificar los datos de sesión de usuario
		sessionStorage.setItem('session', JSON.stringify(oAlMod));
		
		mensaje(document.createTextNode("Datos modificados"));
		btnCerrarMensaje.addEventListener("click", cerrarMensaje, false);
	}
}


function comprobarFrmModMatri(oEvento)
{
	var oE = oEvento || window.event;
	var bValido=true;
	var sError = "";

	//nombre
	var sNombre = document.frmModMatri.nombreAlu.value.trim();
	if (sNombre !="")
	{
		/*El nombre debe tener entre 5 y 15 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios.*/
		var oExpReg = /^[a-z\s]{6,16}$/i;
		if (oExpReg.test(sNombre) == false)
		{
			document.frmModMatri.nombreAlu.classList.add("errorFormulario");
			document.frmModMatri.nombreAlu.focus();
			bValido = false;
			sError += "El nombre de usuario debe tener entre 5 y 15 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios \n"; 
		}
		else {
			document.frmModMatri.nombreAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmModMatri.nombreAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmModMatri.nombreAlu.focus();
		bValido = false;
		sError += "El nombre no puede estar vacio \n";	
	}

	//password
	var sPassword = document.frmModMatri.passAlu.value.trim();
	if (sPassword !="")
	{
		/*El campo apellido debe tener entre 5 y 30 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios.*/
		var oExpReg = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/i;
		if (oExpReg.test(sPassword) == false)
		{
			document.frmModMatri.passAlu.classList.add("errorFormulario");
			document.frmModMatri.passAlu.focus();
			bValido = false;
			sError += "La contraseña tiene que tener entre 6 y 15 caracteres, y debe haber números, letras mayusculas y letras minusculas \n";
		}
		else {
			document.frmModMatri.passAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmModMatri.passAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmModMatri.passAlu.focus();
		bValido = false;
		sError += "La contraseña no puede estar vacia \n";		
	}

	//apellidos
	var sApellidos = document.frmModMatri.apellidoAlu.value.trim();
	if (sApellidos !="")
	{
		/*El campo apellido debe tener entre 5 y 30 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios.*/
		var oExpReg = /^[a-z\s]{6,30}$/i;
		if (oExpReg.test(sApellidos) == false)
		{
			document.frmModMatri.apellidoAlu.classList.add("errorFormulario");
			document.frmModMatri.apellidoAlu.focus();
			bValido = false;
			sError += "El campo apellido debe tener entre 5 y 30 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios \n"; 
		}
		else {
			document.frmModMatri.apellidoAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmModMatri.apellidoAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmModMatri.apellidoAlu.focus();
		bValido = false;
		sError += "El campo apellidos no puede estar vacio \n";		
	}

	//dni
		var sDni = document.frmModMatri.dniAlu.value.trim();
	if (sDni !="")
	{
		/*El campo dni debe tener 8 dígitos y 1 letra mayúscula*/
		var oExpReg = /^\d{8}[a-zA-Z]$/i;
		if (oExpReg.test(sDni) == false)
		{
			document.frmModMatri.dniAlu.classList.add("errorFormulario");
			document.frmModMatri.dniAlu.focus();
			bValido = false;
			sError += "El campo dni debe tener 8 dígitos y 1 letra  \n";
		}
		else {
			document.frmModMatri.dniAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmModMatri.dniAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmModMatri.dniAlu.focus();
		bValido = false;
		sError += "El dni no puede estar vacio \n";		
	}


	//teléfono
		var sTelefono = document.frmModMatri.telefonoAlu.value.trim();
	if (sTelefono !="")
	{
		
		var oExpReg = /^[0-9]{2,3}-? ?[0-9]{6,7}$/i;
		if (oExpReg.test(sTelefono) == false)
		{
			document.frmModMatri.telefonoAlu.classList.add("errorFormulario");
			document.frmModMatri.telefonoAlu.focus();
			bValido = false;
			sError += "El campo teléfono solo puede tener 9 dígitos \n"; 
		}
		else {
			document.frmModMatri.telefonoAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmModMatri.telefonoAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmModMatri.telefonoAlu.focus();
		bValido = false;
		sError += "El campo teléfono no puede estar vacio \n";		
	}


	//dirección
	var sDireccion = document.frmModMatri.direAlu.value.trim();
	if (sDireccion !="")
	{
		var oExpReg = /^[a-z\d\s\,\º\/]{3,40}$/i;
		if (oExpReg.test(sDireccion) == false)
		{
			document.frmModMatri.direAlu.classList.add("errorFormulario");
			document.frmModMatri.direAlu.focus();
			bValido = false;
			sError += "El campo dirección debe tener entre 3 y 40 carácteres \n";
		}
		else {
			document.frmModMatri.direAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmModMatri.direAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmModMatri.direAlu.focus();
		bValido = false;
		sError += "El campo dirección no puede estar vacio \n";		
	}

	//email
	var sEmail = document.frmModMatri.emailAlu.value.trim();
	if (sEmail !="")
	{
		var oExpReg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i;
		if (oExpReg.test(sEmail) == false)
		{
			document.frmModMatri.emailAlu.classList.add("errorFormulario");
			if(bValido) 
				document.frmModMatri.emailAlu.focus();
			bValido = false;
			sError += "El email debe tener la siguiente estructura: Caracteres_permitidos@caracteres_permitidos.caracteres_permitidos \n";
		}
		else {
			document.frmModMatri.emailAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmModMatri.emailAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmModMatri.emailAlu.focus();
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
		
	}

}

function comprobarEnvio(oEvento)
{
	var oE = oEvento || window.event;
	var bValido=true;
	var sError = "";

	//nombre
	var sNombre = document.frmAlu.nombreAlu.value.trim();
	if (sNombre !="")
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
	if (sPassword !="")
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
	if (sApellidos !="")
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
	if (sDni !="")
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
	if (sTelefono !="")
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
	if (sDireccion !="")
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
	if (sEmail !="")
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
		alumno= new Alumno(sNombre,sPassword, sApellidos, sDni, sTelefono, sDireccion, sEmail, true, false);
		mensaje(document.createTextNode("Alumno creado con éxito"));
		btnCerrarMensaje.addEventListener("click", document.frmAlu.submit(), false);	
	}


}

function cerrarMensaje()
{
	document.getElementById("panelMensajes").style.display = 'none';
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

/*******************************Cargar datos Usuario ********************************/
function cargarDatosUsuario()
{
	var oUsuario = JSON.parse(sessionStorage.getItem('session'));
	oNombre=document.querySelector("#frmModAlu #nombreAlu").value=oUsuario.nombre;
	oApellido=document.querySelector("#frmModAlu #apellidoAlu").value=oUsuario.apellido;
	oDni=document.querySelector("#frmModAlu #dniAlu").value=oUsuario.dni;
	oPass=document.querySelector("#frmModAlu #passAlu").value=oUsuario.password;
	oTelefono=document.querySelector("#frmModAlu #telefonoAlu").value=oUsuario.telefono;
	oDire=document.querySelector("#frmModAlu #direAlu").value=oUsuario.direccion;
	oEmail=document.querySelector("#frmModAlu #emailAlu").value=oUsuario.correo;
}

