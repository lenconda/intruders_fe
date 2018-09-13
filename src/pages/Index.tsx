import React, { Component } from 'react'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import TabNavigator from 'react-native-tab-navigator'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Actions } from 'react-native-router-flux'

import { ReduxState } from '../redux/interface'
import { changeTabBar } from '../redux/modules/tab_navigation/actions'
import { remUnit } from  '../utils'

import Explore from './index/Explore'
import Hotspot from './index/Hotspot'
import Favorites from './index/Favorites'

const mapStateToProps = (state: ReduxState): object => {
  return {
    selected: state.tabNavigationState.selectedTab
  }
}

const mapDispatchToProps = (dispatch: any): object => {
  return {
    selectTab: (newTab: string) => {
      dispatch(changeTabBar(newTab))
    }
  }
}

interface Props {
  selected: string
  selectTab(newTab: string): void
}

interface State { }

class Index extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.selected !== this.props.selected) {
      Actions.refresh({ title: nextProps.selected })
    }
  }

  render(): JSX.Element {
    return (
      <TabNavigator
        hidesTabTouch={true}
        tabBarShadowStyle={styles.tabBarShadow}
        tabBarStyle={styles.tabBar}
      >
        <TabNavigator.Item
          selected={this.props.selected === '发现'}
          title={'发现'}
          titleStyle={styles.tabIconText}
          selectedTitleStyle={styles.tabSelectedIconText}
          renderIcon={() => <Icon color={'#7b8189'} name={'compass-outline'} size={26 * remUnit} />}
          renderSelectedIcon={() => <Icon color={'#1b88ee'} name={'compass'} size={26 * remUnit} />}
          onPress={() => {this.props.selectTab('发现')}}
        >
          <Explore jumpToHotspot={null} />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.props.selected === '热门'}
          title={'热门'}
          titleStyle={styles.tabIconText}
          selectedTitleStyle={styles.tabSelectedIconText}
          renderIcon={() => <Icon color={'#7b8189'} name={'cloud-outline'} size={26 * remUnit} />}
          renderSelectedIcon={() => <Icon color={'#1b88ee'} name={'cloud'} size={26 * remUnit} />}
          onPress={() => {this.props.selectTab('热门')}}
        >
          <Hotspot />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.props.selected === '收藏'}
          title={'收藏'}
          titleStyle={styles.tabIconText}
          selectedTitleStyle={styles.tabSelectedIconText}
          renderIcon={() => <Icon color={'#7b8189'} name={'bookmark-outline'} size={26 * remUnit} />}
          renderSelectedIcon={() => <Icon color={'#1b88ee'} name={'bookmark'} size={26 * remUnit} />}
          onPress={() => {this.props.selectTab('收藏')}}
        >
          <Favorites delFavorite={null} />
        </TabNavigator.Item>
      </TabNavigator>
    )
  }

}

const styles = EStyleSheet.create({

  tabIconText: {
    color: '$tabIconColor',
    fontSize: '11rem'
  },

  tabSelectedIconText: {
    color: '$tabSelectedIconColor'
  },

  tabBarShadow: {
    backgroundColor: 'transparent',
    height: 0
  },

  tabBar: {
    height: '50rem',
    // fontSize: '26rem',
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(Index)