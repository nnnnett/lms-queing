<template>
  <q-page style="height: 90vh">
    <div class="main-container">
      <div class="content-container q-px-md q-px-sm-xl">
        <q-card-section class="q-pt-md">
          <div class="text-h6 text-weight-medium" style="color: #282726">
            Admin/<span style="color: #b1b2b4">Student</span>
          </div>
        </q-card-section>
        <!-- buttons add student/export -->
        <div class="button-container">
          <q-card-section class="button-section">
            <q-btn
              label="Add Student"
              no-caps
              flat
              class="action-button"
              @click="addStudentPopUp = true"
            />
          </q-card-section>
          <q-card-section class="button-section">
            <q-btn label="Export CSV" no-caps @click="exportTable" flat class="action-button" />
          </q-card-section>
        </div>
        <!-- add student -->
        <div>
          <q-dialog v-model="addStudentPopUp" persistent>
            <q-card style="width: 800px; max-width: 95vw">
              <q-form @submit.prevent="addStudent">
                <div class="q-pa-md">
                  <q-card-section class="text-h6 text-weight-medium" style="color: #282726">
                    Add Student
                  </q-card-section>
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-12 col-sm-4">
                        <div class="text-subtitle2 q-mb-sm">First Name</div>
                        <div class="input-field">
                          <q-input v-model="firstName" type="text" borderless />
                        </div>
                      </div>
                      <div class="col-12 col-sm-4">
                        <div class="text-subtitle2 q-mb-sm">Middle Name</div>
                        <div class="input-field">
                          <q-input v-model="middleName" type="text" borderless />
                        </div>
                      </div>
                      <div class="col-12 col-sm-4">
                        <div class="text-subtitle2 q-mb-sm">Last Name</div>
                        <div class="input-field">
                          <q-input v-model="lastName" type="text" borderless />
                        </div>
                      </div>
                    </div>
                    <div class="row q-col-gutter-md">
                      <div class="col-12 col-sm-4">
                        <div class="text-subtitle2 q-mb-sm">Student ID</div>
                        <div class="input-field">
                          <q-input v-model="studentId" type="number" borderless />
                        </div>
                      </div>
                      <div class="col-12 col-sm-4">
                        <div class="text-subtitle2 q-mb-sm">Email</div>
                        <div class="input-field">
                          <q-input v-model="email" type="email" borderless />
                        </div>
                      </div>
                      <div class="col-12 col-sm-4">
                        <div class="text-subtitle2 q-mb-sm">Program</div>
                        <div class="input-field">
                          <q-input v-model="program" type="text" borderless />
                        </div>
                      </div>
                    </div>
                    <div class="row q-col-gutter-md">
                      <div class="col-12 col-sm-4">
                        <div class="text-subtitle2 q-mb-sm">Year</div>
                        <div class="input-field">
                          <q-input v-model="year" type="number" borderless />
                        </div>
                      </div>
                      <div class="col-12 col-sm-4">
                        <div class="text-subtitle2 q-mb-sm">Section</div>
                        <div class="input-field">
                          <q-input v-model="section" type="text" borderless />
                        </div>
                      </div>
                      <div class="col-12 col-sm-4">
                        <div class="text-subtitle2 q-mb-sm">Status</div>
                        <div class="input-field">
                          <q-input v-model="status" type="text" borderless />
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
            title="Recent Students"
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
                        @click="editStudentInfo = true"
                      >
                        <q-tooltip>Edit</q-tooltip>
                      </q-btn>
                      <q-btn
                        flat
                        dense
                        size="sm"
                        icon="delete"
                        color="negative"
                        @click="deleteStudent(props.row.studentId)"
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
      </div>
    </div>
    <!-- Edit dialog -->
    <q-dialog v-model="editStudentInfo" persistent>
      <q-card style="width: 800px; max-width: 95vw">
        <q-form @submit.prevent="editStudent">
          <div class="q-pa-md">
            <q-card-section class="text-h6 text-weight-medium" style="color: #282726">
              Edit Student Info
            </q-card-section>
            <q-card-section>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-4">
                  <div class="text-subtitle2 q-mb-sm">First Name</div>
                  <div class="input-field">
                    <q-input v-model="editForm.firstName" type="text" borderless />
                  </div>
                </div>
                <div class="col-12 col-sm-4">
                  <div class="text-subtitle2 q-mb-sm">Middle Name</div>
                  <div class="input-field">
                    <q-input v-model="editForm.middleName" type="text" borderless />
                  </div>
                </div>
                <div class="col-12 col-sm-4">
                  <div class="text-subtitle2 q-mb-sm">Last Name</div>
                  <div class="input-field">
                    <q-input v-model="editForm.lastName" type="text" borderless />
                  </div>
                </div>
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-4">
                  <div class="text-subtitle2 q-mb-sm">Student ID</div>
                  <div class="input-field">
                    <q-input v-model="editForm.studentId" type="number" borderless />
                  </div>
                </div>
                <div class="col-12 col-sm-4">
                  <div class="text-subtitle2 q-mb-sm">Email</div>
                  <div class="input-field">
                    <q-input v-model="editForm.email" type="email" borderless />
                  </div>
                </div>
                <div class="col-12 col-sm-4">
                  <div class="text-subtitle2 q-mb-sm">Program</div>
                  <div class="input-field">
                    <q-input v-model="editForm.program" type="text" borderless />
                  </div>
                </div>
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-4">
                  <div class="text-subtitle2 q-mb-sm">Year</div>
                  <div class="input-field">
                    <q-input v-model="editForm.year" type="number" borderless />
                  </div>
                </div>
                <div class="col-12 col-sm-4">
                  <div class="text-subtitle2 q-mb-sm">Section</div>
                  <div class="input-field">
                    <q-input v-model="editForm.section" type="text" borderless />
                  </div>
                </div>
                <div class="col-12 col-sm-4">
                  <div class="text-subtitle2 q-mb-sm">Status</div>
                  <div class="input-field">
                    <q-input v-model="editForm.status" type="text" borderless />
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                flat
                label="Cancel"
                v-close-popup
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
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { Notify, exportFile } from 'quasar'

