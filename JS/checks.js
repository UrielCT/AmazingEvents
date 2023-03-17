function printChecks(id_contenedor,categorias) {
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
printChecks('#filters_container', tipos)