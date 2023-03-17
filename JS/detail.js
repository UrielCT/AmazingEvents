let query = location.search;
let params = new URLSearchParams(query);
let id_query = params.get('id');


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
    id = eventos.find(each => each.id === id);
    let id_list = defineDetails(id);
    container.innerHTML = id_list;
}

printTemplates('#detail_container', id_query, events);


