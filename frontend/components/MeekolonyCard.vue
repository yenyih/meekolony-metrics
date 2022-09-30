<template>
  <v-card class="mx-auto my-2" @click="viewDetails">
    <v-img aspect-ratio="1" contain :src="value.image" />
    <v-card-title>{{ value.name }}</v-card-title>
    <v-card-text>Tatsumeeko: Meekolony Pass</v-card-text>
    <v-card-text>
      <v-icon color="#7289da">mdi-tag</v-icon>
      {{ value.price }} SOL
    </v-card-text>
    <v-dialog
      v-model="isOpen"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="#7289da">
          <v-btn icon dark @click="onDetailClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>
            {{ value ? value.name : '' }}
            Activities
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-row class="justify-center pt-5">
          <v-col cols="12">
            <v-img contain :src="value.image" max-height="150" />
          </v-col>
          <v-col v-if="value.owner" cols="12" class="text-center">
            Owner: <copy-text :value="value.owner" />, Price:
            {{ value.price }} SOL
          </v-col>
          <v-col cols="12">
            <div class="d-flex flex-wrap px-5 pb-5">
              <v-chip
                v-for="attribute in value.attributes"
                :key="attribute.trait_type"
                class="mx-2 my-2"
              >
                {{ attribute.trait_type }}: {{ attribute.value }}
              </v-chip>
            </div>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="activities"
          :items-per-page="15"
          :loading="isLoading"
          class="elevation-1"
        >
          <template #[`item.signature`]="{ item }">
            <copy-text :value="item.signature" />
          </template>
          <template #[`item.buyer`]="{ item }">
            <copy-text :value="item.buyer || ''" />
          </template>
          <template #[`item.seller`]="{ item }">
            <copy-text :value="item.seller || ''" />
          </template>
          <template #[`item.price`]="{ item }">
            {{ item.price.toFixed(2) }} SOL
          </template>
          <template #[`item.blockTime`]="{ item }">
            {{ (item.blockTime * 1000) | duration }}
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: 'MeekolonyCard',
  props: {
    value: {
      required: true,
      type: Object,
    },
  },
  data: () => ({
    activities: [],
    isLoading: false,
    isOpen: false,
    headers: [
      { text: 'Transaction ID', value: 'signature' },
      { text: 'Transaction Type', value: 'type' },
      { text: 'Time', value: 'blockTime' },
      { text: 'Total Amount', value: 'price' },
      { text: 'Buyer', value: 'buyer' },
      { text: 'Seller', value: 'seller' },
    ],
  }),
  methods: {
    onDetailClose() {
      this.isOpen = false
      this.activities = []
    },
    viewDetails() {
      this.isOpen = true
      this.fetchActivities()
    },
    async fetchActivities() {
      if (this.isLoading) return
      try {
        const mintAddress =
          this.value.metadata && this.value.metadata.mintAddress
            ? this.value.metadata.mintAddress
            : this.value.mintAddress
        this.isOpen = true
        this.isLoading = true
        const { data } = await this.$axios.get(`/${mintAddress}/sales`)
        this.activities = data
      } catch (error) {
        const message = error.response
          ? error.response.data.message
          : 'Oops... something went wrong.'
        this.$toast.error(message)
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
