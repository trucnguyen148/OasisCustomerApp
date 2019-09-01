import React from 'react';
import { ScrollView, StyleSheet} from 'react-native';
import { Title, Subtitle, View, Text, DropDownMenu, TouchableOpacity, Image, Divider, Button } from '@shoutem/ui';
import { Input } from 'react-native-elements';


class VisaCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            months: [
                {"name": "January", "value": "Jan"},
                {"name": "February", "value": "Feb"},
                {"name": "March", "value": "Mar"},
                {"name": "April", "value": "Apr"},
                {"name": "May", "value": "May"},
                {"name": "June", "value": "June"},
                {"name": "July", "value": "July"},
                {"name": "August", "value": "Aug"},
                {"name": "September", "value": "Sep"},
                {"name": "October", "value": "Oct"},
                {"name": "November", "value": "Nov"},
                {"name": "December", "value": "Dec"}
            ],
            years: [
                {"name": "2019", "value": "2019"},
                {"name": "2020", "value": "2020"},
                {"name": "2021", "value": "2021"},
                {"name": "2022", "value": "2022"},
                {"name": "2023", "value": "2023"},
                {"name": "2024", "value": "2024"},
                {"name": "2025", "value": "2025"},
                {"name": "2026", "value": "2026"},
                {"name": "2027", "value": "2027"},
                {"name": "2028", "value": "2028"},
                {"name": "2029", "value": "2029"},
                {"name": "2030", "value": "2030"}
            ]
        }
      }
    
      
    render(){
        const selectedMonth = this.state.selectedMonth || this.state.months[0];
        const selectedYear = this.state.selectedYear || this.state.years[0];
        return (
            <ScrollView style={styles.container}>
                <Image style={styles.center} source={require('./../../assets/images/visa.png')
                }
                />
                <Divider />
                <Title style={styles.center}>CREDIT CARD DETAILS</Title>
                <Divider />
                <Subtitle>Cardholder's Name:</Subtitle>
                <Input placeholder="Name and Surname"/>
                <Subtitle>Card Number:</Subtitle>
                <Input placeholder="xxxx xxxx xxxx xxxx"/>
                <Subtitle>Expiration Date: </Subtitle>
                <TouchableOpacity style={styles.samerow}>
                    <DropDownMenu
                        style={styles.widthDate}
                        options={this.state.months}
                        selectedOption={selectedMonth ? selectedMonth : this.state.months[0]}
                        onOptionSelected={(month) => this.setState({ selectedMonth: month })}
                        titleProperty="value"
                        valueProperty="months.name"
                    />
                    <DropDownMenu
                        style={styles.widthDate.floatRight}
                        options={this.state.years}
                        selectedOption={selectedYear ? selectedYear : this.state.years[0]}
                        onOptionSelected={(year) => this.setState({ selectedYear: year })}
                        titleProperty="value"
                        valueProperty="years.name"
                    />
                </TouchableOpacity>
                {/* <View style={styles.widthDate}>
                    <View style={styles.samerow}>
                        <Input placeholder="Month (eg.10)"/>
                        <Input placeholder="Year (eg.2019)"/>
                    </View>
                </View> */}
                
                <Subtitle>CVV:</Subtitle>
                <View style={styles.width}>
                    <View style={styles.samerow}>
                        <Input placeholder="xxxx"/>
                        <Text>3 or 4 digits</Text>
                    </View>
                </View>
                <Divider />
                <Button style={styles.button}><Text style={styles.text}>Pay</Text></Button>
      
            </ScrollView>
        )
    }
}

export default VisaCard


const styles = StyleSheet.create({
    samerow:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
        
    },
    widthDate:{
        width: '80%'
    },
    width: {
        width: "30%",
    },
    floatRight: {
        position: 'absolute',
        right: 5
    },
    center:{
        marginLeft: 'auto',
        marginRight: 'auto',
        
    },
    button: {
        backgroundColor: '#c2185b',
        width: '40%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    text: {
        color: '#fff',
        fontSize: 14,
        paddingLeft: 10,
        paddingRight: 10
    },
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
        margin: 5
    },
   
})