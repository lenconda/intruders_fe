import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Scene, Router, Actions, Stack } from 'react-native-router-flux'

import { isAndroid } from './utils'
const BackButton = require('./resources/image/back_button.png')

import Index from './pages/Index'
import Search from './pages/Search'
import WebviewContainer from './components/WebViewContainer'

const FixedRouter = Router as any

export default class AppRouter extends Component<any, any> {

  render(): JSX.Element {

    return (
      <FixedRouter
        sceneStyle={styles.sceneStyle}
        navigationBarStyle={styles.navigationBar}
        titleStyle={styles.navigationTitle}
        backButtonImage={BackButton}
        leftButtonIconStyle={styles.leftButtonIcon}
        rightButtonTextStyle={styles.rightButtonText}
      >
        <Stack key={'root'}>
          <Scene key={'index'} component={Index} title={'发现'} initial></Scene>
          <Scene key={'search'} component={Search} title={'搜索'} rightTitle={'取消'} onRight={() => {Actions.pop()}}></Scene>
          <Scene key={'webview'} component={WebviewContainer} title={'加载中...'}></Scene>
        </Stack>
      </FixedRouter>
    )

  }

}

const styles = EStyleSheet.create({

  sceneStyle: {
    backgroundColor: '$backgroundColor'
  },

  navigationBar: {
    height: '45rem',
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    elevation: 0,
  },

  navigationTitle: {
    flex: 1,
    fontSize: '15rem',
    color: '$titleColor',
  },

  leftButtonIcon: {
    width: '13rem',
    height: '13rem',
    marginLeft: isAndroid ? '10rem' : 0,
    marginTop: isAndroid ? '8rem' : '4rem',
    position: isAndroid ? undefined : 'absolute',
    left: isAndroid ? undefined : '23.5rem'
  },

  rightButtonText: {
    fontSize: '14rem',
    color: '$tabSelectedIconColor',
    textAlign: 'center',
    position: 'relative',
    left: isAndroid ? '1rem' : '-10rem',
    top: isAndroid ? 0 : '2rem',
  },

})