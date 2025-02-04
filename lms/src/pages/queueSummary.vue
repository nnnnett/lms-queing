<template>
  <q-page>
    <div>
      <div
        style="
          background: url('https://res.cloudinary.com/dqaw6ndtn/image/upload/v1737617278/assets/queing/q5xrh22iplhm2bndvvru.jpg')
            no-repeat center center;
          background-size: cover;
          width: 100%;
          min-height: 100vh;
          border: 3px solid #606060;
          overflow-y: auto;
        "
      >
        <q-card-section class="flex flex-center">
          <div class="content-width">
            <q-card-section class="text-center" style="margin-top: 40px; color: #333332">
              <div class="page-title text-weight-bold text-uppercase">queue summary</div>
            </q-card-section>
            <q-card-section class="container-queuing q-pa-sm" v-if="queueDetails">
              <!-- queue number -->
              <q-card-section class="flex flex-center">
                <q-card style="width: 90%; max-width: 400px">
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
                style="border: 3px solid #323e2f;"
                class="q-mx-sm q-mx-md-xl q-pa-none"
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

                  <div class="scroll-container">
                    <div class="info-grid text-weight-bold">
                      <div class="info-cell">Username</div>
                      <div class="info-cell">Email</div>
                      <div class="info-cell">First Name</div>
                      <div class="info-cell">Middle Name</div>
                      <div class="info-cell">Last Name</div>
                      <div class="info-cell">Course</div>
                      <div class="info-cell">Year</div>
                      <div class="info-cell">Section</div>
                      <div class="info-cell">Regular</div>
                    </div>
                    <div
                      class="info-grid q-pb-lg"
                    >
                      <div class="info-cell">{{ queueDetails.student.username }}</div>
                      <div class="info-cell">{{ queueDetails.student.email }}</div>
                      <div class="info-cell">{{ queueDetails.student.firstName }}</div>
                      <div class="info-cell">{{ queueDetails.student.middleName }}</div>
                      <div class="info-cell">{{ queueDetails.student.lastName }}</div>
                      <div class="info-cell">{{ queueDetails.student.course }}</div>
                      <div class="info-cell">{{ queueDetails.student.year }}</div>
                      <div class="info-cell">{{ queueDetails.student.section }}</div>
                      <div class="info-cell">{{ queueDetails.student.regular }}</div>
                    </div>
                  </div>
                </div>
                <!-- course to take and status -->
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

                  <div class="scroll-container">
                    <div class="course-grid text-weight-bold">
                      <div class="course-cell">Course Code</div>
                      <div class="course-cell">Course Name</div>
                      <div class="course-cell">Course</div>
                      <div class="course-cell">Course unit</div>
                      <div class="course-cell">Course Description</div>
                    </div>
                    <div
                      v-for="course in queueDetails.courseToTake"
                      :key="course._id"
                      class="course-grid q-pb-md"
                    >
                      <div class="course-cell">{{ course.code }}</div>
                      <div class="course-cell">{{ course.name }}</div>
                      <div class="course-cell">{{ course.course }}</div>
                      <div class="course-cell">{{ course.unit }}</div>
                      <div class="course-cell">{{ course.description }}</div>
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
    console.log(queueDetails.value, 'wew')
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

.content-width
  width: 95%
  max-width: 1200px

.page-title
  font-size: 2rem
  @media (max-width: 600px)
    font-size: 1.5rem

.scroll-container
  overflow-x: auto
  width: 100%
  background-color: #fefeff
  padding: 16px 0

.info-grid
  display: grid
  grid-template-columns: repeat(9, minmax(150px, 1fr))
  gap: 10px
  padding: 20px
  text-align: center
  min-width: 900px
  background-color: #fefeff
  width: 100%

.info-cell
  padding: 8px
  word-break: break-word
  display: flex
  align-items: center
  justify-content: center
  min-height: 50px

.course-grid
  display: grid
  grid-template-columns: repeat(5, minmax(150px, 1fr))
  gap: 10px
  padding: 20px
  text-align: center
  min-width: 750px
  background-color: #fefeff
  width: 100%

.course-cell
  padding: 8px
  word-break: break-word
  display: flex
  align-items: center
  justify-content: center
  min-height: 50px

@media (max-width: 600px)
  .q-card-section
    padding: 8px

  .info-cell, .course-cell
    font-size: 0.9rem
</style>
