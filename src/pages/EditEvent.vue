<template>
  <div>
    <h3>Edit Events</h3>
    <form @submit.prevent="update">
      <div class="form-group">
        <label>Name</label>
        <input v-model="form.Name"  required />
      </div>

      <div>
        <label>Description</label>
        <input
            v-model="form.Description"
            type="text"
            required
        />
      </div>

      <div>
        <label>Location</label>
        <input
            v-model="form.Location"
            type="text"
            required
        />
      </div>

      <div>
        <label>Date</label>
        <Datepicker
            v-model="form.picked"
            placeholder="Update date"
            required
        />
      </div>


      <button type="submit" >
        Update
      </button>
    </form>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getEvent, updateEvent } from '@/firebase'
import Datepicker from 'vue3-datepicker'

export default {
  components: {Datepicker },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const eventId = computed(() => route.params.id)
    const ClubId = route.params.cId

    const form = reactive({ Name: '', Description: '', Location: '', picked:'' })
    onMounted(async () => {
      const event = await getEvent(eventId.value)
      form.Name = event.Name
      form.Description = event.Description
      form.Location = event.Location
    })

    const update = async () => {
      const date = form.picked.toString().substring(0,15)
      await updateEvent(eventId.value, { ...form, date })
      form.Name = ''
      form.Description = ''
      form.Location =''
      router.push('/clubs/' + ClubId + '/event')
    }

    return { form, update }
  }
}
</script>