import { Dimensions, Platform } from 'react-native'

export const remUnit = Dimensions.get('window').width / 375

export const isAndroid = Platform.OS === 'android'