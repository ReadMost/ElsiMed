import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
} from 'react-native'
import {MAIN_COLOR} from '../../settings'
const width = Dimensions.get('window').width

export default class Element extends React.Component{

    _onPress = ()=>{
        if(this.props.value.available){
            this.props.onElementPress(this.props.value.id)
        }else{
            console.log('reject')
        }
    }
    render(){
        let {available, id, time, isLoading, result} = this.props.value
        color = available ? 'white' : '#f6abb6'
        textColor = available ? MAIN_COLOR : 'white'
        opacity = available ? 0.7 : 1
        touchColor = available ? MAIN_COLOR : 'rgba(0,0,0, 0)'
        return(
            <TouchableHighlight
            onPress = {()=>{console.log('test')}}
            underlayColor = {touchColor}
            activeOpacity = {opacity}
            onPress = {this._onPress}>
                <View style = {[styles.container, {backgroundColor: color, borderColor: textColor,}]}>
                    <Text style = {[styles.time, {color: textColor}]}>{time}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}



const styles = StyleSheet.create({
    container: {
      height: 60,   
      width: width * 0.2,
      borderWidth: 1,
      justifyContent: 'center',
      borderRadius: 5,
      alignItems: 'center',
      margin: width * 0.01,
    },
    time:{
        fontSize: 16,
        fontFamily: 'italic'
    }
})







// import React from 'react'
// import {
//     View,
//     Text,
//     StyleSheet,
//     Dimensions,
//     ActivityIndicator
// } from 'react-native'
// import {Icon} from 'react-native-elements'

// const width = Dimensions.get('window').width

// export default class Element extends React.Component{



//     render(){
//         let {available, id, time, isLoading, result} = this.props.value
//         let isAvailable = available;
//         let OUTPUT =  ( 
//             <View style = {styles.right_container}>
//                 {
//                     isLoading ? 
//                     <View style = {styles.inner_container}>
//                         <ActivityIndicator size="large" color="#63ace5" />
//                     </View>
//                     :
//                     <View style = {styles.inner_container}>
//                         <Icon
//                         name = 'book'
//                         color = '#63ace5'
//                         size = {25}
//                         onPress = { ()=>{ this.props.onElementPress(id) } }
//                         raised
//                         underlayColor = 'rgba(0,0,0,0.04)'
//                         containerStyle = {{backgroundColor: 'white'}}
//                         />
//                         <Text style = {styles.btn_info}>Записаться</Text>
//                     </View>
//                 }
//                 <View style = {styles.inner_container}>
//                     <Icon
//                     name = 'home'
//                     color = '#63ace5'
//                     size = {25}
//                     onPress = { ()=>{console.log('under development')} }
//                     raised
//                     underlayColor = 'rgba(0,0,0,0.04)'
//                     disabled = {true}
//                     containerStyle = {{backgroundColor: 'white'}}/>
//                     <Text style = {styles.btn_info}>Вызов</Text>
//                 </View>
//             </View>
//         )
//         if(!isAvailable || (result.isExist && result.isSuccess)){
//             OUTPUT = (          
//                 <View style = {styles.right_container}>
//                     <Text style = {styles.availiblity} >Занято</Text>
//                 </View>
//             )
//         }


//         return(
//             <View style = {[styles.container]} >
//                 <View style = {[styles.inner_container, styles.left_container ]}>
//                     <Text style = {[styles.info]}>
//                         { time }
//                     </Text>
//                     {
//                         result.isExist ?
//                         <Text style = {{color: result.isSuccess ? 'green': 'red', fontSize: 14}}>
//                             { result.message }
//                         </Text>
//                         : null
//                     }
//                 </View >
//                 { OUTPUT }
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//       height: 100,   
//       backgroundColor: 'white',
//       width: width,
//       borderBottomWidth: 1,
//       borderColor: '#e7eff6',
//       flexDirection: 'row',
//       justifyContent: 'space-around',
//       alignItems: 'center',
//     },
//     inner_container:{
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingRight: 10,
//         flex: 1
//     },
//     left_container:{
//         flex: 3,
//     },
//     right_container:{
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         flex: 5,
//     },
//     right_container_info:{
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     btn_info:{
//         color: 'rgba(0,0,0,0.3)',
//         fontSize: 10
//     },
//     info:{
//         color: 'rgba(0,0,0,0.5)',
//         fontSize: 20,
//     },
//     availiblity:{
//         color: 'rgba(255,255, 255,0.7)',
//         fontSize: 25,
//         alignItems: 'center',
//         padding: 10,
//         paddingLeft: 20,
//         paddingRight: 20,
//         borderRadius: 20,
//         backgroundColor: '#f6abb6'

//     },

//   });