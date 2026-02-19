<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

defineProps<{
  show: boolean
  title?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}>()

const emit = defineEmits(['close'])
</script>

<template>
  <TransitionRoot as="template" :show="show">
    <Dialog as="div" class="relative z-50" @close="emit('close')">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-bg-secondary border border-border-medium text-left shadow-xl transition-all sm:my-8 sm:w-full" :class="[maxWidth ? `max-w-${maxWidth}` : 'max-w-lg']">
              
              <!-- Header -->
              <div v-if="title" class="flex items-center justify-between px-4 py-3 border-b border-border-medium bg-bg-tertiary/50">
                <DialogTitle as="h3" class="text-base font-semibold leading-6 text-text-primary">{{ title }}</DialogTitle>
                <button @click="emit('close')" type="button" class="rounded-md bg-transparent text-text-tertiary hover:text-text-primary focus:outline-none">
                  <XMarkIcon class="h-5 w-5" />
                </button>
              </div>

              <!-- Content -->
              <div class="px-4 py-5 sm:p-6">
                <slot />
              </div>

              <!-- Footer -->
              <div v-if="$slots.footer" class="bg-bg-tertiary/30 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t border-border-subtle">
                <slot name="footer" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
