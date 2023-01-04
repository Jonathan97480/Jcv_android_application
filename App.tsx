

import { StyleSheet, Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Customers, Products, Notification, Product, ProductDetails, CustomerDetails } from './Screen';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import NotificationPush from './components/NotificationPush';
import NotificationIcon from './components/NotificationIcon';





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
    <Tab.Navigator screenOptions={
      {
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopColor: 'transparent',
        },
        headerShown: false,


      }

    }>

      <Tab.Screen name="Produits" component={Products} options={
        {
          tabBarLabel: 'Produits', tabBarIcon: () => (<Image source={require('./assets/products-icon.png')} style={styles.icon}

          />)
        }
      } />
      <Tab.Screen name="Clients" component={Customers} options={
        { tabBarLabel: 'Clients', tabBarIcon: () => (<Image source={require('./assets/customers-icon.png')} style={styles.icon} />) }
      } />
      <Tab.Screen name="Notification" component={Notification} options={
        { tabBarLabel: 'Notification', tabBarIcon: () => (<NotificationIcon />) }
      } />

    </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
  container: {},
  icon: {
    width: 24,
    height: 24,
  },
});



