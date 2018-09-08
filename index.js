import { AppRegistry } from 'react-native'
import App from './src/App'
import { YellowBox } from 'react-native'

AppRegistry.registerComponent('Intruders', () => App)
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])
YellowBox.ignoreWarnings(['Class RCTCxxModule'])