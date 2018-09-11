import React, { Component } from 'react'
import { View, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { remUnit } from '../utils'

interface Props {
  icon?: string
  text?: string
}

interface State { }

class Badge extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
  }

  render(): JSX.Element {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.text}><Icon name={this.props.icon} size={13 * remUnit} color={'#b7bdc5'} />&nbsp;{this.props.text}</Text>
      </View>
    )
  }

}

const styles = EStyleSheet.create({

  wrapper: {
    paddingTop: '3rem',
    paddingRight: '5rem',
    paddingBottom: '3rem',
    paddingLeft: '5rem',
    backgroundColor: '$searchFieldBackgroundColor',
    borderRadius: '6rem',
    marginLeft: '2rem',
    marginRight: '2rem',
  },

  text: {
    color: '$searchFieldTextColor',
    fontSize: '12rem',
  },

})

export default Badge