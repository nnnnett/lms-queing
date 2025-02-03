<template>
  <q-page>
    <div>
      <div
        style="
          background: url('https://res.cloudinary.com/dqaw6ndtn/image/upload/v1737617278/assets/queing/q5xrh22iplhm2bndvvru.jpg')
            no-repeat center center;
          background-size: cover;
          width: 100%;
          height: 100vh;
          border: 3px solid #606060;
        "
      >
        <!-- Main Content -->

        <q-card-section class="flex flex-center">
          <div style="width: 80%">
            <q-card-section class="text-center" style="margin-top: 90px;color: #333332;">
              <div class="text-h4 text-weight-bold text-uppercase">queuing</div>
            </q-card-section>
            <q-card-section class="container-queuing" v-if="queueData">
              <q-card-section class="flex flex-center column">
                <div style="color: #333332;" class="qrContainer">
                  <q-card-section  class="q-py-none">
                    <div class="text-h5 text-uppercase text-center q-py-md text-weight-medium">
                      queuing number
                    </div>
                  </q-card-section>
                  <q-card-section class="q-py-none">
                    <div class="text-h5 text-uppercase text-center text-weight-bold" style="color: green;">
                      {{queueData.queueNumber}}
                    </div>
                  </q-card-section>
                  <q-card-section  class="q-py-none">
                    <div class="text-h6 text-center q-py-md text-weight-medium">
                      Release of Certificate <br> of Registration
                    </div>
                  </q-card-section>
                  <q-card-section  class="q-py-none flex flex-center">
                    <div style="width: 130px;">
                      <q-img src="https://res.cloudinary.com/dqaw6ndtn/image/upload/v1737647662/assets/queing/uc3jvsszjqi9s9lhfysk.png" />
                    </div>
                  </q-card-section>
                  <q-card-section  class="q-py-none">
                    <div class="text-subtitle1 text-center q-py-md text-weight-medium">
                      Scan the QR Code to monitor the queue flow
                    </div>
                  </q-card-section>
                </div>

                <div
                  class="q-mt-lg"
                  style="
                    width: 120px;
                    background-color: #31562d;
                    color: #ffffff;
                    height: 50px;
                    border-radius: 5px;
                  "
                >
                  <q-btn style="width: 100%; height: 100%" flat label="Done" @click="handleLogout"/>
                </div>
              </q-card-section>
            </q-card-section>
          </div>
        </q-card-section>
      </div>
    </div>
  </q-page>
</template>

<script setup>

import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'
// router
const route = useRoute()
const router = useRouter()
const queueId =  route.params.queueId

const queueData = ref(null)

async function getQueue() {
  try{
    const response = await axios.get(`${process.env.api_host}/queues?query=${queueId}`)
    queueData.value = response.data[0]
  }catch(err){
    console.error(err)
  }
}


const clearLocalStorage = () => {
  localStorage.clear();
};
const handleLogout = async () => {
  try {
    // Clear localStorage when logging out
    clearLocalStorage();
    // Show a notification
    Notify.create({ type: "positive", message: "Queuing number has been released" });
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Redirect to the login page
    router.replace("/");
  } catch (error) {
    // If an error occurs during logout
    Notify.create({ type: "negative", message: "Error during logout" });
    console.error(error);
  } finally {
    // await isLogin();
  }
};



onMounted(() => {
  getQueue()
})

</script>

<style lang="sass" scoped>
.container-queuing
  background-color: #fcfedf
  width: 100%
  height: 600px
.qrContainer
  border: 1px solid black
  background-color: #FFFFFF
  width: 350px
  height: 450px
</style>
