const { createApp } = Vue

const app = createApp({
    data(){
        return{
            urlAPI: 'https://mindhub-xj03.onrender.com/api/amazing',
            urlActual: document.URL,
            events: [],
            backupEvents: [],
            texto: '',
            categorias: [],
            categoriasSeleccionadas: [],
        }
    },
    created(){
        this.getEvents()
    },
    mounted(){

    },
    methods:{
        getEvents(){
            if(this.urlActual == "http://127.0.0.1:5501/html/upcoming-events.html"){
                this.getUpcomingEventsFromApi()
            }
            else if(this.urlActual == "http://127.0.0.1:5501/html/past-events.html"){
                this.getPastEventsFromApi()
            }
            else{
                this.getEventsFromApi()
            }
        },

        getEventsFromApi(){
            fetch(this.urlAPI)
                .then(response => response.json())
                .then(eventsApi => {
                    this.events = eventsApi.events;
                    this.backupEvents = this.events;
                    this.extraerCategorias(eventsApi.events)
                })
        },

        getPastEventsFromApi(){
            fetch(this.urlAPI)
            .then(response => response.json())
            .then(eventsApi => {
                let eventos = eventsApi.events;
                this.events = eventos.filter(event => new Date(event.date).getFullYear() <= 2022);
                this.backupEvents = this.events;
                this.extraerCategorias(eventsApi.events)
            })
        },

        getUpcomingEventsFromApi(){
            fetch(this.urlAPI)
            .then(response => response.json())
            .then(eventsApi => {
                let eventos = eventsApi.events;
                this.events = eventos.filter(event => new Date(event.date).getFullYear() > 2022);
                this.backupEvents = this.events;
                this.extraerCategorias(eventsApi.events)
            })
        },
        
        extraerCategorias(array){
            array.forEach(each => {
                if(!this.categorias.includes(each.category) && each.category){
                    this.categorias.push(each.category);
                }
            })
        }

    },
    computed:{
        filtroDoble(){
            let primerFiltro = this.backupEvents.filter(event => 
                event.name.toLowerCase().includes(this.texto.toLowerCase()));
            if(!this.categoriasSeleccionadas.length){
                this.events = primerFiltro;
            }else{
                this.events = primerFiltro.filter(event => 
                    this.categoriasSeleccionadas.includes(event.category) )
            }
        }
    }
}).mount('#app')