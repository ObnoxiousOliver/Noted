import { createApp } from 'vue'

import './firebase'

import App from './App.vue'
import ObnixIcons from './components/ObnixIcons.vue'

import mq from './utils/mq'
import router from './router'
import { config } from './utils/config'
import { StatusBar, Style } from '@capacitor/status-bar'
import { platform } from './utils/platform'

// Capacitor Setup
if (platform === 'android' || platform === 'ios') {
  StatusBar.setOverlaysWebView({ overlay: true })
}

// Create App
createApp(App)
  .use(mq)
  .use(router)
  .component('oi', ObnixIcons)
  .mount('#app')

// Handel Color Theme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme)
config.watch('theme', updateTheme)

updateTheme()
function updateTheme () {
  switch (config.get('theme')) {
    case 'dark':
      setDark()
      break
    case 'light':
      setLight()
      break
    default: {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      prefersDark ? setDark() : setLight()
    }
  }

  function setLight () {
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')

    if (platform === 'android' || platform === 'ios') {
      StatusBar.setStyle({ style: Style.Light })
    }
  }
  function setDark () {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')

    if (platform === 'android' || platform === 'ios') {
      StatusBar.setStyle({ style: Style.Dark })
    }
  }
}
