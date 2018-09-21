import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {ListItem, List} from 'react-native-elements'
import { DEVICE_WIDTH, BORDER_COLOR, MAIN_COLOR } from '../../settings'


export default class DoctorPicker extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View  style={styles.container}>
                <Text style = {styles.header}>{this.props.language.title}</Text>
                {
                    this.props.doctors.length === 0
                    ? <Text style = {styles.warning}>{this.props.language.cabinetError}</Text>
                    :<List>
                        {
                            this.props.doctors.map((item, id) => (
                            <ListItem
                                onPress={() => { this.props.onPress(item.id) }}
                                key={id}
                                title={item.number}
                                chevronColor = {MAIN_COLOR}
                                titleStyle = {{color: 'black'}}
                            />
                            ))
                        }
                        </List>
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      width: DEVICE_WIDTH-30,
      backgroundColor: 'white',
      paddingBottom: 50,
    },
    header:{
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
   },
   warning:{
    fontSize: 15, 
    color: 'white',
    backgroundColor: '#FF5863',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
   }
  });
  