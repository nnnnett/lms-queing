<template>
  <q-page style="height: 90vh">
    <div class="main-container">
      <div class="content-container q-px-md q-px-sm-xl">
        <q-card-section class="q-pt-md">
          <div class="text-h6 text-weight-medium" style="color: #282726">
            Admin/<span style="color: #b1b2b4">Admin Profile</span>
          </div>
        </q-card-section>
        <q-card-section style="width: 100%" class="flex flex-center">
          <div style="display: flex; flex-direction: column; width: 80%">
            <div>
              <div
                style="
                  width: 270px;
                  height: 270px;
                  border: 4px solid black;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  justify-self: center;
                  align-items: center;
                "
              >
                <q-img
                  img-class="rounded-image"
                  style="border-radius: 50%; width: 250px; height: 250px; object-fit: cover"
                  src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1738071000/assets/queing/jqhuylsgaqof1hgmczhj.png"
                ></q-img>
              </div>
              <div style="color: #193018" class="text-h4 text-weight-bold text-center">
                Sample Admin
              </div>
            </div>
            <div style="width: 100%">
              <q-form class="row q-col-gutter-x-md">
                <q-card-section style="width: 400px">
                  <div>USERNAME</div>
                  <div
                    style="
                      border: 2px solid #adb2a6;
                      background-color: #f1f0f1;
                      border-radius: 14px;
                    "
                  >
                    <q-input disable label="username" borderless />
                  </div>
                </q-card-section>
                <q-space></q-space>
                <q-card-section style="width: 400px">
                  <div>DESIGNATION</div>
                  <div
                    style="
                      border: 2px solid #adb2a6;
                      background-color: #f1f0f1;
                      border-radius: 14px;
                    "
                  >
                    <q-input disable label="designation" borderless />
                  </div>
                </q-card-section>
              </q-form>
            </div>
            <div class="flex flex-center">
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                "
              >
                <q-card-section>
                  <q-btn
                    label="Change Password"
                    flat
                    :loading="loading"
                    @click="changePass"
                    style="background-color: #13260f; color: #ffffff"
                  />
                </q-card-section>
                <q-card-section>
                  <q-btn label="Sign Out" :loading="loading" @click="signOut" style="color: red" flat />
                </q-card-section>
              </div>
            </div>
          </div>
        </q-card-section>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { Notify,  } from 'quasar'
 import { ref } from 'vue'

const loading = ref(false)

async function changePass() {
  Notify.create({
    type: 'positive',
    message: 'password Change Succesfully',
  })
}

async function signOut() {
  Notify.create({
    type: 'positive',
    message: 'Sign out Succesfully',
  })
}
</script>

<style lang="sass" scoped>
.main-container
  background-color: #dadada
  min-height: 100%
</style>
