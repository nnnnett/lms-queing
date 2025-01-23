<template>
  <q-page>
    <div class="q-pa-lg">
      <div
        style="
          background: url('https://res.cloudinary.com/dqaw6ndtn/image/upload/v1737617278/assets/queing/q5xrh22iplhm2bndvvru.jpg')
            no-repeat center center;
          background-size: cover;
          width: 100%;
          height: 95vh;
          border: 3px solid #606060;
        "
      >
        <!-- Main Content -->
        <div class="q-ml-xl q-pt-xl" style="float: left; position: absolute; z-index: 100">
          <q-btn icon="arrow_back_ios" size="20px" flat @click="backBtn" />
        </div>
        <q-card-section class="flex flex-center">
          <div style="width: 80%">
            <q-card-section class="text-center" style="margin-top: 90px;color: #333332;">
              <div class="text-h4 text-weight-bold text-uppercase">queuing</div>
            </q-card-section>
            <q-card-section class="container-queuing">
              <q-card-section class="flex flex-center column">
                <div style="color: #333332;" class="qrContainer">
                  <q-card-section  class="q-py-none">
                    <div class="text-h5 text-uppercase text-center q-py-md text-weight-medium">
                      queuing number
                    </div>
                  </q-card-section>
                  <q-card-section class="q-py-none">
                    <div class="text-h2 text-uppercase text-center  text-weight-bold">
                      R0001
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
                  <q-btn style="width: 100%; height: 100%" flat label="Home" />
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
import { useRouter } from 'vue-router'
// import { ref } from 'vue'

// router
const router = useRouter()

async function backBtn() {
  router.replace(`/reviewInfo`)
}
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
