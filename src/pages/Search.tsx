import React, { Component } from 'react'
import { View, Text, TouchableHighlight, Alert, FlatList } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Actions } from 'react-native-router-flux'
import { InputItem } from 'antd-mobile-rn'
import { Toast, List } from 'antd-mobile-rn'

import { remUnit, isNetworkError } from '../utils'
import searchApi from '../networks/api/search'
import { SearchResponse } from '../networks/interfaces'
import Badge from '../components/Badge'

const ListView = FlatList as any

interface Props {
  text?: string
}

interface State {
  searchText: string
  showSearchResults: boolean
  searchResultItems: Array<any>
  page: number
  hasMore: boolean
  isLoading: boolean
}

class Search extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      searchText: this.props.text,
      showSearchResults: false,
      searchResultItems: [],
      page: 1,
      hasMore: false,
      isLoading: false,
    }
  }

  static defaultProps = {
    text: '',
  }

  resultItem = ({ item }): JSX.Element => {
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
              defaultValue={this.props.text}
              placeholderTextColor={'#b7bdc5'}
              onChange={async (newText) => {
                this.setState({
                  searchText: newText,
                  searchResultItems: newText === '' ? [] : this.state.searchResultItems,
                })
              }}
              onSubmitEditing={async () => {
                let searchResults
                Toast.loading('搜索中...')
                try {
                  searchResults = await searchApi.search(this.state.searchText, 1)
                  Toast.hide()
                } catch (e) {
                  if (!isNetworkError(e)) {
                    Toast.fail('获取数据失败', 1)
                  }
                }
                this.setState({
                  searchResultItems: searchResults.data.data,
                  hasMore: searchResults.data.hasmore,
                  page: 2,
                })
              }}
              autoFocus={true}
              autoCapitalize={'none'}
              spellCheck={false}
            ></InputItem>
          </View>
        )
      },
    })
  }

  async componentDidMount() {
    if (this.props.text !== '') {
      let searchResults
      try {
        searchResults = await searchApi.search(this.props.text, 1)
      } catch (e) {
        if (!isNetworkError(e)) {
          Toast.fail('获取数据失败', 1)
          return
        }
      }
      console.log('response:', searchResults.data)
      this.setState({
        page: 2,
        searchResultItems: searchResults.data.data,
        hasMore: searchResults.data.hasmore,
      })
    }
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
            ((this.state.searchText === '') || !this.state.hasMore) ? null :
              <TouchableHighlight
                style={styles.searchResult}
                underlayColor={'#f4f5f9'}
                onPress={async () => {
                  let searchResults
                  try {
                    searchResults = await searchApi.search(this.state.searchText, this.state.page)
                  } catch (e) {
                    if (!isNetworkError(e)) {
                      Toast.fail('获取数据失败', 1)
                      return
                    }
                  }
                  console.log('response:', searchResults.data)
                  this.setState({
                    page: this.state.page + 1,
                    searchResultItems: [...this.state.searchResultItems, ...searchResults.data.data],
                    hasMore: searchResults.data.hasmore
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
    padding: '10rem',
    paddingBottom: '18rem',
  },

  loadMoreText: {
    color: '$tabSelectedIconColor',
    width: '100%',
    textAlign: 'center',
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

})

export default Search