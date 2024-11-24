<template>
  <grid-table
    ref="tableRef"
    :columns="columns"
    :proxy-config="proxyConfig"
    :add-label="'add'"
    @add-item="addItem"
    @update-item="updateItem"
    @delete-item="deleteItem"
    @detail-item="detailItem"
    @rsvp-item="rsvpItem"
  >
  </grid-table>
  <add-update :item="item" @refresh="refresh()" />
  <detail :item="item" />
</template>

<script setup>
import GridTable from '@/components/GridTable.vue'
import AddUpdate from './components/AddUpdate.vue'
import Detail from './components/Detail.vue'
import { useEventStore } from '@/stores/event.js'
import { ref, computed } from 'vue'
import { dayjs } from '@/plugins'
import { useDialog } from '@/composables/dialog'
import { DATE } from '@/constants'

const eventStore = useEventStore()

const columns = computed(() => [
  {
    field: 'id',
    title: 'ID',
    width: 80,
  },
  {
    field: 'name',
    title: 'Name',
    filters: [{ data: '' }],
    filterRender: { name: 'input' },
    sortable: true,
  },
  {
    field: 'date',
    title: 'Date',
    formatter: ({ cellValue }) => dayjs(cellValue).format(DATE),
  },
  {
    field: 'location',
    title: 'Location',
    sortable: true,
  },
  {
    field: 'description',
    title: 'Description',
  },
  {
    field: 'rsvp_limit',
    title: 'RSVP Limit',
    sortable: true,
  },
  {
    field: 'created_at',
    title: 'created at',
    formatter: ({ cellValue }) => dayjs(cellValue).format(DATE),
    sortable: true,
  },
  {
    field: 'actions',
    title: 'Actions',
    width: 240,
    slots: {
      default: 'actions',
    },
  },
])

const tableRef = ref()
const item = ref({})

const addItem = () => {
  item.value = {}
  useDialog('event_add_update_model').open()
}
const updateItem = (row) => {
  item.value = Object.assign({}, row)
  useDialog('event_add_update_model').open()
}
const detailItem = (row) => {
  item.value = Object.assign({}, row)
  useDialog('event_details_model').open()
}
const rsvpItem = ({ id }) => {
  eventStore.rsvp(id).then(() => refresh())
}
const deleteItem = ({ id }) => {
  eventStore.delete(id).then(() => refresh())
}

const proxyConfig = computed(() => ({
  filter: true,
  sort: true,
  ajax: {
    query: ({ page, filters, sort }) => {
      let queryParams = {
        page,
        filter: {},
        sort: sort.field ? `${sort.field},${sort.order}` : 'created_at,desc',
      }

      filters.forEach(({ field, values, datas }) => {
        queryParams.filter[field] = values.join(',') || datas.join(',')
      })
      return new Promise((resolve) => {
        eventStore.fetch(queryParams).then((res) => {
          resolve({
            page: { total: res?.meta.total },
            result: res?.data,
          })
        })
      })
    },
  },
}))

const refresh = () => {
  tableRef.value.refresh()
}
</script>
