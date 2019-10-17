import React from 'react';
import { ScrollView, StyleSheet, FlatList } from 'react-native';
import { Text, View, Card, Subtitle, Button, Divider } from '@shoutem/ui';
import { styles } from './../../components/styles'

import { URL, makeRequest } from './../../components/api';
import { graphql } from 'react-apollo';
import { getEmployeesQuery } from '../../components/queries/queries';

class BookingConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            profile: [],
            requests: [],
            loadingBookings: true
        }
    }

    componentDidMount() {
        this.state.profile = global.profile
        this.getConfirmations(this.state.profile.customer_id)
    }
    componentWillUnmount() {
        this.state.requests.forEach(function (request) {
            request.abort()
        })
    }

    getConfirmations(id) {
        makeRequest('GET', URL + "booking-confirm/customer/" + id + "", this.state.requests)
            .then((response) => {
                this.setState({
                    bookings: JSON.parse(response),
                })
            })
            .then(() => {
                this.setState({
                    loadingBookings: false,
                })
            })
            .catch(err => {
                console.error('There was an error in bookings!', err.statusText);
            });
    }

    getEmpAndBranchName(emp_id) {
        const emps = this.props.data.employees
        return emps.filter(emp => {
            return emp.id == emp_id
        })
    }

    deleteBooking(booking_id){
        makeRequest('GET', URL + "booking/delete/" + booking_id + "", this.state.requests)
            .then(() => {
                this.props.navigation.navigate('Bookings')
            })
            .catch(err => {
                console.error('There was an error in delete bookings!', err.statusText);
            });
    }

    render() {
        if (this.state.loadingBookings || this.props.data.loading) {
            return (
                <View>
                    <Subtitle>loading</Subtitle>
                </View>
            )
        } else {
            const bookings = this.state.bookings

            console.log(this.state.bookings)
            return (
                <ScrollView>
                    <Card style={confirmationStyles.cardWidth}>
                        <View style={confirmationStyles.card}>
                            <FlatList
                                data={this.state.bookings}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View>
                                        <View style={styles.sameRow}>
                                            <Subtitle>Date:</Subtitle>
                                            <Text style={styles.text}>{item.date_time.split(" ")[0]}</Text>
                                        </View>
                                        <View style={styles.sameRow}>
                                            <Subtitle>Time:</Subtitle>
                                            <Text style={styles.text}>{item.date_time.split(" ")[1]}</Text>
                                        </View>
                                        <View style={styles.sameRow}>
                                            <Subtitle>Branch:</Subtitle>
                                            <Text style={styles.text}>{this.getEmpAndBranchName(item.emp_id)[0].branch.name}</Text>
                                        </View>
                                        <View style={styles.sameRow}>
                                            <Subtitle>Stylist:</Subtitle>
                                            <Text style={styles.text}>{this.getEmpAndBranchName(item.emp_id)[0].name}</Text>
                                        </View>
                                        <View style={confirmationStyles.button}>
                                            <Button
                                                onPress={() => {
                                                    this.deleteBooking(item.id)
                                                }}
                                                style={confirmationStyles.space}>
                                                <Text style={confirmationStyles.text}>Cancel</Text>
                                            </Button>
                                        </View>
                                        <Divider />
                                    </View>
                                    
                                )}
                            />
                        </View>
                    </Card>

                </ScrollView>
            )
        }

    }
}
export default graphql(getEmployeesQuery)(BookingConfirmation)

BookingConfirmation.navigationOptions = {
    title: 'CONFIRMATION(S)',
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

const confirmationStyles = StyleSheet.create({
    card: {
        borderStyle: 'solid',
        borderWidth: 1.3,
        borderColor: '#c2185b',
        marginBottom: 5
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        width: 'auto',
        marginLeft: '25%',
        marginRight: '25%',
    },
    text: {
        color: '#fff'
    },
    space: {
        margin: 5,
        backgroundColor: '#c2185b'
    },
    cardWidth: {
        width: '90%',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: 20,
        marginBottom: 20
    },

})