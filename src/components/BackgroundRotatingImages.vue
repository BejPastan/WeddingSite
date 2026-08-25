<script setup lang="ts">
import { onMounted, ref } from 'vue';


const loadedImages = ref<string[]>([])

// 1. Scan directory at build time
const imageModules = import.meta.glob('/src/assets/gallery/*.{PNG,JPG,JPEG}', { 
  eager: true,
  import: 'default'
})

onMounted(() => {
  // Map over values to extract string URLs regardless of module wrapper
  loadedImages.value = Object.values(imageModules).map((mod: any) => 
    typeof mod === 'string' ? mod : mod.default
  )
  
  console.log("Resolved image URLs:", loadedImages.value)
    const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  document.head.appendChild(link)
  imagesChangeCorutine()
})

const currentImg = ref("")
const nextImg = ref("")

async function imagesChangeCorutine()
{
    console.log("Loaded images: " + loadedImages.value)
    let currentIndex = 0;
    const totalImages = loadedImages.value.length;
    
    currentImg.value = loadedImages.value[currentIndex];
    nextImg.value = loadedImages.value[(currentIndex + 1) % totalImages];

    setInterval(() => {
      currentImg.value = nextImg.value;
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % totalImages;
        nextImg.value = loadedImages.value[(currentIndex + 1) % totalImages];
      }, 2000);
    }, 5000);
}

</script>

<template>
<div class="bgContainer">
    <img v-if="currentImg" :src="currentImg" alt="Current Background" class="current-bg"/>
    <img v-if="nextImg" :src="nextImg" alt="Next Background" class="next-bg"/>
    <div class="bgfilter">
      <slot/>
    </div>
</div>
</template>

<style scoped>
.bgContainer{
  width: 100%;
  height: 0;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
}

.current-bg, .next-bg {
  position: fixed;
  top: -200px;
  min-width: 100%;
  min-height: 100%;
  overflow: hidden;
}


.current-bg {
  z-index: -1;
  animation: fadeInOut 5s infinite;
}
.next-bg {
  z-index: -2;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1; /* Fade in complete (0.8s) */
  }
  80% {
    opacity: 1; /* Stay visible for 3s (until 4s mark) */
  }
  100% {
    opacity: 0; /* Fade out complete (1.2s) */
  }
}
.bgfilter{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--primary);
  opacity: 0.5; /* Adjust opacity as needed */
  z-index: -1;
}
</style>