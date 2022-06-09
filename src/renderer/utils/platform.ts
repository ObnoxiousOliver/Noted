import { Capacitor } from '@capacitor/core'

declare const global: any

export const platform: 'electron' | 'android' | 'ios' | 'web' = (() => {
  return global.electron
    ? 'electron'
    : (Capacitor.getPlatform() as 'android' | 'ios' | 'web')
})()
