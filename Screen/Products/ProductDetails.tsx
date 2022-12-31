import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from '@env'
import { apiProduct } from '../../interface';
import Carousel from 'react-native-reanimated-carousel';
import * as OpenAnything from 'react-native-openanything';
import { stylesGlobal } from '../../util/styleGlobal';

export default function ProductDetails(props: any) {

    const { route } = props;
    const { params } = route;
    const Product: apiProduct = params.Product;
    const carouselRef = useRef(null);


    const path = 'http://www.math.hawaii.edu/~pavel/gcd.pdf';


    return (
        <SafeAreaView>
            <View style={[stylesGlobal.container, stylesGlobal.padding]}>
                <Text>{Product.attributes.nom}</Text>

                <Carousel
                    loop
                    width={300}
                    height={300}
                    autoPlay={true}
                    data={Product.attributes.images.data}
                    scrollAnimationDuration={1000}
                    onSnapToItem={(index) => console.log('current index:', index)}
                    renderItem={({ index }) => (
                        <Image style={styles.image} source={{ uri: API_URL + Product.attributes.images.data[index].attributes.url }} resizeMode="cover"
                        />
                    )}
                />

                <Text>{Product.attributes.description}</Text>

                <TouchableOpacity onPress={() => {
                    OpenAnything.Pdf(path);
                }}>
                    <Text>Voir la fiche du produit</Text>

                </TouchableOpacity>


            </View >
        </SafeAreaView>
    )

}




const styles = StyleSheet.create({
    container: {},
    image: {
        marginTop: 20,
        width: '100%',
        height: '60%',
        borderRadius: 10,
        marginRight: 10,
    }
});
