import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from '@env'
import { apiProduct } from '../../interface';
import Carousel from 'react-native-reanimated-carousel';
import * as OpenAnything from 'react-native-openanything';
import { stylesGlobal } from '../../util/styleGlobal';
import { CustomButton } from '../../components';
import { Icon } from '@rneui/base';
import { ScrollView } from 'react-native-gesture-handler';

export default function ProductDetails(props: any) {

    const { route } = props;
    const { params } = route;
    const Product: apiProduct = params.Product;



    const path = 'http://www.math.hawaii.edu/~pavel/gcd.pdf';


    return (
        <SafeAreaView>
            <View style={[stylesGlobal.container, stylesGlobal.padding]}>
                <ScrollView>
                    <Text style={stylesGlobal.title}>{Product.attributes.nom}</Text>

                    <Carousel
                        loop
                        width={Dimensions.get('window').width - 40}
                        height={Dimensions.get('window').height / 2.5}
                        autoPlay={true}
                        data={Product.attributes.images.data}
                        scrollAnimationDuration={1000}

                        renderItem={({ index }) => (

                            <PictureOnload url={Product.attributes.images.data[index].attributes.url} />

                        )}
                        style={{ marginBottom: 20 }}
                    />

                    <Text>{Product.attributes.description}</Text>

                    <CustomButton
                        label={
                            {
                                text: "Voir la fiche du produit",
                            }
                        }
                        onPress={() => {
                            OpenAnything.Pdf(path);
                        }}
                        icon={
                            <Icon
                                style={{ marginRight: 10 }}
                                name="file-pdf"
                                type='font-awesome-5'
                                size={20}
                                color="white"
                            />
                        }
                    />
                </ScrollView>
            </View >
        </SafeAreaView>
    )

}

export const PictureOnload = ({ url }: { url: string }) => {
    const [pictureLoaded, setPictureLoaded] = React.useState(true);

    return (
        <>
            {pictureLoaded && <ActivityIndicator size="large" color="#0000ff" style={{ position: "absolute", top: "40%", left: "40%", zIndex: 10 }} />}
            <Image style={styles.image} source={{ uri: API_URL + url }} resizeMode="cover"

                onLoadEnd={() => {
                    setPictureLoaded(false)
                }}
            />
        </>
    )
}



const styles = StyleSheet.create({
    container: {},
    image: {
        marginTop: 20,
        width: "100%",
        height: "100%",
        borderRadius: 10,

    }

});
