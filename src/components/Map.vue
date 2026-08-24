<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    lat: number
    lng: number
    zoom?: number
    title?: string
  }>(),
  {
    zoom: 14,
    title: '',
  }
)

const mapEl = ref<HTMLElement | null>(null)
let map: L.Map | null = null

onMounted(() => {
  if (!mapEl.value) return

  map = L.map(mapEl.value, {
    center: [props.lat, props.lng],
    zoom: props.zoom,
    scrollWheelZoom: false,
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map)

  const marker = L.marker([props.lat, props.lng]).addTo(map)
  if (props.title) {
    marker.bindPopup(props.title)
  }
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<template>
  <div ref="mapEl" class="map" aria-label="Map"></div>
</template>

<style scoped>
.map {
  /* ===== Local variables — define before use ===== */
  --map-border-thickness: 2px;
  --map-border-radius: var(--radius-sm);
  --map-height: 400px;
  --map-bg: var(--secondary);
  --map-border: var(--accent-s);

  width: 100%;
  height: var(--map-height);
  background: var(--map-bg);
  border: var(--map-border-thickness) solid var(--map-border);
  border-radius: var(--map-border-radius);
}
</style>
