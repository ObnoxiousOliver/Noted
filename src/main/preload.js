const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  window: {
    close () {
      ipcRenderer.send('window:close')
    },
    maximize () {
      ipcRenderer.send('window:maximize')
    },
    unmaximize () {
      ipcRenderer.send('window:unmaximize')
    },
    minimize () {
      ipcRenderer.send('window:minimize')
    },
    isMaximized (cb) {
      ipcRenderer.on('window:isMaximized', (e, val) => cb(val))
      cb(ipcRenderer.sendSync('window:isMaximized'))
    }
  },
  auth: {
    signInWithGoogle () {
      ipcRenderer.send('auth:signInWithGoogle')
    }
  }
})
