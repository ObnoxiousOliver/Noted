import debug, { Log } from '../utils/debug'

export function logSignInAs (email: string | null) {
  debug.log(Log.auth, `Signed in${email ? ` as ${email}` : ''}`)
}

export function logSignOut () {
  debug.log(Log.auth, 'Signed out')
}

export function errorUserNotFound () {
  debug.error(Log.auth, 'User not found')
}
export function errorWrongPassword () {
  debug.error(Log.auth, 'Wrong password')
}
export function errorInvalidEmail () {
  debug.error(Log.auth, 'Invalid email')
}
export function errorEmailAlreadyInUse () {
  debug.error(Log.auth, 'Email already in use')
}
export function errorWeakPassword () {
  debug.error(Log.auth, 'Weak password')
}
export function errorUnknown (error: any) {
  debug.error(Log.auth, 'Error:', error)
}

export function logUpdateProfile (displayName: string | null) {
  debug.log(Log.auth, `Update user profile${displayName ? ` to ${displayName}` : ''}`)
}
export function errorUpdateProfile (error: any) {
  debug.error(Log.auth, 'Failed to update user profile:', error)
}

export function logSendEmailVerification (email: string | null) {
  debug.log(Log.auth, `Sent email verification${email ? ` to ${email}` : ''}`)
}
export function errorSendEmailVerification (error: any) {
  debug.error(Log.auth, 'Failed to send email verification:', error)
}

export function logReload () {
  debug.log(Log.auth, 'Reloaded user data')
}
export function errorReload (error: any) {
  debug.error(Log.auth, 'Failed to reload user data:', error)
}

export function logEmailAlreadyVerified () {
  debug.error(Log.auth, 'Email is already verified')
}
