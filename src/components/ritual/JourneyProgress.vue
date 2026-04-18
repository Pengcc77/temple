<script setup>
const props = defineProps({
  currentStep: {
    type: Number,
    default: 1,
  },
})

const steps = [
  { id: 1, name: '淨心' },
  { id: 2, name: '獻願' },
  { id: 3, name: '聽故事' },
  { id: 4, name: '收福' },
]
</script>

<template>
  <ol class="journey-progress">
    <li
      v-for="step in steps"
      :key="step.id"
      class="journey-progress__item"
      :class="{ 'is-active': step.id === props.currentStep, 'is-done': step.id < props.currentStep }"
    >
      <span class="step-index">{{ step.id }}</span>
      <span class="step-name">{{ step.name }}</span>
    </li>
  </ol>
</template>
