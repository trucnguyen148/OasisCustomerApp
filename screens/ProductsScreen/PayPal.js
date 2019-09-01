import React from 'react';
import { ScrollView, StyleSheet} from 'react-native';
import { Image, Divider } from '@shoutem/ui';

class PayPal extends React.Component {
    render(){
        return (
            <ScrollView>
                <Image style={styles.center} source={require('./../../assets/images/paypal.png')
                }
                />
                <Divider/>
            </ScrollView>
        )
    }
}

export default PayPal

const styles = StyleSheet.create({
    center:{
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})