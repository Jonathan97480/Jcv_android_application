import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from '@env'
import { apiProduct } from '../../interface';
import Carousel from 'react-native-reanimated-carousel';
import * as OpenAnything from 'react-native-openanything';
import { stylesGlobal } from '../../util/styleGlobal';
import { BackButton, CustomButton, TitleScreen } from '../../components';
import { Icon } from '@rneui/base';



export default function ProductDetails(props: any) {

    const { route } = props;
    const { params } = route;
    const Product: apiProduct = params.Product;



    const path = Product.attributes.documentation.data ? Product.attributes.documentation.data[0].attributes.url : null;


    return (
        <SafeAreaView>
            <BackButton
                onPress={() => {
                    props.navigation.goBack();
                }}
                nameOldScreen="Produits"
                nameScreen=""
            />
            <View style={[stylesGlobal.padding, { maxHeight: "95%", minHeight: "95%" }]}>

                <TitleScreen
                    titre="Fiche produit "
                    image={
                        <Image
                            style={{ width: 38, height: 38, tintColor: '#1F1F35', marginLeft: 10 }}
                            source={require('../../assets/products-icon.png')}

                        />
                    }
                />
                <ScrollView style={{
                    maxHeight: "90%",
                    marginBottom: 17
                }}>
                    <Text style={styles.title}>{Product.attributes.nom}</Text>

                    <View style={{
                        borderRadius: 10,
                        overflow: "hidden",
                        minHeight: "auto",
                        height: Dimensions.get('window').height / 3.3,
                        marginBottom: 17
                    }}>
                        <Carousel
                            loop
                            width={Dimensions.get('window').width - 40}
                            height={Dimensions.get('window').height / 3.2}
                            autoPlay={true}
                            data={Product.attributes.images.data}
                            scrollAnimationDuration={1000}


                            renderItem={({ index }) => (

                                <PictureOnload url={Product.attributes.images.data[index].attributes.url} />

                            )}
                            style={{ marginBottom: 20 }}
                        />
                    </View>

                    <Text
                        style={{
                            marginBottom: 17
                        }}
                    >{Product.attributes.description}</Text>


                </ScrollView>
                {path !== null && path !== undefined ? <CustomButton
                    label={
                        {
                            text: "Voir la fiche du produit",
                        }
                    }
                    onPress={() => {
                        OpenAnything.Pdf(API_URL + path);
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
                /> : <CustomButton
                    btnType='disabled'
                    label={
                        {
                            text: "Fiche du produit indisponible",
                        }
                    }
                    onPress={() => { }}
                    icon={
                        <Icon
                            style={{ marginRight: 10 }}
                            name="file-pdf"
                            type='font-awesome-5'
                            size={20}
                            color="white"
                        />
                    }
                />}
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

        width: "100%",
        height: "100%",


    }, title: {
        fontSize: 27,
        fontFamily: "Roboto-SlabBold",
        textAlign: "center",
    }

});
