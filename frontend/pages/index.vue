<template>
  <div style="height: 100vh">
    <meekolony-profile :value="profile" />
    <v-tabs
      v-model="currentTab"
      background-color="transparent"
      grow
      color="#ffffff"
      @change="onTabChange"
    >
      <v-tab v-for="tab in availableTabs" :key="tab">
        {{ tab }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="currentTab" style="background: #2c2f33">
      <v-tab-item>
        <loading-skeleton v-if="isLoading && collections.length === 0" />
        <v-row class="justify-center px-3">
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
          <v-col
            v-if="collections && collections.length > 0"
            cols="12"
            class="text-center pb-10"
          >
            <v-btn
              text
              color="#99aab5"
              :loading="isLoading"
              @click="onLoadMore(collections.length + 20)"
            >
              Load More
            </v-btn>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item v-if="currentTab === 1">
        <v-row class="justify-center text-center">
          <v-col cols="12">
            <v-simple-table fixed-header>
              <template #default>
                <thead>
                  <tr>
                    <th></th>
                    <th class="text-left">Name</th>
                    <th class="text-left">Transaction ID</th>
                    <th class="text-left">Transaction Type</th>
                    <th class="text-left">Time</th>
                    <th class="text-left">Total Amount</th>
                    <th class="text-left">Mint Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="isLoading" class="text-center">
                    <td colspan="7">
                      <v-progress-circular
                        indeterminate
                        color="#7289da"
                      ></v-progress-circular>
                    </td>
                  </tr>
                  <tr v-for="(sale, index) in sales" :key="index">
                    <td style="max-width: 80px">
                      <v-img contain max-height="50" :src="sale.image" />
                    </td>
                    <td>{{ sale.name }}</td>
                    <td>
                      <copy-text :value="sale.signature" />
                    </td>
                    <td>
                      {{ sale.type }}
                    </td>
                    <td>{{ (sale.blockTime * 1000) | duration }}</td>
                    <td>{{ sale.price }} SOL</td>
                    <td>
                      <copy-text :value="sale.tokenMint" />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="7">
                      <v-btn
                        text
                        color="#99aab5"
                        :loading="isLoading"
                        @click="onLoadMore(sales.length)"
                      >
                        Load More
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import CopyText from '../components/CopyText.vue'
import LoadingSkeleton from '../components/LoadingSkeleton.vue'
import MeekolonyCard from '../components/MeekolonyCard.vue'
import MeekolonyProfile from '../components/MeekolonyProfile.vue'

export default {
  name: 'IndexPage',
  components: { CopyText, MeekolonyProfile, LoadingSkeleton, MeekolonyCard },
  beforeRouteLeave(to, from, next) {
    this.clearAutoRefresh()
    next()
  },
  data: () => ({
    availableTabs: ['collections', 'sales'],
    collections: [],
    currentTab: 'collections',
    isLoading: false,
    polling: null,
    profile: {},
    sales: []
  }),
  async beforeMount() {
    this.isLoading = true
    this.profile = await this.fetchMeekoProfile()
    this.collections = await this.fetchCollections()
    this.isLoading = false
    this.clearAutoRefresh()
    this.polling = setInterval(() => {
      this.fetchCollections()
        .then((result) => {
          const mintAddresses = this.collections.map(
            (collection) => collection.mintAddress
          )
          for (const newItem of result) {
            if (!mintAddresses.includes(newItem.mintAddress)) {
              this.collections.unshift(newItem)
            }
          }
        })
        .catch((error) => this.$toast.error(error))
    }, 300000)
  },
  methods: {
    clearAutoRefresh() {
      if (this.polling) {
        clearInterval(this.polling)
        this.polling = null
      }
    },
    async fetchMeekoProfile() {
      try {
        const { data } = await this.$axios.get('/')
        return data || {}
      } catch (error) {
        const message = error.response
          ? error.response.data.message
          : 'Oops... something went wrong.'
        this.$toast.error(message)
      }
    },
    async fetchCollections(offset = 0) {
      try {
        const { data } = await this.$axios.get('/collections', {
          params: { offset },
        })
        return data || []
      } catch (error) {
        const message = error.response
          ? error.response.data.message
          : 'Oops... something went wrong.'
        this.$toast.error(message)
      }
    },
    async fetchSales(params = { offset: 0, limit: 100 }) {
      try {
        const { data } = await this.$axios.get('/sales', {
          params,
        })
        return data || []
      } catch (error) {
        const message = error.response
          ? error.response.data.message
          : 'Oops... something went wrong.'
        this.$toast.error(message)
      }
    },
    async onLoadMore(offset) {
      this.isLoading = true
      if (this.currentTab === 0) {
        const result = await this.fetchCollections(offset)
        const mintAddresses = this.collections.map(
          (collection) => collection.mintAddress
        )
        for (const item of result) {
          if (mintAddresses.includes(item.mintAddress)) continue
          this.collections.push(item)
        }
        this.isLoading = false
        return
      }
      const result = await this.fetchSales({ offset, limit: 100 })
      const signatures = this.sales.map((sale) => sale.signature)
      for (const item of result) {
        if (signatures.includes(item.signature)) continue
        this.sales.push(item)
      }
      this.isLoading = false
    },
    // async viewActivities(collection) {
    //   if (this.isLoading) return
    //   try {
    //     this.isOpen = true
    //     this.isLoading = true
    //     this.selectedMeeko = collection
    //     const { data } = await this.$axios.get(
    //       `/${collection.mintAddress}/sales`
    //     )
    //     this.meekoActivities = data
    //   } catch (error) {
    //     const message = error.response
    //       ? error.response.data.message
    //       : 'Oops... something went wrong.'
    //     this.$toast.error(message)
    //   } finally {
    //     this.isLoading = false
    //   }
    // },
    // onActivityClose() {
    //   this.isOpen = false
    //   this.meekoActivities = []
    //   this.selectedMeeko = null
    // },
    async onTabChange(tab) {
      if (tab === 1) {
        this.isLoading = true
        const latestSales = await this.fetchSales()
        this.sales = latestSales
        this.isLoading = false
      }
    },
  },
}
</script>
