import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            clubs: [
                { id: 1, name: 'Soccer Club', description: 'We play soccer every Saturday at 2pm.' },
                { id: 2, name: 'Chess Club', description: 'We meet on Thursdays at 7pm to play chess.' },
                { id: 3, name: 'Film Club', description: 'We watch and discuss films every other Tuesday at 6pm.' }
            ]
        }
    },
    mutations: {
        createClub(state, club) {
            club.id = state.clubs.length + 1
            state.clubs.push(club)
        }
    },
    getters: {
        getClubById: state => id => {
            return state.clubs.find(club => club.id === id)
        }
    }
})
