<template>
  <q-page style="height: 90vh">
    <div class="main-container">
      <div class="content-container q-px-md q-px-sm-xl">
        <q-card-section class="q-pt-md">
          <div class="text-h6 text-weight-medium" style="color: #282726">
            Admin/<span style="color: #b1b2b4">Courses</span>
          </div>
        </q-card-section>
        <div class="button-container">
          <q-card-section class="button-section">
            <q-btn
              label="Add Program"
              no-caps
              flat
              class="action-button"
              @click="addProgramPopUp = true"
            />
          </q-card-section>
        </div>
        <!-- add Program -->
        <div>
          <q-dialog v-model="addProgramPopUp" persistent>
            <q-card style="width: 800px; max-width: 95vw">
              <q-form @submit.prevent="addProgram">
                <div class="q-pa-md">
                  <q-card-section class="text-h6 text-weight-medium" style="color: #282726">
                    Add Program
                  </q-card-section>
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-12">
                        <div class="text-subtitle2 q-mb-sm">Program Title</div>
                        <div class="input-field">
                          <q-input v-model="programTitle" type="text" borderless />
                        </div>
                      </div>
                    </div>
                    <div class="row q-col-gutter-md">
                      <div class="col-12 col-sm-4">
                        <div class="text-subtitle2 q-mb-sm">Program Code</div>
                        <div class="input-field">
                          <q-input v-model="ProgramCode" type="text" borderless />
                        </div>
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
          </q-dialog>
        </div>
        <!-- table -->
        <div class="q-mt-lg">
          <q-table
            style="border-radius: 14px; background-color: #fdffdf"
            title="Program Information"
            :rows="rows"
            :columns="columns"
            row-key="id"
            separator="cell"
            :filter="filter"
            :rows-per-page-options="[0, 5, 10, 15, 20]"
            class="responsive-table"
          >
            <template #body="props">
              <q-tr :props="props">
                <q-td v-for="col in columns" :key="col.name" :props="props">
                  <template v-if="col.name === '#'">
                    {{ props.rowIndex + 1 }}
                  </template>
                  <template v-else-if="col.name === 'action'">
                    <div class="row q-gutter-x-sm">
                      <q-btn
                        flat
                        dense
                        size="sm"
                        icon="edit"
                        color="primary"
                        @click="openEditDialog(props.row)"
                      >
                        <q-tooltip>Edit</q-tooltip>
                      </q-btn>
                      <q-btn
                        flat
                        dense
                        size="sm"
                        :loading="loading"
                        icon="delete"
                        color="negative"
                        @click="deleteProgram(props.row.action)"
                      >
                        <q-tooltip>Delete</q-tooltip>
                      </q-btn>
                    </div>
                  </template>
                  <template v-else>
                    {{ props.row[col.name] }}
                  </template>
                </q-td>
              </q-tr>
            </template>
            <template v-slot:top-left>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
          </q-table>
        </div>
        <!-- edit program -->
        <div>
          <q-dialog v-model="editProgramPopUp" persistent>
            <q-card style="width: 800px; max-width: 95vw">
              <q-form @submit.prevent="editProgram(editForm.action)">
                <div class="q-pa-md">
                  <q-card-section class="text-h6 text-weight-medium" style="color: #282726">
                    Edit Program
                  </q-card-section>
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-12">
                        <div class="text-subtitle2 q-mb-sm">Program Title</div>
                        <div class="input-field">
                          <q-input v-model="editForm.programTitle" type="text" borderless />
                        </div>
                      </div>
                    </div>
                    <div class="row q-col-gutter-md">
                      <div class="col-12 col-sm-4">
                        <div class="text-subtitle2 q-mb-sm">Program Code</div>
                        <div class="input-field">
                          <q-input v-model="editForm.program" type="text" borderless />
                        </div>
                      </div>
                      <div class="col-12 col-sm-4">
                        <div class="text-subtitle2 q-mb-sm">Total No. of Courses</div>
                        <div class="input-field">
                          <q-input v-model="editForm.numCourse" type="number" borderless />
                        </div>
                      </div>
                      <div class="col-12 col-sm-4">
                        <div class="text-subtitle2 q-mb-sm">Total Units</div>
                        <div class="input-field">
                          <q-input v-model="editForm.numUnits" type="number" borderless />
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn
                      flat
                      label="Cancel"
                      @click="editProgramPopUp = false"
                      color="red-8"
                      class="q-px-md"
                    />
                    <q-btn
                      :loading="loading"
                      type="submit"
                      flat
                      label="Save"
                      class="q-px-md"
                      style="background-color: #306b30; color: #ffffff; width: 100px"
                    />
                  </q-card-actions>
                </div>
              </q-form>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { ref, onMounted } from 'vue'
