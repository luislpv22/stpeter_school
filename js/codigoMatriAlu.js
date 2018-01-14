datosIniciales();
function datosIniciales()
{ 
  //datos para comprobaciones rápidas solo válido hasta que hagamos el XML
  var academia= new Academia();
  academia.addAluAcademia( new Alumno ("Juan", "Mendez", "3025661F", "952145629", "Calle Urraca", "juan@hotmail.com", true, false));
  academia.addAluAcademia( new Alumno ("Manu", "Dominguez", "2012661W", "672155629", "Calle Palacio", "manu@hotmail.com", true, false));
  academia.addAluAcademia( new Alumno ("Fran", "Sanchez", "5012661T", "921465229", "Calle Antesala", "fran@hotmail.com", true, false));


 /*a= new Alumno ("Adri", "Dominguez", "3025661F", "952145629", "Calle Urraca", "adrirrf1@hotmail.com", true, false);
 curso = new Curso ("Ingles", "7 semanas", 450.25, "Precencial",false);

 curso.addAlumnoCurso(a);*/

}

/******** validación y alta de alumno*************************/
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
		if (oExpReg.test(sNombre) == false){

				document.frmAlu.nombreAlu.classList.add("errorFormulario");
				document.frmAlu.nombreAlu.focus();
				bValido = false;
				sError += "El nombre de usuario debe tener entre 5 y 15 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios \n"; 
			} else {
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

	//apellidos
	var sApellidos = document.frmAlu.apellidoAlu.value.trim();
	if (sApellidos !="")
	{
		/*El campo apellido debe tener entre 5 y 30 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios.*/
		var oExpReg = /^[a-z\s]{6,30}$/i;
		if (oExpReg.test(sApellidos) == false){

				document.frmAlu.apellidoAlu.classList.add("errorFormulario");
				document.frmAlu.apellidoAlu.focus();
				bValido = false;
				sError += "El campo apellido debe tener entre 5 y 30 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios \n"; 
			} else {
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
		sError += "El campo dni no puede estar vacio \n";		
	}


	//teléfono
		var sTelefono = document.frmAlu.telefonoAlu.value.trim();
	if (sTelefono !="")
	{
		
		var oExpReg = /^[0-9]{2,3}-? ?[0-9]{6,7}$/i;
		if (oExpReg.test(sTelefono) == false){

				document.frmAlu.telefonoAlu.classList.add("errorFormulario");
				document.frmAlu.telefonoAlu.focus();
				bValido = false;
				sError += "El campo teléfono solo puede tener 9 dígitos \n"; 
			} else {
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
		
		var oExpReg = /^[a-z\d\s]{3,40}$/i;
		if (oExpReg.test(sDireccion) == false){

				document.frmAlu.direAlu.classList.add("errorFormulario");
				document.frmAlu.direAlu.focus();
				bValido = false;
				sError += "El campo dirección debe tener entre 3 y 40 carácteres \n"; 
			} else {
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
		if (oExpReg.test(sEmail) == false){

			document.frmAlu.emailAlu.classList.add("errorFormulario");
				
			if(bValido) 
				document.frmAlu.emailAlu.focus();
			bValido = false;
			sError += "El email debe tener la siguiente estructura: Caracteres_permitidos@caracteres_permitidos.caracteres_permitidos \n";
 
			} else {
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

	

	if (bValido == false){
		alert(sError);
		oE.preventDefault();

	}
	else
	{
		oE.preventDefault();
		alumno= new Alumno(sNombre, sApellidos, sDni, sTelefono, sDireccion, sEmail, true, false);
		mensaje(document.createTextNode("Alumno creado con éxito"));
		btnCerrarMensaje.addEventListener("click", submit, false);
		
	}


}

function submit()
{
	document.frmAlu.submit();
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




/***************************************************************/


