import { reactive, ref } from 'vue'
import { en } from './en'
import { it } from './it'

export type Language = 'en' | 'it'

export const currentLang = ref<Language>('en')

export const toggleLanguage = () => {
    currentLang.value = currentLang.value === 'en' ? 'it' : 'en'
}

// Uniamo gli oggetti importati nel nostro oggetto reattivo "t"
export const t = reactive({
    en,
    it
})