<template>
  <div>
    <h1>{{ club.clubName }}</h1>
    <p>{{ club.clubDescription }}</p>
    <br>
    <router-link :to="'/clubs/' + clubId + '/event'">Events</router-link>
    <br>
    <router-link :to="'/clubs/' + clubId + '/chat'">Chat</router-link>
    <br>
    <router-link :to="'/'">Home</router-link>
  </div>
</template>

<script>
import { getClub } from '@/firebase'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const route = useRoute()
    const clubId = ref(route.params.id)
    const club = ref({})

    onMounted(async () => {
      club.value = await getClub(clubId.value)
    })

    return { club, clubId}
  }
}
</script>