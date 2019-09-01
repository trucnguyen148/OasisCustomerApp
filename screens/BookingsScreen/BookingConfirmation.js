import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View, Card, Subtitle, Button } from '@shoutem/ui';
import {styles} from './../../components/styles'


class BookingConfirmation extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            reservations: [
                {
                    "service": "Nails",
                    "branch": "Nguyen Van Troi",
                    "date": "23/04/2019",
                    "time": "13:00",
                    "stylist": "Thao Trang"
                },
                {
                    "service": "Tattoo",
                    "branch": "Nguyen Van Troi",
                    "date": "23/04/2019",
                    "time": "13:00",
                    "stylist": "Thao Trang"
                },
                {
                    "service": "Tattoo",
                    "branch": "Nguyen Van Troi",
                    "date": "23/04/2019",
                    "time": "13:00",
                    "stylist": "Thao Trang"
                }
            ]
        }
    }
    render(){
        const reservations = this.state.reservations;
        return(
            <ScrollView>
                <Card style={confirmationStyles.cardWidth}>
                {
                    reservations.map((u, i) => {
                    return (
                        <View key={i} style={confirmationStyles.card}>
                            <View style={styles.sameRow}>
                                <Subtitle>Service:</Subtitle>
                                <Text style={styles.text}>{u.service}</Text>
                            </View>
                            <View style={styles.sameRow}>
                                <Subtitle>Branch:</Subtitle>
                                <Text style={styles.text}>{u.branch}</Text>
                            </View>
                            <View style={styles.sameRow}>
                                <Subtitle>Date:</Subtitle>
                                <Text style={styles.text}>{u.date}</Text>
                            </View>
                            <View style={styles.sameRow}>
                                <Subtitle>Time:</Subtitle>
                                <Text style={styles.text}>{u.time}</Text>
                            </View>
                            <View style={styles.sameRow}>
                                <Subtitle>Stylist:</Subtitle>
                                <Text style={styles.text}>{u.stylist}</Text>
                            </View>
                            <View style={confirmationStyles.button}>
                                <Button
                                style={confirmationStyles.space}>
                                    <Text style={confirmationStyles.text}>Cancel</Text>
                                </Button>
                                    <Button
                                    style={confirmationStyles.space}
                                    onPress={() => this.props.navigation.navigate('Bookings')}
                                > 
                                    <Text style={confirmationStyles.text}>Edit</Text>
                                </Button>
                            </View>
                        </View>
                        
                    );
                    })
                }
                </Card>
                
            </ScrollView>
        )
    }
}
export default BookingConfirmation

BookingConfirmation.navigationOptions = {
    title: 'CONFIRMATION(S)',
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
    text:{
        color: '#fff'
    },
    space: {
        margin: 5,
        backgroundColor: '#c2185b'
    },
    cardWidth:{
        width: '90%',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: 20,
        marginBottom: 20
    },
    
})