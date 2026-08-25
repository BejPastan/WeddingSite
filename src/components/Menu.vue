<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Text from './Text.vue'

const props = withDefaults(
  defineProps<{
    items: Array<{ label: string; labelEng: string; target: string }>
  }>(),
  {
    items: () => [],
  }
)

const active = ref<string | null>(null)
let observer: { disconnect: () => void } | null = null

const scrollTo = (target: string) => {
  const el = document.querySelector(target)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    active.value = target
  }
}

onMounted(() => {
  //const entries: IntersectionObserverEntry[] = []
  const io = new IntersectionObserver(
    (observed) => {
      observed.forEach((entry) => {
        const id = entry.target.id
        const target = `#${id}`
        if (entry.isIntersecting) {
          active.value = target
        }
      })
    },
    { threshold: 0.5 }
  )

  props.items.forEach((item) => {
    const el = document.querySelector(item.target)
    if (el) io.observe(el)
  })

  observer = io
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <nav class="menu" aria-label="Menu nawigacji">
    <ul class="menu-list">
      <li v-for="item in items" :key="item.target" class="menu-item">
        <span
          class="menu-link"
          :class="{ active: active === item.target }"
          @click="scrollTo(item.target)"
        >
          <Text :text="item.label" :textEng="item.labelEng" size="label" />
        </span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.menu {
  /* ===== Local variables — define before use ===== */
  --menu-gap: var(--spacing-sm);
  --menu-padding: var(--spacing-md);
  --menu-text: var(--secondary-text);
  --menu-accent: var(--accent-p);

  position: sticky;
  top: 0;
  align-self: flex-start;
  width: 100px;
  padding: var(--menu-padding);
  background: transparent;
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: var(--menu-gap);
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-link {
  display: block;
  width: 100%;
  padding: var(--menu-gap) var(--spacing-sm);
  text-align: left;
  color: var(--menu-text);
  background: var(--primary);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--text-label);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  transition:
    color var(--transition-fast),
    padding-left var(--transition-fast);
}

.menu-link:hover {
  background-color: var(--menu-accent);
}

.menu-link.active {
  background-color: var(--accent-t);
  padding-left: var(--spacing-xxl);
}

@media (max-width: 768px) {
  .menu {
    width: 0%;
    overflow: hidden;
    padding: 0;
  }
}
</style>
