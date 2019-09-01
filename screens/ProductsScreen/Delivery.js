import React from 'react';
import { ScrollView } from 'react-native';
import { Subtitle, Text, Button, View } from '@shoutem/ui';
import { Input } from 'react-native-elements';
import {styles, buttons} from './../../components/styles'

class Delivery extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            profiles: [
                {
                    "image": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg",
                    "name": "Nguyen Van Troi",
                    "address": "Kajaanintie 40 A 35/1",
                    "postal": "90130",
                    "city": "Oulu",
                    "country": "Finland",
                    "phone": "090 xxx xxxxx",
                    "email": "xxxxxx@oasis.vn",
                    "usaged": {
                        "services": {
                            "service1": {
                                "name": "Permanent make-up",
                                "time": "8:30",
                                "date": "23/10/2018",
                                "bill": "xxxxxx000",
                                "pics": ["https://shoutem.github.io/static/getting-started/restaurant-1.jpg", "https://shoutem.github.io/static/getting-started/restaurant-2.jpg", "https://shoutem.github.io/static/getting-started/restaurant-3.jpg", "https://shoutem.github.io/static/getting-started/restaurant-4.jpg"],
                                "detailService": ["eyebrown", "lips", "eyes"]
                                },
                            "service2": {
                                "name": "Nails",
                                "time": "8:30",
                                "date": "23/10/2018",
                                "bill": "xxxxxx001",
                                "pics": {
                                    "url1": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg",
                                    "url2": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg",
                                    "url3": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg",
                                    "url4": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg"
                                },
                                "detailService": ["paiting", "serving"]
                            }
                        },
                        "stylist": "Thao Trang",
                        "products": ["Orange OPI Nails Polish", "Black OPI Nails Polish"]
                    }  
                } 
                
            ]
        }
    }

    render(){
        const profiles = this.state.profiles;
        return(
            <ScrollView style={styles.container}>
                {profiles.map((profile,id) => {
                    return(
                        <View key={id}>
                            <View style={styles.sameRow}>
                                <Subtitle>Name:</Subtitle>
                                <Input inputStyle={styles.input}>{profile.name}</Input>
                            </View>
                            <View style={styles.sameRow}>
                                <Subtitle>Address:</Subtitle>
                                <Input inputStyle={styles.input}>{profile.address}</Input>
                            </View>
                            <View style={styles.sameRow}>
                                <Subtitle>Postal code:</Subtitle>
                                <Input inputStyle={styles.input}>{profile.postal}</Input>
                            </View>
                            <View style={styles.sameRow}>
                                <Subtitle>City:</Subtitle>
                                <Input inputStyle={styles.input}>{profile.city}</Input>
                            </View>
                            <View style={styles.sameRow}>
                                <Subtitle>Country:</Subtitle>
                                <Input inputStyle={styles.input}>{profile.country}</Input>
                            </View>
                            <View style={styles.sameRow}>
                                <Subtitle>Phone number:</Subtitle>
                                <Input inputStyle={styles.input}>{profile.phone}</Input>
                            </View>
                        </View>
                    )
                })}
                
                <Button 
                    onPress={() => this.props.navigation.navigate('Payments')}
                    style={buttons.primary} 
                >
                    <Text style={buttons.primaryText}>Payment Options</Text>
                </Button>
                
            </ScrollView>
        )
    }
}

export default Delivery

Delivery.navigationOptions = {
    title: 'DELIVERY',
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