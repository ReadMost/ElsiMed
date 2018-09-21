import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {BORDER_COLOR, DEVICE_WIDTH} from '../../settings'
import Modal from 'react-native-modalbox';


export default class SpinnerModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {style: this.props.height}
    }
    resizeModal(ev) {
        this.setState({style: ev.nativeEvent.layout.height + 10 });
    }
    render(){
        let OUTPUT = []
        this.props.list.map((value, id)=>{
            OUTPUT.push(
                <TouchableOpacity key = {id} onPress={() => this.props.onPress(value.key)}>
                    <View style={[styles.element, {borderBottomWidth: 1,}]}>
                        <Text style={styles.text}>{value.title}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
        let TITTLE = null
        if(this.props.title !== undefined){
            TITTLE = <View style={[styles.element, {borderBottomWidth: 1,}]}>
                        <Text style={styles.title}>{ this.props.title }</Text>
                    </View>
        }
        let cancel = "Отмена"
        if(this.props.LN === 'KZ'){
            cancel = "Болдырмау"
        }
        return(
            <Modal 
                style={[styles.modal, { height: this.state.style}]} 
                position={"bottom"} 
                ref={"modal6"} 
                swipeArea={20} 
                isOpen={this.props.visible}
                backdropPressToClose = {true}
                swipeToClose = {true}
                backButtonClose = {true}
                onClosed ={ this.props.onRequestClose }>
                <View style={styles.container}>
                    <View style={styles.inner_container} onLayout={(ev)=>{this.resizeModal(ev)}}>

                        {TITTLE}

                        {OUTPUT}

                        <TouchableOpacity onPress={this.props.onRequestClose}>
                            <View style={styles.element} >
                                <Text style={styles.text}>{cancel}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}

let styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'flex-end',
    },
    inner_container:{
        paddingTop: 10,
        paddingBottom: 10,
        width: DEVICE_WIDTH,
        backgroundColor: 'white',
    },
    element:{
        width: DEVICE_WIDTH,
        justifyContent: 'center',
        alignItems:'center',
        paddingTop: 12,
        paddingBottom: 12,
        borderColor : BORDER_COLOR,
        backgroundColor: 'white',
    },
    text: {
        color: '#2D7CEC',
        fontSize: 18,
        fontFamily: 'regular',
        fontWeight: 'bold'
    },
    title: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'regular',
        fontWeight: 'bold'
    },
})
