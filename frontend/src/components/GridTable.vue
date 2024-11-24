<template>
  <vxe-grid
    class="px-2 mytable-scrollbar"
    ref="tableRef"
    v-bind="{ ...gridOptions, columns, proxyConfig }"
  >
    <template #empty>no-data</template>
    <template #toolbar_buttons="{ row }">
      <div v-if="auth.isAdmin" class="mb-2 flex">
        <el-button type="primary" @click="emit('add-item', row)">
          {{ addLabel }}
          <i-tabler-plus class="ml-3" />
        </el-button>
      </div>
    </template>
    <template #actions="{ row }">
      <div class="flex justify-center">
        <div class="mr-2">
          <!-- make rsvp button -->
          <el-tooltip content="Add rsvp">
            <el-button
              class="p-button-raised p-button-sm !bg-yellow-300 !shadow-none !border-none"
              @click="emit('rsvp-item', row)"
            >
              <i-tabler-heart class="text-white" />
            </el-button>
          </el-tooltip>
        </div>
        <div class="mr-2">
          <el-tooltip content="Show details">
          <el-button
            class="p-button-raised p-button-sm !bg-blue-300 !shadow-none !border-none"
            @click="emit('detail-item', row)"
          >
            <i-tabler-eye class="text-white" />
          </el-button>
          </el-tooltip>
        </div>
        <div v-if="auth.isAdmin" class="mr-2">
          <el-tooltip content="Update item">
          <el-button
            class="p-button-raised p-button-sm !bg-lime-300 !shadow-none !border-none"
            @click="emit('update-item', row)"
          >
            <i-tabler-pencil class="text-white" />
          </el-button>
          </el-tooltip> 
        </div>
        <el-popconfirm
         v-if="auth.isAdmin"
          icon-color="#626AEF"
          :title="'are-you-sure-to-delete-this'"
          @confirm="emit('delete-item', row)"
        >
          <template #reference>
            <el-tooltip content="Delete item">
            <el-button class="!bg-red-300 !shadow-none !border-none">
              <i-tabler-trash class="text-white" />
            </el-button>
            </el-tooltip>
          </template>
        </el-popconfirm>
      </div>
    </template>
  </vxe-grid>
</template>

<script setup>
import { ref, defineEmits, defineProps, defineExpose } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const emit = defineEmits([
  'add-item',
  'rsvp-item',
  'detail-item',
  'update-item',
  'delete-item'
])
const props = defineProps({
  columns: {
    type: Object,
    default: () => {},
  },
  addLabel: {
    type: String,
    default: () => '',
  },
  proxyConfig: {
    type: Object,
    default: () => {},
  },
})
const tableRef = ref()
const loading = ref(false)
const gridOptions = ref({
  border: true,
  round: true,
  loading,
  maxHeight: 700,
  columnConfig: {
    resizable: true,
  },
  pagerConfig: {
    enabled: true,
    pageSize: 10,
    pageSizes: [5, 10, 15, 20, 50],
  },
  toolbarConfig: {
    export: true,
    refresh: true,
    print: true,
    custom: true,
    slots: {
      buttons: 'toolbar_buttons',
    },
  },
  exportConfig: {
    type: 'xlsx',
    types: ['xlsx', 'html'],
    modes: ['current', 'selected', 'all'],
  },
  printConfig: {
    modes: ['current', 'selected', 'all'],
    columnFilterMethod: ({ column }) => column.property !== 'actions',
  },
  showOverflow: true,
  showHeaderOverflow: true,
  rowConfig: props.rowConfig,
  scrollY: {
    enabled: true,
    // mode: 'wheel'
  },
  filterConfig: {
    remote: true,
  },
  sortConfig: {
    remote: true
  },
})

const refresh = () => {
  tableRef.value.commitProxy('query')
}

const setTableLoading = (state) => (loading.value = state)

defineExpose({ refresh, table: tableRef, setTableLoading })
</script>
