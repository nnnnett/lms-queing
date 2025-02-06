<template>
  <q-page style="height: 90vh">
    <div class="main-container q-pt-md">
      <div class="content-container q-px-md q-px-sm-xl">
        <q-card-section class="row justify-around q-col-gutter-md" style="color: #3d3c3b">
          <q-card
            class="info-box q-py-md ellipsis"
            style="
              background-color: #fefffe;
              border: 2px solid #cbcdc7;
              text-align: center;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
            "
          >
            <div class="text-h5 text-weight-medium">DEPARTMENT</div>
            <div v-if="queueInfo" class="text-h5 text-weight-bold text-uppercase">
              {{ queueInfo.role }}
            </div>
            <div style="height: 50px"></div>
          </q-card>
          <q-card
            class="info-box q-py-md ellipsis"
            style="
              background-color: #fefffe;
              border: 2px solid #cbcdc7;
              text-align: center;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
            "
          >
            <div class="text-h5 text-weight-medium">WINDOW</div>
            <div v-if="queueInfo" class="text-h5 text-weight-bold">{{ queueInfo.window }}</div>
            <div align="right" class="q-mr-md">
              <q-btn label="set" style="background-color: #fffeb8" />
            </div>
          </q-card>
          <q-card
            class="info-box q-py-md ellipsis"
            style="
              background-color: #fefffe;
              border: 2px solid #cbcdc7;
              text-align: center;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
            "
          >
            <div class="text-h5 text-weight-medium">CURRENT QUEUE</div>
            <div v-if="currentQueue" class="text-h5 text-weight-bold">
              {{ currentQueue.queueNumber }}
            </div>
            <div align="right" class="q-mr-md">
              <q-btn label="LIST" style="background-color: #fffeb8" @click="queueListPage" />
            </div>
          </q-card>
        </q-card-section>
        <!-- buttons -->
        <q-card-section class="row justify-around q-col-gutter-md">
          <div class="action-button-container ellipsis">
            <q-btn
              @click="queueDetailsDialog = true"
              class="action-button"
              style="background-color: #b7faff"
            >
              <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
                <q-icon name="wysiwyg" size="80px" />
                <div class="text-h4 text-weight-medium">VIEW</div>
              </div>
            </q-btn>
          </div>
          <div class="action-button-container ellipsis">
            <q-btn
              @click="transferredQueue(currentQueue._id)"
              class="action-button"
              style="background-color: #fcffc2"
            >
              <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
                <q-icon name="sync_alt" size="80px" />
                <div class="text-h4 text-weight-medium">TRANSFER</div>
              </div>
            </q-btn>
          </div>
          <div class="action-button-container ellipsis">
            <q-btn
              @click="doneQueue(currentQueue._id)"
              class="action-button"
              style="background-color: #aafeab"
            >
              <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
                <q-icon name="check" size="80px" />
                <div class="text-h4 text-weight-medium">DONE</div>
              </div>
            </q-btn>
          </div>
          <div class="action-button-container ellipsis">
            <q-btn
              @click="cancelQueue(currentQueue._id)"
              class="action-button"
              style="background-color: #fe7e7f"
            >
              <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
                <q-icon name="close" size="80px" />
                <div class="text-h4 text-weight-medium">CANCEL</div>
              </div>
            </q-btn>
          </div>
          <div class="action-button-container ellipsis">
            <q-btn @click="refreshQueue" class="action-button" style="background-color: #b7d0ff">
              <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
                <q-icon name="refresh" size="80px" />
                <div class="text-h4 text-weight-medium">REFRESH</div>
              </div>
            </q-btn>
          </div>
          <div class="action-button-container ellipsis">
            <q-btn @click="resetQueue" class="action-button" style="background-color: #b7d0ff">
              <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
                <q-icon name="restart_alt" size="80px" />
                <div class="text-h4 text-weight-medium">RESET</div>
              </div>
            </q-btn>
          </div>
        </q-card-section>

        <q-card-section
          class="row justify-around q-py-md q-mt-md"
          style="background-color: #fafedd; border: 2px solid #cbcdc7; height: auto"
        >
          <div class="list-container" style="border: 2px solid #cbcdc7">
            <div
              class="text-h6"
              style="
                background-color: #132b12;
                color: #ffffff;
                width: 100%;
                text-align: center;
                justify-content: center;
                height: 70px;
                display: flex;
                align-items: center;
              "
            >
              # WAITING IN QUEUE
            </div>
            <div
              style="
                background-color: #fefffe;
                height: 350px;
                width: 100%;
                text-align: center;
                align-content: center;
              "
              class="text-h3 q-py-md text-weight-bold"
            >
              <div>{{ waitingQueue }}</div>
            </div>
          </div>
          <div class="list-container" style="border: 2px solid #cbcdc7">
            <div
              class="text-h6"
              style="
                background-color: #132b12;
                color: #ffffff;
                width: 100%;
                text-align: center;
                justify-content: center;
                height: 70px;
                display: flex;
                align-items: center;
              "
            >
              # TRANSFERRED QUEUE
            </div>
            <div
              style="
                background-color: #fefffe;
                height: 350px;
                width: 100%;
                text-align: center;
                align-content: center;
              "
              class="text-h3 q-py-md text-weight-bold"
            >
              <div v-if="queueInfo">{{ queueInfo.transferredQueue }}</div>
            </div>
          </div>
          <div class="list-container" style="border: 2px solid #cbcdc7">
            <div
              class="text-h6"
              style="
                background-color: #132b12;
                color: #ffffff;
                width: 100%;
                text-align: center;
                justify-content: center;
                height: 70px;
                display: flex;
                align-items: center;
              "
            >
              # SUCCESSFUL QUEUE
            </div>
            <div
              style="
                background-color: #fefffe;
                height: 350px;
                width: 100%;
                text-align: center;
                align-content: center;
              "
              class="text-h3 q-py-md text-weight-bold"
            >
              <div v-if="queueInfo">{{ queueInfo.successfulQueue }}</div>
            </div>
          </div>
          <div class="list-container" style="border: 2px solid #cbcdc7">
            <div
              class="text-h6"
              style="
                background-color: #132b12;
                color: #ffffff;
                width: 100%;
                text-align: center;
                justify-content: center;
                height: 70px;
                display: flex;
                align-items: center;
              "
            >
              # MISSED QUEUE
            </div>
            <div
              style="
                background-color: #fefffe;
                height: 350px;
                width: 100%;
                text-align: center;
                align-content: center;
              "
              class="text-h3 q-py-md text-weight-bold"
            >
              <div v-if="queueInfo">{{ queueInfo.missedQueue }}</div>
            </div>
          </div>
        </q-card-section>

        <q-dialog v-model="queueDetailsDialog">
          <q-card class="dialog-card">
            <q-card-section v-if="queueInfo">
              <div class="dialog-header">Queue Details</div>
              <div class="dialog-content">
                <q-card-section class="student-details">
                  <div class="section-title">Student Details:</div>
                  <div class="text-subtitle1">Username: {{ queueInfo.username }}</div>
                  <div class="text-subtitle1">Student Number: {{ queueInfo.studentNumber }}</div>
                  <div class="text-subtitle1">First Name: {{ queueInfo.firstName }}</div>
                  <div class="text-subtitle1">Middle Name: {{ queueInfo.middleName }}</div>
                  <div class="text-subtitle1">Last Name: {{ queueInfo.lastName }}</div>
                  <div class="text-subtitle1">Email: {{ queueInfo.email }}</div>
                  <div class="text-subtitle1">Regular: {{ queueInfo.isRegular }}</div>
                  <div class="text-subtitle1">Year: {{ queueInfo.year }}</div>
                  <div class="text-subtitle1">Section: {{ queueInfo.section }}</div>
                </q-card-section>

                <!-- v-for="course in queueInfo.courses"
                :key="course.code" -->
                <q-card-section class="courses-section">
                  <div class="section-title">Courses to Take:</div>
                  <div
                    class="course-item"

                  >
                    <div>Information Technology (co12) - 12 Units</div>
                  </div>
                </q-card-section>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const ws = ref(null)
