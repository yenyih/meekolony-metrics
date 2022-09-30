<template>
  <v-card class="mx-auto my-2" @click="onClick">
    <v-img aspect-ratio="1" contain :src="value.image" />
    <v-card-title>{{ value.name }}</v-card-title>
    <v-card-text>Tatsumeeko: Meekolony Pass</v-card-text>
    <v-card-text>
      <v-icon color="#7289da">mdi-tag</v-icon>
      {{ value.price }} SOL
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "MeekolonyCard",
  props: {
    value: {
      required: true,
      type: Object
    }
  },
  methods: {
    onClick() {
      this.$emit("click", this.value);
    }
  }
}
</script>
