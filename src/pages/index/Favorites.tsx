import React, { Component } from 'react'
import { Text, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

interface Props { }

interface State { }

class Favorites extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    console.log('favorites')
  }

  render(): JSX.Element {
    return (
      <View style={styles.container}>
        <Text>Favorites page</Text>
      </View>
    )
  }

}

const styles = EStyleSheet.create({

  container: {
    flex: 1,
  },

})

export default Favorites