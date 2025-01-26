<template>
  <q-layout view="lHh Lpr lFf" class="bg-white">
    <q-header class="bg-secondary" style="position: fixed">
      <q-toolbar>
        <q-btn flat color="green-10" icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-space />
        <div class="q-mr-md">
          <q-icon name="notifications" color="green-10" size="30px" />
        </div>
        <div>
          <q-icon name="mail" color="green-10" size="30px" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" style="background-color: #30582d">
      <q-list>
        <div class="q-pa-md flex flex-center">
          <q-img
            src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1737617283/assets/queing/ja3s742lgdzsca55fu1w.png"
            style="width: 60px; margin-bottom: 16px"
          />
        </div>
        <q-item-label>
          <EssentialLink />
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import EssentialLink from 'src/components/EssentialLink.vue'
import { ref } from 'vue'

const leftDrawerOpen = ref(true)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
