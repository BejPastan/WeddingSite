<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '../stores/language'

const props = withDefaults(
  defineProps<{
    text: string
    textEng: string
    size?: 'header' | 'title' | 'content' | 'label'
    style?: 'primary' | 'secondary'
  }>(),
  {
    size: 'content',
    style: 'primary'
  }
)

const { isPolish } = useLanguage()
const display = computed(() => (isPolish.value ? props.text : props.textEng))
</script>

<template>
  <span class="text" :class="`text--${size} text--${style}`">
    {{ display }}
  </span>
</template>

<style scoped>
.text {
  /* ===== Local variables — define before use ===== */
  --text-color: var(--secondary-text);

  color: var(--text-color);
  line-height: 1.4;
}

.text--primary {
  color: var(--text-color);
}
.text--secondary {
  color: var(--accent-p);
}

.text--header {
  font-size: var(--text-header);
  font-weight: 700;
}

.text--title {
  font-size: var(--text-title);
  font-weight: 600;
}

.text--content {
  font-size: var(--text-content);
  font-weight: 400;
}

.text--label {
  font-size: var(--text-label);
  font-weight: 300;
  letter-spacing: 0.06em;
}
</style>
