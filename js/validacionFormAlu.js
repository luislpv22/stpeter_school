


/*zona de validaciones de formularios*/
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
		academia.modificarUsuario(oAlMod);
		//modificar los datos de sesión de usuario
		sessionStorage.setItem('session', JSON.stringify(oAlMod));
		
		mensaje(document.createTextNode("Datos modificados"));
		
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



function mensaje(sTexto)
{
	document.getElementById("pTextoMensaje").appendChild(sTexto);
	document.getElementById("panelMensajes").style.display = 'block'
	document.getElementById("btnCerrar").addEventListener("click", cerrarMensaje, false);;

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

