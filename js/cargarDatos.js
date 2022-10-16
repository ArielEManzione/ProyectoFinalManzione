let tablas = [];
let partidosMundial = [];
let tablaGrupoA = [];
let partidosA = [];
let tablaGrupoB = [];
let partidosB = [];
let tablaGrupoC = [];
let partidosC = [];
let tablaGrupoD = [];
let partidosD = [];
let tablaGrupoE = [];
let partidosE = [];
let tablaGrupoF = [];
let partidosF = [];
let tablaGrupoG = [];
let partidosG = [];
let tablaGrupoH = [];
let partidosH = [];
let orden = 1;
let idUsuario = "";

var paramstr = window.location.search.substr(1);
var paramarr = paramstr.split ("&");
var params = {};
for ( var i = 0; i < paramarr.length; i++) {
    var tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
}

idUsuario = params[tmparr[0]];

function cargarPuntos(tablas){
    
    for (let ls_grupos of tablas){
        let resultadosCargados = cargarResultadosGuardados(ls_grupos.grupo);
        if (resultadosCargados == "S"){    
            let tabla = devolverTabla(ls_grupos.grupo);
            let partidosGrupo = devolverPartido(ls_grupos.grupo);
            for (let ls_tabla of ls_grupos.tabla){
                for (let equipo of tabla){
                    if(ls_tabla.nombre == equipo.get_nombre()){
                        equipo.set_puntos(ls_tabla.puntos);
                        equipo.set_golesAFavor(ls_tabla.golesAFavor);
                        equipo.set_golesEnContra(ls_tabla.golesEnContra);
                    }
                }
            }

            for (let i = 0; i < partidosGrupo.partido.length; i++){
                partidosGrupo.partido[i].set_golesA(partidosUsuario[partidosGrupo.ubicacion].partidos[i].golesA);
                partidosGrupo.partido[i].set_golesB(partidosUsuario[partidosGrupo.ubicacion].partidos[i].golesB);        
            }

            cargarResultados(ls_grupos.grupo, partidosGrupo.partido);
        }
    }
}

function cargarResultados(grupo, partido){

    for (let i = 0; i < partido.length; i++){
        let l_partido = document.getElementById(`grupo${grupo}Partido${(i+1)}`);
        l_partido.getElementsByTagName("input")[0].value = partido[i].get_golesA();
        l_partido.getElementsByTagName("input")[1].value = partido[i].get_golesB();
    }
    
}

function crearTablas(tablasGrupo){
    for (let tablaGrupo of tablasGrupo){
        let tabla = devolverTabla(tablaGrupo.grupo);
        tabla.sort(ordenarPuntos);
        crearTabla(tabla, tablaGrupo.grupo);
    }

}

function crearTabla(tablacreada, letra){

    let tb = document.getElementById(`tabla${letra}`);

    tb != null ? tb.remove() : null;
    
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    table.appendChild(thead);
    table.appendChild(tbody);
    table.id = `tabla${letra}`;

    document.getElementById(`tablaPosiciones${letra}`).appendChild(table);

    let columna1 = document.createElement("tr");
    let cabecera1 = document.createElement("th");
    cabecera1.innerHTML = `Pais <button class="ascendente">↑</button> <button class="descendente">↓</button>`;
    cabecera1.id = `pais${letra}`;
    let cabecera2 = document.createElement("th");
    cabecera2.innerHTML = `Pt <button class="ascendente">↑</button> <button class="descendente">↓</button>`;
    cabecera2.id = `puntos${letra}`;
    let cabecera3 = document.createElement("th");
    cabecera3.innerHTML = `GF <button class="ascendente">↑</button> <button class="descendente">↓</button>`;
    cabecera3.id = `golesF${letra}`;
    let cabecera4 = document.createElement("th");
    cabecera4.innerHTML = `GC <button class="ascendente">↑</button> <button class="descendente">↓</button>`;
    cabecera4.id = `golesC${letra}`;

    columna1.appendChild(cabecera1);
    columna1.appendChild(cabecera2);
    columna1.appendChild(cabecera3);
    columna1.appendChild(cabecera4);
    thead.appendChild(columna1);

    for (let equipo of tablacreada){
            
        let columna = document.createElement('tr');
        let columnaPais = document.createElement('td');
        columnaPais.innerHTML = equipo.get_nombre();
        let columnaPuntos = document.createElement('td');
        columnaPuntos.innerHTML = equipo.get_puntos();
        let columnaGolesA = document.createElement('td');
        columnaGolesA.innerHTML = equipo.get_golesAFavor();
        let columnaGolesC = document.createElement('td');
        columnaGolesC.innerHTML = equipo.get_golesEnContra();

        columna.appendChild(columnaPais);
        columna.appendChild(columnaPuntos);
        columna.appendChild(columnaGolesA);
        columna.appendChild(columnaGolesC);
        tbody.appendChild(columna);

    }
    
    let btnPais = document.getElementById(`pais${letra}`);
    
    btnPais.addEventListener("click", function(e){
        setOrden(e.target.innerHTML);
        tablacreada.sort(ordenarNombre);
        crearTabla(tablacreada, letra);
    })

    let btnPuntos = document.getElementById(`puntos${letra}`);

    btnPuntos.addEventListener("click", function(e){
        setOrden(e.target.innerHTML);
        tablacreada.sort(ordenarPuntos);
        crearTabla(tablacreada, letra);
    })
    
    let btnGolesF = document.getElementById(`golesF${letra}`);

    btnGolesF.addEventListener("click", function(e){
        setOrden(e.target.innerHTML);
        tablacreada.sort(ordenarGolesAFavor);
        crearTabla(tablacreada, letra);
    })

    let btnGolesC = document.getElementById(`golesC${letra}`);

    btnGolesC.addEventListener("click", function(e){
        setOrden(e.target.innerHTML);
        tablacreada.sort(ordenarGolesEnContra);
        crearTabla(tablacreada, letra);
    })

}

