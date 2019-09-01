import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text, Divider } from '@shoutem/ui';
import {styles} from './../../components/styles'


class BookingService extends React.Component {
  render(){
    return (
      <ScrollView style={styles.container}>
        <View >
        {/* Nails button */}
        <Button
          style={styles.buttonStyle}
          onPress={() => this.props.navigation.navigate('Times')}
        >
          <Text style={styles.buttonText}>Nails</Text>
        </Button>
        <Divider />
        {/* Permanent Make-up */}
        <Button
          style={styles.buttonStyle}
          onPress={() => this.props.navigation.navigate('Times')}
        >
          <Text style={styles.buttonText}>Permanent Make-up</Text>
        </Button>
        <Divider/>
        {/* Eyelash extention */}
        <Button
          style={styles.buttonStyle}
          onPress={() => this.props.navigation.navigate('Times')}
        >
          <Text style={styles.buttonText}>Eyelash Extention</Text>
        </Button>
        </View>
      </ScrollView>
    )
  }
}

export default BookingService

BookingService.navigationOptions = {
  title: 'SERVICE',
  headerTintColor :'#000000',
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