const queues = ref([])
const queueInfo = ref(null)
const waitingQueue = ref(null)
const currentQueue = ref(null)
const router = useRouter()

const queueDetailsDialog = ref(true)

async function queueListPage() {
  router.push('/new/queueList')
}

async function userInfo() {
  const token = localStorage.getItem('authToken')
  try {
    const response = await axios.get(`${process.env.api_host}/users/myProfile`, {
      headers: {
        Authorization: token,
      },
    })
    queueInfo.value = response.data
    console.log(queueInfo.value)
    getCurrentQueue(response.data.role)
  } catch (err) {
    console.error(err)
  }
}

async function getCurrentQueue(role) {
  const token = localStorage.getItem('authToken')
  try {
    const response = await axios.get(`${process.env.api_host}/queues/current/${role}`, {
      headers: {
        Authorization: token,
      },
    })
    currentQueue.value = response.data.currentQueue[0]
    console.log(queueInfo.value.courses)
    waitingQueue.value = response.data.currentQueue.length
  } catch (err) {
    console.error(err)
  }
}

async function transferredQueue(queueId) {
  const token = localStorage.getItem('authToken')
  try {
    const response = await axios.put(`${process.env.api_host}/queues/next/${queueId}`, null, {
      headers: {
        Authorization: token,
      },
    })
    getCurrentQueue(queueInfo.value.role)
    userInfo()
  } catch (err) {
    console.error(err)
  }
}

