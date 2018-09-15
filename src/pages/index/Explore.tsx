import React, { Component } from 'react'
import {Text, View, TouchableOpacity, Button } from 'react-native'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { remUnit } from '../../utils'
import { changeTabBar } from '../../redux/modules/tab_navigation/actions'

const mapDispatchToProps = (dispatch: any): object => {
  return {
    jumpToHotspot: () => {
      dispatch(changeTabBar('热门'))
    }
  }
}

interface Props {
  jumpToHotspot: any
}

interface State { }

class Explore extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    console.log('explore')
  }

  render(): JSX.Element {
    return (
      <View style={styles.container}>
        <View style={styles.searchFieldWrapper}>
          <View style={styles.searchFieldIcon}>
            <Icon name={'magnify'} size={16 * remUnit} color={'#858c96'}></Icon>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              Actions.push('search')
            }}
            style={{ width: '100%' }}
          >
            <Text style={styles.searchFieldText}>搜索云资源</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.searchFieldRightWrapper}
            activeOpacity={1}
            onPress={() => {
              this.props.jumpToHotspot()
            }}
          >
            <View style={styles.searchFieldLeftLine}></View>
            <Text style={styles.searchFieldRightText}>热门</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            Actions.push('webview', {url: 'https://blog.lenconda.top', detail: {url: 'https://blog.lenconda.top'}})
          }}
        >
          <Text>Fuck rn</Text>
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = EStyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
  },

  searchFieldWrapper: {
    marginTop: '20rem',
    width: '320rem',
    height: '32rem',
    borderRadius: '16rem',
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingLeft: '36rem',
  },

  searchFieldIcon: {
    position: 'absolute',
    left: '13rem',
  },

  searchFieldText: {
    color: '$searchFieldTextColor',
    fontSize: '13rem',
  },

  searchFieldRightWrapper: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    paddingRight: '20rem',
    paddingTop: '8rem',
    paddingBottom: '8rem',
  },

  searchFieldRightText: {
    color: '$tabSelectedIconColor',
  },

  searchFieldLeftLine: {
    width: '1rem',
    height: '100%',
    backgroundColor: '$searchFieldTextColor',
    marginRight: '20rem',
  },

})

export default connect(null, mapDispatchToProps)(Explore)