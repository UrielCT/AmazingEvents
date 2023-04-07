
const { createApp } = Vue

const app = createApp({
    data(){
        return{
            urlAPI: 'https://mindhub-xj03.onrender.com/api/amazing',
            id_query: new URLSearchParams(location.search).get('id'),
            event: []
        }
    },
    created(){
        this.getEventsById()
    },
    mounted(){
    },
    methods:{
        getEventsById(){
            fetch(this.urlAPI)
                .then(response => response.json())
                .then(eventsApi => {
                    this.event = eventsApi.events.find(event => event._id == this.id_query)
                })
        },
    },
    computed:{
    }
}).mount('#app')


