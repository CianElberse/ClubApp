<template>
  <div>
    <h1> {{ club.clubName }} Events</h1>
    <table>
      <tbody>
      <tr v-for="{ id, Name , Description , Location , ClubId, date } in events" >
        <div  v-if="ClubId===clubId">
        <td >{{ Name }}</td>
        <td>{{ Description }}</td>
        <td>{{ Location }}</td>
          <td>{{ date }}</td>
        <td>
          <router-link :to="`/editEvent/${id}/`+ clubId ">
            <button>
              Edit
            </button>
          </router-link>
          <button @click="deleteEvent(id)">
            Delete
          </button>
        </td>
        </div>
      </tr>
      </tbody>
    </table>
    <router-link :to=" '/createEvent/' + clubId ">Create new Event</router-link>
    <br>
    <router-link :to="'/clubs/' + clubId">
      {{ club.clubName }} page
    </router-link>
  </div>
</template>

<script>
import {useLoadEvents, deleteEvent, getClub} from '@/firebase'
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";

export default {
  setup() {
    const route = useRoute()
    const clubId = ref(route.params.id)
    const events = useLoadEvents()
    const club = ref({})

    onMounted(async () => {
      club.value = await getClub(clubId.value)
    })

    return { events, deleteEvent, clubId, club }
  }
}
</script>