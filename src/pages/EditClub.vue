<template>
  <div>
    <h3>Edit Clubs</h3>
    <form @submit.prevent="update">
      <div>
        <label>Name</label>
        <input v-model="form.clubName"  required />
      </div>

      <div>
        <label>Description</label>
        <input
            v-model="form.clubDescription"
            type="description"
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
import { getClub, updateClub } from '@/firebase'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const clubId = computed(() => route.params.id)

    const form = reactive({ clubName: '', clubDescription: '' })
    onMounted(async () => {
      const club = await getClub(clubId.value)
      form.clubName = club.clubName
      form.clubDescription = club.clubDescription
    })

    const update = async () => {
      await updateClub(clubId.value, { ...form })
      form.clubName = ''
      form.clubDescription = ''
      router.push('/')
    }

    return { form, update }
  }
}
</script>