import React from 'react'
import {View, Text, Picker, StyleSheet} from 'react-native'
import { DEVICE_WIDTH, BORDER_COLOR, MAIN_COLOR } from '../../settings'

const list = [
    {
        title: 'Astana',
        key: '0'
    },
    {
        title: 'Almaty',
        key: '1'
    },
    {
        title: 'Taraz',
        key: '2'
    },
]

export default class CityPicker extends React.Component{
    constructor(props){
        super(props)
        this.state = {city: list[0].key}
    }
    componentDidMount(){
        this.props.onValueChange(this.state.city)
    }
    _changed = (itemValue)=>{
        this.setState({city: itemValue})
        this.props.onValueChange(itemValue)
    }
    render(){
        let OUTPUT = []
        list.map((value, id)=>{
            OUTPUT.push(
                <Picker.Item key={id} label={value.title} value={value.key} />
            )
        })
        return(
            <View  style={styles.container}>
                <View style={styles.inner_container}>
                    <Text style = {styles.header}>Выберите город</Text>
                    <Picker
                        mode = 'dropdown'
                        selectedValue={this.state.city}
                        style = {styles.picker}
                        onValueChange={(itemValue, itemIndex) => this._changed(itemValue) }>
                        {OUTPUT}
                    </Picker>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      width: DEVICE_WIDTH - 30,
      backgroundColor: 'white',
      alignItems: 'center',
      paddingBottom: 20,
    },
    inner_container:{
        width: DEVICE_WIDTH - 30,
        backgroundColor: 'white',
        borderColor: BORDER_COLOR,
        borderBottomWidth: 1,
        marginTop: 20,
        marginBottom: 20
    },
    picker:{
        width: DEVICE_WIDTH - 50,
        height: 60,
        padding: 10
    },
    header:{
        fontSize: 18,
        fontWeight: 'bold',
        color: MAIN_COLOR
    }
  
  });
  