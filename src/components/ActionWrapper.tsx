import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import EStyleSheet from 'react-native-extended-stylesheet'

import { remUnit } from '../utils'

interface Props {
  icon: string
  color: string
  text: string
}

interface State { }

class ActionWrapper extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
  }

  static defaultProps = {
    color: '#49505a',
  }

  render(): JSX.Element {
    return (
      <View style={styles.actionWrapper}>
        <Text style={[styles.actionText, { color: this.props.color }]}>
          <Icon name={this.props.icon} size={15 * remUnit} color={this.props.color} />
          &nbsp;{this.props.text}
        </Text>
      </View>
    )
  }

}

const styles = EStyleSheet.create({

  actionWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: '10rem',
    borderBottomWidth: 0,
  },

  actionText: {
    textAlign: 'left',
    width: '100%',
    fontSize: '15rem',
  }

})

export default ActionWrapper