function ordenarNombre(a, b){
    return a.get_nombre() > b.get_nombre() ? (1 * orden) : (-1 * orden);
}

function ordenarPuntos(a, b){
    return a.get_puntos() > b.get_puntos() ? (-1 * orden) : a.get_puntos() == b.get_puntos() ? a.get_diferenciaGoles() > b.get_diferenciaGoles() ? (-1 * orden) : (1 * orden) : (1 * orden);
}

function ordenarGolesAFavor(a, b){
    return a.get_golesAFavor() > b.get_golesAFavor() ? (-1 * orden) : (1 * orden);
}

function ordenarGolesEnContra(a, b){
    return a.get_golesEnContra() > b.get_golesEnContra() ? (-1 * orden) : (1 * orden);
}

function devolverTabla(grupo){

    switch(grupo){
        case "A":
            return tablaGrupoA;
        case "B":            
            return tablaGrupoB;
        case "C":            
            return tablaGrupoC;
        case "D":
            return tablaGrupoD;
        case "E":
            return tablaGrupoE;
        case "F":
            return tablaGrupoF;
        case "G":
            return tablaGrupoG;
        case "H":
            return tablaGrupoH;
        default:
            return null;               
    }
}

function cargarResultadosGrupo(grupo){
    switch(grupo){
        case "A":
            if (resultadosA_ls != null){
                let z = (resultadosA_ls.findIndex(z => z.usuarId === idUsuario));
                if (z != -1){
                    resultadosA_ls.splice(z,1);
                }
            }else{
                resultadosA_ls = [];
            }
            let resultadosACargadosUsuario = {usuarId: idUsuario, resultadosACargados: "S" };
            resultadosA_ls.push(resultadosACargadosUsuario);
            localStorage.setItem("resultadosACargados", JSON.stringify(resultadosA_ls));            
            break;
        case "B":
            if (resultadosB_ls != null){
                let z = (resultadosB_ls.findIndex(z => z.usuarId === idUsuario));
                if (z != -1){
                    resultadosB_ls.splice(z,1);
                }
            }else{
                resultadosB_ls = [];
            }
            let resultadosBCargadosUsuario = {usuarId: idUsuario, resultadosBCargados: "S" };
            resultadosB_ls.push(resultadosBCargadosUsuario);
            localStorage.setItem("resultadosBCargados", JSON.stringify(resultadosB_ls));            
            break;
        case "C":
            if (resultadosC_ls != null){
                let z = (resultadosC_ls.findIndex(z => z.usuarId === idUsuario));
                if (z != -1){
                    resultadosC_ls.splice(z,1);
                }
            }else{
                resultadosC_ls = [];
            }
            let resultadosCCargadosUsuario = {usuarId: idUsuario, resultadosCCargados: "S" };
            resultadosC_ls.push(resultadosCCargadosUsuario);
            localStorage.setItem("resultadosCCargados", JSON.stringify(resultadosC_ls));            
            break;
        case "D":
            if (resultadosD_ls != null){
                let z = (resultadosD_ls.findIndex(z => z.usuarId === idUsuario));
                if (z != -1){
                    resultadosD_ls.splice(z,1);
                }
            }else{
                resultadosD_ls = [];
            }
            let resultadosDCargadosUsuario = {usuarId: idUsuario, resultadosDCargados: "S" };
            resultadosD_ls.push(resultadosDCargadosUsuario);
            localStorage.setItem("resultadosDCargados", JSON.stringify(resultadosD_ls));            
            break;
        case "E":
            if (resultadosE_ls != null){
                let z = (resultadosE_ls.findIndex(z => z.usuarId === idUsuario));
                if (z != -1){
                    resultadosE_ls.splice(z,1);
                }
            }else{
                resultadosE_ls = [];
            }
            let resultadosECargadosUsuario = {usuarId: idUsuario, resultadosECargados: "S" };
            resultadosE_ls.push(resultadosECargadosUsuario);
            localStorage.setItem("resultadosECargados", JSON.stringify(resultadosE_ls));            
            break;
        case "F":
            if (resultadosF_ls != null){
                let z = (resultadosF_ls.findIndex(z => z.usuarId === idUsuario));
                if (z != -1){
                    resultadosF_ls.splice(z,1);
                }
            }else{
                resultadosF_ls = [];
            }
            let resultadosFCargadosUsuario = {usuarId: idUsuario, resultadosFCargados: "S" };
            resultadosF_ls.push(resultadosFCargadosUsuario);
            localStorage.setItem("resultadosFCargados", JSON.stringify(resultadosF_ls));            
            break;
        case "G":
            if (resultadosG_ls != null){
                let z = (resultadosG_ls.findIndex(z => z.usuarId === idUsuario));
                if (z != -1){
                    resultadosG_ls.splice(z,1);
                }
            }else{
                resultadosG_ls = [];
            }
            let resultadosGCargadosUsuario = {usuarId: idUsuario, resultadosGCargados: "S" };
            resultadosG_ls.push(resultadosGCargadosUsuario);
            localStorage.setItem("resultadosGCargados", JSON.stringify(resultadosG_ls));            
            break;
        case "H":
            if (resultadosH_ls != null){
                let z = (resultadosH_ls.findIndex(z => z.usuarId === idUsuario));
                if (z != -1){
                    resultadosH_ls.splice(z,1);
                }
            }else{
                resultadosH_ls = [];
            }
            let resultadosHCargadosUsuario = {usuarId: idUsuario, resultadosHCargados: "S" };
            resultadosH_ls.push(resultadosHCargadosUsuario);
            localStorage.setItem("resultadosHCargados", JSON.stringify(resultadosH_ls));            
            break;
        default:
            return null;
    }
}

