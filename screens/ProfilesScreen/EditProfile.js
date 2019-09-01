import React from 'react';
import { ScrollView} from 'react-native';
import { Subtitle, View, Button, Text, Image } from '@shoutem/ui';
import { Input } from 'react-native-elements';
// import ImagePicker from 'react-native-image-picker'
import {styles, buttons} from './../../components/styles';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
// import * as ImagePicker from 'expo-image-picker';
class EditProfile extends React.Component {
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
    state = {
        image: null,
      };
      
    render(){
        let { image } = this.state;
        const profiles = this.state.profiles;
        return(
            <ScrollView style={styles.container}>
                {
                    profiles.map((profile, id) => {
                        return(
                            <View key={id}>
                                <View style={styles.sameRow}>
                                    <Subtitle style={{marginRight: 20}}>Photo:</Subtitle>
                                    {image &&
                                    <Image source={{ uri: image }} style={{ width: 100, height: 100}} />}         
                                    <Button style={buttons.upload} onPress={this._pickImage}><Text style={buttons.edituploadText}>Upload</Text></Button>
                                    </View>
                            <View style={styles.sameRow}>
                                <Subtitle>Name:</Subtitle>
                                <Input inputStyle={styles.input}
                                >{profile.name}</Input>
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
                    })
                }
                <Button 
                    onPress={() => this.props.navigation.navigate('Profiles')}
                    style={buttons.primary} 
                >
                    <Text style={buttons.primaryText}>Save</Text>
                </Button>
                
            </ScrollView>
        )
    }
    componentDidMount() {
        this.getPermissionAsync();
      }
    
      getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }
    
      _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
      };
}

export default EditProfile

EditProfile.navigationOptions = {
    title: 'EDIT PROFILE',
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