// loading
const loading = ref(false)

// popup
const addStudentPopUp = ref(false)
const editStudentInfo = ref(false)

// Form fields
const firstName = ref('')
const middleName = ref('')
const lastName = ref('')
const studentId = ref('')
const email = ref('')
const program = ref('')
const year = ref('')
const section = ref('')
const status = ref('')

// Edit form
const editForm = ref({
  firstName: '',
  middleName: '',
  lastName: '',
  studentId: '',
  email: '',
  program: '',
  year: '',
  section: '',
  status: '',
})

// cancel add
async function cancelAdd() {
  (firstName.value = ''),
    (middleName.value = ''),
    (lastName.value = ''),
    (studentId.value = ''),
    (email.value = ''),
    (program.value = ''),
    (year.value = ''),
    (section.value = ''),
    (status.value = '')
  addStudentPopUp.value = false
}
// add student btn
async function addStudent() {
  loading.value = true
  try {
    Notify.create({
      type: 'positive',
      message:'student added'

    })
    addStudentPopUp.value = false
    console.log('dsds')
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

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
    name: 'studentId',
    required: true,
    label: 'Student ID',
    align: 'left',
    field: (row) => row.studentId,
    sortable: true,
  },
  {
    name: 'name',
    align: 'left',
    label: 'Student Name',
    field: 'name',
  },
  {
    name: 'email',
    align: 'left',
    label: 'Email',
    field: 'email',
  },
  {
    name: 'program',
    align: 'left',
    label: 'Program',
    field: 'program',
    sortable: true,
  },
  {
    name: 'year',
    align: 'left',
    label: 'Year',
    field: 'year',
    sortable: true,
  },
  {
    name: 'section',
    align: 'left',
    label: 'Section',
    field: 'section',
    sortable: true,
  },
  {
    name: 'status',
    align: 'left',
    label: 'Status',
    field: 'status',
    sortable: true,
  },
  {
    name: 'action',
    align: 'left',
    label: 'Action',
    field: 'action',
  },
])

const rows = ref([
  {
    studentId: '2023-0001',
    name: 'John Smith',
    email: 'john.smith@email.com',
    program: 'BSIT',
    year: '1st',
    section: 'A',
    status: 'Enrolled',
  },
  {
    studentId: '2023-0002',
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    program: 'BSCS',
    year: '2nd',
    section: 'B',
    status: 'Enrolled',
  },
  {
    studentId: '2023-0003',
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    program: 'BSIT',
    year: '3rd',
    section: 'A',
    status: 'Enrolled',
  },
  {
    studentId: '2023-0004',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    program: 'BSCS',
    year: '1st',
    section: 'C',
    status: 'Pending',
  },
  {
    studentId: '2023-0005',
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    program: 'BSIT',
    year: '4th',
    section: 'B',
    status: 'Enrolled',
  },
])

// export button
function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val

  formatted = formatted === void 0 || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}
function exportTable() {
  // Add row numbers to the data before export
  const contentRows = rows.value.map((row, index) => ({
    '#': index + 1, // Add the row number
    ...row,
  }))

  const content = [columns.value.map((col) => wrapCsvValue(col.label))]
    .concat(
      contentRows.map((row) =>
        columns.value
          .map((col) =>
            wrapCsvValue(
              col.name === '#'
                ? row['#'] // Handle the numbering column
                : typeof col.field === 'function'
                  ? col.field(row)
                  : row[col.field === void 0 ? col.name : col.field],
              col.format,
              row,
            ),
          )
          .join(','),
      ),
    )
    .join('\r\n')

  const status = exportFile('Students-info.csv', content, 'text/csv')

  if (status !== true) {
    Notify.create({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning',
    })
  }
}

// Function to open edit dialog with student data
// Function to handle edit submission
async function editStudent() {
  loading.value = true
  try {
    // TODO: Implement your edit logic here
    console.log('Editing student:',)
    Notify.create({
      type: 'positive',
      message: 'edited succesfully'
    })

  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
    editStudentInfo.value = false
  }
}

function deleteStudent(row) {
  // TODO: Implement delete functionality
  console.log('Delete student:', row)
  Notify.create({
      type: 'positive',
      message: 'deleted succesfully'
    })
}
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

.responsive-table
  :deep(.q-table__container)
    overflow-x: auto

  :deep(.q-table)
    min-width: 600px

  @media (max-width: 600px)
    :deep(.q-table__top)
      flex-direction: column
      align-items: stretch
      padding: 8px

    :deep(.q-table__top-left)
      margin-bottom: 8px

    :deep(.q-table__top-right)
      margin-top: 8px

    :deep(.q-table__middle)
      max-width: 100vw
      overflow-x: auto

    :deep(.q-td)
      white-space: nowrap
      padding: 8px

@media (max-width: 600px)
  .content-container
    padding: 8px !important

  .q-table__grid-content
    flex: 1 1 100%

  .text-h6
    font-size: 1.1rem

.input-field
  background-color: #fdfede
  border-radius: 8px
  padding: 4px 12px

@media (max-width: 600px)
  .input-field
    width: 100%

  .q-dialog__inner > div
    max-height: 90vh
</style>
