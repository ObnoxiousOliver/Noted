import { platform } from './platform'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const electron: any

export type ConfigValue = { [x: string]: ConfigValue } | string | number | boolean | null | undefined
export type ConfigListeners = 'update'

export const configData: { [x: string]: ConfigValue } = {}

const listeners: {
  [x: string]: ((path?: string) => unknown)[]
} = {}

function onUpdate (path?: string) {
  listeners['update' as ConfigListeners] &&
  listeners['update' as ConfigListeners].forEach(x => x(path))
}

export const config = {
  get (path = ''): ConfigValue {
    const _path = path.split('.')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentItem: any = configData

    _path.some((key, i) => {
      if (i === _path.length - 1) return false

      if (typeof (currentItem[key]) !== 'object') {
        currentItem = undefined
        return true
      }

      currentItem = currentItem[key]
      return false
    })

    const last = _path[_path.length - 1]

    return last ? currentItem?.[last] : currentItem
  },
  set (path: string, value: ConfigValue) {
    const _path = path.split('.')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentItem: any = configData

    _path.some((key, i) => {
      if (i === _path.length - 1) return false

      if (currentItem[key] === undefined) {
        currentItem[key] = {}
      }

      currentItem = currentItem[key]
      return false
    })

    if (typeof (currentItem) === 'object') {
      currentItem[_path[_path.length - 1]] = value
      onUpdate(path)
    } else {
      throw new Error('[Config]: invalid Path')
    }
  },
  on (channel: ConfigListeners, listener: (path?: string) => unknown) {
    if (!listeners[channel]) {
      listeners[channel] = []
    }

    listeners[channel].push(listener)
  },
  watch (path: string, cb: (value: ConfigValue) => unknown) {
    this.on('update', (p?: string) => {
      if (p === path) cb(this.get(p))
    })
  }
}

export function setupConfig () {
  if (platform === 'web') {
    // Load from LocalStorage
    try {
      const storedConfig = JSON.parse(localStorage.getItem('config') ?? '{}')

      Object.keys(storedConfig).forEach(key => config.set(key, storedConfig[key]))
    } catch {}

    // update LocalStorage on changes
    config.on('update', () => {
      localStorage.setItem('config', JSON.stringify(configData))
    })
  } else {
    // Get config from file
    const configFile: { [x: string]: ConfigValue } = electron.config.getSync()
    Object.keys(configFile).forEach(key => config.set(key, configFile[key]))

    // Listen to file changes
    electron.config.listen((configFile: { [x: string]: ConfigValue }) => {
      Object.keys(configFile).forEach(key => config.set(key, configFile[key]))
    })

    // update Config File on changes
    config.on('update', () => {
      electron.config.update(configData)
    })
  }
}
