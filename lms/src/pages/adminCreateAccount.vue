<template>
  <q-page style="height: 90vh">
    <div class="main-container">
      <div class="content-container q-px-md q-px-sm-xl">
        <q-card-section class="q-pt-md">
          <div class="text-h6 text-weight-medium" style="color: #282726">
            Admin/<span style="color: #b1b2b4">Create Account</span>
          </div>
        </q-card-section>
        <q-card-section style="width: 100%" class="flex flex-center">
          <div
            class="q-px-md"
            style="
              display: flex;
              flex-direction: column;
              width: 100%;
              max-width: 1200px;
              background-color: #fbfedf;
              border-radius: 14px;
            "
          >
            <q-form @submit.prevent="createAccount">
              <q-card-section>
                <div class="text-center text-h5 text-weight-medium">CREATE NEW ACCOUNT</div>
              </q-card-section>
              <q-card-section>
                <div class="row justify-center q-col-gutter-md">
                  <div class="col-12 col-sm-4">
                    <q-card-section>
                      First Name
                      <div
                        style="
                          border: 1px solid red;
                          width: 100%;
                          border: 2px solid #9fa092;
                          background-color: #fefeff;
                          border-radius: 14px;
                        "
                      >
                        <q-input type="text" v-model="firstName" borderless />
                      </div>
                    </q-card-section>
                  </div>
                  <div class="col-12 col-sm-4">
                    <q-card-section>
                      Middle Name
                      <div
                        style="
                          border: 1px solid red;
                          width: 100%;
                          border: 2px solid #9fa092;
                          background-color: #fefeff;
                          border-radius: 14px;
                        "
                      >
                        <q-input type="text" v-model="middleName" borderless />
                      </div>
                    </q-card-section>
                  </div>
                  <div class="col-12 col-sm-4">
                    <q-card-section>
                      Last Name
                      <div
                        style="
                          border: 1px solid red;
                          width: 100%;
                          border: 2px solid #9fa092;
                          background-color: #fefeff;
                          border-radius: 14px;
                        "
                      >
                        <q-input type="text" v-model="lastName" borderless />
                      </div>
                    </q-card-section>
                  </div>
                </div>
                <div class="row justify-center q-col-gutter-md">
                  <div class="col-12 col-sm-6">
                    <q-card-section>
                      Username
                      <div
                        style="
                          border: 1px solid red;
                          width: 100%;
                          border: 2px solid #9fa092;
                          background-color: #fefeff;
                          border-radius: 14px;
                        "
                      >
                        <q-input type="text" v-model="userName" borderless />
                      </div>
                    </q-card-section>
                  </div>
                  <div class="col-12 col-sm-6">
                    <q-card-section>
                      Email
                      <div
                        style="
                          border: 1px solid red;
                          width: 100%;
                          border: 2px solid #9fa092;
                          background-color: #fefeff;
                          border-radius: 14px;
                        "
                      >
                        <q-input type="email" v-model="email" borderless />
                      </div>
                    </q-card-section>
                  </div>
                </div>
                <div class="row justify-center q-col-gutter-md">
                  <div class="col-12 col-sm-6">
                    <q-card-section>
                      Password
                      <div
                        style="
                          border: 1px solid red;
                          width: 100%;
                          border: 2px solid #9fa092;
                          background-color: #fefeff;
                          border-radius: 14px;
                        "
                      >
                        <q-input type="password" v-model="password" borderless />
                      </div>
                    </q-card-section>
                  </div>
                  <div class="col-12 col-sm-6">
                    <q-card-section>
                      Confirm Password
                      <div
                        style="
                          border: 1px solid red;
                          width: 100%;
                          border: 2px solid #9fa092;
                          background-color: #fefeff;
                          border-radius: 14px;
                        "
                      >
                        <q-input type="password" v-model="confirmPassword" borderless />
                      </div>
                    </q-card-section>
                  </div>
                </div>
                <div class="row justify-center q-col-gutter-md">
                  <div class="col-12 col-sm-6">
                    <q-card-section>
                      Role
                      <div
                        style="
                          border: 1px solid red;
                          width: 100%;
                          border: 2px solid #9fa092;
                          background-color: #fefeff;
                          border-radius: 14px;
                        "
                      >
                        <q-select v-model="role" :options="roleOptions" borderless />
                      </div>
                    </q-card-section>
                  </div>

                </div>
                <!-- btn -->
                <q-card-section class="flex flex-center">
                  <div>
                    <q-btn
                      label="Done"
                      type="submit"
                      flat
                      :loading="loading"
                      style="background-color: #132b10; color: #ffffff"
                    />
                    <q-btn
                      class="q-ml-sm"
                      @click="cancelCreate"
                      label="cancel"
                      flat
                      style="color: red"
                    />
                  </div>
                </q-card-section>
              </q-card-section>
            </q-form>
          </div>
        </q-card-section>
      </div>
    </div>
  </q-page>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { ref } from 'vue'
import { Notify } from 'quasar'
import axios from 'axios'
const loading = ref(false)

// Form data

const firstName = ref('')
const middleName = ref('')
const lastName = ref('')
const userName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const role = ref(null)
// Select options
const roleOptions = ['registrar', 'osas', 'cashier', 'admin ']

const statusOptions = ['Active', 'Inactive']

async function cancelCreate() {
  ;(firstName.value = ''),
    (middleName.value = ''),
    (lastName.value = ''),
    (userName.value = ''),
    (email.value = ''),
    (password.value = ''),
    (confirmPassword.value = '')
  role.value = null

}

async function createAccount() {
  loading.value = true
  const token = localStorage.getItem('authToken')
  try {
    if (
      !firstName.value ||
      !middleName.value ||
      !lastName.value ||
      !userName.value ||
      !email.value ||
      !password.value ||
      !confirmPassword.value ||
      !role.value
    ) {
      Notify.create({
        type: 'warning',
        message: 'Fill all the required fields',
      })
      return
    }
    if (password.value !== confirmPassword.value) {
      Notify.create({
        type: 'negative',
        message: 'Passwords do not match',
      })
      return
    }
    const response = await axios.post(
      `${process.env.api_host}/users/create`,
      {
        firstName: firstName.value,
        middleName: middleName.value,
        lastName: lastName.value,
        username: userName.value,
        email: email.value,
        password: password.value,
        role: role.value,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      },
    )
    Notify.create({
      type: 'positive',
      message: 'Account Created Successfully',
    })
    firstName.value = ''
    middleName.value = ''
    lastName.value = ''
    userName.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    role.value = null
  } catch (err) {
    console.error(err)
    Notify.create({
      type: 'negative',
      message: 'Error creating account',
    })
  } finally {
    loading.value = false
  }
}
</script>
