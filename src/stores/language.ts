import { computed, ref } from 'vue'

export type Language = 'pl' | 'en'

const SUPPORTED: Language[] = ['pl', 'en']

const language = ref<Language>('pl')

export const useLanguage = () => {
  const setLanguage = (lang: Language) => {
    language.value = lang
    localStorage.setItem('lang', lang)
  }

  const toggleLanguage = () => {
    setLanguage(language.value === 'pl' ? 'en' : 'pl')
  }

  const detectPreferred = (): Language => {
    const saved = localStorage.getItem('lang') as Language | null
    if (saved && SUPPORTED.includes(saved)) return saved
    const browser = navigator.language?.slice(0, 2)
    if (browser === 'en') return 'en'
    return 'pl' // default
  }

  const isPolish = computed(() => language.value === 'pl')
  const isEnglish = computed(() => language.value === 'en')

  return {
    language,
    isPolish,
    isEnglish,
    setLanguage,
    toggleLanguage,
    detectPreferred,
  }
}
