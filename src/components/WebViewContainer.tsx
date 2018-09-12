import React, { Component } from 'react'
import { View, Text, WebView, Button } from 'react-native'
import { Toast } from 'antd-mobile-rn'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {remUnit} from '../utils'

interface Props {
  url: string
  detail?: string
}

interface State { }

class WebContainer extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
  }

  componentWillMount() {
    Actions.refresh({
      rightTitle: <Icon name={'dots-vertical'} size={16 * remUnit} color={'#333'} />,
      onRight: () => {
        console.log('...')
      }
    })
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <WebView
          // ref={(webview) => this.webview = webview}
          source={{ uri: this.props.url }}
          onError={() => {Toast.offline('网页加载失败', 1)}}
          onLoadStart={() => {Toast.loading('加载中...')}}
          onLoad={() => {Toast.hide()}}
          javaScriptEnabled={true}
          // allowFileAccessFromFileURLs={true}
          onNavigationStateChange={(navState) => {
            console.log(navState.title)
            Actions.refresh({ title: navState.title })
          }}
        />
      </View>
    )

  }

}

export default WebContainer