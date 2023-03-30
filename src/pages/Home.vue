<template>
  <div>
    <h1>Clubs</h1>
    <table>
    <tbody>
    <tr v-for="{ id, clubName } in clubs" :key="id">
      <td>
        <router-link :to="'/clubs/' + id">
        {{ clubName }}
        </router-link>
      </td>
      <td>
        <router-link :to="`/edit/${id}`">
          <button>
            Edit
          </button>
        </router-link>
        <button @click="deleteClub(id)">
          Delete
        </button>
      </td>
    </tr>
    </tbody>
    </table>
    <router-link to="/create">Create new Club</router-link>
    <br>
  </div>
  <VueDatePicker v-model="date"></VueDatePicker>
</template>

<script>
  import { useLoadClubs, deleteClub } from '@/firebase'

  export default {
  setup() {
  const clubs = useLoadClubs()
  return { clubs, deleteClub }
}
}




</script>

