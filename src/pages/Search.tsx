import React, { Component } from 'react'
import { View, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Actions } from 'react-native-router-flux'
import { InputItem } from 'antd-mobile-rn'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { Toast, List } from 'antd-mobile-rn'

import { remUnit, isNetworkError } from '../utils'
import searchApi from '../networks/api/search'
import { SearchResponse } from '../networks/interfaces'

interface Props { }

interface State {
  searchText: string
  showSearchResults: boolean
  refreshState?: string
  searchResultItems: object
  page: number
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
    }
  }

  resultItem = ({ item }): JSX.Element => {
    return (
      <List.Item style={styles.searchResultWrapper}>
        {item.title}
      </List.Item>
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
                      Toast.fail('获取数据失败，请稍后重试', 1)
                    }
                  }
                }
                this.setState({
                  searchText: newText,
                  searchResultItems: newText === '' ? [] : searchResults.data.data
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
        <View>
          <RefreshListView
            data={this.state.searchResultItems}
            renderItem={this.resultItem}
            refreshState={this.state.refreshState}
            keyExtractor={(item, index) => index.toString()}
          >
          </RefreshListView>
        </View>
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

  searchResultWrapper: {
    borderBottomWidth: 0,
  }

})

export default Search