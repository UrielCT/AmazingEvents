let query = location.search;
let params = new URLSearchParams(query);
let id_query = params.get('id');



let urlAPI = 'https://mindhub-xj03.onrender.com/api/amazing';
let urlActual= document.URL;

let eventos = [];



async function getEvents() {
    try {
      let response = await fetch(urlAPI);
      let dataAPI = await response.json();
      for (const evento of dataAPI.events) {
        eventos.push(evento)
      }

      printTemplates('#detail_container', id_query, eventos);
      

        
    } catch (error) {
        console.log(error.message);
    }
}
getEvents();





function defineDetails(event) {
    return `
    <div class="row">
        <div class="col text-center align-self-center ">
            <img src="${event.image}" alt="imagen detail" class="card-img-top img-fit">
        </div>
        <div class="col text-center align-self-center">
            <h2 class="text-center">${event.name}</h2>
            <p>${event.description}</p>
        </div>
    </div>
    `
}

function printTemplates(id_contenedor, id, eventos) {
    let container = document.querySelector(id_contenedor);
    id = eventos.find(each => each._id == id);
    let id_list = defineDetails(id);
    container.innerHTML = id_list;
}




