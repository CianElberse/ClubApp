<template>
  <form @submit.prevent="onSubmit">
    <label>
      Name:
      <input v-model="form.clubName" type="text" required>
    </label>
    <br>
    <label>
      Description:
      <input v-model="form.clubDescription" type="text" required>
    </label>
    <br>
    <button type="submit">Create Club</button>
  </form>
</template>

<script>
import { createClub } from '@/firebase'
import { reactive } from 'vue'
import {useRouter} from "vue-router";

export default {

  setup() {
    const router = useRouter()
    const form = reactive({ clubName: '', clubDescription: '' })
    const onSubmit = async () => {
      await createClub({ ...form })
      form.clubName = ''
      form.clubDescription = ''
      router.push('/')
    }
    return { form, onSubmit,}
  }
}
</script>
