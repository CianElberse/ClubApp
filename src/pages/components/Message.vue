<template>
  <div class="message">
    <span v-if="!sender">{{ name }}</span>
    <div  :class="sender ? 'flex-row-reverse' : ''">
      <Avatar  :src="photoUrl" />
      <div  :class="sender ? 'bg-green-800' : 'bg-gray-700'">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
export default {
  components: { Avatar },
  props: {
    name: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    sender: { type: Boolean, default: false }
  }
}
</script>
