import React from 'react'
import {
    View, 
    Text, 
    StyleSheet,
    Dimensions
} from 'react-native'
import {BORDER_COLOR, MAIN_COLOR} from '../../settings'
import {Icon} from 'react-native-elements'
const width = Dimensions.get('window').width

class SavedElement extends React.Component{
    static navigationOptions = {
        title: 'Записи',
    };
    render(){
        let appointment = this.props.appointment.data
        let pure_appointment = this.props.appointment.pure
        let time = appointment.currentDate + ' ' + this.props.language.time + ' ' + appointment.time
        return(
            <View style = {styles.container}>
                <View style = {styles.inner_container}>
                    <Text style = {styles.title}>{time}</Text>
                    <Text style = {styles.myFio}>{pure_appointment.patientFullName}</Text>
                    <Text style = {styles.doctor}>{appointment.doctorFio}</Text>
                    <Text style = {styles.info}>{'Причина: ' + pure_appointment.visitReason}</Text>
                    <Text style = {styles.info}>{pure_appointment.room.number}</Text>
                </View>
                <View style = {styles.inner_container_right}>
                    <Icon
                    name = {'delete'}
                    color = {'red'}
                    size = {20}
                    onPress = {()=> this.props.onDelete(this.props.id) }
                    raised
                    underlayColor = {BORDER_COLOR}
                    containerStyle = {{backgroundColor: 'white'}}/>
                </View>
            </View>
        )
    }
}

export default SavedElement


const styles = StyleSheet.create({
    container:{
        width: width-30,
        minHeight: 80,
        margin: 5,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inner_container:{
        flex: 4,
    },
    inner_container_right:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        color: MAIN_COLOR,
        fontFamily: 'regular'
    },
    doctor: {
        fontSize: 14,
        fontFamily: 'italic'
    },
    info:{
        fontSize: 14,
        color: BORDER_COLOR,
        fontFamily: 'regular'
    },
    myFio:{
        fontSize: 14,
        paddingBottom: 5,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderColor: 'black',
        fontFamily: 'italic'  
    }
})