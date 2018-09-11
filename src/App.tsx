import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { Provider } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import RNSplashScreen from 'react-native-splash-screen'

import Routes from './Routes'
import store from './redux/store'

EStyleSheet.build({
  $rem: Dimensions.get('window').width / 375,
  $backgroundColor: '#e6e7e9',
  $titleColor: '#323841',
  $textColor: '#49505a',
  $subTextColor: '#bec3e9',
  $tabIconColor: '#7b8189',
  $tabSelectedIconColor: '#1b88ee',
  $searchFieldTextColor: '#b7bdc5',
  $searchFieldIconColor: '#858c96',
  $searchFieldBackgroundColor: '#f4f5f7',
  $warning: '#ffc107'
})

interface Props { }

interface State { }

export default class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
  }

  componentDidMount() :void {
    RNSplashScreen.hide()
  }

  render(): JSX.Element {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }

}

const styles = EStyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '$backgroundColor',
    alignItems: 'center',
    justifyContent: 'center',
  },

})
