import React, {Component, Ref} from 'react'
import { TouchableHighlight, View, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import hotspotApi from '../networks/api/hotspot'
import { isNetworkError, remUnit } from '../utils'
import { Toast } from 'antd-mobile-rn'
import { Actions } from 'react-native-router-flux'

interface Props {
  id?: string
  tabLabel: string
}

interface State {
  items?: Array<any>
  RefreshState: any
}

class HotspotList extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      RefreshState: RefreshState.Idle,
    }
  }

  private fetchLists = async (id: any) => {
    this.setState({
      RefreshState: RefreshState.HeaderRefreshing
    })
    let lists
    try {
      lists = await hotspotApi.getLists(id)
      this.setState({
        RefreshState: RefreshState.Idle
      })
    } catch (e) {
      if (!isNetworkError(e)) {
        Toast.fail('获取数据失败', 1)
        return []
      }
      this.setState({
        RefreshState: RefreshState.Idle
      })
    }
    return lists.data.data
  }

  async componentWillMount() {
    let items = await this.fetchLists(this.props.id)
    this.setState({
      items,
    })
  }

  renderItem = ({ item }): JSX.Element => {
    return (
      <TouchableHighlight
        underlayColor={'#f4f5f9'}
        onPress={() => {
          Actions.push('search', {
            text: item.title,
            tab: item.tab,
          })
        }}
        style={styles.listItemWrapper}
      >
        <View>
          <Text style={styles.listItemText} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={styles.listChevronWrapper}>
            <Icon name={'chevron-right'} size={15 * remUnit} color={'#7b8189'} />
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render(): JSX.Element {
    return (
      <View style={styles.container}>
        <RefreshListView
          data={this.state.items}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          onHeaderRefresh={() => {
            this.fetchLists(this.props.id)
          }}
          onFooterRefresh={null}
          refreshState={this.state.RefreshState}
        />
      </View>
    )
  }

}

const styles = EStyleSheet.create({

  container: {
    flex: 1,
  },

  listItemWrapper: {
    padding: '12rem',
  },

  listItemText: {
    color: '$titleColor',
    width: '100%',
  },

  listChevronWrapper: {
    position: 'absolute',
    right: 0,
  },

})

export default HotspotList