
let tipos = [];

events.forEach(each => {
    if ( ! tipos.includes(each.category) ) {
        tipos.push(each.category);
    }    
})
