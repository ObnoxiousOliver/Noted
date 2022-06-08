declare const global: any

export const platform = (() => {
  if (global.electron) {
    return 'electron'
  } else return 'web'
})()
