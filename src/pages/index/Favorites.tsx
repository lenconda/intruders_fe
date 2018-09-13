import React, { Component } from 'react'
import { Text, View, FlatList, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { ReduxState } from '../../redux/interface'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Actions } from 'react-native-router-flux'
import Badge from '../../components/Badge'
import { del_favorite } from '../../redux/modules/favorites/actions'
import { Toast } from 'antd-mobile-rn'
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'

import ActionWrapper from '../../components/ActionWrapper'

const ListView = FlatList as any

const mapStateToProps = (state: ReduxState): object => {
  return {
    favorites: state.favoritesState.favorites
  }
}

const mapDispatchToProps = (dispatch: any): object => {
  return {
    delFavorite: (detail: any) => {
      dispatch(del_favorite(detail))
    }
  }
}

interface Props {
  favorites?: any
  delFavorite(detail: any): void
}

interface State {
  selected?: object
}

class Favorites extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      selected: {}
    }
  }

  private ActionSheet?: any

  showActionSheet = () => {
    this.ActionSheet.show()
  }

  renderItem = ({ item }): JSX.Element => {
    return (
      <TouchableHighlight
        underlayColor={'#f4f5f9'}
        style={styles.searchResult}
        onPress={() => {
          Actions.push('webview', {
            url: item.url,
            detail: item
          })
        }}
        onLongPress={() => {
          this.setState({
            selected: item
          })
          this.showActionSheet()
        }}
      >
        <View>
          <Text numberOfLines={1}>{item.title}</Text>
          <View style={styles.badgesWrapper}>
            <Badge icon={'file-document'} text={item.type} style={[styles.badges, { marginLeft: 0 }]} />
            <Badge icon={'attachment'} text={item.size} style={styles.badges} />
            <Badge icon={'clock'} text={item.time} style={styles.badges} />
            {
              !item.encrypt ? null :
                <Badge icon={'key'} text={item.password} style={styles.badges} textColor={'#fff'} bkgColor={'#ffc107'} />
            }
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render(): JSX.Element {
    return (
      <View style={styles.container}>
        {
          this.props.favorites.length === 0 ?
            <View style={styles.noItem}>
              <Text style={{ color: '#b7bdc5' }}>暂无收藏内容</Text>
            </View> :
            <ListView
              style={{ height: '100%' }}
              data={this.props.favorites}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            >
            </ListView>
        }
        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={[
            <ActionWrapper icon={'close-box'} text={'取消'} />,
            <ActionWrapper icon={'delete'} text={'删除'} />,
          ]}
          onPress={(index) => {
            if (index === 1) {
              this.props.delFavorite(this.state.selected)
              Toast.info('已从收藏夹中删除', 1)
            }
          }}
          cancelButtonIndex={0}
        />
      </View>
    )
  }

}

const styles = EStyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  searchResult: {
    padding: '10rem',
    paddingBottom: '18rem',
  },

  badgesWrapper: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: '3rem',
  },

  badges: {
    marginRight: '2rem',
    marginLeft: '2rem',
  },

  noItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40rem',
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)