import React from 'react';
import { ScrollView, StyleSheet, DatePickerIOS } from 'react-native';
import {TouchableOpacity, Divider, Image, Title, View, Button, Text} from '@shoutem/ui';
import { Calendar } from 'react-native-calendars';
import {styles, buttons} from './../../components/styles'
// import DateTimePicker from "react-native-modal-datetime-picker";
import TimePicker from "react-native-24h-timepicker";

class BookingTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isDateTimePickerVisible: false,
      time: "",
      stylists: [
        {
          "name": "Thanh Truc",
          "rating": "3",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" }
        },
        {
          "name": "Thao Trang",
          "rating": "3",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg" }
        },
        {
          "name": "Thao Trang",
          "rating": "3",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" }
        },
        {
          "name": "Thao Trang",
          "rating": "3",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" }
        },
        {
          "name": "Thao Trang",
          "rating": "3",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg" }
        },
        {
          "name": "Thao Trang",
          "rating": "3",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" }
        }
      ],
      
    };
    this.onDayPress = this.onDayPress.bind(this);
  }
  onCancel() {
    this.TimePicker.close();
  }
 
  onConfirm(hour, minute) {
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();
  }
  // showDateTimePicker = () => {
  //   this.setState({ isDateTimePickerVisible: true });
  // };
  // hideDateTimePicker = () => {
  //   this.setState({ isDateTimePickerVisible: false });
  // };
 
  // handleDatePicked = time => {
  //   // return(
  //   //   <View>
  //   //     <Text>{date}</Text>
  //   //   </View>
  //   // );
  //   console.log("A time has been picked: ", time);
  //   this.hideDateTimePicker();
  // };
  render(){
    // const showDateTimePicker = this.showDateTimePicker();
    return (
      <ScrollView style={styles.container}>
        {/* Choose date */}
        <Title style={timeStyles.title}>Choose Date:</Title>
        <Calendar
          onDayPress={this.onDayPress}
          style={timeStyles.calendar}
          hideExtraDays
          markedDates={{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
        />

        {/* Choose time */}
        <Title style={timeStyles.title}>Choose Time:</Title>
        <View style={styles.sameRow}>
          <Text style={{marginLeft: 'auto', marginRight: 'auto', color: '#000000'}}>{this.state.time}</Text>
          <Button style={buttons.upload} onPress={() => this.TimePicker.open()}><Text style={buttons.edituploadText}>Pick</Text></Button>
          
          <TimePicker
            ref={ref => {
              this.TimePicker = ref;
            }}
            onCancel={() => this.onCancel()}
            onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
          />
        </View>
        {/* <Button onPress={this.showDateTimePicker}><Text>Click</Text></Button>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode="time"
          titleIOS="Pick a time"
        /> */}
        {/* Choose Stylist */}
        <Title style={timeStyles.title}>Choose Stylist:</Title>
        <ScrollView horizontal={true}>
          {
            this.state.stylists.map((stylist, id) => {
              return (
                <View key={id} style={timeStyles.space}>
                  <Image styleName="small-avatar" 
                 style={timeStyles.image}
                  source={{uri: stylist.image.url}}/>
                  <Text style={timeStyles.middle}>{stylist.name}</Text>
                  <Text style={timeStyles.middle}>{stylist.rating}</Text>
                </View>
              )
            })
          }
        </ScrollView>
        <Divider />
        <Button 
          style={buttons.primary}
          onPress={() => this.props.navigation.navigate('Confirmations')}
        >
          <Text style={timeStyles.text}>Book</Text>
        </Button>
        <Divider />
      </ScrollView>
    )
  }
  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }
}

export default BookingTime

BookingTime.navigationOptions = {
  title: 'TIME',
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
const timeStyles = StyleSheet.create({
  calendar: {
    paddingTop: 5,
    borderColor: '#eee',
    height: 350
  },
  card:{
    padding: 1
  },
  space:{
    paddingRight: 30,
    
  },
  image:{
    width: 85,
    height: 85,
    borderRadius: 40,
    marginBottom: 10
  },
  middle:{
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  text:{
    color: '#fff',
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10
  },
  title:{
    marginBottom: 10,
    marginTop: 20,
    fontSize: 16,
    fontWeight: '200',
    textTransform: 'uppercase'
  },
});
