import React, { Component } from 'react'
import { View, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { remUnit } from '../utils'

interface Props {
  icon?: string
  text?: string
  style: object
  textColor: string
  bkgColor: string
}

interface State { }

class Badge extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
  }

  static defaultProps = {
    style: {},
    bkgColor: '#f4f5f7',
    textColor: '#b7bdc5',
  }

  render(): JSX.Element {
    return (
      <View style={[styles.wrapper, this.props.style, { backgroundColor: this.props.bkgColor }]}>
        <Text style={[styles.text, { color: this.props.textColor }]}>
          <Icon name={this.props.icon} size={9 * remUnit} color={this.props.textColor} />
          &nbsp;
          {this.props.text}
        </Text>
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
    borderRadius: '6rem',
  },

  text: {
    fontSize: '9rem',
  },

})

export default Badge