import React from 'react';
import { ScrollView, Modal, FlatList, TouchableWithoutFeedback,StyleSheet, Animated } from 'react-native'
import {Button, Text, View} from '@shoutem/ui';
import {
    Item,
    Input,
    Icon
  } from 'native-base';
import data from './../components/Countries';
import { styles } from '../components/styles';

const defaultFlag = data.filter(
    obj => obj.name === 'Vietnam'
    )[0].flag


class Signup extends React.Component{
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

    state = {
        flag: defaultFlag,
        modalVisible: false,
        phoneNumber: '',
    }
    showModal() {
        this.setState({ modalVisible: true })
    }
    hideModal() {
        this.setState({ modalVisible: false })
        // Refocus on the Input field after selecting the country code
        this.refs.PhoneInput._root.focus()
    }
    async selectCountry(country) {
        // Get data from Countries.js  
        const countryData = await data
        try {
          // Get the country code
          const countryCode = await countryData.filter(
            obj => obj.name === country
          )[0].dial_code
          // Get the country flag
          const countryFlag = await countryData.filter(
            obj => obj.name === country
          )[0].flag
          // Update the state then hide the Modal
          this.setState({ phoneNumber: countryCode, flag: countryFlag })
          await this.hideModal()
        }
        catch (err) {
          console.log(err)
        }
    }
    onChangeText(key, value) {
        this.setState({
          [key]: value
        })
    }
    render(){
        const countryData = data
        return(
            <View>
                  {/* Logo */}
                <View>
                    <Animated.Image
                        style={{ width: 150, height: 150, marginLeft: 'auto', marginRight: 'auto', marginTop: '20%', transform: [{scale: this.springValue}] }}
                        source={require('./../assets/images/logo.png')}
                    />  
                </View>
                
                {/* Title and Phone input */}
                <View>
                    <Text style={{marginTop: 40 ,marginBottom: 40, textAlign: 'center'}}>Please type your phone number</Text>
                    <Item rounded >
                        <Icon
                        active
                        name='call'
                        style={styles.iconStyle}
                        />
                        {/* Country flag */}
                        <View><Text>{this.state.flag}</Text></View>
                        <Icon
                            active
                            name='md-arrow-dropdown'
                            style={[styles.iconStyle, { marginLeft: 0 }]}
                            onPress={() => this.showModal()}
                            />
                            <Input
                            placeholder='+44766554433'
                            placeholderTextColor='#adb4bc'
                            keyboardType={'phone-pad'}
                            returnKeyType='done'
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={false}
                            style={styles.inputStyle}
                            value={this.state.phoneNumber}
                            ref='PhoneInput'
                            onChangeText={(val) => this.onChangeText('phoneNumber', val)}
                            />
                    </Item>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 7, marginTop: 80 }}>
                            {/* Render the list of countries */}
                            <FlatList
                                data={countryData}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={
                                ({ item }) =>
                                    <TouchableWithoutFeedback onPress={() =>       this.selectCountry(item.name)}>
                                    <View style={styles.countryStyle}>
                                        <Text>
                                        {item.flag} {item.name} ({item.dial_code})
                                        </Text>
                                    </View>
                                    </TouchableWithoutFeedback>
                                }
                            />
                            </View>
                            <Button
                            onPress={() => this.hideModal()}>
                            <Icon name="ios-close-circle" style={{backgroundColor: '#c2185b'}}/>
                            </Button>
                        </View>
                    </Modal>
                </View>
                
                <View style={{marginTop: 60}}>
                    <Button style={styles.buttonStyleMain} onPress={()=>this.props.navigation.navigate('Verify')}><Text style={styles.buttonText}>Signup</Text></Button>
                    <View style={styles.sameRowMain}>
                        <Text>Already have account?</Text>
                        <Button style={{backgroundColor: 'transparent', borderColor: 'transparent'}} onPress={()=>this.props.navigation.navigate('Main')}><Text style={{color: '#c2185b'}}>Sign in</Text></Button>
                    </View>
                </View>
            </View>
        )
    }
    
}

export default Signup
