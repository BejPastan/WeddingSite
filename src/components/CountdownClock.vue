<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
//import { useLanguage } from '../stores/language'
import Text from './Text.vue';

const props = defineProps<{
  targetDate: Date
}>()

/* ---------- Target date (UTC ms) ---------- */
const targetMs = computed<number | null>(() => {
  const ms = props.targetDate instanceof Date ? props.targetDate.getTime() : new Date(props.targetDate).getTime()
  return Number.isNaN(ms) ? null : ms
})

const isInvalid = computed(() => targetMs.value === null)

/* ---------- Tick timer (aligned to second boundary) ---------- */
const nowMs = ref(Date.now())
let timer: number | null = null

const tick = () => {
  const now = Date.now()
  nowMs.value = now
  timer = window.setTimeout(tick, 1000 - (now % 1000))
}

onMounted(() => {
  const now = Date.now()
  nowMs.value = now
  timer = window.setTimeout(tick, 1000 - (now % 1000))
})

onBeforeUnmount(() => {
  if (timer !== null) clearTimeout(timer)
})

/* ---------- Diff logic ---------- */
const diffMs = computed(() => {
  if (targetMs.value === null) return 0
  return nowMs.value - targetMs.value
})

/** true once the target date has passed — clock counts up from it */
const isPast = computed(() => diffMs.value >= 0)

const absMs = computed(() => Math.abs(diffMs.value))

type ClockMode = 'sub24h' | 'days' | 'months'

const mode = computed<ClockMode>(() => {
  const totalDays = Math.floor(absMs.value / 86_400_000)
  if (totalDays > 31) return 'months'
  if (totalDays >= 1) return 'days'
  return 'sub24h'
})

const sub24 = computed(() => {
  const sec = Math.floor(absMs.value / 1000)
  return {
    h: Math.floor(sec / 3600),
    m: Math.floor((sec % 3600) / 60),
    s: sec % 60,
  }
})

const over24 = computed(() => {
  const sec = Math.floor(absMs.value / 1000)
  const totalDays = Math.floor(sec / 86_400)
  return {
    totalDays,
    hours: Math.floor((sec % 86_400) / 3600),
    months: Math.floor(totalDays / 30),
    days: totalDays % 30,
  }
})

/* ---------- Polish plural helpers ---------- */
const pluralDays = (n: number) => (n === 1 ? 'dzień' : 'dni')
const pluralDaysEng = (n: number) => (n === 1 ? 'day' : 'days')
const pad = (n: number) => String(n).padStart(2, '0')

defineExpose({ isPast })

//const { isPolish } = useLanguage()
</script>

<template>
  <div class="countdown-clock">
    <div class="clock-time">
      <template v-if="isInvalid">
        <Text text="--" textEng="--" size="header" />
        <Text text=":" textEng=":" size="title" :style="'secondary'"/>
        <Text text="--" textEng="--" size="header" />
        <Text text=":" textEng=":" size="title" :style="'secondary'"/>
        <Text text="--" textEng="--" size="header" />
      </template>


      <template v-else-if="mode === 'sub24h'">
        <Text :text="pad(sub24.h)" :textEng="pad(sub24.h)" size="header"/>
        <Text text=":" textEng=":" size="title" :style="'secondary'"/>
        <Text :text="pad(sub24.m)" :textEng="pad(sub24.m)" size="header"/>
        <Text text=":" textEng=":" size="title" :style="'secondary'"/>
        <Text :text="pad(sub24.s)" :textEng="pad(sub24.s)" size="header"/>
      </template>

      <template v-else-if="mode === 'days'">
        <Text :text="over24.days.toString()" :textEng="over24.days.toString()" size="header" />
        <Text :text="pluralDays(over24.days)" :text-eng="pluralDaysEng(over24.days)" :size="'title'" :style="'secondary'"/>
        <Text :text="over24.hours.toString()" :textEng="over24.hours.toString()" size="header"/>
        <Text text="godz." textEng="h" size="title" :style="'secondary'"/>
      </template>

      <template v-else>
        <Text :text="over24.months.toString()" :textEng="over24.months.toString()" size="header" />
        <Text text="m." textEng="mo" size="title" :style="'secondary'" />
        <Text text=":" textEng=":" size="title" :style="'secondary'"/>
        <Text :text="over24.days.toString()" :textEng="over24.days.toString()" size="header" />
        <Text :text="pluralDays(over24.days)" :text-eng="pluralDaysEng(over24.days)" :size="'title'" :style="'secondary'"/>
      </template>
    </div>
  </div>
</template>

<style scoped>
.countdown-clock {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--clock-gap);
  padding: var(--clock-padding);
  background: transparent;
  border-radius: var(--clock-border-radius);
  color: var(--secondary-text);
}

.clock-time {
  display: inline-flex;
  align-items: baseline;
  flex-wrap: wrap;
  justify-content: center;
  gap: calc(var(--clock-gap) / 2);
}

.clock-segment {
  font-size: var(--clock-number-size);
  font-weight: 600;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  color: var(--secondary-text);
}

.clock-sep {
  font-size: var(--clock-number-size);
  line-height: 1;
  color: var(--accent-p);
}

.clock-label {
  font-size: var(--clock-label-size);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--accent-p);
}
</style>