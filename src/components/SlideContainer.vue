<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    direction: 'left' | 'right'
    /** Distance (px) from the bottom of the viewport at which the container starts sliding in. */
    threshold?: number
  }>(),
  {
    threshold: 150,
  }
)

// The trigger state — flips to true when the container is near the bottom of the viewport.
const isVisible = ref(false)
const sentinel = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null

onMounted(() => {
  // Positive bottom rootMargin extends the root downward so the observer fires
  // while the sentinel is still up to `threshold` px below the viewport bottom.
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        isVisible.value = true
        observer?.disconnect()
        observer = null
      }
    },
    { rootMargin: `0px 0px ${props.threshold}px 0px`, threshold: 0 }
  )
  if (sentinel.value) observer.observe(sentinel.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <section
    class="slide-container"
    :class="direction === 'right' ? 'from-right' : 'from-left'"
  >
    <div class="slide-content" :class="{ visible: isVisible }">
      <slot />
    </div>
    <div ref="sentinel" class="slide-sentinel" aria-hidden="true"></div>
  </section>
</template>

<style scoped>
.slide-container {
  /* Direction-specific behavioral offset (not a design token). */
  --slide-hidden-offset: -100%;
  width: 100%;
  position: relative;
  color: var(--secondary-text);
  overflow: hidden;
}

.slide-container.from-right {
  --slide-hidden-offset: 100%;
}

.slide-content {
  background: var(--primary);
  transform: translateX(var(--slide-hidden-offset));
  opacity: 0;
  transition:
    transform var(--transition-slow),
    opacity var(--transition-slow);
  box-shadow: 10px 10px var(--spacing-xl) rgba(0, 0, 0, 0.2);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xxl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.slide-content.visible {
  transform: translateX(0);
  opacity: 1;
}

.slide-sentinel {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

@media (max-width: 768px) {
  .slide-content {
    padding: var(--spacing-md);
    padding-bottom: var(--spacing-xxl);
    padding-top: var(--spacing-lg);
  }
}
</style>