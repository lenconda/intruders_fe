import React, { Component } from 'react'
import { View, WebView, Platform, Image, BackHandler, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile-rn'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { isAndroid, remUnit } from '../utils'
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
import _ from 'lodash'
import EStyleSheet from 'react-native-extended-stylesheet'

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
  title?: string
}

let instance = {
  onBack: () => {}
} as WebContainer

class WebContainer extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      canGoBack: false
    }
    BackHandler.addEventListener('hardwareBackPress', this.onBack)
  }

  private ActionSheet?: any

  private WebView?: any

  showActionSheet = () => {
    this.ActionSheet.show()
  }

  private renderTitle = (title: any, shouldClose: boolean) => {
    return (
      <View style={styles.navigationTitle}>
        {
          shouldClose &&
          <TouchableOpacity
            onPress={() => {Actions.pop()}}
            style={styles.closeIcon}
          >
            <Icon name={'close'} size={16 * remUnit} />
          </TouchableOpacity>
        }
        <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
      </View>
    )
  }

  componentWillMount() {
    Actions.refresh({
      rightTitle: this.props.detail.url ? <Icon name={'dots-vertical'} size={16 * remUnit} color={'#333'} /> : null,
      onRight: this.showActionSheet,
      onBack: () => this.onBack(),
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBack)
  }

  onBack = (): boolean => {
    if (this.state.canGoBack) {
      this.WebView.goBack()
      return true
    } else {
      Actions.pop()
    }
    return true
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
            Actions.refresh({
              title: navState.title,
              renderTitle: this.renderTitle(navState.title, navState.canGoBack)
            })
            this.setState({
              canGoBack: navState.canGoBack,
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

const styles = EStyleSheet.create({

  navigationTitle: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  titleText: {
    width: '100%',
    color: '#333',
    fontSize: '15rem',
  },

  closeIcon: {
    marginRight: '10rem',
  },

  return: {
    width: '13rem',
    height: '13rem',
    alignItems: 'center',
    justifyContent: 'center',
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(WebContainer)