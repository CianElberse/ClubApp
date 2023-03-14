<template>
  <form @submit.prevent="onSubmit">
    <label>
      Name:
      <input v-model="form.Name" type="text" required>
    </label>
    <br>
    <label>
      Description:
      <input v-model="form.Description" type="text" required>
    </label>
    <br>
    <label>
      Location:
      <input v-model="form.Location" type="text" required>
    </label>
   <br>
    <button type="submit">Create Event</button>
  </form>
</template>

<script>
import { createEvent } from '@/firebase'
import {reactive} from 'vue'
import {useRoute, useRouter} from "vue-router";

export default {

  setup() {
    const route = useRoute()
    const router = useRouter()
    const ClubId = route.params.id
    const form = reactive({ Name: '', Description: '', Location: ''})
    const onSubmit = async () => {
      await createEvent({ ...form,  ClubId})
      form.Name = ''
      form.Description = ''
      form.Location = ''
      router.push('/clubs/' + ClubId + '/event')
    }
    return { form, onSubmit,}
  }
}
</script>