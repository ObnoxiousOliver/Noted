declare const electron: object | undefined

export const platform = (() => {
  if (electron) {
    return 'electron'
  } else return 'web'
})()
