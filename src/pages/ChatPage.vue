<template>
  <Nav />

  <div>
    <div>
      <Message
          v-for="{ id, text, userPhotoURL, userName, userId } in messages"
          :key="id"
          :name="userName"
          :photo-url="userPhotoURL"
          :sender="userId === user?.uid"
      >
        {{ text }}
      </Message>
    </div>
  </div>

  <div ref="bottom" class="mt-20" />

  <div class="bottom">
    <div>
      <form v-if="isLogin" @submit.prevent="send">
        <input v-model="message" placeholder="Message" required />
        <button type="submit">Send
        </button>
      </form>
    </div>
  </div>

</template>

<script>
import Nav from '@/pages/components/Nav.vue'
import { ref, watch, nextTick } from 'vue'
import { useAuth, useChat } from '@/firebase'

import Message from './components/Message.vue'
import {useRoute} from "vue-router";

export default {
  components: { Message, Nav },
  setup() {
    const route = useRoute()
    const clubId = route.params.id
    const { user, isLogin } = useAuth()
    const { messages, sendMessage } = useChat(clubId)

    const bottom = ref(null)
    watch(
        messages,
        () => {
          nextTick(() => {
            bottom.value?.scrollIntoView({ behavior: 'smooth' })
          })
        },
        { deep: true }
    )

    const message = ref('')
    const send = () => {
      sendMessage(message.value)
      message.value = ''
    }

    return { user, isLogin, messages, bottom, message, send }
  }
}

</script>