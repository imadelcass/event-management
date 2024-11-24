<template>
  <el-dialog
    :model-value="useDialog('event_add_update_model').isOpen()"
    @close="useDialog('event_add_update_model').close()"
    :modal="true"
    draggable
    :close-on-click-modal="false"
    :style="{ width: '50%' }"
  >
    <template #header>
      <div>
        <h3>{{ form.id ? 'edit' : 'add' }}</h3>
      </div>
    </template>
    <el-form
      ref="formRef"
      v-loading="loading"
      :model="form"
      :rules="rules"
      label-width="120px"
      status-icon
      label-position="top"
    >
      <div class="grid grid-cols-2 gap-2">
        <div class="col-span-1">
          <el-form-item label="name" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
        </div>
        <div class="col-span-1">
          <el-form-item label="date" prop="date">
            <el-date-picker
              class="!w-full"
              v-model="form.date"
              type="date"
              placeholder="Pick a date"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </div>
        <div class="col-span-1">
          <el-form-item label="location" prop="location">
            <el-input v-model="form.location" />
          </el-form-item>
        </div>
        <div class="col-span-1">
          <el-form-item label="description" prop="description">
            <el-input v-model="form.description" />
          </el-form-item>
        </div>
        <div class="col-span-1">
          <el-form-item label="rsvp limit" prop="rsvp_limit">
            <el-input-number v-model="form.rsvp_limit" :step="1" :min="0" class="!w-full" />
          </el-form-item>
        </div>
      </div>
    </el-form>
    <template #footer>
      <el-button @click="useDialog('event_add_update_model').close()">cancel</el-button>
      <el-button type="primary" :loading="loading" @click="submit(formRef)">save</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue'
import { useEventStore } from '@/stores/event.js'
import { useDialog } from '@/composables/dialog'

const eventStore = useEventStore()

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
})

const initForm = {
  name: null,
  date: null,
  location: null,
  description: null,
  rsvp_limit: null,
}

const form = ref(initForm)
const formRef = ref(null)
const loading = ref(false)
const emit = defineEmits(['refresh'])

const rules = {
  name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
  date: [{ required: true, message: 'Please input date', trigger: 'blur' }],
  location: [{ required: true, message: 'Please input location', trigger: 'blur' }],
  description: [{ required: true, message: 'Please input description', trigger: 'blur' }],
  rsvp_limit: [{ required: true, message: 'Please input rsvp limit', trigger: 'blur' }],
}

watch(
  () => props.item,
  (newVal) => {
    if (newVal.id) {
      form.value = Object.assign({}, newVal)
    } else {
      form.value = Object.assign({}, initForm)
    }
  },
)
const submit = (formRef) => {
  formRef.validate((valid) => {
    console.log(form.value)

    if (valid) {
      loading.value = true
      if (form.value.id) {
        eventStore
          .update(form.value)
          .then(() => reset())
          .catch(() => (loading.value = false))
      } else {
        eventStore
          .add(form.value)
          .then(() => reset())
          .catch(() => (loading.value = false))
      }
    }
  })
}

const reset = () => {
  form.value = Object.assign({}, initForm)
  useDialog('event_add_update_model').close()
  loading.value = false
  emit('refresh')
}
</script>
