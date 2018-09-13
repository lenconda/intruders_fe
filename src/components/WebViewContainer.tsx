import React, { Component } from 'react'
import {View, WebView } from 'react-native'
import { Toast } from 'antd-mobile-rn'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {remUnit} from '../utils'
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'

import ActionWrapper from '../components/ActionWrapper'

const options = [
  <ActionWrapper icon={'close-box'} text={'取消'} iconColor={'#d4483e'} />,
  <ActionWrapper icon={'bookmark'} text={'收藏'} />,
]

interface Props {
  url: string
  detail?: string
  ActionSheet?: JSX.Element
}

interface State { }

class WebContainer extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
  }

  private ActionSheet?: any

  showActionSheet = () => {
    this.ActionSheet.show()
  }

  componentWillMount() {
    Actions.refresh({
      rightTitle: <Icon name={'dots-vertical'} size={16 * remUnit} color={'#333'} />,
      onRight: this.showActionSheet
    })
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: this.props.url }}
          onError={() => {Toast.offline('网页加载失败', 1)}}
          onLoadStart={() => {Toast.loading('加载中...')}}
          onLoad={() => {Toast.hide()}}
          javaScriptEnabled={true}
          onNavigationStateChange={(navState) => {
            console.log(navState.title)
            Actions.refresh({ title: navState.title })
          }}
        />
        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={options}
          onPress={(index) => {
            if (index === 1) {

            }
          }}
          cancelButtonIndex={0}
        />
      </View>
    )

  }

}

export default WebContainer