import { Notify } from 'quasar'
import axios from 'axios'

// loading
const loading = ref(false)

const editProgramPopUp = ref(false)
// program input
const programTitle = ref('')
const ProgramCode = ref('')
const addProgramPopUp = ref(false)
// table
const filter = ref('')
const columns = ref([
  {
    name: '#',
    required: true,
    label: '#',
    align: 'center',
    field: 'index',
    sortable: true,
  },
  {
    name: 'program',
    required: true,
    label: 'Program Code',
    align: 'left',
    field: 'program',
    sortable: true,
  },
  {
    name: 'programTitle',
    align: 'left',
    label: 'Program Title',
    field: 'programTitle',
    sortable: true,
  },
  {
    name: 'numCourse',
    align: 'left',
    label: 'Total Number of Course',
    field: 'numCourse',
    sortable: true,
  },
  {
    name: 'numUnits',
    align: 'left',
    label: 'Total Number of Units',
    field: 'numUnits',
    sortable: true,
  },
  {
    name: 'numEnrolled',
    align: 'left',
    label: 'Total Number of Enrolled',
    field: 'numEnrolled',
    sortable: true,
  },
  {
    name: 'action',
    align: 'center',
    label: 'Action',
    field: 'action',
  },
])
const rows = ref([
])

// Edit form state
const editForm = ref({
  programTitle: '',
  program: '',
  numCourse: '',
  numUnits: '',
  numEnrolled: '',
})

async function addProgram() {
  loading.value = true;
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(
      `${process.env.api_host}/courses/createProgram`,
      {
        code: ProgramCode.value,
        name: programTitle.value,
      },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    Notify.create({
      type: "positive",
      message: "Program added successfully!",
    });

    // Reset input fields
    programTitle.value = "";
    ProgramCode.value = "";

    // Refresh table data
    fetchPrograms();
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
    addProgramPopUp.value = false;
  }
}

async function fetchPrograms() {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${process.env.api_host}/courses/getProgram?isArchived=false`, {
      headers: {
        Authorization: token,
      },
    });
    rows.value = response.data.map((program, index) => ({
      index: index + 1,
      program: program.code,
      programTitle: program.name,
      numCourse: program.numCourse || 0,
      numUnits: program.numUnits || 0,
      numEnrolled: program.numEnrolled || 0,
      action: program._id,
    }));
  } catch (err) {
    console.error("Error fetching programs:", err);
  }
}
function openEditDialog(program) {
  editForm.value = {
    programTitle: program.programTitle,
    program: program.program,
    action: program.action,
  }
  editProgramPopUp.value = true
}



async function editProgram(program_id) {
  console.log('Editing program:', program_id)
  loading.value = true
  try {
    const token  = localStorage.getItem("authToken");
    const response = await axios.post(`${process.env.api_host}/courses/updateProgram/${program_id}`,
    {
      code: editForm.value.program,
      name: editForm.value.programTitle,
    },
    {
      headers:{
        Authorization: token,
        "Content-Type": "application/json",
      }
    }
    )
    Notify.create({
      type: 'positive',
      message: 'program edited',
    })
    editProgramPopUp.value = false
  } catch (err) {
    console.error(err)
  } finally {
    fetchPrograms()
    loading.value = false
  }
}

// Function to handle program deletion
async function deleteProgram(program_id) {
  console.log('Deleting program:', program_id)
  loading.value = true
  try{
    const token = localStorage.getItem("authToken");
    const response = await axios.post(`${process.env.api_host}/courses/updateProgram/${program_id}`,
    {
      isArchived: true,
    },
    {
      headers:{
           Authorization: token,
        "Content-Type": "application/json",
      }
    }
  )
  Notify.create({
    type: 'positive',
    message: 'program deleted',
  })
  }catch(err){
    console.error(err)
    Notify.create({
    type: 'negative',
    message: 'Something Went Wrong',
  })
  }finally{
    fetchPrograms()
    loading.value = false
  }

}
async function cancelAdd() {
  ;(programTitle.value = ''),
    (ProgramCode.value = ''),
    (addProgramPopUp.value = false)
}

onMounted(() => {
  fetchPrograms();
});
</script>

<style lang="sass" scoped>
.main-container
  background-color: #dadada
  min-height: 100%
.button-container
  width: auto
  display: flex
  flex-wrap: wrap
  gap: 10px
.button-section
  width: 180px
  height: 80px
  padding: 8px
  @media (max-width: 600px)
    width: 100%
    height: 60px
    padding: 4px
.action-button
  background-color: #2d5429
  color: #ffffff
  border-radius: 10px
  width: 100%
  height: 100%
.input-field
  background-color: #fdfede
  border-radius: 8px
  padding: 4px 12px

@media (max-width: 600px)
  .input-field
    width: 100%
</style>
