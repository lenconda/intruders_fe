import { Dimensions, Platform } from 'react-native'
import ErrorCode from './constants/error_code'

export const remUnit = Dimensions.get('window').width / 375

export const isAndroid = Platform.OS === 'android'

export function isNetworkError (error) {
  if (!(error instanceof Object)) {
    return false
  }

  if (error.message === ErrorCode.NetworkError) {
    return true
  }

  if (
    error.message === ErrorCode.ConnectTimeOut
    ||
    error.code === ErrorCode.ConnectTimeOut
  ) {
    return true
  }

  return false
}