import React, { Component } from 'react'
import { View, WebView, Platform, BackHandler } from 'react-native'
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile-rn'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {remUnit} from '../utils'
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
import _ from 'lodash'

import { ReduxState } from '../redux/interface'
import ActionWrapper from '../components/ActionWrapper'
import { add_favorite, del_favorite } from '../redux/modules/favorites/actions'

const mapStateToProps = (state: ReduxState): object => {
  return {
    favorites: state.favoritesState.favorites
  }
}

const mapDispatchToProps = (dispatch: any): object => {
  return {
    addFavorite: (detail: object): void => {
      dispatch(add_favorite(detail))
    },
    delFavorite: (detail: object): void => {
      dispatch(del_favorite(detail))
    }
  }
}

interface Props {
  url: string
  detail?: any
  ActionSheet?: JSX.Element
  WebView?: JSX.Element
  favorites?: Array<any>
  addFavorite(detail: any): void
  delFavorite(detail: any): void
}

interface State {
  canGoBack?: any
}

class WebContainer extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      canGoBack: false
    }
  }

  private ActionSheet?: any

  private WebView?: any

  showActionSheet = () => {
    this.ActionSheet.show()
  }

  componentWillMount() {
    Actions.refresh({
      rightTitle: this.props.detail.url ? <Icon name={'dots-vertical'} size={16 * remUnit} color={'#333'} /> : null,
      onRight: this.showActionSheet
    })
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }
  }

  private onBackAndroid = (): boolean => {
    if (this.state.canGoBack) {
      this.WebView.goBack();
      return true
    } else {
      return false
    }
  }

  render(): JSX.Element {

    return (
      <View style={{ flex: 1 }}>
        <WebView
          ref={webview => this.WebView = webview}
          source={{ uri: this.props.url }}
          onError={() => {Toast.offline('网页加载失败', 1)}}
          onLoadStart={() => {Toast.loading('加载中...')}}
          onLoad={() => {Toast.hide()}}
          javaScriptEnabled={true}
          onNavigationStateChange={(navState) => {
            Actions.refresh({ title: navState.title })
            this.setState({
              canGoBack: navState.canGoBack
            })
          }}
        />
        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={[
            <ActionWrapper icon={'close-box'} text={'取消'} />,
            _.find(this.props.favorites, this.props.detail) ? <ActionWrapper icon={'bookmark-outline'} text={'取消收藏'} /> : <ActionWrapper icon={'bookmark'} text={'收藏'} />,
          ]}
          onPress={(index) => {
            let liked = _.find(this.props.favorites, this.props.detail)
            if (index === 1) {
              if (liked) {
                this.props.delFavorite(this.props.detail)
              } else {
                this.props.addFavorite(this.props.detail)
              }
              Toast.info(`${liked ? '已从收藏夹中删除' : '已添加到收藏夹'}`, 1)
            }
          }}
          cancelButtonIndex={0}
        />
      </View>
    )

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(WebContainer)