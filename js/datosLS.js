
let partidos_ls = JSON.parse(localStorage.getItem("partidos"));
let tablaGrupo_ls = JSON.parse(localStorage.getItem("tablaGrupo"));
let paises = JSON.parse(localStorage.getItem("paises"));
let resultadosA_ls = JSON.parse(localStorage.getItem("resultadosACargados"));
let resultadosB_ls = JSON.parse(localStorage.getItem("resultadosBCargados"));
let resultadosC_ls = JSON.parse(localStorage.getItem("resultadosCCargados"));
let resultadosD_ls = JSON.parse(localStorage.getItem("resultadosDCargados"));
let resultadosE_ls = JSON.parse(localStorage.getItem("resultadosECargados"));
let resultadosF_ls = JSON.parse(localStorage.getItem("resultadosFCargados"));
let resultadosG_ls = JSON.parse(localStorage.getItem("resultadosGCargados"));
let resultadosH_ls = JSON.parse(localStorage.getItem("resultadosHCargados"));

function cargarDatos(datos){
    return datos.usuarId == idUsuario;
}

function cargarPartidosUsuario(){
    
    if (partidos_ls != null){
        let partidosCusuario = partidos_ls.find(cargarDatos);
        if (partidosCusuario === undefined){
            return null;
        }else{
            return partidosCusuario.partidos;
        }
    }else{
        return null;
    }
    
}

function cargarResultadosGuardados(grupo){

    switch(grupo){
        case "A":
            if (resultadosA_ls != null){
                let resultadosUsuario = resultadosA_ls.find(cargarDatos);
                if (resultadosUsuario === undefined){
                    return null;
                }else{
                    return resultadosUsuario.resultadosACargados;
                }
            }else{
                return null;
            }
        case "B":
            if (resultadosB_ls != null){
                let resultadosUsuario = resultadosB_ls.find(cargarDatos);
                if (resultadosUsuario === undefined){
                    return null;
                }else{
                    return resultadosUsuario.resultadosBCargados;
                }
            }else{
                return null;
            }
        case "C":
            if (resultadosC_ls != null){
                let resultadosUsuario = resultadosC_ls.find(cargarDatos);
                if (resultadosUsuario === undefined){
                    return null;
                }else{
                    return resultadosUsuario.resultadosCCargados;
                }
            }else{
                return null;
            }
        case "D":                
            if (resultadosD_ls != null){
                let resultadosUsuario = resultadosD_ls.find(cargarDatos);
                if (resultadosUsuario === undefined){
                    return null;
                }else{
                    return resultadosUsuario.resultadosDCargados;
                }
            }else{
                return null;
            }
        case "E":                
            if (resultadosE_ls != null){
                let resultadosUsuario = resultadosE_ls.find(cargarDatos);
                if (resultadosUsuario === undefined){
                    return null;
                }else{
                    return resultadosUsuario.resultadosECargados;
                }
            }else{
                return null;
            }
        case "F":                
            if (resultadosF_ls != null){
                let resultadosUsuario = resultadosF_ls.find(cargarDatos);
                if (resultadosUsuario === undefined){
                    return null;
                }else{
                    return resultadosUsuario.resultadosFCargados;
                }
            }else{
                return null;
            }
        case "G":                
            if (resultadosG_ls != null){
                let resultadosUsuario = resultadosG_ls.find(cargarDatos);
                if (resultadosUsuario === undefined){
                    return null;
                }else{
                    return resultadosUsuario.resultadosGCargados;
                }
            }else{
                return null;
            }
        case "H":                
            if (resultadosH_ls != null){
                let resultadosUsuario = resultadosH_ls.find(cargarDatos);
                if (resultadosUsuario === undefined){
                    return null;
                }else{
                    return resultadosUsuario.resultadosHCargados;
                }
            }else{
                return null;
            }
        default:
            return null;               
    }
}

function cargarTablasGrupoUsuario(){
    
    if (tablaGrupo_ls != null){
        let tablaGrupoCusuario = tablaGrupo_ls.find(cargarDatos);
        if (tablaGrupoCusuario === undefined){
            return null;
        }else{
            return tablaGrupoCusuario.tablaGrupo;
        }
    }else{
        return null;
    }
}


function cargardelLS(){
    partidos_ls = JSON.parse(localStorage.getItem("partidos"));
    tablaGrupo_ls = JSON.parse(localStorage.getItem("tablaGrupo"));
    resultadosA_ls = JSON.parse(localStorage.getItem("resultadosACargados"));
    resultadosB_ls = JSON.parse(localStorage.getItem("resultadosBCargados"));
    resultadosC_ls = JSON.parse(localStorage.getItem("resultadosCCargados"));
    resultadosD_ls = JSON.parse(localStorage.getItem("resultadosDCargados"));
    resultadosE_ls = JSON.parse(localStorage.getItem("resultadosECargados"));
    resultadosF_ls = JSON.parse(localStorage.getItem("resultadosFCargados"));
    resultadosG_ls = JSON.parse(localStorage.getItem("resultadosGCargados"));
    resultadosH_ls = JSON.parse(localStorage.getItem("resultadosHCargados"));
}


let clima = document.getElementById("clima");

fetch("https://api.openweathermap.org/data/2.5/weather?q=Qatar&units=metric&lang=es&appid=4d08f9f324a199776566c6122f9f9646")
    .then( respuesta => respuesta.json())
    .then( informacionRespuesta => {
        clima.innerHTML = `<span class='navbar-text'> Temperatura en ${informacionRespuesta.name}: ${informacionRespuesta.main.temp} °C </span><br>`
    })
