import { LogType } from '../models/log/logType'

export enum Log {
  app,
  auth,
  actions,
  firestore
}

export const logTypesValue: { [x: number]: LogType} = {
  [Log.app]: {
    name: 'App',
    color: '#00bcd4'
  },
  [Log.auth]: {
    name: 'Auth',
    color: '#e846fa'
  },
  [Log.actions]: {
    name: 'Actions',
    color: '#ff9800'
  },
  [Log.firestore]: {
    name: 'Firestore',
    color: '#ff5722'
  }
}

export default class debug {
  static log (type: Log, ...args: any[]) {
    print('log', type, ...args)
  }

  static error (type: Log, ...args: any[]) {
    print('error', type, ...args)
  }
}

function print (method: 'log' | 'error', type: Log, ...args: any[]) {
  if (logTypesValue[type]) {
    console[method](`%c[${logTypesValue[type].name}]`, `color: ${logTypesValue[type].color}`, ...args)
  } else {
    console[method](`[${type}]`, ...args)
  }
}
