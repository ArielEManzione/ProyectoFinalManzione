let completo = "NO";
function asignoGoles(partidos, grupo){
    for (let i = 0; i < partidos.length; i++){
        let partido = document.getElementById(`grupo${grupo}Partido${(i+1)}`);
        partidos[i].set_golesA(partido.getElementsByTagName("input")[0].value);   
        partidos[i].equipoA.set_golesAFavor(partido.getElementsByTagName("input")[0].value);
        partidos[i].equipoA.set_golesEnContra(partido.getElementsByTagName("input")[1].value);

        partidos[i].set_golesB(partido.getElementsByTagName("input")[1].value);   
        partidos[i].equipoB.set_golesAFavor(partido.getElementsByTagName("input")[1].value);
        partidos[i].equipoB.set_golesEnContra(partido.getElementsByTagName("input")[0].value);

        if( partidos[i].get_golesA() > partidos[i].get_golesB()){
            partidos[i].equipoA.set_puntos(3);
            partidos[i].equipoB.set_puntos(0);
        }else if(partidos[i].get_golesA() < partidos[i].get_golesB()){
            partidos[i].equipoA.set_puntos(0);
            partidos[i].equipoB.set_puntos(3);
        }else{
            partidos[i].equipoA.set_puntos(1);
            partidos[i].equipoB.set_puntos(1);
        } 
    }
}

let loguot = document.getElementById("logout");

loguot.addEventListener("click",function(){
    window.location.replace("index.html");
})

let btnTablas = document.querySelectorAll(".btnTabla");

for (let btnTabla of btnTablas){    
    btnTabla.addEventListener("click",function(e){
        let botonTabla = e.target.parentNode;
        let letra = e.target.parentNode.parentNode.parentNode.getAttribute('id');

        let error = document.getElementById(`error${letra}`);
        
        completo = "SI";
        let goles = document.getElementsByClassName(`goles${letra}`);
        for (let gol of goles){
            gol.value == "" ? completo = "NO" : null;
        }
        if (completo == "NO"){
            if (error == null){
                let mensajeError = document.createElement("h4");
                mensajeError.innerHTML = `Error! <br>
                                        completar todos los resultados del grupo  <br>
                                        para poder actualizar la tabla`;
                mensajeError.id = `error${letra}`;
                botonTabla.append(mensajeError);
            }
        }else {        
            
            error != null ? error.remove() : null;
            
            let tablaElegida = devolverTabla(letra);
            let partidosGrupo = devolverPartido(letra);


            limpiarTabla(tablaElegida);

            asignoGoles(partidosGrupo.partido, letra);

            orden = 1;
            tablaElegida.sort(ordenarPuntos);
            crearTabla(tablaElegida, letra);
            
            cargardelLS();

            if (partidos_ls != null){
                let x = (partidos_ls.findIndex(x => x.usuarId === idUsuario));            
                if (x != -1){
                    partidos_ls.splice(x,1);

                }
            }else{
                partidos_ls = []; 
            }
            
            if (tablaGrupo_ls != null){
                let y = (tablaGrupo_ls.findIndex(y => y.usuarId === idUsuario));
                if (y != -1){
                    tablaGrupo_ls.splice(y,1);
                } 
            }else{
                tablaGrupo_ls = []; 
            }
            
            cargarResultadosGrupo(letra);
            
            let partidosUsuario = {usuarId: idUsuario, partidos: partidosMundial };
            partidos_ls.push(partidosUsuario);
            let tablaGrupoUsuario = {usuarId: idUsuario, tablaGrupo: tablas };
            tablaGrupo_ls.push(tablaGrupoUsuario);

            localStorage.setItem("tablaGrupo", JSON.stringify(tablaGrupo_ls));
            localStorage.setItem("partidos", JSON.stringify(partidos_ls));
        }
    })
}