function devolverPartido(grupo){

    switch(grupo){
        case "A":
            return {'partido':partidosA, 'ubicacion':0};
        case "B":            
            return {'partido':partidosB, 'ubicacion':1};
        case "C":            
            return {'partido':partidosC, 'ubicacion':2};
        case "D":
            return {'partido':partidosD, 'ubicacion':3};
        case "E":
            return {'partido':partidosE, 'ubicacion':4};
        case "F":
            return {'partido':partidosF, 'ubicacion':5};
        case "G":
            return {'partido':partidosG, 'ubicacion':6};
        case "H":
            return {'partido':partidosH, 'ubicacion':7};
        default:
            return null;
    }
}


function limpiarTabla(tabla){
    for (let equipo of tabla){
        equipo.set_puntos(- equipo.get_puntos());
        equipo.set_golesAFavor(- equipo.get_golesAFavor());
        equipo.set_golesEnContra(- equipo.get_golesEnContra());
    }
}

function setOrden(ordenar){
    ordenar == "↑" ? orden = 1 : ordenar == "↓" ? orden = -1 : orden = 1;
}

let partidosUsuario = cargarPartidosUsuario();
if ( partidosUsuario == null){
    
    equiposJson();

}else{    
    iniciarFixture(paises);
    
    let tablasGruposUsuario = cargarTablasGrupoUsuario();
    cargarPuntos(tablasGruposUsuario);
    crearTablas(tablasGruposUsuario);
}

