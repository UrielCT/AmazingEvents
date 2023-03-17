function defineTemplate(evento) {
    return `
    <div id="card" class="card text-center p-2 m-2 shadow" style="width: 18rem;">
      <img src="${evento.image}" class="card-img-top" alt="imagen">
      <div class="card-body">
          <h5 class="card-title">${evento.name}</h5>
          <p class="card-text">${evento.description}</p>
          <div class="row">
              <p class="col m-0 align-self-center">$ ${evento.price}</p>
              <a href="./details.html?&id=${evento.id}" class="btn btn-primary col">Ver más...</a>
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
printTemplates('#cards', eventsPast) 