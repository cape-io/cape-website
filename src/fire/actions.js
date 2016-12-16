import { createAction, noopAction } from 'cape-redux'

export const AUTH = 'fire/AUTH'
export const auth = noopAction(AUTH)
export const LOGOUT = 'fire/LOGOUT'
export const logout = noopAction(LOGOUT)
export const UPLOAD_FILE = 'fire/UPLOAD_FILE'
export const uploadFile = createAction(UPLOAD_FILE)
