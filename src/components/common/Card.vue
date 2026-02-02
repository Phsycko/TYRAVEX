<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  glass?: boolean
  noPadding?: boolean
  noHover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  glass: false,
  noPadding: false,
  noHover: false
})
</script>

<template>
  <div
    :class="[
      props.glass ? 'card-glass' : 'card',
      props.noPadding ? '!p-0' : '',
      props.noHover ? '!shadow-card hover:!shadow-card hover:!border-tyravex-border' : ''
    ]"
  >
    <div v-if="title || $slots.header" class="card-header" :class="{ 'px-5 pt-5': noPadding }">
      <div v-if="title">
        <h3 class="card-title">{{ title }}</h3>
        <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
      </div>
      <slot name="header" />
      <div v-if="$slots.actions" class="flex items-center gap-2">
        <slot name="actions" />
      </div>
    </div>
    <div :class="{ 'px-5 pb-5': noPadding && (title || $slots.header) }">
      <slot />
    </div>
    <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-tyravex-border">
      <slot name="footer" />
    </div>
  </div>
</template>