async function doneQueue(queueId) {
  const token = localStorage.getItem('authToken')
  try {
    const response = await axios.post(`${process.env.api_host}/queues/done/${queueId}`, null, {
      headers: {
        Authorization: token,
      },
    })
    getCurrentQueue(queueInfo.value.role)
    userInfo()
  } catch (err) {
    console.error(err)
  }
}

async function resetQueue() {
  const token = localStorage.getItem('authToken')
  try {
    const response = await axios.get(`${process.env.api_host}/users/resetQueue`, {
      headers: {
        Authorization: token,
      },
    })
    getCurrentQueue(queueInfo.value.role)
    userInfo()
  } catch (err) {
    console.error(err)
  }
}

async function refreshQueue() {
  getCurrentQueue(queueInfo.value.role)
  userInfo()
}

async function cancelQueue(queueId) {
  const token = localStorage.getItem('authToken')
  try {
    const response = await axios.post(`${process.env.api_host}/queues/cancel/${queueId}`, null, {
      headers: {
        Authorization: token,
      },
    })
    getCurrentQueue(queueInfo.value.role)
    userInfo()
  } catch (err) {
    console.error(err)
  }
}
onMounted(() => {
  userInfo()
})
</script>

<style lang="sass" scoped>
.main-container
  background-color: #dadada
  min-height: 100%

.info-box
  width: 400px
  height: 150px
  border-radius: 14px
.action-button
  height: 150px
  width: 200px

.list-container
  width: 300px


.dialog-card
  width: 70vw
  max-width: 800px

.dialog-header
  background-color: #2e592d
  color: white
  text-align: center
  font-size: 1.5em
  padding: 16px

.dialog-content
  display: flex
  gap: 16px

.student-details, .courses-section
  flex: 1
  padding: 16px
  border-right: 1px solid black

.section-title
  font-size: 1.2em
  font-weight: bold
  margin-bottom: 8px

.details, .course-item
  margin-bottom: 8px
@media (max-width: 1440px)
  .info-box
    width: 300px
    height: 130px
  .action-button
    width: 180px
    height: 130px
  .list-container
    width: 250px

@media (max-width: 1024px)
  .info-box
    width: 250px
    height: 120px
  .action-button
    width: 150px
    height: 120px
  .list-container
    width: 200px

@media (max-width: 768px)
  .info-box
    width: 200px
    height: 100px
  .action-button
    width: 130px
    height: 100px
    .q-icon
      font-size: 50px !important
    .text-h4
      font-size: 1.2rem
  .list-container
    width: 180px

@media (max-width: 599px)
  .info-box
    width: 100%
    height: 100px
    margin-bottom: 8px
  .action-button
    width: 100%
    height: 100px
    margin-bottom: 8px
  .list-container
    width: 100%
    margin-bottom: 16px
  .q-card-section
    padding: 8px !important
</style>
