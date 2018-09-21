import React from 'react'
import Holder from '../util/Holder'
import {ScrollView, View, Text, StyleSheet} from 'react-native'
import SavedElement from './SavedElement'
import IosBottomModal from '../util/IosBottomModal'



class Saved extends React.Component{
    static navigationOptions = {
        title: 'Записи',
    };
    constructor(props){
        super(props)
        this.state = {
            id: -1,
            isVisible: false,
        }
    }

    _delete = ()=>{
        this.props.onRequestDelete(this.state.id)
    }
    render(){
        let language = this.props.language
        let OUTPUT = []
        this.props.appointments.map((val, id)=>{
            OUTPUT.push(<SavedElement onDelete={(id)=>
                {this.setState({
                    isVisible: true,
                    id
                }
            )}} 
            appointment = {val}
            language = {language}
            id = {id}
            key = {id}/>)
        })
        let { isLoading, result } = this.props.state
        let message = null
        if(isLoading){
            message = <Text style = {[styles.status, {backgroundColor: '#48688B'}]}>
                {language.loading}...
            </Text>
        }
        if(!isLoading && result.isExist && result.isSuccess){
            message = <Text style = {[styles.status, {backgroundColor: '#86D5B2'}]}>
                {language.success}
            </Text>
        }
        if(!isLoading && result.isExist && !result.isSuccess){
            message = <Text style = {[styles.status, {backgroundColor: '#FF5863'}]}>
                {language.problem}
            </Text>
        }
        if(this.props.appointments.length === 0){
            message = <Text style = {[styles.status, {backgroundColor: '#48688B'}]}>
                {language.empty}
            </Text>
        }
        return(
            <Holder>
                <ScrollView>
                    <View style={styles.inner_container}>
                        {message}
                        {OUTPUT}
                    </View>
                </ScrollView>
                <IosBottomModal
                visible = {this.state.isVisible}
                onRequestClose = {()=> this.setState({isVisible: false})}
                list = {[{title: language.delete  ,key: 'OK'  }]}
                height = {130}
                LN = {this.props.LN}
                onPress = { (key)=>{ 
                    this.setState({isVisible: false})
                    this._delete()
                }}/>
            </Holder>
        )
    }
}

export default Saved


const styles = StyleSheet.create({
    inner_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    status:{
        margin: 10,
        fontSize: 17,
        color: 'white',
        padding: 5,
        borderRadius: 10,
    }
})