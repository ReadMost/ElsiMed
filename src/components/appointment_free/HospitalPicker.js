import React from 'react'
import {
    View, 
    Modal, 
    StyleSheet, 
    Text, 
    ScrollView,  
    Dimensions,
    LayoutAnimation,
    TouchableHighlight,
    UIManager,
} from 'react-native'
import {DEVICE_HEIGHT, DEVICE_WIDTH, BORDER_COLOR, RESULT} from '../../settings'
import {Button, Icon} from 'react-native-elements'


import {MAIN_COLOR} from '../../settings'

const SCREEN_WIDTH = Dimensions.get('window').width;

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class HospitalPicker extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        };
    }

    _close = ()=>{
        this.props._close()
    }

    render(){
        let OUTPUT = []
        this.props.hosts.map((item, id) => {
            if(item.apiUrlHttps !== null){
                OUTPUT.push(
                    <TouchableHighlight
                    onPress = {()=> this.props.onValueChange(item.apiUrlHttps)}
                    underlayColor = {'white'}
                    activeOpacity = {0.7}
                    style={styles.button} 
                    key = {id}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex:3, alignItems: 'center'}}>
                            <Text style={styles.item}>{item.name}</Text>
                        </View>
                        <View style={{flex:1, alignItems: 'center'}}>
                            <Icon
                            name = {'chevron-right'}
                            color = {MAIN_COLOR}
                            size = {17}
                            underlayColor = {BORDER_COLOR}
                            containerStyle = {{backgroundColor: 'white', margin: 15}}/>
                        </View>
                    </View>
                    </TouchableHighlight>
                )
            }
        })

        return(
            <Modal
                animationType="slide"
                transparent={true}
                animationType = 'slide'
                visible={this.props.visible}
                keyboardShouldPersistTaps={true}
                onRequestClose={ this._close }>
                <View style={styles.container}>
                    <View style={styles.inner_container}>
                        <ScrollView>
                            <View>
                            {
                                OUTPUT
                            }
                            </View>
                        </ScrollView>
                    </View>
                    <Button  
                    large
                    fontSize = {20}
                    backgroundColor = 'white'
                    borderRadius = {10}
                    icon={{name: 'close',color: '#3676DF', fontSize: 18 }}
                    onPress = { this._close }
                    containerViewStyle = {styles.btn_container}
                    />
                </View>
            </Modal>
        )
    }
}

let styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.75)',
        justifyContent: 'center',
        alignItems:'center',
    },
    nav_container:{
        backgroundColor: 'white',
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'white',
        width: DEVICE_WIDTH-40,
        borderBottomColor: BORDER_COLOR,
        borderBottomWidth: 1,
        padding: 10,
    },
    item:{
        fontSize: 16,
        padding: 5,
        fontFamily: 'italic',
    },
    inner_container:{
        width: DEVICE_WIDTH - 40,
        height: DEVICE_HEIGHT * 0.7,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        paddingTop: 10,
    },
    btn_container:{
        marginTop: 10,
        width: DEVICE_WIDTH - 40,
    },

})
