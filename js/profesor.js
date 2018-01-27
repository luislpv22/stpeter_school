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

 	var academia= new Academia();
  	var btnPuntuar;
  	var sel;
 	var btnEditar;

 	sel=document.frmPuntuar.selectCursos;
 	sel2=document.frmModNotas.selectCursos2;
 	sel3=document.getElementById("selectCursos3");
     btnPuntuar=document.frmPuntuar.puntuar;
     btnEditar=document.frmModNotas.editar;



/* Configuración de eventos */
var enlaces = document.getElementsByTagName("a");
for (var i = 0; i < enlaces.length ; i++) 
    enlaces[i].addEventListener("click", function (event) { event.preventDefault(); mostrar(event); }, false);
   
enlaces[2].addEventListener("click", actualiza0, false);
enlaces[3].addEventListener("click", actualiza1, false);
enlaces[4].addEventListener("click", actualiza2, false);


function filtro()
{
	var oSelec = document.getElementById("selectCursos3").options[document.getElementById("selectCursos3").selectedIndex];
	var oTabla = academia.consultarNotas(sesion.dni,oSelec.value);
	var oFieldset = document.querySelectorAll("div #capaNotas");
    oFieldset[0].appendChild(oTabla);
}

function mostrar(oEvento)
{
	oE= oEvento || window.event;
	if (oE.target.id == "enlaceModMatri")
	{
		document.getElementById("capaCalificarAlu").classList.remove("ocultar");
		document.getElementById("capaConsultarNotas").classList.add("ocultar");
		document.getElementById("capaModificarNotas").classList.add("ocultar");
		document.getElementById("capaModificarAlu").classList.add("ocultar");
	}
	else if (oE.target.id == "consNotas")
	{
		document.getElementById("capaConsultarNotas").classList.remove("ocultar");
		document.getElementById("capaCalificarAlu").classList.add("ocultar");
		document.getElementById("capaModificarNotas").classList.add("ocultar");
		document.getElementById("capaModificarAlu").classList.add("ocultar");
		var oTabla=academia.consultarNotas(sesion.dni,"todo");
		    var oFieldset = document.querySelectorAll("div #capaNotas");
            oFieldset[0].appendChild(oTabla);
	}
	else if (oE.target.id == "enlaceMatricular")
	{
		document.getElementById("capaModificarNotas").classList.remove("ocultar");
		document.getElementById("capaCalificarAlu").classList.add("ocultar");
		document.getElementById("capaConsultarNotas").classList.add("ocultar");
		document.getElementById("capaModificarAlu").classList.add("ocultar");

	}
	else if (oE.target.id == "enlaceMisDatos")
    {
        document.getElementById("capaModificarAlu").classList.remove("ocultar");
        document.getElementById("capaModificarNotas").classList.add("ocultar");
        document.getElementById("capaCalificarAlu").classList.add("ocultar");
        document.getElementById("capaConsultarNotas").classList.add("ocultar");
        cargarDatosUsuario();
    }
}

function actualiza1()
{
	var oProfesor = academia.getUsuario(sesion.dni);
	oProfesor.addCurso('inglesA2presencial');
	var oTablaActu = oProfesor.getCursos();
	var oSelec = document.querySelectorAll("#selectCursos");
	var bEnc = false;

	for (var i=0; i<oTablaActu.length; i++)
	{
		var oOption = document.createElement("option");
		oOption.text = capitalize(oTablaActu[i].idioma)+" "+oTablaActu[i].nivel+" "+capitalize(oTablaActu[i].tipo);
		oOption.value=oTablaActu[i].codigo;

		for (var j=0; j<oSelec[0].options.length && !bEnc; j++)
			if(oSelec[0].options[j].value == oOption.value)
          		bEnc = true;

		if(!bEnc)
			oSelec[0].add(oOption);
	}
}

function actualiza2()
{
	var oProfesor = academia.getUsuario(sesion.dni);
	oProfesor.addCurso('inglesA2presencial');
	var oTablaActu = oProfesor.getCursos();
	var oSelec = document.querySelectorAll("#selectCursos3");
	var bEnc = false;

	for (var i=0; i<oTablaActu.length; i++)
	{

		var oOption = document.createElement("option");
		oOption.text = capitalize(oTablaActu[i].idioma)+" "+oTablaActu[i].nivel+" "+capitalize(oTablaActu[i].tipo);
		oOption.value = oTablaActu[i].codigo;
		for (var j=0; j<oSelec[0].options.length && !bEnc; j++)
			if(oSelec[0].options[j].value == oOption.value)
				bEnc = true;

		if(!bEnc)
			oSelec[0].add(oOption);
	}
}

