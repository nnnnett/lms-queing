<template>
  <q-page style="height: 90vh">
    <div class="main-container">
      <div class="content-container q-px-md q-px-sm-xl">
        <q-card-section class="q-pt-md">
          <div class="text-h4 text-weight-medium" style="color: #282726">Hi, Admin_Name!</div>
        </q-card-section>
        <div class="stats-container">
          <div class="stat-card">
            <q-card-section>
              <div class="text-h4 text-weight-bold">10</div>
              <div class="text-h6">Enrolled Students</div>
            </q-card-section>
          </div>
          <div class="stat-card">
            <q-card-section>
              <div class="text-h4 text-weight-bold">20</div>
              <div class="text-h6">Total Courses</div>
            </q-card-section>
          </div>
          <div class="stat-card">
            <q-card-section>
              <div class="text-h4 text-weight-bold">12</div>
              <div class="text-h6">Total Programs</div>
            </q-card-section>
          </div>
          <div class="stat-card">
            <q-card-section>
              <div class="text-h4 text-weight-bold">45</div>
              <div class="text-h6">Total Queue</div>
            </q-card-section>
          </div>
        </div>
        <!-- table -->
        <div class="q-mt-lg">
          <q-table
            style="border-radius: 14px; background-color: #fdffdf"
            title="Recent Students"
            :rows="rows"
            :columns="columns"
            row-key="studentId"
            separator="cell"
            :rows-per-page-options="[0, 15, 20, 25, 30]"
            class="responsive-table"
          >
            <template #body="props">
              <q-tr :props="props">
                <q-td v-for="col in columns" :key="col.name" :props="props">
                  {{ col.name === '#' ? props.rowIndex + 1 : props.row[col.name] }}
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
  {
    name: '#',
    required: true,
    label: '#',
    align: 'center',
    field: (row, index) => index + 1,
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
</script>

<style lang="sass" scoped>
.main-container
  background-color: #dadada
  min-height: 100%

.stats-container
  display: flex
  flex-wrap: wrap
  gap: 20px
  margin-top: 20px
  justify-content: space-between

.stat-card
  color: #30582d
  background-color: #fdffdf
  border-radius: 14px
  flex: 1
  min-width: 250px
  max-width: calc(25% - 15px)

@media (max-width: 1200px)
  .stat-card
    max-width: calc(50% - 10px)

@media (max-width: 600px)
  .stat-card
    max-width: 100%

.responsive-table
  :deep(.q-table__container)
    overflow-x: auto

  :deep(.q-table)
    min-width: 600px

@media (max-width: 600px)
  .q-table__grid-content
    flex: 1 1 100%
</style>
