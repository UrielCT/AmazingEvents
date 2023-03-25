let urlAPI = 'https://mindhub-xj03.onrender.com/api/amazing';

async function getEventos() {
    try {
        let response = await fetch(urlAPI);
        let dataAPI = await response.json();

        let eventos = dataAPI.events;
        let eventosFuturos = eventos.filter(each => new Date(each.date).getFullYear() > 2022);
        let eventosPasados = eventos.filter(each => new Date(each.date).getFullYear() <= 2022);

        cargarTablaStatistics("#tabla_statistics", eventos);
        cargarTablaEvents("#tabla_upcoming_events", eventosFuturos)
        cargarTablaEvents("#tabla_past_events", eventosPasados)


    } catch (error) {
        console.log(error.message);
    }
}
getEventos();



// TABLA DE STATISTICS

function cargarTablaStatistics(id_container, eventos){
    let container = document.querySelector(id_container);
    let tableBodyHTML = "";
    let highestPer = highestPercentage(eventos);
    let lowestPer = lowestPercentage(eventos);
    let largerCap = largerCapacity(eventos);
    tableBodyHTML = `
        <thead>
            <tr>            
                <th scope="col">Events with the highest percentage of attendance</th>
                <th scope="col">Events with the lowest percentage of attendance</th>
                <th scope="col">Events with larger capacity</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${highestPer.evento} (${highestPer.porcentaje}%)</td>
                <td>${lowestPer.evento} (${lowestPer.porcentaje}%)</td>
                <td>${largerCap.evento} (${largerCap.capacidad})</td>
            </tr>
        </tbody>
    `;
    container.innerHTML = tableBodyHTML;
}

function highestPercentage(listaEventos){
    let mayor = 0;
    let porMayor = 0;
    for(i = 0; i < listaEventos.length; i++){
        let porcentaje = ( (listaEventos[i].assistance * 100) / listaEventos[i].capacity).toFixed(2);
        if (porcentaje > porMayor && porcentaje < 100)
        {
            porMayor = porcentaje;
            mayor = listaEventos[i];
        }
    }
    return {"porcentaje": porMayor, "evento": mayor.name};
}

function lowestPercentage(listaEventos){
    let menor = 0;
    let porMenor = 100;
    for(i = 0; i < listaEventos.length; i++){
        let porcentaje = ( (listaEventos[i].assistance * 100) / listaEventos[i].capacity).toFixed(2);
        if (porcentaje < porMenor && porcentaje > 0)
        {
            porMenor = porcentaje;
            menor = listaEventos[i];
        }
    }
    return {"porcentaje": porMenor, "evento": menor.name};
}

function largerCapacity(listaEventos){
    let mayor = 0;
    let capMayor = 0;
    for(i = 0; i < listaEventos.length; i++){
        if (listaEventos[i].capacity > capMayor )
        {
            capMayor = listaEventos[i].capacity;
            mayor = listaEventos[i];
        }
    }
    return {"capacidad": capMayor, "evento": mayor.name};
}








// TABLA DE EVENTOS FUTUROS


function cargarTablaEvents(id_container, eventos){
    let container = document.querySelector(id_container);
    let tableBodyHTML = [];
    let estadisticas = getEventosStats(eventos);
    tableBodyHTML.push( `
        <thead>
            <tr>            
                <th scope="col">Category</th>
                <th scope="col">Reveneus</th>
                <th scope="col">Percentage of attendance</th>
            </tr>
        </thead>
    `)
    estadisticas.forEach(each => {
        tableBodyHTML.push(`
            <tr>
                <td> ${each.categoria}</td>
                <td>$${each.revenues}</td>
                <td>${each.perAttendance}%</td>
            </tr>
            `
            )
        }
    )
    container.innerHTML = tableBodyHTML.join('');
}


function getEventosStats(eventos){
    let events = [];
    let categorias = extractCategories(eventos)
    categorias.forEach(tipo => {
        let tipoEventos = eventos.filter(evento => evento.category == tipo)
        events.push(    
            {
                "categoria": tipo, 
                "revenues": calcularReveneus(tipoEventos),
                "perAttendance": calcularPercentage(tipoEventos)
            }    
        )
   })
   return events;
}


function calcularReveneus(tipoEventos){
    let revenues = 0; 
    tipoEventos.forEach(each => {

        if(each.assistance){
            revenues = revenues + (each.price * each.assistance)
        }else if(each.estimate){
            revenues = revenues + (each.price * each.estimate)
        }
    })
    return revenues;
}

function calcularPercentage(tipoEventos){
    let asistencias = 0;
    let capacidaTotal = 0;
    tipoEventos.forEach(each => {

        if(each.assistance){
            asistencias += each.assistance
        }else if(each.estimate){
            asistencias += each.estimate
        }
        capacidaTotal += each.capacity
         
    })
    return ((asistencias * 100) / capacidaTotal).toFixed(2)
}


// devuelve las categorias

function extractCategories(eventos){
    let types = [];
    eventos.forEach(evento => {      
        if (!types.includes(evento.category)) {
            types.push(evento.category);
        }
    });
    return types;
}