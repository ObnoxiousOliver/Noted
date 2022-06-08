// import { useUserState } from '../store'
import {
  createUserWithEmailAndPassword,
  getAuth,
  reload,
  updateProfile,
  // User,
  sendEmailVerification as firebaseSendEmailVerification
} from 'firebase/auth'
import {
  errorEmailAlreadyInUse,
  errorInvalidEmail,
  errorReload,
  errorSendEmailVerification,
  errorUnknown,
  errorUpdateProfile,
  errorWeakPassword,
  logReload,
  logSendEmailVerification,
  logSignInAs,
  logUpdateProfile
} from './logging'

const auth = getAuth()

export async function reloadUser () {
  if (auth.currentUser) {
    try {
      await reload(auth.currentUser)

      updateUserState(/* auth.currentUser */)

      logReload()
    } catch (err) {
      errorReload(err)
    }
  }
}

export async function sendEmailVerification () {
  try {
    if (auth.currentUser) {
      await firebaseSendEmailVerification(auth.currentUser)
      logSendEmailVerification(auth.currentUser?.email)
    }
  } catch (err) {
    errorSendEmailVerification(err)
  }
}

export function updateUserState (/* user: User | null */) {
  // const userState = useUserState()

  // userState.user = user
  // userState.emailVerified = user?.emailVerified ?? false
  // userState.displayName = user?.displayName ?? ''
  // userState.isLoggedIn = !!user
}

export async function createAccountWithEmailPasswordAndName (email: string, password: string, displayName: string) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
    logSignInAs(userCredentials.user.email)

    try {
      // Set Display Name
      await updateProfile(userCredentials.user, { displayName: displayName.trim() })
      logUpdateProfile(userCredentials.user.displayName)
    } catch (err) {
      errorUpdateProfile(err)
    }

    try {
      // Send email verification
      await sendEmailVerification()
    } catch (err) {
      errorSendEmailVerification(err)
    }

    await reloadUser()
  } catch (err: any) {
    switch (err.code) {
      case 'auth/invalid-email':
        errorInvalidEmail()
        break

      case 'auth/email-already-in-use':
        errorEmailAlreadyInUse()
        break

      case 'auth/weak-password':
        errorWeakPassword()
        break

      default:
        errorUnknown(err)
        break
    }

    throw err
  }
}
