
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetAllCategories, GetAllNotifications, GetCustomers, UserLogin } from '../../api';
import { apiCategories, apiProduct } from '../../interface';
import * as SplashScreen from 'expo-splash-screen';
import { IndicatorActivity, SousCategoryCard } from '../../components';
import { useDispatch } from 'react-redux'
import { stylesGlobal } from '../../util/styleGlobal';
import { setAllNotification } from '../../redux/slice/notificationSlice';
import { login } from '../../redux/slice/userSlice';
import { setData } from '../../redux/slice/customersSlice';
import { filtersNotifications } from '../../util/function';
import { pushNotification } from '../../components/NotificationPush';




SplashScreen.preventAutoHideAsync();

export default function Products() {


    const [products, setProducts] = useState<apiProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<apiCategories[]>([]);
    const [appIsReady, setAppIsReady] = useState(false);





    const dispatch = useDispatch();
    useEffect(() => {



        async function prepare() {
            try {
                const _categories = await GetAllCategories()
                setCategories(_categories);
                setIsLoading(false);


                const _user = await UserLogin()
                dispatch(login(_user));


                const _customers = await GetCustomers(_user);
                dispatch(setData(_customers));


                const _notifications = await GetAllNotifications(_user);
                dispatch(setAllNotification(_notifications));
                const notificationActive = filtersNotifications(_notifications, 'active');


                if (notificationActive.length > 0) {

                    const _notificationPush = [...notificationActive];

                    notificationActive.map((_notification, index) => {
                        if (!_notification.isPushed) {
                            pushNotification({
                                title: _notification.title,
                                body: _notification.description,
                                trigger: { seconds: 1 }
                            })
                            _notificationPush[index] = {
                                ..._notification,
                                isPushed: true
                            }
                        }
                    })


                }






            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();


        return () => {

            setCategories([]);
        };
    }, []);





    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {

            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }





    return (
        <SafeAreaView onLayout={onLayoutRootView}>
            <IndicatorActivity visible={isLoading} />
            <View style={[stylesGlobal.container, stylesGlobal.padding]}>

                <ScrollView  >

                    {
                        !isLoading &&
                        categories.map((categorie) => {
                            return (
                                <View key={categorie.id}>
                                    <View style={[styles.cat, { backgroundColor: categorie.attributes.color }]}>
                                        <Text style={styles.titleCat}>{categorie.attributes.nom}</Text>
                                    </View>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                        {
                                            categorie.attributes.sous_categories.data.map((sousCategorie) => {
                                                return (
                                                    <SousCategoryCard sousCategory={sousCategorie} key={sousCategorie.id} />
                                                )
                                            })
                                        }
                                    </ScrollView>
                                </View>

                            )

                        })
                    }

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {

        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%",

    },
    cat: {
        width: "100%",
        height: 58,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    titleCat: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff"
    }


});