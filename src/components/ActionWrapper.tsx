import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import EStyleSheet from 'react-native-extended-stylesheet'

import { remUnit } from '../utils'

interface Props {
  icon: string
  iconColor: string
  textColor: string
  text: string
}

interface State { }

class ActionWrapper extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
  }

  static defaultProps = {
    iconColor: '#49505a',
    textColor: '#333',
  }

  render(): JSX.Element {
    return (
      <View style={styles.actionWrapper}>
        <View style={styles.actionContentWrapper}>
          <Icon name={this.props.icon} size={18 * remUnit} color={this.props.iconColor} />
          <View style={styles.actionTextWrapper}>
            <Text style={[styles.actionText, { color: this.props.textColor }]}>{this.props.text}</Text>
          </View>
        </View>
      </View>
    )
  }

}

const styles = EStyleSheet.create({

  actionWrapper: {
    flexDirection: 'row',
    paddingLeft: '15rem',
    borderBottomWidth: 0,
  },

  actionContentWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginLeft: '15rem',
  },

  actionTextWrapper: {
    marginLeft: '15rem',
  },

  actionText: {
    fontSize: '15rem',
  }

})

export default ActionWrapper