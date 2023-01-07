

import { StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Customers, Products, Notification, Product, ProductDetails, CustomerDetails } from './Screen';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import NotificationPush from './components/NotificationPush';
import NotificationIcon from './components/NotificationIcon';
import { stylesGlobal } from './util/styleGlobal';
import { Icon } from '@rneui/base';





const Tab = createBottomTabNavigator();
const stackCustomNavigation = createStackNavigator();

export default function App() {






  return (

    <Provider store={configureStore} >


      <NotificationPush />
      <NavigationContainer  >

        <stackCustomNavigation.Navigator
          initialRouteName='Tab'
          screenOptions={{
            headerShown: false,
          }}>
          <stackCustomNavigation.Screen name="Tab" component={MyTabs} />
          <stackCustomNavigation.Screen
            name="Product"
            component={Product}
            initialParams={{ CatId: 1 }}

          />

          <stackCustomNavigation.Screen
            name="ProductDetails"
            component={ProductDetails}
            initialParams={{}}

          />



        </stackCustomNavigation.Navigator >

      </NavigationContainer>
    </Provider>

  );
}





const MyTabs = () => {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={
        {
          headerShown: false,
        }

      }>

      <Tab.Screen name="Produits" component={Products} />
      <Tab.Screen name="Clients" component={Customers} />
      <Tab.Screen name="Notification" component={Notification} />

    </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
  container: {},
  icon: {
    width: 38,
    height: 38,

  },
});



function MyTabBar({ state, descriptors, navigation }: { state: any, descriptors: any, navigation: any }) {


  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 4,
        paddingVertical: 7,
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 30,
        marginHorizontal: 12,
        backgroundColor: '#1F1F35',
        elevation: 10,
      }}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;
        const isFocused = state.index === index;

        const myIcon: any = getIconByRouteName(route.name, isFocused);


        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index + "-bottom-tab"}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {myIcon}
            <Text
              style={{
                color: isFocused ? '#9747FF' : '#fff',

                fontFamily: "Open-Sans-Regular"
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
function getIconByRouteName(name: string, isFocused: boolean): React.ReactNode {


  switch (name) {
    case "Produits":
      return <Image source={require("./assets/products-icon.png")} style={[styles.icon, {
        tintColor: isFocused ? '#9747FF' : '#fff',
      }]} />;
    case "Clients":
      return <Image source={require("./assets/customers-icon.png")} style={[styles.icon, {
        tintColor: isFocused ? '#9747FF' : '#fff',
      }]} />;
    case "Notification":
      return <NotificationIcon style={{
        tintColor: isFocused ? '#9747FF' : '#fff',
      }} />;
    default:
      return <Image source={require("./assets/products-icon.png")} style={[styles.icon, {
        tintColor: isFocused ? '#9747FF' : '#fff',
      }]} />;

  }

}