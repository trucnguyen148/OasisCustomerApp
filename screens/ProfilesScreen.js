import React from 'react';
import { ScrollView, StyleSheet, FlatList } from 'react-native';
import { View, Card, Text, Subtitle, Button, TouchableOpacity, Divider } from '@shoutem/ui';
import { Image } from '@shoutem/ui/html';
import { styles, buttons } from './../components/styles';
import { URL, makeRequest } from './../components/api';

class ProfilesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingProfile: false,
            loadingBookings: true,
            bookings: [],
            requests: []
        }
    }

    componentDidMount() {
        this.getBooking(global.profile.customer_id)
    }
    componentWillUnmount() {
        this.state.requests.forEach(function (request) {
            request.abort()
        })
    }

    getBooking(cus_id) {
        makeRequest('GET', URL + "booking/customer/" + cus_id + "", this.state.requests)
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
                console.error('There was an error in booking!', err.statusText);
            });
    }

    render() {

        const profile = global.profile
        if (this.state.loadingBookings === true) {
            return <View><Title>is loading...</Title></View>
        } else {
            return (
                <ScrollView style={styles.container}>
                    <View title="CARD WITH DIVIDER">

                        <View style={styles.sameRow}>
                            <View>
                                <Image style={profileStyles.image} source={{ uri: profile.image }} />
                                <Button style={buttons.edit} onPress={() => this.props.navigation.navigate('Edit')}><Text style={styles.edituploadText}>Edit</Text></Button>
                            </View>
                            <Text style={profileStyles.name}>{profile.name}</Text>
                        </View>
                        <View style={styles.sameRow}>
                            <Subtitle>Address:</Subtitle>
                            <Text style={styles.floatRight}>{profile.address}</Text>
                        </View>
                        <View style={styles.sameRow}>
                            <Subtitle>Postal Code:</Subtitle>
                            <Text style={styles.floatRight}>{profile.postal_code}</Text>
                        </View>
                        <View style={styles.sameRow}>
                            <Subtitle>City:</Subtitle>
                            <Text style={styles.floatRight}>{profile.city}</Text>
                        </View>
                        <View style={styles.sameRow}>
                            <Subtitle>Country:</Subtitle>
                            <Text style={styles.floatRight}>{profile.country}</Text>
                        </View>
                        <View style={styles.sameRow}>
                            <Subtitle>Phone number:</Subtitle>
                            <Text style={styles.floatRight}>{profile.phone}</Text>
                        </View>

                        <Subtitle>Usaged Service(s) and Bought Product(s):</Subtitle>
                        <Divider />

                        <FlatList
                            data={this.state.bookings}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('Details', {
                                            booking: item
                                        })}>
                                        <Card
                                            style={profileStyles.card}
                                        >
                                            {/* <Text style={profileStyles.headerCard}>{item.name}</Text> */}
                                            <Divider />
                                            <View style={profileStyles.card}>
                                                <View style={styles.sameRow}>
                                                    <Text style={profileStyles.floatRightTime}>{item.date_time.split(" ")[1]}</Text>
                                                    <Text style={profileStyles.floatRightDate}>{item.date_time.split(" ")[0]}</Text>
                                                </View>
                                            </View>
                                        </Card>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </ScrollView>
            )
        }

    }
}

export default ProfilesScreen

ProfilesScreen.navigationOptions = {
    title: 'YOUR PROFILE',
    headerTintColor: '#000000',
    headerStyle: {
        backgroundColor: '#fff',
        borderBottomWidth: 0.3,
        borderBottomColor: '#000000',
    },
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 18
    },
};

const profileStyles = StyleSheet.create({
    card: {
        // borderColor: 'black',
        // borderStyle: 'solid',
        // borderWidth: 1,
        margin: 5,
        padding: 5,
        width: 'auto',
        backgroundColor: '#c2185b',
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        width: 90
    },
    space: {
        margin: 10,
        color: '#fff'
    },
    container: {
        flex: 1
    },
    image: {
        width: 105,
        height: 105,
        borderRadius: 50,
        marginBottom: 10
    },
    floatRightDate: {
        position: 'absolute',
        right: 5,
        color: '#fff'
    },
    floatRightTime: {
        position: 'absolute',
        right: '50%',
        color: '#fff'
    },
    floatRightBill: {
        // position: 'absolute',
        // right: '20%',
        textAlign: 'center',
        color: '#fff'
    },
    headerCard: {
        textTransform: 'uppercase',
        fontSize: 15,
        color: '#fff'
    },
    name: {
        position: 'absolute',
        right: 30,
        fontSize: 20,
        fontWeight: 'bold'
    },
    width: {
        flex: 1
    }

})