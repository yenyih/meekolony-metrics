<template>
  <v-app style="background: #2c2f33;">
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
      color="#23272a"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app color="#23272a">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Collections',
          to: '/',
        },
        {
          icon: 'mdi-account',
          title: 'Meekolony Holder',
          to: '/holder',
        },
      ],
      title: 'Tatsumeeko: Meekolony Pass',
    }
  },
}
</script>
