import React, { Component } from 'react'
import { Text, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import RNScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'

import hotsoptApi from '../../networks/api/hotspot'
import { isNetworkError } from '../../utils'
import { Toast } from 'antd-mobile-rn'

import HotspotList from '../HotspotList'

interface Props { }

interface State {
  categories?: any
}

class Hotspot extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      categories: [{
        id: 'home',
        name: '加载中...'
      }]
    }
  }

  async componentDidMount() {
    let categories
    try {
      categories = await hotsoptApi.fetchCategories()
    } catch (e) {
      if (!isNetworkError(e)) {
        Toast.fail('获取数据失败', 1)
      }
    }
    this.setState({
      categories: categories.data.data
    })
  }

  render(): JSX.Element {
    return (
      <View style={styles.container}>
        <RNScrollableTabView
          renderTabBar={() => <ScrollableTabBar style={styles.tabBar} />}
          tabBarUnderlineStyle={styles.underline}
          tabBarTextStyle={styles.tabText}
          tabBarActiveTextColor={'#1b88ee'}
          tabBarInactiveTextColor={'#49505a'}
        >
          {
            this.state.categories.map((category, index): any => {
              return (
                <HotspotList key={index} id={category.id} tabLabel={category.name} />
              )
            })
          }
        </RNScrollableTabView>
      </View>
    )
  }

}

const styles = EStyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  underline: {
    height: 0,
    width: 0,
  },

  tabText: {
    fontSize: '13rem',
  },

  tabBar: {
    borderBottomColor: '$searchFieldBackgroundColor',
    height: '45rem',
  },

})

export default Hotspot