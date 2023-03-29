<template>
  <nav>
    <div>
      <h1> {{ club.clubName }} Chat</h1>

      <div v-if="isLogin" class="login">
        <Avatar :src="user.photoURL" />
        <button  @click="signOut">
          Sign Out
        </button>
      </div>

      <button v-else @click="signIn">
        Sign in
      </button>
      <br>
      <router-link :to="'/clubs/' + clubId">
        {{ club.clubName}} page
      </router-link>
    </div>
  </nav>
</template>

<script>
import Avatar from './Avatar.vue'
import {getClub, useAuth} from '@/firebase'
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";

export default {
  components: { Avatar },
  setup() {
    const { user, isLogin, signOut, signIn } = useAuth()
    const route = useRoute()
    const clubId = ref(route.params.id)
    const club = ref({})

    onMounted(async () => {
      club.value = await getClub(clubId.value)
    })

    return { user, isLogin, signOut, signIn, club, clubId }
  }
}
</script>