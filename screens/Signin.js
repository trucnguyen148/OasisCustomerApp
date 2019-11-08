import React from 'react';
import { Animated } from 'react-native'
import { Button, Text, View, TextInput, Icon, Divider } from '@shoutem/ui';
import { styles } from '../components/styles';
import { URL, makeRequest } from './../components/api';


class Signin extends React.Component {
  constructor(props) {
    super(props)
    this.springValue = new Animated.Value(0.7)
    this.state = {
      phone: "012347",
      password: "truc123",
      user: [],
    }

  }
  // Logo Animated
  componentDidMount() {
    this.spring()
  }
  spring() {
    this.springValue.setValue(0.7)
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 1
      }
    ).start()
  }



  signIn() {
    if (this.state.phone.length < 1) {
      alert('Fill in phone number')
    } else if (this.state.password.length < 1) {
      alert('Fill in password')
    } else {
      this.checkInfo(this.state.phone, this.state.password)
    }
  }


  checkInfo(phone, password) {
    makeRequest('GET', URL + "user/" + phone + "/" + password + "")
      .then((response) => {
        this.setState({
          user: JSON.parse(response),
        })
      })
      .then(() => {
        if (this.state.user.length < 1) {
          alert("Wrong phone or password")
        } else {
          global.user = this.state.user
        }
      })
      .then(() => {
        if (this.state.user.length < 1) {

        } else {
          this.getProfile(global.user[0].profile_id)
        }

      })
      .then(() => {
        if (this.state.user.length < 1) {

        } else {
          this.props.navigation.navigate('MainTabNavigator')
        }

      })
      .catch(err => {
        console.error('There was an error!', err.statusText);
      });
  }

  getProfile(id) {
    makeRequest('GET', URL + "profile/" + id + "", this.state.requests)
      .then((response) => {
        global.profile = JSON.parse(response)
      })
      .catch(err => {
        console.error('There was an error in profile!', err.statusText);
      });
  }
  render() {
    return (
      <View>
        {/* Logo */}
        <View>
          <Animated.Image
            style={{ width: 150, height: 150, marginLeft: 'auto', marginRight: 'auto', marginTop: '20%', transform: [{ scale: this.springValue }] }}
            source={require('./../assets/images/logo.png')}
          />
        </View>
        {/* Input */}
        <View style={{ marginTop: 50 }}>
          <View style={styles.inputLogin}>
            <Icon style={{ marginLeft: 10 }} name="call" />
            <TextInput
              placeholder="Enter Your Mobile Number"
              onChangeText={(phone) => this.setState({ phone })}
              value={this.state.phone}
            />
          </View>
          <View style={styles.inputLogin}>
            <Icon style={{ marginLeft: 10 }} name="lock" />
            <TextInput
              placeholder="Enter Your Password"
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              secureTextEntry
            />
          </View>
        </View>

        {/* SignIn button */}
        <Button style={styles.buttonStyleMain} onPress={() => {
          this.signIn()
        }}><Text style={styles.buttonText}>Sign In</Text></Button>

        <Button style={{ backgroundColor: 'transparent', borderColor: 'transparent' }} onPress={() => this.props.navigation.navigate('Forgot')}><Text style={{ color: '#c2185b' }}>Forgot Password?</Text></Button>
        <Divider />
        <View style={styles.sameRowMain}>
          <Text>Don't have an account?</Text>
          <Button style={{ backgroundColor: 'transparent', borderColor: 'transparent' }} onPress={() => this.props.navigation.navigate('Signup')}><Text style={{ color: '#c2185b' }}>Sign up</Text></Button>
        </View>
      </View>
    )
  }

}

export default Signin
