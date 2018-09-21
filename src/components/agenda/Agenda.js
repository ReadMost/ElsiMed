import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Text,
  TouchableHighlight
} from 'react-native';
import Element from './Element'
import {MAIN_COLOR, BORDER_COLOR} from '../../settings'
import {Icon} from 'react-native-elements'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
export default class Agenda extends React.Component{

  render() {
    let OUTPUT = (
      <ScrollView
      style = { styles.variantsHolder } 
      contentContainerStyle={[styles.variantsHolderX]}> 
        {this.props.agenda.slots.map((value, index) =>
            <Element onElementPress = {this.props.onElementPress}key = {index} value = {value}/>
        )}
      </ScrollView>
    )


    if(this.props.isLoading){
      OUTPUT = (
        <View style={styles.container_loading}>
          <ActivityIndicator size="large" color="#63ace5" />
        </View>
      )
    }


    
    return (
    <View style={{flex: 1}}>
      {
        this.props.agendasResult.isExist && !this.props.agendasResult.isSuccess
        ? <Text style={styles.error}>{this.props.agendasResult.message}</Text>
        :
          this.props.agenda.doctorFio === ''
          ? null
          :<TouchableHighlight 
            onPress = {this.props.onDoctorChange}
            underlayColor = {MAIN_COLOR}
            activeOpacity = {0.7}
            style={styles.button}>
              <View style={styles.btn_holder} >
                <Text style={styles.fio}>{this.props.agenda.doctorFio}</Text>
                <Icon
                  name = 'edit'
                  color = {'white'}
                  size = {20}
                  underlayColor = {BORDER_COLOR}
                  containerStyle = {{backgroundColor: MAIN_COLOR}}/>
              </View>
            </TouchableHighlight>
      }

        {OUTPUT}
      
    </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    width: width,
    alignItems:'center',
    flexDirection: 'row',
    backgroundColor: MAIN_COLOR,
  },
  container_loading:{
    width: width,
    height: height*0.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: MAIN_COLOR,
    width: width,
    padding: 10,
  },
  fio:{
    fontSize: 16,
    fontFamily: 'italic',
    color:'white',
    marginRight: 10
  },
  btn_holder:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
  },
  variantsHolderX:{
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row',
    padding: width * 0.05
  },
  variantsHolder:{
    flexDirection: 'column',
    
  },
  error:{
    alignItems: 'center',
    fontSize: 15, 
    color: 'white',
    backgroundColor: '#FF5863',
    padding: 5,
    borderRadius: 10,
  }

});