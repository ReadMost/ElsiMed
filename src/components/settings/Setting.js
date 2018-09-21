import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {ListItem, List, Avatar} from 'react-native-elements'
import {BORDER_COLOR} from '../../settings'
import PasswordModal from '../../components/settings/PasswordModal'

const routes = [
  {
      name: 'Change Language',
      to: 'LANGUAGE',
      icon: 'language',
      color: '#1998FB'
  },
  {
      name: 'Change Region',
      to: 'CITY',
      icon: 'map',
      color: '#6DD434'
  },
  {
      name: 'Change password',
      to: 'PASSWORD',
      icon: 'lock',
      color: '#FF3A00'
  },
  {
      name: 'Set rating',
      to: 'NONE',
      icon: 'star',
      color: '#FFCD00' 
  }
];

class SettingsScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            passwordVisible: false,
        }
    }
    render() {
      const {
        isLoadingPassword,
        resultPassword
      } = this.props.state
      const language = this.props.language
      return (
        <View style={styles.container}>
        <PasswordModal
        visible = { this.state.passwordVisible } 
        onRequestClose = {()=>{ 
            this.setState({passwordVisible: false}) 
            this.props.onPasswordClose()
        }}
        onPasswordChange = {this.props.onPasswordChange}
        isLoading = {isLoadingPassword}
        result = { resultPassword }/>

            <View style={styles.profile}>
                <Avatar
                large
                rounded
                overlayContainerStyle={{backgroundColor: 'black'}}
                source={require('../../../assets/images/profile.png')}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                />
                <Text style = {styles.profile_name}>
                    Еркебулан Дуйсебай
                </Text>
            </View>
            <List containerStyle={styles.nav_container}>
                <View style = {{backgroundColor: 'white'}}>
                    <ListItem
                        onPress={() => { this.setState({passwordVisible: true }) }}
                        title={language.change_password}
                        leftIcon={{name: 'lock', color: "black"}}
                        underlayColor = {'white'}
                        titleStyle = {styles.menu_item_text}
                        chevronColor = {BORDER_COLOR}
                    />
                    <ListItem
                        onPress={ this.props.onLanguageChange }
                        title={language.change_language + ' ('+ this.props.LN +')'}
                        leftIcon={{name: 'language', color: "black"}}
                        underlayColor = {'white'}
                        titleStyle = {styles.menu_item_text}
                        chevronColor = {BORDER_COLOR}
                    />
                    <ListItem
                        onPress={() => { console.log('test') }}
                        title={language.set_rating}
                        leftIcon={{name: 'star', color: "black"}}
                        underlayColor = {'white'}
                        titleStyle = {styles.menu_item_text}
                        chevronColor = {BORDER_COLOR}
                    />
                </View>
            </List>


        </View>
      );
    }
  }

  export default SettingsScreen

  const styles = StyleSheet.create({
    contianer:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profile:{
      padding: 10,
      paddingTop: 40,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
  },
  profile_name:{
      color: 'black',
      fontFamily: 'regular',
      paddingLeft: 15,
      fontSize: 18,

  },
  nav_container:{
      backgroundColor: 'white',
  },
  menu_item_text:{
      color: 'black',
      fontFamily: 'regular',
  }
  })