function actualiza0()
{	
	var oProfesor = academia.getUsuario(sesion.dni);
	oProfesor.addCurso('inglesA2presencial');
	var oTablaActu = oProfesor.getCursos();
	var oSelec = document.querySelectorAll("#selectCursos2");
	var bEnc = false;

	for (var i=0; i<oTablaActu.length; i++)
	{
		var oOption = document.createElement("option");
     	oOption.text = capitalize(oTablaActu[i].idioma)+" "+oTablaActu[i].nivel+" "+capitalize(oTablaActu[i].tipo);
     	oOption.value = oTablaActu[i].codigo;
		for (var j=0; j<oSelec[0].options.length && !bEnc; j++)
     		if(oSelec[0].options[j].value == oOption.value)
                bEnc = true;

		if(!bEnc)
			oSelec[0].add(oOption);
    }
}

function actualizaAlum()
{
	var vaciar = document.getElementById("selectAlumno");
    vaciar.remove(vaciar);

    var oSelec = document.getElementById("selectCursos").options[document.getElementById("selectCursos").selectedIndex];
    var oSelec2 = document.getElementById("selectAlumno");
	var oTablaActu = academia.getListaAlumCurso(oSelec.value,sesion.dni);

	document.getElementById("capaSelectAlumno").classList.remove("ocultar");
	document.getElementById("CapNotaAlu").classList.remove("ocultar");

	var bEnc = false;
	var bEnc2 = false;
	for (var i=0; i<oTablaActu.length; i++)
	{
		var oListaProvCali=oTablaActu[i].listaCalificaciones;

		for (var k=0; k<oListaProvCali.length && !bEnc2; k++)
			if(oListaProvCali[k].codCurso == oSelec.value)
				bEnc2 = true;

		if(!bEnc2)
		{
			var oOption = document.createElement("option");
			oOption.text = oTablaActu[i].nombre+", "+oTablaActu[i].apellido;
			oOption.value = oTablaActu[i].dni;
		}

		for (var j=0; j<oSelec2.options.length && !bEnc; j++)
			if(oSelec2.options[j].value == oOption.value)
				bEnc = true;

		if(!bEnc && oOption != null)
			oSelec2.add(oOption);
	}
}

function actualizaAlum2()
{
	var vaciar = document.getElementById("selectAlumno2");
	vaciar.remove(vaciar);

	var oSelec = document.getElementById("selectCursos2").options[document.getElementById("selectCursos2").selectedIndex];
	var oSelec2 = document.getElementById("selectAlumno2");
	var oTablaActu = academia.getListaAlumCurso(oSelec.value,sesion.dni);

	document.getElementById("capaSelectAlumno2").classList.remove("ocultar");
	document.getElementById("CapNotaAlu2").classList.remove("ocultar");

	var bEnc=false;
	for (var i=0; i<oTablaActu.length; i++)
	{
		var oListaProvCali=oTablaActu[i].listaCalificaciones;
		for (var k=0; k<oListaProvCali.length; k++)
		{
			if(oListaProvCali[k].codCurso == oSelec.value)
			{
				var oOption = document.createElement("option");
				oOption.text = oTablaActu[i].nombre+", "+oTablaActu[i].apellido;
				oOption.value = oTablaActu[i].dni;
			}
		}

		for (var j=0; j<oSelec2.options.length && !bEnc; j++)
     		if(oSelec2.options[j].value == oOption.value)
				bEnc = true;

     	if(!bEnc && oOption != null)
     		oSelec2.add(oOption);
    }
}

function calificar()
{
    var oSelec = document.getElementById("selectCursos").options[document.getElementById("selectCursos").selectedIndex];
    var oSelec2 = document.getElementById("selectAlumno").options[document.getElementById("selectAlumno").selectedIndex];
    var nota = document.getElementById("NotaAlu");

	academia.calificarAlumno(oSelec.value,oSelec2.value,nota.value);
	document.getElementById("capaSelectAlumno").classList.add("ocultar");
	document.getElementById("CapNotaAlu").classList.add("ocultar");
	nota.value = "";
}

function Modificar()
{
    var oSelec = document.getElementById("selectCursos2").options[document.getElementById("selectCursos2").selectedIndex];
   	var oSelec2 = document.getElementById("selectAlumno2").options[document.getElementById("selectAlumno2").selectedIndex];
    var nota=document.getElementById("modTxtNotaAlu");

	academia.modificarNotaAlumno(oSelec.value,oSelec2.value,nota.value);
	document.getElementById("capaSelectAlumno2").classList.add("ocultar");
	document.getElementById("CapNotaAlu2").classList.add("ocultar");
	nota.value="";
}



