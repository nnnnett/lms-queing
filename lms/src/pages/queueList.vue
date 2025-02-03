<template>
  <q-page style="height: 90vh">
    <div class="main-container q-pt-md">
      <div class="content-container">
        <q-card-section
          style="background-color: #2e592d; color: #ffffff; font-size: 2em"
          class="q-mx-lg"
        >
          <div class="text-weight-medium text-center">Queue List</div>
        </q-card-section>

        <q-card-section class="q-mt-xl">
          <q-table
            :loading="loading"
            :rows="row"
            :columns="columns"
            row-key="id"
            separator="cell"
            flat
            bordered
            :filter="filter"
          >
            <template v-slot:top>
              <div
                class="q-pr-md q-py-sm"
                style="
                  display: flex;
                  width: 100%;
                  background-color: #2e592d;
                  color: #ffffff;
                  align-items: center;
                "
              >
                <q-card-section style="flex: 1"> List of all Queues </q-card-section>
                <div style="border: 1px solid white">
                  <q-input
                    color="white"
                    v-model="filter"
                    dense
                    style="width: 300px; color: white"
                    input-style="color: white;"
                    borderless
                  >
                    <template v-slot:append>
                      <q-icon name="search" color="white" class="q-pr-sm" />
                    </template>
                  </q-input>
                </div>
              </div>
            </template>
            <template #body="props">
              <q-tr :props="props">
                <q-td>{{ props.row.queueNumber }}</q-td>
                <q-td>{{ props.row.student }}</q-td>
                <q-td>{{ props.row.destination }}</q-td>
                <q-td>{{ props.row.status }}</q-td>
                <q-td>
                  <div>
                    <q-btn
                      label="view details"
                      style="background-color: #ffd95b"
                      @click="specificQueueDetails(props.row.id)"
                    />
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>

        <q-dialog v-model="queueDetailsDialog">
          <q-card style="width: 70vw; max-width: 800px">
            <q-card-section v-if="queueSummary">
              <div
                class="text-center text-uppercase text-h4 text-weight-medium q-py-md"
                style="
                  background-color: #2e592d;
                  display: flex;
                  justify-content: center;
                  color: white;
                "
              >
                Queue Details
              </div>
              <div style="display: flex">
                <!-- 1 -->
                <q-card-section style="width: 70%" class="q-pt-none">
                  <q-card-section class="q-pl-none text-h6 text-weight-medium q-pt-none">
                    <div>Student Details:</div>
                  </q-card-section>
                  <div class="text-subtitle1 text-weight-bold q-py-sm">
                    Queue Number: {{ queueSummary.queueNumber }}
                  </div>
                  <div class="text-subtitle1 q-py-sm">
                    Username: {{ queueSummary.student.username }}
                  </div>
                  <div class="text-subtitle1 q-py-sm">Email: {{ queueSummary.student.email }}</div>
                  <div class="text-subtitle1 q-py-sm">
                    First Name: {{ queueSummary.student.firstName }}
                  </div>
                  <div class="text-subtitle1 q-py-sm">
                    Middle Name: {{ queueSummary.student.middleName }}
                  </div>
                  <div class="text-subtitle1 q-py-sm">
                    Last Name: {{ queueSummary.student.lastName }}
                  </div>
                  <div class="text-subtitle1 text-uppercase q-py-sm">
                    Course: {{ queueSummary.student.course }}
                  </div>
                  <div class="text-subtitle1 text-uppercase q-py-sm">
                    Year: {{ queueSummary.student.year }}
                  </div>
                  <div class="text-subtitle1 text-uppercase q-py-sm">
                    Section: {{ queueSummary.student.section }}
                  </div>
                  <div class="text-subtitle1 text-uppercase q-py-sm">
                    Is Regular: {{ queueSummary.student.isRegular }}
                  </div>
                  <div class="text-subtitle1 text-uppercase q-py-sm">
                    Status: {{ queueSummary.status }}
                  </div>
                  <div class="text-subtitle1 text-uppercase q-py-sm">
                    Destination: {{ queueSummary.destination }}
                  </div>
                </q-card-section>
                <!-- 2 -->
                <q-card-section style="width: 100%; border-left: 1px solid black" class="q-pt-none">
                  <q-card-section class="q-pl-none text-h6 text-weight-medium q-pt-none">
                    <div>Courses to Take:</div>
                  </q-card-section>
                  <div v-for="course in queueSummary.courseToTake" :key="course">
                    <div style="display: flex" class="q-mb-sm q-pa-sm">
                      <div>
                        <div>Course Name: {{ course.name }}</div>
                        <div>Course: {{ course.course }}</div>
                      </div>
                      <q-space></q-space>
                      <div>
                        <div>Course Unit: {{ course.unit }}</div>
                        <div>Course Code: {{ course.code }}</div>
                      </div>
                    </div>
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
import { ref, onMounted } from 'vue'
import axios from 'axios'

const queueDetailsDialog = ref(false)
const loading = ref(false)
const filter = ref('')
const row = ref([])
const columns = [
  { name: 'queueNumber', field: 'queueNumber', label: 'Queue Number', align: 'left' },
  { name: 'student', field: 'student', label: 'Student', align: 'left' },
  {
    name: 'destination',
    field: 'destination',
    label: 'Destination',
    align: 'left',
    sortable: true,
  },
  { name: 'status', field: 'status', label: 'Status', align: 'left', sortable: true },
  { name: 'action', field: 'action', label: 'Action', align: 'left' },
]
const queueSummary = ref(null)

async function specificQueueDetails(queueId) {
  queueDetailsDialog.value = true
  try {
    const response = await axios.get(`${process.env.api_host}/queues?query=${queueId}`)
    queueSummary.value = response.data[0]
  } catch (err) {
    console.error(err)
  }
}

async function getQueueList() {
  loading.value = true
  try {
    const response = await axios.get(`${process.env.api_host}/queues`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    row.value = response.data.map((queue) => ({
      id: queue._id,
      queueNumber: queue.queueNumber,
      student: formatStudentName(queue.student),
      destination: queue.destination,
      status: queue.status,
    }))
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
function formatStudentName(student) {
  if (!student) return ''
  const middleName = student.middleName ? ` ${student.middleName} ` : ' '
  return `${student.firstName}${middleName}${student.lastName}`
}

onMounted(() => {
  getQueueList()
})
</script>

<style lang="sass" scoped>
.main-container
  background-color: #dadada
  min-height: 100%
</style>
