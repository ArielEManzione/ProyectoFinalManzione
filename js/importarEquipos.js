let clasificados = []

class Equipo{
    constructor(nombre, puntos, golesAFavor, golesEnContra){
        this.nombre = nombre;
        this.puntos = puntos;
        this.golesAFavor = golesAFavor;
        this.golesEnContra = golesEnContra;
    }

    set_puntos(puntos){
        this.puntos += puntos;
    }

    set_golesAFavor(goles){
        this.golesAFavor += parseInt(goles);
    }

    set_golesEnContra(goles){
        this.golesEnContra += parseInt(goles);
    }

    get_nombre(){
        return this.nombre;
    }

    get_puntos(){
        return this.puntos;
    }

    get_golesAFavor(){
        return this.golesAFavor;
    }

    get_golesEnContra(){
        return this.golesEnContra;
    }

    get_datos(){
        return this.nombre + " | " + this.puntos + " | " + this.golesAFavor + " | "+ this.golesEnContra;
    }

    get_diferenciaGoles(){
        return this.golesAFavor - this.golesEnContra;
    }
}

class Partido{
    constructor(equipoA, golesA, equipoB, golesB){
        this.equipoA = equipoA;
        this.golesA = golesA;
        this.equipoB = equipoB;
        this.golesB = golesB;
    }

    set_golesA(goles){
        this.golesA = goles;
    }

    set_golesB(goles){
        this.golesB = goles;
    }

    get_golesA(){
        return this.golesA;
    }

    get_golesB(){
        return this.golesB;
    }

    get_equipoA(){
        return this.equipoA.get_nombre();
    }
    
    get_equipoB(){
        return this.equipoB.get_nombre();
    }
    
    get_partido(){
        return this.equipoA.nombre + " VS " + this.equipoB.nombre;
    }

    get_resultado(){
        return this.equipoA.nombre + " " + this.golesA + " | "+ this.equipoB.nombre + " " + this.golesB;
    }
}

function ingresarPartidos(partidos, partido1, partido2, partido3, partido4, partido5, partido6){
    partidos.push(partido1);
    partidos.push(partido2);
    partidos.push(partido3);
    partidos.push(partido4);
    partidos.push(partido5);
    partidos.push(partido6);
}

function ingresarATabla(tabla, equipo1, equipo2, equipo3, equipo4){
    tabla.push(equipo1);
    tabla.push(equipo2);
    tabla.push(equipo3);
    tabla.push(equipo4);
}

function equiposJson(){
    fetch("https://arielemanzione.github.io/json/equipos.json")
    .then( respuesta => clasificados = respuesta.json())
    .then( informacionRespuesta =>  {
        clasificados = informacionRespuesta; 
        iniciarFixture(clasificados); 
        localStorage.setItem("paises", JSON.stringify(clasificados));      
        
        let partidosUsuarioNuevo = {usuarId: idUsuario, partidos: partidosMundial };
        let tablaGrupoUsuarioNuevo = {usuarId: idUsuario, tablaGrupo: tablas };
        
        cargardelLS();

        if (partidos_ls == null){        
            partidos_ls = []; 
        }
        
        if (tablaGrupo_ls == null){        
            tablaGrupo_ls = []; 
        }

        partidos_ls.push(partidosUsuarioNuevo);    
        tablaGrupo_ls.push(tablaGrupoUsuarioNuevo);

        localStorage.setItem("tablaGrupo", JSON.stringify(tablaGrupo_ls));
        localStorage.setItem("partidos", JSON.stringify(partidos_ls));
    })
}

