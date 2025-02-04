<template>
  <q-page class="main-container">
    <div class="content-container q-px-md q-px-sm-xl">
      <q-card-section class="q-pt-md">
        <div class="text-h6 text-weight-medium" style="color: #282726">
          Admin/<span style="color: #b1b2b4">Admin Profile</span>
        </div>
      </q-card-section>
      <q-card-section style="width: 100%" class="flex flex-center">
        <div
          class="q-pa-md q-pa-sm-xl"
          style="
            display: flex;
            flex-direction: column;
            width: 95%;
            max-width: 1200px;
            background-color: #fbfedf;
            border-radius: 14px;
          "
        >
          <div
          class="q-mb-xl"
            style="
              display: flex;
              align-items: center;
              flex-direction: column;
            "
          >
            <div
              class="profile-image-container"
              style="
                width: 200px;
                height: 200px;
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
                style="border-radius: 50%; width: 180px; height: 180px; object-fit: cover"
                src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1738071000/assets/queing/jqhuylsgaqof1hgmczhj.png"
              ></q-img>
            </div>
            <div style="color: #193018" class="text-h5 text-weight-bold text-center q-mt-md">
              Sample Admin
            </div>
          </div>
          <div style="width: 100%">
            <q-form class="row q-col-gutter-md justify-center">
              <q-card-section class="col-12 col-sm-5" style="min-width: 280px">
                <div>USERNAME</div>
                <div
                  style="border: 2px solid #adb2a6; background-color: #f1f0f1; border-radius: 14px"
                >
                  <q-input disable label="username" borderless />
                </div>
              </q-card-section>
              <q-card-section class="col-12 col-sm-5" style="min-width: 280px">
                <div>DESIGNATION</div>
                <div
                  style="border: 2px solid #adb2a6; background-color: #f1f0f1; border-radius: 14px"
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
            </div>
          </div>
        </div>
      </q-card-section>
    </div>
  </q-page>
</template>

<script setup>
import { Notify } from 'quasar'
import { ref } from 'vue'

const loading = ref(false)

async function changePass() {
  Notify.create({
    type: 'positive',
    message: 'password Change Succesfully',
  })
}
</script>

<style lang="sass" scoped>
.main-container
  background-color: #dadada
  min-height: 100vh

@media (max-width: 599px)
  .profile-image-container
    width: 150px !important
    height: 150px !important

    .q-img
      width: 130px !important
      height: 130px !important
</style>
