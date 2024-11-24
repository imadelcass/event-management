<template>
    <el-dialog
      :model-value="useDialog('event_details_model').isOpen()"
      @close="useDialog('event_details_model').close()"
      :modal="true"
      draggable
      :close-on-click-modal="false"
      :style="{ width: '50%' }"
    >
      <template #header>
        <div>
          <h3 class="text-lg font-semibold">Event Details</h3>
        </div>
      </template>
  
      <!-- Event Details Display -->
      <div class="space-y-4 p-4">
        <div class="flex justify-between">
          <span class="font-medium">Name:</span>
          <span>{{ event.name }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-medium">Date:</span>
          <span>{{ event.date }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-medium">Location:</span>
          <span>{{ event.location }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-medium">Description:</span>
          <span>{{ event.description }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-medium">RSVP Limit:</span>
          <span>{{ event.rsvp_limit }}</span>
        </div>
      </div>
  
      <template #footer>
        <el-button @click="useDialog('event_details_model').close()">Close</el-button>
      </template>
    </el-dialog>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { useDialog } from '@/composables/dialog'
  
  
  const props = defineProps({
    item: {
      type: Object,
      default: () => ({}),
    },
  })
  
  const event = ref({})
  
  watch(
    () => props.item,
    (newVal) => {
      if (newVal.id) {
        event.value = Object.assign({}, newVal)
      }
    },
  )
  </script>
  