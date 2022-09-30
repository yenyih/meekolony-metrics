<template>
  <v-row class="justify-center pt-10 px-2">
    <v-col cols="12" sm="8" md="6" lg="4" xl="4" class="text-center">
      <v-text-field
        v-model="userAddress"
        label="User Address"
        outlined
        append-icon="mdi-magnify"
        :disabled="isLoading"
        @keyup.enter="onSearch"
      ></v-text-field>
    </v-col>
    <v-col v-if="isLoading" cols="12" class="text-center">
      <v-progress-circular
        indeterminate
        color="#7289da"
      ></v-progress-circular>
    </v-col>
    <v-col v-if="!isLoading && collections.length > 0" cols="12">
      <v-row>
        <v-col
          v-for="collection in collections"
          :key="collection.mintAddress"
          cols="12"
          xl="2"
          lg="3"
          md="3"
          sm="4"
        >
          <meekolony-card :value="collection" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import MeekolonyCard from '../components/MeekolonyCard.vue';
export default {
  name: 'HolderPage',
  components: { MeekolonyCard },
  data: () => ({ userAddress: "", collections: [], isLoading: false }),
  methods: {
    async onSearch() {
      this.collections = [];
      this.isLoading = true;
      try {
        const { data } = await this.$axios.get(`/owners/${this.userAddress}`)
        this.collections = data || [];
        if (this.collections.length === 0) {
          this.$toast.info("Not Found.");
        }
      } catch (error) {
        const message = error.response
          ? error.response.data.message
          : 'Oops... something went wrong.';
        this.$toast.error(message);
      } finally {
        this.isLoading = false;
        this.userAddress = "";
      }
    }
  }
}
</script>
