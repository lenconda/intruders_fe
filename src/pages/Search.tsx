import React, {Component, Touch} from 'react'
import { View, Text, TouchableHighlight, TouchableOpacity, Alert, FlatList } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Actions } from 'react-native-router-flux'
import { InputItem, Toast, List } from 'antd-mobile-rn'
import { connect } from 'react-redux'
import _ from 'lodash'

import { remUnit, isNetworkError, isAndroid } from '../utils'
import searchApi from '../networks/api/search'
import { SearchResponse } from '../networks/interfaces'
import Badge from '../components/Badge'
import { ReduxState } from '../redux/interface'

import { add_history, del_history, resort_history, clear_history } from '../redux/modules/search_history/actions'

const ListView = FlatList as any

interface Props {
  text?: string
  tab?: string
  histories: Array<string>
  addHistory(item: string): void
  delHistory(item: string): void
  resortHistory(item: string): void
  clearHistory(): void
}

interface State {
  searchText: string
  showSearchResults: boolean
  searchResultItems: Array<any>
  page: number
  hasMore: boolean
  isLoading: boolean
}

const mapStateToPtops = (state: ReduxState): object => {
  return {
    histories: state.historyState.histories
  }
}

const mapDispatchToProps = (dispatch: any): object => {
  return {
    addHistory: item => {
      dispatch(add_history(item))
    },
    delHistory: item => {
      dispatch(del_history(item))
    },
    resortHistory: item => {
      dispatch(resort_history(item))
    },
    clearHistory: () => {
      dispatch(clear_history())
    }
  }
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
    tab: '-1',
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

  historiesItem = ({ item }): JSX.Element => {
    return (
      <TouchableHighlight
        underlayColor={'#f4f5f9'}
        style={styles.listItemWrapper}
        onPress={async () => {
          this.addHistoryByDispatch(item)
          Toast.loading('搜索中...')
          let searchResults
          try {
            searchResults = await searchApi.search(item, 1, this.props.tab)
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
            searchText: item
          })
        }}
      >
        <View>
          <Text style={styles.listItemText} numberOfLines={1}>
            <Icon name={'magnify'} size={15 * remUnit} color={'#7b8189'} />
            &nbsp;{item}
          </Text>
          <TouchableOpacity
            style={styles.listChevronWrapper}
            onPress={() => {
              this.props.delHistory(item)
            }}
          >
            <Icon name={'close'} size={15 * remUnit} color={'#7b8189'} />
          </TouchableOpacity>
        </View>
      </TouchableHighlight>
    )
  }

  private addHistoryByDispatch = (item) => {
    if (!(_.find(this.props.histories, history => history === item ))) {
      this.props.addHistory(item)
    } else {
      this.props.resortHistory(item)
    }
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
                this.addHistoryByDispatch(this.state.searchText)
                let searchResults
                Toast.loading('搜索中...')
                try {
                  searchResults = await searchApi.search(this.state.searchText, 1, this.props.tab)
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
              autoFocus={this.props.text === '' ? true : false}
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
      this.addHistoryByDispatch(this.props.text)
      let searchResults
      try {
        searchResults = await searchApi.search(this.props.text, 1, this.props.tab)
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
            <View>
              {((this.state.searchText === '') || !this.state.hasMore) ? null :
                <TouchableHighlight
                  style={styles.searchResult}
                  underlayColor={'#f4f5f9'}
                  onPress={async () => {
                    let searchResults
                    try {
                      searchResults = await searchApi.search(this.state.searchText, this.state.page, this.props.tab)
                    } catch (e) {
                      if (!isNetworkError(e)) {
                        Toast.fail('获取数据失败', 1)
                        return
                      }
                    }
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
              {
                this.props.histories.length === 0 ? null :
                  <ListView
                    style={styles.historiesListWrapper}
                    data={this.props.histories}
                    renderItem={this.historiesItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={
                      <View
                        style={styles.listItemWrapper}
                      >
                        <View style={styles.clearHistoryWrapper}>
                          <Text style={[styles.clearHistoryText, { color: '#333' }]}>搜索历史</Text>
                          <TouchableOpacity
                            onPress={() => {
                              this.props.clearHistory()
                            }}
                          >
                            <Text style={[styles.clearHistoryText, { color: '#1b88ee' }]}>清空</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    }
                  />
              }
            </View>
          }
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

  searchFieldWrapper: {
    flex: 1,
    backgroundColor: isAndroid ? '#fff' : '$searchFieldBackgroundColor',
    width: '100%',
    borderRadius: '16rem',
    padding: isAndroid ? '1rem' : '8rem',
    paddingLeft: '8rem',
    paddingRight: '16rem',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: isAndroid ? 1 : 0,
    borderBottomColor: '$searchFieldBackgroundColor',
  },

  searchField: {
    width: '100%',
    height: '100%',
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

  listItemWrapper: {
    padding: '12rem',
  },

  listItemText: {
    color: '$titleColor',
    width: '100%',
  },

  listChevronWrapper: {
    width: '20rem',
    height: '20rem',
    position: 'absolute',
    right: 0,
  },

  historiesListWrapper: {
    borderTopWidth: 1,
    borderTopColor: '$searchFieldBackgroundColor',
  },

  clearHistoryWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  clearHistoryText: {
    fontSize: '12rem',
  },

})

export default connect(mapStateToPtops, mapDispatchToProps)(Search)