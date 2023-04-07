const { createApp } = Vue

const app = createApp({
    data(){
        return{
            urlAPI: 'https://mindhub-xj03.onrender.com/api/amazing',
            events: [],
            pastEvents: [],
            upcomingEvents: [],
            highestPercentageEvent: [],
            lowestPercentageEvent: [],
            largerCapacityEvent: [],
            upcomingStats: [],
            pastStats: [],
        }
    },
    created(){
        this.getEventsFromApi()
    },
    mounted(){
    },
    methods:{
        getEventsFromApi(){
            fetch(this.urlAPI)
                .then(response => response.json())
                .then(eventsApi => {
                    this.events = eventsApi.events;
                    this.upcomingEvents = eventsApi.events.filter(each => new Date(each.date).getFullYear() > 2022);
                    this.pastEvents = eventsApi.events.filter(each => new Date(each.date).getFullYear() <= 2022);
                    this.backupEvents = this.events;

                    // EVENTS STATISTICS
                    this.highestPercentage(eventsApi.events)
                    this.lowestPercentage(eventsApi.events)
                    this.largerCapacity(eventsApi.events)

                    // EVENTS STATS BY CATEGORY
                    this.upcomingStats = this.getEventosStats(this.upcomingEvents)
                    this.pastStats = this.getEventosStats(this.pastEvents)
              
                })   
        },

        //EVENTS STATISTICS
        highestPercentage(listaEventos){
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
            this.highestPercentageEvent = {"porcentaje": porMayor, "evento": mayor.name};
        },
        lowestPercentage(listaEventos){
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
            this.lowestPercentageEvent = {"porcentaje": porMenor, "evento": menor.name};
        },
        largerCapacity(listaEventos){
            let mayor = 0;
            let capMayor = 0;
            for(i = 0; i < listaEventos.length; i++){
                if (listaEventos[i].capacity > capMayor )
                {
                    capMayor = listaEventos[i].capacity;
                    mayor = listaEventos[i];
                }
            }
            this.largerCapacityEvent = {"capacidad": capMayor, "evento": mayor.name};
        },

        
        
        getEventosStats(eventos){
            let events = [];
            let categorias = this.extractCategories(eventos)
            categorias.forEach(tipo => {
                let tipoEventos = eventos.filter(evento => evento.category == tipo)
                events.push(    
                    {
                        "categoria": tipo, 
                        "revenues": this.calcularReveneus(tipoEventos),
                        "perAttendance": this.calcularPercentage(tipoEventos)
                    }    
                )
           })
           return events;
        },

        calcularReveneus(tipoEventos){
            let revenues = 0; 
            tipoEventos.forEach(each => {
                if(each.assistance){
                    revenues = revenues + (each.price * each.assistance)
                }else if(each.estimate){
                    revenues = revenues + (each.price * each.estimate)
                }
            })
            return revenues;
        },     
        
        calcularPercentage(tipoEventos){
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
        },
          
        extractCategories(eventos){
            let types = [];
            eventos.forEach(evento => {      
                if (!types.includes(evento.category)) {
                    types.push(evento.category);
                }
            });
            return types;
        },

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


