import React from 'react';
import { View, Title, Text, Icon, Subtitle, Button } from '@shoutem/ui';
import { Input } from 'native-base';
import { styles, buttons } from '../../components/styles';

class Verify extends React.Component{
    render(){
        return(
            <View style={styles.containerModal}>
                <Title style={styles.titleModal}>CONFIRM BY PHONE NUMBER</Title>
                <Text>We've sent a verification code to your phone number. It might take a minute or two for the message to arrive</Text>
                <View style={styles.sameRow}>
                    <Input style={styles.inputVerify}/>
                    <Input style={styles.inputVerify}/>
                    <Input style={styles.inputVerify}/>
                    <Input style={styles.inputVerify}/>
                </View>
                <View style={styles.sameRow}>
                    <Text>Didn't get it?</Text>
                    <Button style={{backgroundColor: 'transparent', borderColor: 'transparent'}}><Text style={{color: '#c2185b'}}>Resend</Text></Button>
                </View>
                <View style={styles.sameRow}>
                <Button onPress={()=>this.props.navigation.navigate('Signup')} style={styles.buttonStyleMain} >
                    {/* <Icon style={{color: '#fff'}} name="left-arrow"/> */}
                    <Text style={styles.buttonText}>Back </Text>
                </Button>
                <Button onPress={()=>this.props.navigation.navigate('MainTabNavigator')} style={styles.buttonStyleMain} >
                    {/* <Icon style={{color: '#fff'}} name="left-arrow"/> */}
                    <Text style={styles.buttonText}>Confirm </Text>
                </Button>
                </View>
            </View>
        )
    }
}

export default Verify
