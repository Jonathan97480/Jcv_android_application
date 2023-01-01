
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetAllCategories, GetAllNotifications, GetCustomers, UserLogin } from '../../api';
import { apiCategories, apiProduct } from '../../interface';
import * as SplashScreen from 'expo-splash-screen';
import { SousCategoryCard } from '../../components';
import { useDispatch, useSelector } from 'react-redux'
import { stylesGlobal } from '../../util/styleGlobal';
import { setAllNotification } from '../../redux/slice/notificationSlice';
import { filtersNotifications, registerForPushNotificationsAsync } from '../../util/function';
import { notificationPush, setAllNotificationPush } from '../../redux/slice/notificationPushSlice';
import * as Notifications from 'expo-notifications';
import { login, setIsLogged } from '../../redux/slice/userSlice';
import { setData, setLoading } from '../../redux/slice/customersSlice';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

SplashScreen.preventAutoHideAsync();

export default function Products() {


    const [products, setProducts] = useState<apiProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<apiCategories[]>([]);
    const [appIsReady, setAppIsReady] = useState(false);

    const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
    const [notification, setNotification] = useState<any>(false);
    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();
    const notificationPush: notificationPush[] = useSelector((state: any) => state.notificationPush.notificationPush);

    const dispatch = useDispatch();
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(_notification => {
            setNotification(_notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    useEffect(() => {
        GetAllCategories().then((categories) => {
            setCategories(categories);
            setIsLoading(false);
        });

        async function prepare() {
            try {


                const _user = await UserLogin()
                dispatch(login(_user));
                dispatch(setIsLogged(true));

                const _customers = await GetCustomers(_user);
                dispatch(setData(_customers));
                dispatch(setLoading());



                const _notifications = await GetAllNotifications(_user);
                dispatch(setAllNotification(_notifications));
                const notificationActive = filtersNotifications(_notifications, 'active');
                dispatch(setAllNotificationPush(notificationActive))




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
        }

    }, []);

    useEffect(() => {


        if (notificationPush.length > 0) {

            const _notificationPush = [...notificationPush];

            notificationPush.map((_notification, index) => {
                if (!notification.isPush) {
                    push(_notification)
                    _notificationPush[index] = {
                        ..._notification,
                        isPush: true
                    }
                }
            })

            if (!isEqual(notificationPush, _notificationPush)) {
                dispatch(setAllNotificationPush(_notificationPush))
            }
        }

        async function push(_notification: notificationPush) {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: _notification.title,
                    body: _notification.description,
                    data: { data: 'goes here' },
                },
                trigger: { seconds: 2 },
            });

        }

        function isEqual(tableau1: notificationPush[], tableau2: notificationPush[]) {
            if (tableau1.length !== tableau2.length) return false

            return tableau1.every((value, index) => value.isPush === tableau2[index].isPush)
        }

    }, [notificationPush]);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {

            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }





    return (
        <SafeAreaView style={{ padding: 8 }} onLayout={onLayoutRootView}>
            <View style={[stylesGlobal.container, stylesGlobal.padding]}>

                <ScrollView  >

                    {
                        isLoading ? <ActivityIndicator /> :
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