<template>
  <div class="text-white">
    <div class="q-py-sm">
      <q-item clickable @click="router.replace(`/new/dashboardPage`)">
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Homepage</q-item-label>
        </q-item-section>
      </q-item>
    </div>
    <div class="q-py-sm">
      <q-item clickable @click="router.replace(`/new/addStudent`)">
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Student</q-item-label>
        </q-item-section>
      </q-item>
    </div>
    <div class="q-py-sm">
      <q-item clickable  @click="router.replace(`/new/addProgram`)">
        <q-item-section avatar>
          <q-icon name="folder" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Program</q-item-label>
        </q-item-section>
      </q-item>
    </div>
    <div class="q-py-sm">
      <q-item   @click="router.replace(`/new/`)">
        <q-item-section avatar>
          <q-icon name="library_books" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Course</q-item-label>
        </q-item-section>
      </q-item>
    </div>
    <div class="q-py-sm">
      <q-item >
        <q-item-section avatar>
          <q-icon name="menu" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Queue</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable @click="router.replace(`/new/queueAll`)" style="padding-left: 70px;width: 100%;">
        <q-item-section> All </q-item-section>
      </q-item>
    </div>
    <div>
      <q-item   @click="router.replace(`/main`)" style="padding-left: 70px;width: 100%;">
        <q-item-section> Registrar </q-item-section>
      </q-item>
    </div>
    <div>
      <q-item   @click="router.replace(`/main`)" style="padding-left: 70px;width: 100%;">
        <q-item-section> Cashier </q-item-section>
      </q-item>
    </div>
    <div>
      <q-item   @click="router.replace(`/main`)" style="padding-left: 70px;width: 100%;">
        <q-item-section> OSAS </q-item-section>
      </q-item>
    </div>
    <div class="q-py-sm">
      <q-item >
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Settings</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable @click="router.replace(`/new/adminSettings`)" style="padding-left: 70px;width: 100%;">
        <q-item-section> Admin Settings </q-item-section>
      </q-item>
      <q-item clickable @click="router.replace(`#`)" style="padding-left: 70px;width: 100%;">
        <q-item-section> Create New Account </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
</script>
