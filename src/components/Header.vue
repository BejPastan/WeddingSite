<script setup lang="ts">
import { useLanguage } from '../stores/language';
import CountdownClock from './CountdownClock.vue';
import Text from './Text.vue';
import FlagIcon from 'vue3-flag-icons'

const { isPolish, toggleLanguage } = useLanguage()
</script>

<template>
      <div class="clockContainer">
          <div @click="toggleLanguage()" class="lang-switcher">
            <FlagIcon :code="isPolish ? 'pl' : 'gb'" />
            <Text text="Polski" textEng="English" size="label"/>
          </div>
        <div class="namesContainer">
          <Text text="Wiktoria Fronczak" text-eng="Wiktoria Fronczak" size="header"/>
          <Text text="&" text-eng="&" size="title"/>
          <Text text="Szymon Synaszko" text-eng="Szymon Synaszko" size="header"/>
        </div>
        <Text text="Do ślubu pozostało:" textEng="Countdown to the Wedding" size="title" />
        <CountdownClock :targetDate="new Date('2027-10-24T15:30:00Z')" />
      </div>
</template>

<style scoped>
.clockContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  background-size: cover;
  background-position: center;
}

.namesContainer {
  display: grid;
  justify-items: center;
  width: 100%;
  overflow: hidden;
}

.namesContainer > *:nth-child(1) { transform: translateX(-20%); }
.namesContainer > *:nth-child(2) { transform: translateX(0%); }
.namesContainer > *:nth-child(3) { transform: translateX(30%)   }

/* Negative vertical spacing starting from item 2 onwards */
.namesContainer > * + * {
  margin-top: -32px; /* Negative vertical gap */
}

.lang-switcher{
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  z-index: 1000;
}
@media screen and (max-width: 768px) {
  .namesContainer > *:nth-child(1) { transform: translateX(5%); }
  .namesContainer > *:nth-child(2)
  { 
    transform: translateX(-150%); 
    scale: 150%; 
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .namesContainer > *:nth-child(3) { transform: translateX(25%)   }
  
}
</style>