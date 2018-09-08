import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Actions } from 'react-native-router-flux'
import { InputItem } from 'antd-mobile-rn'

import { remUnit } from '../utils'

interface Props { }

interface State {
  searchText: string
  showClearButton: boolean
}

class Search extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      searchText: '',
      showClearButton: false,
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
              style={styles.searchField}
              // clearButtonMode={'while-editing'}
              clear
              placeholderTextColor={'#b7bdc5'}
              onChangeText={newText => {
                this.setState({
                  searchText: newText,
                  showClearButton: newText === '' ? false : true
                })
              }}
            ></InputItem>
            <View style={styles.searchFieldSearchIcon}>
              {this.state.showClearButton ? <Icon name={'close-circle'} color={'#858c96'} size={16 * remUnit} /> : null}
            </View>
          </View>
        )
      },
    })
  }

  render(): JSX.Element {
    return (
      <View style={styles.container}>
        <View>
          <Text>{this.state.searchText}</Text>
        </View>
      </View>
    )
  }

}

const styles = EStyleSheet.create({

  container: {
    flex: 1,
  },

  searchFieldWrapper: {
    backgroundColor: '$searchFieldBackgroundColor',
    width: '100%',
    height: '32rem',
    borderRadius: '16rem',
    padding: '3rem',
    paddingLeft: 0,
    paddingRight: '26rem',
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchField: {
    width: '100%',
    borderBottomWidth: 0,

  },

  searchFieldSearchIcon: {
    width: '13rem',
    justifyContent: 'center',
    alignItems: 'center',
  },

})

export default Search