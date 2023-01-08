import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { apiProduct, RootProductStackParamList } from '../interface';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '@env'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { fixeText } from '../util/function';






type ProfileScreenNavigationProp = StackNavigationProp<
    RootProductStackParamList

>;

export interface Props {
    products: apiProduct


}



export default function CardProduct(props: Props) {

    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const { products } = props;
    const [pictureLoaded, setPictureLoaded] = React.useState(true);
    const tap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            navigation.navigate("ProductDetails", { Product: products })
        });

    return (




        <TouchableOpacity onPress={() => {
            navigation.navigate("ProductDetails", { Product: products })
        }}  >
            <View style={styles.container} >
                {pictureLoaded && <ActivityIndicator size="large" color="#0000ff" style={{ position: "absolute", top: "25%", left: "40%", zIndex: 10 }} />}

                {
                    !products.attributes.images.data ? null :
                        <Image
                            style={styles.image}
                            source={{ uri: API_URL + products.attributes.images.data[0].attributes.url }}
                            resizeMode="cover"
                            onLoadEnd={() => {
                                setPictureLoaded(false)
                            }}

                        />
                }
                <Text style={styles.title}>{fixeText(products.attributes.nom, 15, "...")}</Text>
            </View>
        </TouchableOpacity >


    )
}

const styles = StyleSheet.create({
    container: {
        width: 126,
        height: 126,
        position: "relative",
        marginRight: 10,
        margin: 20,
    },
    title: {
        textAlign: "center",
        textTransform: "capitalize",
        marginBottom: 5,

    },
    image: {
        width: 129,
        height: 76,
        borderRadius: 7,
        elevation: 5,
    }

});