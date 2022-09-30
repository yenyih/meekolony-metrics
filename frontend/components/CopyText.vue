<template>
  <v-btn :disabled="!value" text @click="onClick">
    {{ value | shortAddress }}
  </v-btn>
</template>

<script>
export default {
  name: 'CopyText',
  props: {
    value: {
      required: true,
      type: [String],
    },
  },
  methods: {
    onClick() {
      navigator.clipboard.writeText(this.value)
      this.$toast.info("Copied to clipboard!")
    },
  },
}
</script>
