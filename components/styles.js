import { StyleSheet } from 'react-native'
  
 const styles = StyleSheet.create({   
    container: {                       
        flex: 1,
        paddingTop: 15,
        margin: 10
   },
    containerPriceProduct: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerCard: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#fff'
    },
    floatRight: {
        marginLeft: 'auto',
        fontSize: 12
    },
    floatRightPriceProduct:{
        position: 'absolute',
        right: 5,
        top: '10%'
    },
    sameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    searchInput:{
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 10,
        fontSize: 12
    },
    searchBackground:{
        backgroundColor: '#000000'
    },
    searchIcon:{
        color: '#fff'
    },
    buttonStyle: {
        height: 'auto',
        width: '100%',
        backgroundColor: '#c2185b',
    },
    buttonText: {
        color: '#fff',
        fontSize: 15
    },
    floatRightPayment:{
        position: 'absolute',
        right: 5
    },
    widthDate:{
        width: '80%'
    },
    width: {
        width: "30%",
    },
    center:{
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    input: {
        marginLeft: 10,
        fontSize: 12,
        flex: 1
    },
    text: {
        marginLeft: 10,
        fontSize: 12,
    },
    inputNumeric: {
        marginLeft: 10,
        fontSize: 12,
        flex: 1,
        width: '5%'
    }, 
    inputLogin:{
        width: '80%',
        height: 'auto',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20
    },
    buttonStyleMain: {
        height: 'auto',
        width: '50%',
        borderRadius: 20,
        borderWidth: 2,
        backgroundColor: '#c2185b',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10
    },
    sameRowMain: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    logo: {
        width: 350, 
        height: 350, 
        marginLeft: 'auto', 
        marginRight: 'auto', 
        marginTop: '27%'
    },
    price: {
        width: '30%',
        textAlign: 'center',
    
    },
    name:{
        width: '45%',
        flex: 1,
        textAlign: 'center',
    },
 })
  
 const buttons = StyleSheet.create({  
    primary: {                         
        backgroundColor: '#c2185b',
        borderColor: '#c2185b',
        width: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    primaryText: {
        color: '#fff',
        fontSize: 14,
        paddingLeft: 10,
        paddingRight: 10
    },
    upload: {
        borderColor: '#c2185b',
        borderRadius: 50,
        width: 'auto',
        position: 'absolute',
        right: 5
    },
    edituploadText:{
        fontSize: 10,
        paddingLeft: 2,
        paddingRight: 2
    },
    edit: {
        borderColor: '#c2185b',
        borderRadius: 50,
        width: '50%',
        marginLeft: '9%',
        marginRight: 'auto'
    }
 })
  
 export { styles, buttons }    