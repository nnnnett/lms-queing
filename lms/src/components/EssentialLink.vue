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
      <q-item clickable @click="router.replace(`/new/addProgram`)">
        <q-item-section avatar>
          <q-icon name="folder" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Program</q-item-label>
        </q-item-section>
      </q-item>
    </div>
    <div class="q-py-sm">
      <q-item @click="router.replace(`/new/`)">
        <q-item-section avatar>
          <q-icon name="library_books" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Course</q-item-label>
        </q-item-section>
      </q-item>
    </div>
    <div class="q-py-sm">
      <q-item clickable @click="router.replace(`/new/adminQueuePage`)">
        <q-item-section avatar>
          <q-icon name="menu" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Queue</q-item-label>
        </q-item-section>
      </q-item>
    </div>

    <div>
      <q-item clickable @click="router.replace(`/new/adminCreateAccount`)">
        <q-item-section avatar>
          <q-icon name="people" />
        </q-item-section>
        <q-item-section> Users </q-item-section>
      </q-item>
    </div>
    <div class="q-py-sm">
      <q-item clickable @click="router.replace(`/new/adminSettings`)">
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>
        <q-item-section> Settings </q-item-section>
      </q-item>
    </div>
    <div class="q-py-sm">
      <q-item clickable @click="handleLogout">
        <q-item-section avatar>
          <q-icon name="logout" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Logout</q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Notify } from 'quasar';

const router = useRouter()

const clearLocalStorage = () => {
  localStorage.clear();
};
const handleLogout = async () => {
  try {
    // Clear localStorage when logging out
    clearLocalStorage();
    // Show a notification
    Notify.create({ type: "positive", message: "Logout Successful" });
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Redirect to the login page
    router.replace("/adminLogin");
  } catch (error) {
    // If an error occurs during logout
    Notify.create({ type: "negative", message: "Error during logout" });
    console.error(error);
  } finally {
    // await isLogin();
  }
};
</script>
