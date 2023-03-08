import{ events } from "./events.js";


function paintDOM(events){
    let body = ``;
  
    const tagToUpdate = document.getElementById("cards");

  
    for (let i = 0; i < events.length; i++){
        let fecha = new Date(events[i].date).getFullYear();
        if (fecha <= 2021){
            body += `
                <div id="card" class="card text-center p-2 m-2 shadow" style="width: 18rem;">
                <img src="${events[i].image}" class="card-img-top" alt="imagen">
                <div class="card-body">
                    <h5 class="card-title">${events[i].name}</h5>
                    <p class="card-text">${events[i].description}</p>
                    <div class="row">
                        <p class="col m-0 align-self-center">$ ${events[i].price}</p>
                        <a href="./details.html" class="btn btn-primary col">Ver más...</a>
                    </div>       
                </div>
                </div>
            `;
            
        }
      
    }

    tagToUpdate.innerHTML = body;
}

paintDOM(events);