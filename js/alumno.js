/*zona de validaciones de formularios*/
function comprobarFrmModDatosAlu(oEvento)
{
	var oE = oEvento || window.event;
	var bValido = true;
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
	if (sTelefono != "")
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
	if (sDireccion != "")
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
	if (sEmail != "")
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
		sNombre = document.frmModAlu.nombreAlu.value.trim();
		sApellido = document.frmModAlu.apellidoAlu.value.trim();
		sDni = document.frmModAlu.dniAlu.value.trim();

		oAlMod = new Alumno(sNombre, sPassword, sApellido, sDni, sTelefono, sDireccion, sEmail, true, false);//objeto alumno con los datos modificados
		academia.modificarUsuario(oAlMod);
		//modificar los datos de sesión de usuario
		sessionStorage.setItem('usuario', JSON.stringify(oAlMod));
		
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
	document.getElementById("panelMensajes").style.display = 'block';
	document.getElementById("btnCerrar").addEventListener("click", cerrarMensaje, false);;

}

function cerrarMensaje()
{
	document.getElementById("pTextoMensaje").textContent = "";
	document.getElementById("panelMensajes").style.display = 'none';
}

/*******************************Cargar datos Usuario ********************************/
function cargarDatosUsuario()
{
	document.querySelector("#frmModAlu #nombreAlu").value = sesion.nombre;
	document.querySelector("#frmModAlu #apellidoAlu").value = sesion.apellido;
	document.querySelector("#frmModAlu #dniAlu").value = sesion.dni;
	document.querySelector("#frmModAlu #passAlu").value = sesion.password;
	document.querySelector("#frmModAlu #telefonoAlu").value = sesion.telefono;
	document.querySelector("#frmModAlu #direAlu").value = sesion.direccion;
	document.querySelector("#frmModAlu #emailAlu").value = sesion.correo;
}

//método que carga los cursos que existan en los distintos select del div de matriculación
function cargarCursos()
{
	oSelectIdioma = document.querySelector("#selectIdioma");
	oListaCursos = academia.getCursos();
	var arrayCurso = [];

	for (var i=0; i<oListaCursos.length; i++) 
	{
		if (!arrayCurso.includes(oListaCursos[i].idioma))
			arrayCurso.push(oListaCursos[i].idioma);
	}

	for (var i = 0; i < arrayCurso.length; i++) 
	{
		oOption = document.createElement("OPTION");
		oOption.textContent = arrayCurso[i];
		oOption.value = arrayCurso[i];
		oSelectIdioma.appendChild(oOption);     
	}
}


function cargarNivel()
{
	oListaCursos = academia.getCursos();
	oSelectIdioma = document.querySelector("#selectIdioma");
	oSelectNivel = document.querySelector("#selectNivel");
	resetearSelectNivel();
	resetearCamposDatosCurso();
	if (oSelectIdioma.value != "seleIdi")
	{
		var arrayNivel=[];
		for (var i=0; i<oListaCursos.length; i++) 
		{
			if (oListaCursos[i].idioma == oSelectIdioma.value && !arrayNivel.includes(oListaCursos[i].nivel))
				arrayNivel.push(oListaCursos[i].nivel);
		}

		for (var i=0; i<arrayNivel.length; i++) 
		{
			oOption = document.createElement("OPTION");
			oOption.textContent = arrayNivel[i];
			oOption.value = arrayNivel[i];
			oSelectNivel.appendChild(oOption);      
		}
	}
}

function resetearSelectIdiomas()
{
	listaOptions=document.querySelectorAll("#selectIdioma OPTION");
	for (var i=0; i<listaOptions.length; i++) 
		listaOptions[i].parentNode.removeChild(listaOptions[i]);

	oOption = document.createElement("OPTION");
	oOption.textContent = "Seleccione Idioma";
	oOption.value = "seleIdioma";
	document.querySelector("#selectIdioma").appendChild(oOption); 

}

function resetearSelectNivel()
{
	listaOptions=document.querySelectorAll("#selectNivel OPTION");
	for (var i=0; i<listaOptions.length; i++) 
		listaOptions[i].parentNode.removeChild(listaOptions[i]);

	oOption = document.createElement("OPTION");
	oOption.textContent = "Seleccione Idioma";
	oOption.value = "seleNi";
	oSelectNivel.appendChild(oOption); 
}

