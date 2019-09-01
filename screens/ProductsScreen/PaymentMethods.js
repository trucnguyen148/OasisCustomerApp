import React from 'react';
import { ScrollView } from 'react-native';
import {  Text, Button, Divider } from '@shoutem/ui';

import {styles} from './../../components/styles'

class PaymentMethods extends React.Component {
    render(){
        return(
            <ScrollView style={styles.container}>
                <Button 
                    onPress={() => this.props.navigation.navigate('VisaCard')}
                    style={styles.buttonStyle} 
                >
                    <Text style={styles.buttonText}>Visa Card</Text>
                </Button>
                <Divider/>
                <Button 
                    onPress={() => this.props.navigation.navigate('MasterCard')}
                    style={styles.buttonStyle}
                >
                    <Text style={styles.buttonText}>Master Card</Text>
                </Button>
                <Divider />
                <Button 
                    onPress={() => this.props.navigation.navigate('PayPal')}
                    style={styles.buttonStyle}
                >
                    <Text style={styles.buttonText}>Paypal</Text>
                </Button>
            </ScrollView>
        )
    }
}

export default PaymentMethods

PaymentMethods.navigationOptions = {
    title: 'PAYMENT OPTIONS',
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
