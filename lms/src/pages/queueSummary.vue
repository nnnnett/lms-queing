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
                      class="text-h6 text-uppercase text-center text-weight-bold"
                      style="color: green"
                    >
                      {{ queueDetails.queueNumber }}
                    </div>
                    <div>Status: {{ queueDetails.status }}</div>
                    <div>Destination: {{ queueDetails.destination }}</div>
                  </q-card-section>
                </q-card>
              </q-card-section>
              <!-- Student and Course Information Container -->
              <q-card-section
                class="info-container q-mx-sm q-mx-md-xl q-pa-none"
                style="border: 3px solid #323e2f"
              >
                <div class="info-sections">
                  <!-- Student Information Section -->
                  <div class="info-section">
                    <div class="section-header text-weight-bold q-pa-md">Student Information</div>

                    <div class="scroll-container">
                      <div class="info-grid">
                        <div class="info-cell">Username: {{ queueDetails.student.username }}</div>
                        <div class="info-cell">Email: {{ queueDetails.student.email }}</div>
                        <div class="info-cell">
                          First Name: {{ queueDetails.student.firstName }}
                        </div>
                        <div class="info-cell">
                          Middle Name: {{ queueDetails.student.middleName }}
                        </div>
                        <div class="info-cell">Last Name: {{ queueDetails.student.lastName }}</div>
                        <div class="info-cell">
                          Course: {{ queueDetails.student.course }}
                        </div>
                        <div class="info-cell">Year: {{ queueDetails.student.year }}</div>
                        <div class="info-cell">
                          Section: {{ queueDetails.student.section }}
                        </div>
                        <div class="info-cell">
                          Regular: {{ queueDetails.student.isRegular }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Course Information Section -->
                  <div class="info-section">
                    <div class="section-header text-weight-bold q-pa-md">Course Information</div>

                    <div class="scroll-container">
                      <div
                        class="course-grid"
                        v-for="course in queueDetails.courseToTake"
                        :key="course._id"
                      >
                        <div class="course-cell">Course Code: {{ course.code }}</div>
                        <div class="course-cell">Course Name: {{ course.name }}</div>
                        <div class="course-cell">Course: {{ course.course }}</div>
                        <div class="course-cell">Course unit: {{ course.unit }}</div>
                        <div class="course-cell">Course Description: {{ course.description }}</div>
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
  display: flex
  height: 100%

.info-grid
  display: flex
  flex-direction: column
  grid-template-columns: repeat(9, minmax(150px, 1fr))
  gap: 10px
  padding: 20px
  background-color: #fefeff
  height: 100%

.info-cell
  padding: 8px
  word-break: break-word
  display: flex
  min-height: 50px
  font-size: 1rem
  font-weight: 500
.course-grid
  display: flex
  flex-direction: column
  grid-template-columns: repeat(5, minmax(150px, 1fr))
  gap: 10px
  padding: 20px
  background-color: #fefeff
  width: 100%
  height: 100%
  border-left: 3px solid #333e2e
  @media (max-width: 768px)
    border-left: none

.course-cell
  padding: 8px
  word-break: break-word
  display: flex
  min-height: 50px
  font-size: 1rem
  font-weight: 500
@media (max-width: 600px)
  .q-card-section
    padding: 8px
  .info-cell, .course-cell
    font-size: 0.9rem

.info-container
  background-color: #fefeff

.info-sections
  display: flex
  @media (max-width: 768px)
    flex-direction: column

.info-section
  width: 50%
  @media (max-width: 768px)
    width: 100%


.section-header
  font-size: 1.5em
  background-color: #30572d
  text-transform: uppercase
  color: #ffffff

.scroll-container
  overflow-x: auto
  width: 100%
  padding: 16px 0
  display: flex
  height: calc(100% - 60px)
</style>
