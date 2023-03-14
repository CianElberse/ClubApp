<template>
  <div>
    <h3>Edit Events</h3>
    <form @submit.prevent="update">
      <div class="form-group">
        <label>Name</label>
        <input v-model="form.Name"  required />
      </div>

      <div class="form-group mt-3">
        <label>Description</label>
        <input
            v-model="form.Description"
            type="description"
            required
        />
      </div>

      <div class="form-group mt-3">
        <label>Location</label>
        <input
            v-model="form.Location"
            type="location"
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

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const eventId = computed(() => route.params.id)
    const ClubId = route.params.cId

    const form = reactive({ Name: '', Description: '', Location: ''  })
    onMounted(async () => {
      const event = await getEvent(eventId.value)
      form.Name = event.Name
      form.Description = event.Description
      form.Location = event.Location
    })

    const update = async () => {
      await updateEvent(eventId.value, { ...form })
      form.Name = ''
      form.Description = ''
      form.Location =''
      router.push('/clubs/' + ClubId + '/event')
    }

    return { form, update }
  }
}
</script>