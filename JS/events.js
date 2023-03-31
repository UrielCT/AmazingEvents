const urlAPI = 'https://mindhub-xj03.onrender.com/api/amazing'

let urlActual= document.URL;

let events = [];
let types = [];


async function getEvents() {
    try {
      let response = await fetch(urlAPI);
      let dataAPI = await response.json();
      
      for (const evento of dataAPI.events) {
          saveEventsByDate(evento);
      }


      printTemplates('#cards', events)


      types = extractTypes(events);


      printChecks('#filters_container', types)

        
    } catch (error) {
        console.log(error.message);
    }
}
getEvents();






function saveEventsByDate(evento){ 
    if(urlActual == "http://127.0.0.1:5501/html/index.html"){
        events.push(evento);
    }
    else if(urlActual == "http://127.0.0.1:5501/html/upcoming-events.html"){
        if(new Date(evento.date).getFullYear() > 2022){
            events.push(evento);
        }
    }
    else if(urlActual == "http://127.0.0.1:5501/html/past-events.html"){
        if(new Date(evento.date).getFullYear() <= 2022){
            events.push(evento);
        }
    }
    else{
        events.push(evento);
    }
}






// creo las cards y las pinto en el container

function defineTemplate(evento) {
    return `
    <div id="card" class="card text-center p-2 m-2 shadow" style="width: 18rem;">
      <img src="${evento.image}" class="card-img-top" alt="imagen">
      <div class="card-body">
          <h5 class="card-title">${evento.name}</h5>
          <p class="card-text">${evento.description}</p>
          <div class="row">
              <p class="col m-0 align-self-center">$ ${evento.price}</p>
              <a href="./details.html?&id=${evento._id}" class="btn btn-primary col">Ver más...</a>
          </div>       
      </div>
    </div>
`
}



function printTemplates(id_contenedor, eventos) {
    let container = document.querySelector(id_contenedor)  
    eventos = eventos.map(defineTemplate)
    container.innerHTML = eventos.join('')
}







// extraigo las categorias

function extractTypes(eventos){
    let types = [];
    eventos.forEach(evento => {
        if (!types.includes(evento.category)) {
            types.push(evento.category);
        }
    });
    return types;
}






// pinto los checkboxes

function printChecks(id_contenedor, categorias) {
    let container = document.querySelector(id_contenedor)
    categorias = categorias.map(each=> {
        return `
        <fieldset class="col m-3">
            <label class="contact-label" for="${each}">${each}</label>
            <input onclick="captureData()" class="class_checks contact-input" type="checkbox" value="${each}" name="tipo" id="${each}">
        </fieldset>
        `
    })
    categorias.push(
        `
        <form class="d-flex  m-3" role="search">
            <input onkeyup="captureData()" id="id_search" class="contact-input form-control me-2" type="text" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
        </form>  
        `
    )
    container.innerHTML = categorias.join('')
}











// Filtros

function captureData() {
    let texto = document.getElementById('id_search').value;
    let checks = Array.from(document.querySelectorAll('.class_checks:checked')).map(each => each.value);
    let filtro = events.filter(each => {
        return (each.name.toLowerCase().includes(texto.toLowerCase())) && (checks.length === 0 || checks.includes(each.category));
    })
    console.log(filtro);
    if (filtro.length>0) {
        printTemplates('#cards', filtro);
    } else {
        notFound('#cards');
    }
}




function notFound(id_etiqueta) {
    let container = document.querySelector(id_etiqueta)
    container.innerHTML = `
    <div class="card m-2 card-box">
        <div class="card-body d-flex flex-column align-items-center">
            <h3 class="card-title d-flex flex-column align-items-center justify-center">EVENTO NO ENCONTRADO</h3>
        </div>
    </div>
    `
}