function cargarTipo ()
{
	oListaCursos = academia.getCursos();
	oSelectIdioma = document.querySelector("#selectIdioma");
	oSelectNivel = document.querySelector("#selectNivel");
	oSelctTipo = document.querySelector("#selectTipo");

	resetearSelectTipo();
	resetearCamposDatosCurso();

	if (oSelectIdioma.value != "seleIdi" && oSelectNivel.value != "seleNi" )
	{
		var arrayTipo=[];
		for (var i = 0; i < oListaCursos.length; i++) 
		{
			if (oListaCursos[i].idioma== oSelectIdioma.value && oListaCursos[i].nivel == oSelectNivel.value)
				if (!arrayTipo.includes(oListaCursos[i].tipo))
					arrayTipo.push(oListaCursos[i].tipo);
		}

		for (var i = 0; i < arrayTipo.length; i++) 
		{
			oOption=document.createElement("OPTION");
			oOption.textContent = arrayTipo[i];
			oOption.value = arrayTipo[i];
			oSelctTipo.appendChild(oOption);    
		}

		oSelctTipo.removeAttribute("disabled"); 
		
	 }
	 else
	 {
		oSelctTipo.disabled="disabled"; 
		document.querySelector("#btnAddCursoMatri").disabled="disabled";    
	 }
}

function resetearSelectTipo()
{
	document.querySelector("#txtInformacion span").textContent = "";
	document.querySelector("#txtInformacion").classList.add("hide");
	oSelctTipo = document.querySelector("#selectTipo");
	listaOptions = document.querySelectorAll("#selectTipo OPTION");
	for (var i=0; i<listaOptions.length; i++) 
		listaOptions[i].parentNode.removeChild(listaOptions[i]);

	oOption=document.createElement("OPTION");
	oOption.textContent = "Seleccione Tipo";
	oOption.value = "seleTipo";
	oSelctTipo.appendChild(oOption); 

}

function resetearCamposDatosCurso()
{
	oDuracinCurso= document.querySelector("#duraCurso").value = "";
	oPrecioCurso= document.querySelector("#preCurso").value = "";
}

function cargarCurso()
{
	resetearCamposDatosCurso();

	sSelectIdioma = document.querySelector("#selectIdioma").value;
	sSelectNivel = document.querySelector("#selectNivel").value;
	sSelctTipo = document.querySelector("#selectTipo").value;

	var oCurso =academia.getCurso(sSelectIdioma, sSelectNivel, sSelctTipo);

	oDuracionCurso = document.querySelector("#duraCurso").value = oCurso.duracion;
	oPrecioCurso = document.querySelector("#preCurso").value = oCurso.precio;
	
	document.querySelector("#btnAddCursoMatri").removeAttribute("disabled"); 
}

function addCursoMatri(oEvento)
{
	oSelctTipo= document.querySelector("#selectTipo");
	if (oSelctTipo != "seleTipo")
	{
		var oE = oEvento || window.event;
		oE.preventDefault();

		if (typeof(cursosElegidos) === "undefined")
			cursosElegidos = [];

		//ver si el curso ya está en la array
		if (!cursosElegidos.includes(oCurso))
		{
			//ver si no estaba ya matriculado en el curso
			if (!sesion.listaCursos.includes(oCurso.codigo))
			{
				resetearCamposDatosCurso();         
				oSelectIdioma = document.querySelector("#selectIdioma").selectedIndex = 0;
				oSelectNivel = document.querySelector("#selectNivel");
				oSelectNivel.selectedIndex = 0;

				oSelctTipo = document.querySelector("#selectTipo");
				oSelctTipo.selectedIndex = 0;
				oSelctTipo.disabled = "disabled";   
				document.querySelector("#btnAddCursoMatri").disabled = "disabled";  

				cursosElegidos.push(oCurso);
				document.querySelector("#txtInformacion span").textContent = "Curso añadido a la matrícula";
				document.querySelector("#txtInformacion").classList.remove("alert-success", "alert-warning", "alert-danger", "hide");
				document.querySelector("#txtInformacion").classList.add("alert-success");

				borrartabla();
				crearTabla(cursosElegidos);
				document.querySelector("#btnEnviarMatri").removeAttribute("disabled");
				resetearSelectNivel();
			}
			else
			{
				document.querySelector("#txtInformacion span").textContent = "Ya estás matriculado en ese curso";
				document.querySelector("#txtInformacion").classList.remove("alert-success", "alert-warning", "alert-danger", "hide");
				document.querySelector("#txtInformacion").classList.add("alert-danger");
			}
		}
		else
		{
			document.querySelector("#txtInformacion span").textContent = "Ya has seleccionado ese curso";
			document.querySelector("#txtInformacion").classList.remove("alert-success", "alert-warning", "alert-danger", "hide");
			document.querySelector("#txtInformacion").classList.add("alert-warning");
		}
	}
	else
	{
		document.querySelector("#txtInformacion span").textContent = "Debes seleccionar un tipo de curso";
		document.querySelector("#txtInformacion").classList.remove("alert-success", "alert-warning", "alert-danger", "hide");
		document.querySelector("#txtInformacion").classList.add("alert-danger");
	}
}

