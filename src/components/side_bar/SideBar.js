import React from "react";
import { View, StyleSheet, Text, AsyncStorage } from "react-native";
import { List, ListItem, Avatar } from 'react-native-elements'
const SIDE_BAR_COLOR = 'black'
const routes = [
    {
        name: 'Записаться к врачу',
        to: 'App',
        icon: 'av-timer'
    },
    {
        name: 'Заметили баг',
        to: 'Error',
        icon: 'info'
    },
    // {
    //     name: 'Разработчик',
    //     to: 'About',
    //     icon: 'build'
    // },
    {
        name: 'Настройки',
        to: 'Setting',
        icon: 'settings'
    }
];
 export default class SideBar extends React.Component {
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Avatar
                medium
                rounded
                source={require('../../../assets/images/profile.png')}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                />
                <Text style = {styles.profile_name}>
                    Еркебулан
                </Text>
            </View>
            <List containerStyle={styles.nav_container}>
            {
                routes.map((l) => (
                    <View 
                    key={l.name} 
                    style = {{backgroundColor: this.props.activeItemKey == l.to ? '#F43948' :SIDE_BAR_COLOR}}>
                        <ListItem
                            onPress={() => this.props.navigation.navigate(l.to)}
                            title={l.name}
                            leftIcon={{name: l.icon, color: 'white'}}
                            underlayColor = {SIDE_BAR_COLOR}
                            scaleProps={{
                                friction: 90,
                                tension: 100,
                                activeScale: 0.95,
                            }}
                            noBorder
                            titleStyle = {styles.menu_item_text}
                            chevronColor = 'white'
                        />
                     </View>
                ))
            }
                    <ListItem
                            onPress={this._signOutAsync}
                            key='logout'
                            title='Выйти из аккаунта'
                            leftIcon={{name: 'replay', color: 'white'}}
                            underlayColor = '#333331'
                            titleStyle = {styles.menu_item_text}
                            chevronColor = 'white'
                     />
            </List>
        </View>
    );
  }
}
 const styles = StyleSheet.create({
    container:{
        backgroundColor: SIDE_BAR_COLOR,
        flex:1,
    },
    profile:{
        padding: 10,
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profile_name:{
        color: '#CBCBCB',
        paddingLeft: 15,
        fontSize: 18,
    },
    nav_container:{
        backgroundColor: SIDE_BAR_COLOR,
        borderWidth: 0,
    },
    menu_item_text:{
        color: 'white',
        fontFamily: 'regular',
    }
}) 