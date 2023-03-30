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
    <label>
      Date:
      <Datepicker v-model="form.picked" placeholder="Enter date" />
    </label>
    <br>
    <button type="submit">Create Event</button>
  </form>

</template>

<script>
import { createEvent } from '@/firebase'
import {reactive} from 'vue'
import {useRoute, useRouter} from "vue-router";
import Datepicker from 'vue3-datepicker'


export default {
  components: {Datepicker  },
  setup() {

    const route = useRoute()
    const router = useRouter()
    const ClubId = route.params.id
    const form = reactive({ Name: '', Description: '', Location: '', picked: '', })
    const onSubmit = async () => {
      const date = form.picked.toString().substring(0,15)
      await createEvent({ ...form, ClubId, date })
      form.Name = ''
      form.Description = ''
      form.Location = ''
      router.push('/clubs/' + ClubId + '/event')
    }
    return { form, onSubmit,}
  }
}
</script>