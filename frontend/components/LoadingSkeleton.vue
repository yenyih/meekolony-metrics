<template>
  <v-row>
    <v-col
      v-for="i in Array.from(Array(20).keys())"
      :key="i"
      cols="12"
      xl="2"
      lg="3"
      md="3"
      sm="4"
    >
      <v-sheet class="pa-3">
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="image, list-item-two-line, list-item-avatar"
        ></v-skeleton-loader>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "LoadingSkeleton"
}
</script>
