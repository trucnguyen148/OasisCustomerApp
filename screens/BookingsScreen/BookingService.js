import React from 'react';
import { ScrollView, View, FlatList } from 'react-native';
import { Button, Text, Divider, Image } from '@shoutem/ui';
import { styles } from './../../components/styles'

import { graphql } from 'react-apollo';
import { getServicessQuery } from '../../components/queries/queries';

class BookingService extends React.Component {
  render() {
    if (this.props.data.loading) {
      return (
        <View >
          <Image
            style={styles.logo}
            source={require("./../../assets/images/logo.png")}
          />
        </View>
      )
    } else {
      return (
        <ScrollView style={styles.container}>
          <FlatList
            data={this.props.data.positions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View >
                <Button
                  style={styles.buttonStyle}
                  onPress={() => {
                    global.booking_serviceId = item.id
                    this.props.navigation.navigate('Times')
                  }}
                >
                  <Text style={styles.buttonText}>{item.name}</Text>
                </Button>
                <Divider />
              </View>

            )}
          />
        </ScrollView>
      )
    }

  }
}

export default graphql(getServicessQuery)(BookingService)

BookingService.navigationOptions = {
  title: 'SERVICE',
  headerTintColor: '#000000',
  headerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 0.3,
    borderBottomColor: '#000000'
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 18
  },

};
