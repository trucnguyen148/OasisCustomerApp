import React from 'react';
import { ScrollView, StyleSheet, DatePickerIOS } from 'react-native';
import { TouchableOpacity, Divider, Image, Title, View, Button, Text } from '@shoutem/ui';
import { Calendar } from 'react-native-calendars';
import { styles, buttons } from './../../components/styles'
import TimePicker from "react-native-24h-timepicker";

import { URL, makeRequest } from '../../components/api';

class BookingTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "",
      employees: [],
      loadingEmployees: true,
      requests: [],
      selectedTime: "",
      selectedDate: "",
      selectedEmployee: "",
    };
    this.onDayPress = this.onDayPress.bind(this);
  }
  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();
    this.state.selectedTime = `${hour}:${minute}`
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
    this.state.selectedDate = day.dateString
  }

  componentDidMount() {
    this.getEmployees(global.booking_branchId)
  }

  componentWillUnmount() {
    this.state.requests.forEach(function (request) {
      request.abort()
    })
  }

  getEmployees(branch_id) {
    makeRequest('GET', URL + "branch-employee/" + branch_id + "", this.state.requests)
      .then((response) => {
        this.setState({
          employees: JSON.parse(response),
        })
      })
      .then(() => {
        this.setState({
          loadingEmployees: false,
        })
      })
      .catch(err => {
        console.error('There was an error in employees!', err.statusText);
      });
  }

  getAllInfoForBooking() {
    if (this.state.selectedEmployee === "") {
      alert("Please select employee")
    } else if (this.state.selectedDate === "" || this.state.selectedTime === "") {
      alert("Please select time & date")
    } else {
      return {
        'cus_id': global.profile.customer_id,
        'emp_id': this.state.selectedEmployee,
        'date_time': this.state.selectedDate + " " + this.state.selectedTime + ":00",
        'progress': 1,
        'products': global.booking_serviceId
      }
    }
  }

  createInvoice() {
    const bookingInfo = this.getAllInfoForBooking()

    var data = new FormData();
    data.append("cus_id", bookingInfo.cus_id);
    data.append("emp_id", bookingInfo.emp_id);
    data.append("date_time", bookingInfo.date_time);
    data.append("progress", bookingInfo.progress);
    data.append("products", bookingInfo.products);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", URL + "booking/create");
    xhr.send(data);
  }

  render() {
    if (this.state.loadingEmployees) {
      return (
        <View>
          <Text>loading</Text>
        </View>
      )
    } else {
      return (
        <ScrollView style={styles.container}>
          <Title style={timeStyles.title}>Choose Date:</Title>
          <Calendar
            onDayPress={this.onDayPress}
            style={timeStyles.calendar}
            hideExtraDays
            markedDates={{ [this.state.selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' } }}
          />

          <Title style={timeStyles.title}>Choose Time:</Title>
          <View style={styles.sameRow}>
            <Text style={{ marginLeft: 'auto', marginRight: 'auto', color: '#000000' }}>{this.state.time}</Text>
            <Button style={buttons.upload} onPress={() => this.TimePicker.open()}><Text style={buttons.edituploadText}>Pick</Text></Button>

            <TimePicker
              ref={ref => {
                this.TimePicker = ref;
              }}
              onCancel={() => this.onCancel()}
              onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
            />
          </View>

          <Title style={timeStyles.title}>Choose Stylist:</Title>
          <ScrollView horizontal={true}>
            {
              this.state.employees.map((employee) => {
                return (
                  <Button key={employee.id} onPress={() => {
                    this.state.selectedEmployee = employee.id
                  }} >
                    <View style={timeStyles.space}>
                      <Image styleName="small-avatar"
                        style={timeStyles.image}
                        source={{ uri: employee.image }}
                      />
                      <Text style={timeStyles.middle}>{employee.name}</Text>
                    </View>
                  </Button>
                )
              })
            }
          </ScrollView>
          <Divider />
          <Button
            style={buttons.primary}
            onPress={() => {
              this.createInvoice()
              this.props.navigation.navigate('Bookings')
            }}
          >
            <Text style={timeStyles.text}>Book</Text>
          </Button>
          <Divider />
        </ScrollView>
      )
    }
  }

}

export default BookingTime

BookingTime.navigationOptions = {
  title: 'TIME',
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
const timeStyles = StyleSheet.create({
  calendar: {
    paddingTop: 5,
    borderColor: '#eee',
    height: 350
  },
  card: {
    padding: 1
  },
  space: {
    paddingRight: 30,

  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 40,
    marginBottom: 10
  },
  middle: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  text: {
    color: '#fff',
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10
  },
  title: {
    marginBottom: 10,
    marginTop: 20,
    fontSize: 16,
    fontWeight: '200',
    textTransform: 'uppercase'
  },
});
