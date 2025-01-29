<template>
  <q-layout view="lHh Lpr lFf" class="bg-white">
    <q-header class="bg-secondary" style="position: fixed">
      <q-toolbar class="q-pa-sm">
        <q-btn flat color="green-10" icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-space />
        <q-icon name="notifications" color="green-10" size="30px" class="q-mr-md" />
        <q-icon name="mail" color="green-10" size="30px" />

        <!-- Circular Profile Image -->
        <div class="q-ml-md">
          <q-img
            src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1738071000/assets/queing/jqhuylsgaqof1hgmczhj.png"
            style="height: 32px;width: 32px;border-radius: 50%;"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" style="background-color: #30582d">
      <q-list>
        <div class="q-pa-md flex flex-center">
          <q-avatar size="60px">
            <q-img
              src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1737617283/assets/queing/ja3s742lgdzsca55fu1w.png"
            />
          </q-avatar>
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
