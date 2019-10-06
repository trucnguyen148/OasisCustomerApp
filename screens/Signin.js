import React from 'react';
import { Modal, FlatList, TouchableWithoutFeedback,StyleSheet, Animated } from 'react-native'
import {Button, Text, View, TextInput, Icon, Divider} from '@shoutem/ui';
import { styles } from '../components/styles';
import { SafeAreaView } from 'react-navigation';

class Signin extends React.Component{
    constructor() {
        super()
        this.springValue = new Animated.Value(0.7)
    }
    // Logo Animated
    componentDidMount () {
        this.spring()
      }
    spring () {
        this.springValue.setValue(0.7)
        Animated.spring(
          this.springValue,
          {
            toValue: 1,
            friction: 1
          }
        ).start()
    }

    render(){
        return(
            <View>
                  {/* Logo */}
                <View>
                    <Animated.Image
                        style={{ width: 150, height: 150, marginLeft: 'auto', marginRight: 'auto', marginTop: '20%', transform: [{scale: this.springValue}] }}
                        source={require('./../assets/images/logo.png')}
                    />  
                </View>
                {/* Input */}
                <View style={{marginTop: 50}}>
                  <View style={styles.inputLogin}>
                    <Icon style={{marginLeft: 10}} name="call" />
                    <TextInput placeholder={'Phone number'} />
                  </View>
                  <View style={styles.inputLogin}>
                    <Icon style={{marginLeft: 10}} name="lock" />
                    <TextInput placeholder={'Password'} secureTextEntry/>
                  </View>
                </View>

                {/* SignIn button */}
                <Button style={styles.buttonStyleMain} onPress={()=>this.props.navigation.navigate('MainTabNavigator')}><Text style={styles.buttonText}>Sign In</Text></Button>
                
                <Button style={{backgroundColor: 'transparent', borderColor: 'transparent'}} onPress={()=>this.props.navigation.navigate('Forgot')}><Text style={{color: '#c2185b'}}>Forgot Password?</Text></Button>
                <Divider/>
                <View style={styles.sameRowMain}>
                  <Text>Don't have an account?</Text>
                  <Button style={{backgroundColor: 'transparent', borderColor: 'transparent'}} onPress={()=>this.props.navigation.navigate('Signup')}><Text style={{color: '#c2185b'}}>Sign up</Text></Button>
                </View>
            </View>
        )
    }
    
}

export default Signin
