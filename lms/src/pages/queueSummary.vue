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
        <q-card-section class="flex flex-center">
          <div style="width: 80%">
            <q-card-section class="text-center" style="margin-top: 40px; color: #333332">
              <div class="text-h4 text-weight-bold text-uppercase">queue summary</div>
            </q-card-section>
            <q-card-section class="container-queuing" v-if="queueDetails">
              <!-- queue number -->
              <q-card-section class="flex flex-center">
                <q-card style=" width: 400px">
                  <q-card-section class="text-center">
                    <div class="text-h5 text-weight-bold">QUEUE NUMBER</div>
                    <div
                      class="text-h5 text-uppercase text-center text-weight-bold"
                      style="color: green"
                    >
                      {{ queueDetails.queueNumber }}
                    </div>
                    <div>Status: {{ queueDetails.status }}</div>
                    <div>Destination: {{ queueDetails.destination }}</div>
                  </q-card-section>
                </q-card>
              </q-card-section>
              <!-- Student Information -->
              <q-card-section
                style="border: 3px solid #323e2f; height: auto"
                class="q-mx-xl q-pa-none"
              >
                <div style="height: 100%">
                  <div
                    class="text-weight-bold q-pa-md"
                    style="
                      font-size: 1.5em;
                      background-color: #30572d;
                      text-transform: uppercase;
                      color: #ffffff;
                    "
                  >
                    Student Information
                  </div>

                  <div>
                    <div
                      class="text-weight-bold"
                      style="
                        background-color: #fefeff;
                        display: flex;
                        justify-content: space-around;
                        text-align: center;
                        padding-top: 30px;
                      "
                    >
                      <div style="width: 200px">Username</div>
                      <div style="width: 200px">Email</div>
                      <div style="width: 200px">First Name</div>
                      <div style="width: 200px">Middle Name</div>
                      <div style="width: 200px">Last Name</div>
                      <div style="width: 200px">Course</div>
                      <div style="width: 200px">Year</div>
                      <div style="width: 200px">Section</div>
                      <div style="width: 200px">Regular</div>
                    </div>
                    <div
                      class="q-pb-lg"
                      style="
                        background-color: #fefeff;
                        display: flex;
                        justify-content: space-around;
                        text-align: center;
                        height: 150;
                        padding-top: 30px;
                      "
                    >
                      <div style="width: 200px">{{ queueDetails.student.username }}</div>
                      <div style="width: 200px">{{ queueDetails.student.email }}</div>
                      <div style="width: 200px">{{ queueDetails.student.firstName }}</div>
                      <div style="width: 200px">{{ queueDetails.student.middleName }}</div>
                      <div style="width: 200px">{{ queueDetails.student.lastName }}</div>
                      <div style="width: 200px">{{ queueDetails.student.course }}</div>
                      <div style="width: 200px">{{ queueDetails.student.year }}</div>
                      <div style="width: 200px">{{ queueDetails.student.section }}</div>
                      <div style="width: 200px">{{ queueDetails.student.regular }}</div>
                    </div>
                  </div>
                </div>
              </q-card-section>
              <!-- course to take and status -->
              <q-card-section
                style="border: 3px solid #323e2f; height: auto; margin-top: 20px"
                class="q-mx-xl q-pa-none"
              >
                <div style="height: 100%">
                  <div
                    class="text-weight-bold q-pa-md"
                    style="
                      font-size: 1.5em;
                      background-color: #30572d;
                      text-transform: uppercase;
                      color: #ffffff;
                    "
                  >
                    COURSE Information
                  </div>

                  <div>
                    <div style="width: 100%">
                      <div
                        class="text-weight-bold"
                        style="background-color: #fefeff; display: flex; padding-top: 30px"
                      >
                        <div style="width: 200px">Course To take</div>
                      </div>
                      <div
                      v-for="course in queueDetails.courseToTake"
                      :key="course._id"
                        class="q-pb-lg"
                        style="
                          background-color: #fefeff;
                          display: flex;
                          max-height: 150px;
                          height: auto;
                          padding-top: 30px;
                        "
                      >
                        {{ course.name}}
                      </div>
                    </div>
                  </div>
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
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const route = useRoute()
const queueId = route.params.queueId
const queueDetails = ref(null)

async function queueSummary() {
  try {
    const response = await axios.get(`${process.env.api_host}/queues?query=${queueId}`)
    queueDetails.value = response.data[0]
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  queueSummary()
})
</script>

<style lang="sass" scoped>
.container-queuing
  background-color: #fcfedf
  width: 100%
  height: auto
</style>
