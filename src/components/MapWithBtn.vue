<script setup lang="ts">
import Btn from './Btn.vue'
import Map from './Map.vue'
import Text from './Text.vue'

const props = withDefaults(
  defineProps<{
    lat: number
    lng: number
    title: string
    titleEng: string
    text: string
    textEng: string
    zoom?: number
    google_location?: string
  }>(),
  {
    lat: 52.2297,
    lng: 21.0122,
    title: '',
    titleEng: '',
    text: '',
    textEng: '',
    zoom: 14,
  }
)

const openGoogleMaps = () => {
  const url = `https://www.google.com/maps/search/?api=1&query=${props.google_location || `${props.lat},${props.lng}`}`
  window.open(url, '_blank')
}
</script>

<template>
  <div class="map-wrap">
    <Text v-if="title" :text="title" :textEng="titleEng" size="title" />
    <Map :lat="lat" :lng="lng" :zoom="zoom" :title="title" />
    <Btn :text="text" :textEng="textEng" type="primary" @click="openGoogleMaps" />
  </div>
</template>

<style scoped>
.map-wrap {
  /* ===== Local variables — define before use ===== */
  --map-wrap-gap: var(--spacing-md);
  --map-wrap-align: center;

  display: flex;
  flex-direction: column;
  align-items: var(--map-wrap-align);
  gap: var(--map-wrap-gap);
}
</style>
