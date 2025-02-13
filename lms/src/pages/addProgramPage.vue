<template>
  <q-page padding>
    <div>
      <q-card style="width: 800px; max-width: 95vw">
        <q-form @submit.prevent="addCourse">
          <div class="q-pa-md">
            <q-card-section class="text-h6 text-weight-medium" style="color: #282726">
              Add Course
            </q-card-section>
            <q-card-section>
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <div class="text-subtitle2 q-mb-sm">Course Name</div>
                  <div class="input-field">
                    <q-input v-model="courseTitle" type="text" borderless />
                  </div>
                </div>
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-4">
                  <div class="text-subtitle2 q-mb-sm">Program</div>
                  <div class="input-field">
                    <q-select
                      v-model="courseProgram"
                      type="text"
                      borderless
                      :options="optionPrograms.option"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-4">
                  <div class="text-subtitle2 q-mb-sm">Course Code</div>
                  <div class="input-field">
                    <q-input v-model="courseCode" type="text" borderless />
                  </div>
                </div>
                <div class="col-12 col-sm-4">
                  <div class="text-subtitle2 q-mb-sm">Total Units</div>
                  <div class="input-field">
                    <q-input v-model="totalUnits" type="number" borderless />
                  </div>
                </div>
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <div class="text-subtitle2 q-mb-sm">Course Description</div>
                  <div class="input-field">
                    <q-input v-model="courseDescription" type="textarea" borderless />
                  </div>
                </div>
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <div class="text-subtitle2 q-mb-sm">Select Prerequisites</div>
                  <q-table :rows="prerequisiteRows" :columns="prerequisiteColumns" row-key="action">
                    <template v-slot:body-cell-select="props">
                      <q-td :props="props">
                        <q-checkbox v-model="selectedPrerequisites" :val="props.row.action" />
                      </q-td>
                    </template>
                  </q-table>
                </div>
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Close" @click="cancelAdd" color="red-8" class="q-px-md" />
              <q-btn
                :loading="loading"
                type="submit"
                flat
                label="Add"
                class="q-px-md"
                style="background-color: #306b30; color: #ffffff; width: 100px"
              />
            </q-card-actions>
          </div>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'
import { useRouter } from 'vue-router'

const courseCode = ref('')
const courseDescription = ref('')
const courseProgram = ref('')

const router = useRouter()
const optionPrograms = ref({})

const courseTitle = ref('')
const coursePrerequisite = ref([])
const totalUnits = ref(0)

const loading = ref(false)
const selectedPrerequisites = ref([])

const prerequisiteRows = ref([])
const prerequisiteColumns = [
  {
    name: 'select',
    label: 'Select',
    align: 'left',
    field: 'select',
  },
  {
    name: 'courseName',
    label: 'Course Name',
    field: 'courseName', // Corrected field name
    align: 'left',
    sortable: true,
  },
  {
    name: 'courseCode',
    label: 'Course Code',
    field: 'courseCode', // Corrected field name
    align: 'left',
    sortable: true,
  },
]

async function getPrograms() {
  try {
    const token = localStorage.getItem('authToken')
    const response = await axios.get(
      `${process.env.api_host}/courses/getProgram?isArchived=false`,
      {
        headers: {
          Authorization: token,
        },
      },
    )
    optionPrograms.value = {
      option: response.data.map((program) => program.name),
    }
    console.log(response.data)
  } catch (err) {
    console.error(err)
  }
}

async function fetchPrerequisites() {
  try {
    const token = localStorage.getItem('authToken')
    const response = await axios.get(`${process.env.api_host}/courses?isArchived=false`, {
      headers: {
        Authorization: token,
      },
    })
    // Map response to proper structure
    prerequisiteRows.value = response.data.map((course, index) => ({
      id: course._id, // Unique identifier for selection
      index: index + 1,
      courseCode: course.code,
      courseName: course.name,
      action: course._id, // Keep track of ID for selection
    }))
  } catch (err) {
    console.error('Error fetching programs:', err)
  }
}
async function addCourse() {
  loading.value = true
  try {
    const token = localStorage.getItem('authToken')
    await axios.post(
      `${process.env.api_host}/courses/createCourse`,
      {
        code: courseCode.value,
        course: courseProgram.value,
        name: courseTitle.value,
        description: courseDescription.value,
        prerequisite: selectedPrerequisites.value, // Send only selected IDs
        unit: totalUnits.value,
      },
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
    )

    Notify.create({
      type: 'positive',
      message: 'Course added successfully!',
    })
    router.push('/new/addCourses')
    // Reset form fields
    courseTitle.value = ''
    courseCode.value = ''
    courseProgram.value = ''
    courseDescription.value = ''
    selectedPrerequisites.value = []
    totalUnits.value = ''
  } catch (err) {
    console.error(err)
    Notify.create({
      type: 'negative',
      message: 'Something Went Wrong!',
    })
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  fetchPrerequisites()
  getPrograms()
})
</script>