function iniciarFixture(paisesClasificados){
    for (let clasificado of paisesClasificados){
        let grupo = clasificado.grupo;
        let equipo1;
        let equipo2;
        let equipo3;
        let equipo4;

        for (let [posicion, equipo] of clasificado.equipos.entries()){            
            switch(posicion){
                case 0:
                    equipo1 = new Equipo(equipo, 0, 0, 0);
                    break;
                case 1:
                    equipo2 = new Equipo(equipo, 0, 0, 0);
                    break;
                case 2:
                    equipo3 = new Equipo(equipo, 0, 0, 0);
                    break;
                case 3:
                    equipo4 = new Equipo(equipo, 0, 0, 0);
                    break;
                default:
                    break;                
            }
        }

        let partido1 = new Partido(equipo1, 0, equipo2, 0);
        let partido2 = new Partido(equipo3, 0, equipo4, 0);
        let partido3 = new Partido(equipo2, 0, equipo4, 0);
        let partido4 = new Partido(equipo1, 0, equipo3, 0);
        let partido5 = new Partido(equipo1, 0, equipo4, 0);
        let partido6 = new Partido(equipo2, 0, equipo3, 0);
        
        switch(grupo){
            case "A":
                ingresarPartidos(partidosA, partido1, partido2, partido3, partido4, partido5, partido6);
                ingresarATabla(tablaGrupoA, equipo1, equipo2, equipo3, equipo4);
                break;
            case "B":                
                ingresarPartidos(partidosB, partido1, partido2, partido3, partido4, partido5, partido6);
                ingresarATabla(tablaGrupoB, equipo1, equipo2, equipo3, equipo4);
                break;
            case "C":                
                ingresarPartidos(partidosC, partido1, partido2, partido3, partido4, partido5, partido6);
                ingresarATabla(tablaGrupoC, equipo1, equipo2, equipo3, equipo4);
                break;
            case "D":                
                ingresarPartidos(partidosD, partido1, partido2, partido3, partido4, partido5, partido6);
                ingresarATabla(tablaGrupoD, equipo1, equipo2, equipo3, equipo4);
                break;
            case "E":                
                ingresarPartidos(partidosE, partido1, partido2, partido3, partido4, partido5, partido6);
                ingresarATabla(tablaGrupoE, equipo1, equipo2, equipo3, equipo4);
                break;
            case "F":                
                ingresarPartidos(partidosF, partido1, partido2, partido3, partido4, partido5, partido6);
                ingresarATabla(tablaGrupoF, equipo1, equipo2, equipo3, equipo4);
                break;
            case "G":                
                ingresarPartidos(partidosG, partido1, partido2, partido3, partido4, partido5, partido6);
                ingresarATabla(tablaGrupoG, equipo1, equipo2, equipo3, equipo4);
                break;
            case "H":                
                ingresarPartidos(partidosH, partido1, partido2, partido3, partido4, partido5, partido6);
                ingresarATabla(tablaGrupoH, equipo1, equipo2, equipo3, equipo4);
                break;
            default:
                break;                
        }
    }
    partidosMundial.push({"grupo":"A", "partidos":partidosA});
    partidosMundial.push({"grupo":"B", "partidos":partidosB});
    partidosMundial.push({"grupo":"C", "partidos":partidosC});
    partidosMundial.push({"grupo":"D", "partidos":partidosD});
    partidosMundial.push({"grupo":"E", "partidos":partidosE});
    partidosMundial.push({"grupo":"F", "partidos":partidosF});
    partidosMundial.push({"grupo":"G", "partidos":partidosG});
    partidosMundial.push({"grupo":"H", "partidos":partidosH});
    tablas.push({"grupo":"A", "tabla":tablaGrupoA});
    tablas.push({"grupo":"B", "tabla":tablaGrupoB});
    tablas.push({"grupo":"C", "tabla":tablaGrupoC});
    tablas.push({"grupo":"D", "tabla":tablaGrupoD});
    tablas.push({"grupo":"E", "tabla":tablaGrupoE});
    tablas.push({"grupo":"F", "tabla":tablaGrupoF});
    tablas.push({"grupo":"G", "tabla":tablaGrupoG});
    tablas.push({"grupo":"H", "tabla":tablaGrupoH});
    crearTablas(tablas);    

}
