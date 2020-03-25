import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  en: {
    'question-list': 'Questionnaire',
    'listof-conveyors': 'List of conveyors',
    'tape': 'tape',
    'submit': 'submit',
    'edit': 'edit',
  },
  ru: {
    'question-list': 'Опросный лист',
    'listof-conveyors': 'Список конвейеров',
    'tape': 'Ленточный',
    'submit': 'Отправить',
    'edit': 'Редактировать',
  },
}

export default new VueI18n({
  locale: 'ru',
  messages,
})