function realizarMatricula(oEvento)
{
	var oE = oEvento || window.event;
	for (var i=0; i<cursosElegidos.length; i++) 
		sesion.listaCursos.push(cursosElegidos[i].codigo)

	oMatricula = new Matricula(academia.codNuevaMatri(), "abierta", sesion);

	academia.addMatricula(oMatricula);
	document.querySelector("#txtInformacion span").textContent = "";
	document.querySelector("#txtInformacion").classList.add("hide");
	borrartabla();
	document.getElementById("capaMatriCurso").classList.add("ocultar");
	cursosElegidos = []; // resetear el array de los cursos elegidos
	resetearSelectIdiomas();
	menuCursoUsuario();
	oE.preventDefault();
}

function borrartabla()
{
	oTabla = document.querySelector('#tablaMatriCurso');
	for (var i=oTabla.rows.length-1; i>0; i--)
		oTabla.deleteRow(i);
}

function crearTabla(cursos)
{
	var oTabla = document.querySelector('#tablaMatriCurso');
	oTBody = oTabla.createTBody();

	for (var i=0; i<cursos.length; i++)
	{
		oFila = oTabla.insertRow(-1);       
		oCelda = oFila.insertCell(-1);
		oCelda.textContent = cursos[i].tipo;
		oCelda = oFila.insertCell(-1);
		oCelda.textContent = cursos[i].idioma;
		oCelda = oFila.insertCell(-1);
		oCelda.textContent = cursos[i].nivel;
		oCelda = oFila.insertCell(-1);
		oCelda.textContent = cursos[i].duracion;
		oCelda = oFila.insertCell(-1);
		oCelda.textContent = cursos[i].precio;
	}
}

function cargarListadoCurso(oEvento)
{
	//tengo que hacer un método que replace el nodo div por otro nuevo cada vez que se inicie este método
	limpiarListadoCurso();
	oE = oEvento || window.event;
	var listaNotas = academia.getCalificaciones(oE.target.value, sesion.dni);
	if (listaNotas.length == 0)
	{
		oP = document.createElement("P");
		oP.textContent = "No hay calificaciones disponibles";
		oP.style.color = "red";
		document.querySelector("#listaCalificaciones").appendChild(oP);
	}
	else
	{
		borrartabla();
		oTabla = document.createElement("TABLE");
		oTabla.classList.add("table");
		oTabla.classList.add("table-hover");
		oTabla.classList.add("table-condensed");
		oTHead = oTabla.createTHead();
		oFila = oTHead.insertRow(-1);
		oCelda = oFila.insertCell(-1);
		oCelda.textContent = "Examenes";
		oCelda = oFila.insertCell(-1);
		oCelda.textContent = "Notas";
		oTBody = oTabla.createTBody();

		for (var i=0; i<listaNotas.length; i++) 
		{
			oFila = oTabla.insertRow(-1);
			oCelda = oFila.insertCell(-1);
			oCelda.textContent = "Examen "+(i+1);
			oCelda = oFila.insertCell(-1);
			oCelda.textContent = listaNotas[i];
			oCelda.dataset.nota = listaNotas[i];
			oCelda.id = "nota";
		}

		document.querySelector("#listaCalificaciones").appendChild(oTabla);

		oBr= document.createElement("BR");
		document.querySelector("#listaCalificaciones").appendChild(oBr);
		oParrafo= document.createElement("P");
		oParrafo.textContent="Opciones de filtrado y ordenación";
		document.querySelector("#listaCalificaciones").appendChild(oParrafo);
		oBr= document.createElement("BR");
		document.querySelector("#listaCalificaciones").appendChild(oBr);

		//crear select para los filtrados
		oSelect= document.createElement("SELECT");
		oSelect.id="filtraNotas";
		oP= document.createElement("OPTION");
		oP.value="99";
		oP.textContent="Seleccione filtrado";
		oSelect.appendChild(oP);
		oP= document.createElement("OPTION");
		oP.value="5";
		oP.textContent="Aprobados";
		oSelect.appendChild(oP);
		oP= document.createElement("OPTION");
		oP.value="4.99";
		oP.textContent="Suspensos";
		oSelect.appendChild(oP);
		document.querySelector("#listaCalificaciones").appendChild(oSelect);

		document.querySelector("#filtraNotas").addEventListener("change", filtaTabla, false);

		//crear select para ordenar notas
		oSelect= document.createElement("SELECT");
		oSelect.id="ordenaNotas";
		oP= document.createElement("OPTION");
		oP.value="nulo";
		oP.textContent="Seleccione tipo de orden";
		oSelect.appendChild(oP);
		oP= document.createElement("OPTION");
		oP.value="creciente";
		oP.textContent="De menor a mayor";
		oSelect.appendChild(oP);
		oP= document.createElement("OPTION");
		oP.value="decreciente";
		oP.textContent="De mayor a menor";
		oSelect.appendChild(oP);
		document.querySelector("#listaCalificaciones").appendChild(oSelect);

		document.querySelector("#ordenaNotas").addEventListener("change", ordenaTabla, false);
	}							
}

