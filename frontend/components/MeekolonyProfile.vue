<template>
  <v-row v-if="value.name" class="py-10">
    <v-col cols="12" sm="4">
      <v-img max-height="200" :src="value.image" aspect-ratio="1" contain />
    </v-col>
    <v-col cols="12" sm="8">
      <div class="text-h4 font-weight-bold pb-2">
        {{ value.name }}
      </div>
      <div class="text-subtitle-1">
        {{ value.description }}
      </div>
      <v-row class="justify-space-around pt-5">
        <v-col>
          <v-chip class="text-subtitle-1">
            Floor Price: {{ value.floorPrice | currency }} ◎
          </v-chip>
        </v-col>
        <v-col>
          <v-chip class="text-subtitle-1">
            Listed: {{ value.listedCount }}
          </v-chip>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-chip class="text-subtitle-1">
            Total Vol:
            {{ (value.volumeAll / 1000) | currency | oneDecimal }} K
          </v-chip>
        </v-col>
        <v-col>
          <v-chip class="text-subtitle-1">
            Avg. Sale (24h): {{ value.avgPrice24hr | currency | twoDecimal }} ◎
          </v-chip>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "MeekolonyProfile",
  props: {
    value: {
      required: true,
      type: Object
    }
  }
}
</script>
