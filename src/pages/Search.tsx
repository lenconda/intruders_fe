import React, { Component } from 'react'
import { View, Text, TouchableHighlight, Alert, FlatList } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Actions } from 'react-native-router-flux'
import { InputItem } from 'antd-mobile-rn'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { Toast, List } from 'antd-mobile-rn'

import { remUnit, isNetworkError } from '../utils'
import searchApi from '../networks/api/search'
import { SearchResponse } from '../networks/interfaces'
import Badge from '../components/Badge'

const ListView = FlatList as any

interface Props { }

interface State {
  searchText: string
  showSearchResults: boolean
  refreshState?: string
  searchResultItems: Array<any>
  page: number
  hasMore: boolean
  isLoading: boolean
}

class Search extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      searchText: '',
      showSearchResults: false,
      refreshState: RefreshState.Idle,
      searchResultItems: [],
      page: 1,
      hasMore: true,
      isLoading: false,
    }
  }

  resultItem = ({ item }): JSX.Element => {
    return (
      <TouchableHighlight
        underlayColor={'#f4f5f9'}
        style={styles.searchResult}
        onPress={() => {}}
      >
        <View>
          <Text numberOfLines={1}>{item.title}</Text>
          <View style={styles.badgesWrapper}>
            <Badge icon={'file-document'} text={item.type} />
            <Badge icon={'attachment'} text={item.size} />
            <Badge icon={'clock'} text={item.time} />
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  componentWillMount() {
    Actions.refresh({
      renderTitle: (): JSX.Element => {
        return (
          <View style={styles.searchFieldWrapper}>
            <View style={styles.searchFieldSearchIcon}>
              <Icon name={'magnify'} color={'#858c96'} size={16 * remUnit} />
            </View>
            <InputItem
              placeholder={'输入以搜索...'}
              styles={{}}
              style={styles.searchField}
              clear={true}
              updatePlaceholder={true}
              placeholderTextColor={'#b7bdc5'}
              onChangeText={async (newText) => {
                let searchResults
                if (newText !== '') {
                  try {
                    searchResults = await searchApi.search(newText, 1)
                  } catch (e) {
                    if (!isNetworkError(e)) {
                      Toast.fail('获取数据失败', 1)
                    }
                  }
                }
                this.setState({
                  searchText: newText,
                  searchResultItems: newText === '' ? [] : searchResults.data.data,
                  hasMore: newText === '' ? false : searchResults.data.hasmore,
                })
              }}
              autoFocus={true}
            ></InputItem>
          </View>
        )
      },
    })
  }

  render(): JSX.Element {
    return (
      <View style={styles.container}>
        <ListView
          style={{ height: '100%' }}
          data={this.state.searchResultItems}
          renderItem={this.resultItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={
            (this.state.searchText === '' || !this.state.hasMore) ? null :
              <TouchableHighlight
                style={styles.searchResult}
                underlayColor={'#f4f5f9'}
                onPress={async () => {
                  let searchResults
                  try {
                    searchResults = await searchApi.search(this.state.searchText, this.state.page)
                  } catch (e) {
                    if (!isNetworkError(e)) {
                      Toast.fail('获取数据失败，请稍后重试', 1)
                      return
                    }
                  }
                  this.setState({
                    page: this.state.page + 1,
                    searchResultItems: [...this.state.searchResultItems, ...searchResults.data.data]
                  })
                }}
              >
                <Text style={styles.loadMoreText}>{this.state.isLoading ? '加载中...' : '加载更多'}</Text>
              </TouchableHighlight>
          }
        >
        </ListView>
      </View>
    )
  }

}

const styles = EStyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  searchFieldWrapper: {
    flex: 1,
    backgroundColor: '$searchFieldBackgroundColor',
    width: '100%',
    height: '32rem',
    borderRadius: '16rem',
    padding: '3rem',
    paddingLeft: '8rem',
    paddingRight: '16rem',
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchField: {
    width: '100%',
    borderBottomWidth: 0,
    paddingLeft: '8rem',
  },

  searchFieldSearchIcon: {
    width: '13rem',
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchResult: {
    padding: '12rem',
    paddingTop: '10rem',
    marginBottom: '5rem',
  },

  loadMoreText: {
    color: '$tabSelectedIconColor',
    width: '100%',
    textAlign: 'center',
  },

  badgesWrapper: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: '12rem',
  },

})

export default Search