function limpiarListadoCurso()
{
	oDiv = document.createElement("DIV");
	oDiv.id = "listaCalificaciones";
	oDivBorrar = document.querySelector("#listaCalificaciones");
	oDivBorrar.parentNode.replaceChild(oDiv, oDivBorrar);
}


function filtaTabla()
{
	iSele= parseInt(document.querySelector("#filtraNotas").value);
	var oTabla= document.querySelector("TABLE");
	var oFilas = oTabla.rows; //el número de filas de una tabla
	borrarFiltro(oFilas);

	if (iSele!= 99)
	{
		if (iSele == 5)
		{
			for (var i=0; i<oFilas.length; i++) 
			{
				var oCeldas = oTabla.rows[i].cells;  // las celdas de una fila en concreto
				for (var j=0; j<oCeldas.length; j++) 
					if (parseInt(oCeldas[j].dataset.nota)<iSele)
						oFilas[i].classList.add("ocultar");
			}
		}
		else
		{
			for (var i=0; i<oFilas.length; i++) 
			{
				var oCeldas = oTabla.rows[i].cells;  // las celdas de una fila en concreto
				for (var j=0; j<oCeldas.length; j++) 
					if (parseInt(oCeldas[j].dataset.nota) > iSele)
						oFilas[i].classList.add("ocultar");
			}
		}
	}
}

function borrarFiltro(oFilas)
{
	for (var i=0; i<oFilas.length; i++) 
		oFilas[i].classList.remove("ocultar");
}

function ordenaTabla()
{
	sSele= document.querySelector("#ordenaNotas").value;
	if (sSele =="creciente" || sSele =="decreciente" )
	{
		var oTabla= document.querySelector("TABLE");
		var oTBody=document.querySelector("TBODY");

		var arrayTrNotas= document.querySelectorAll("#nota");
		var arrayNotas=[];

		for (var i = 0; i < arrayTrNotas.length; i++)
		{
			arrayNotas[i]=parseInt(arrayTrNotas[i].dataset.nota);
		}

		if (sSele =="creciente" )
			var arrayNotaOrdenado= arrayNotas.sort(function(a, b){return a-b}); // ordena de menor a mayor;
		else
			var arrayNotaOrdenado= arrayNotas.sort(function(a, b){return a<b}); // ordena de menor a mayor;

		var oFilas = oTabla.rows; // el número de filas de una tabla

		for (var i=0; i<arrayNotaOrdenado.length; i++) 
		{
			for (var j=0; j<oFilas.length; j++) 
			{
				var oCeldas = oTabla.rows[j].cells;  // las celdas de una fila en concreto
				for (var k=0; k<oCeldas.length; k++) 
				{
					if (parseInt(oCeldas[k].dataset.nota )== arrayNotaOrdenado[i])
					{
						oTBody.appendChild(oFila[j]);
					}
				}
			}
		}
	}	
}
