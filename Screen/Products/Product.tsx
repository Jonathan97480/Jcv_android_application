import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, Text, Image, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetAllProductsByCategory } from '../../api';
import { BackButton, CardProduct, IndicatorActivity, TitleScreen } from '../../components';
import { apiProduct } from '../../interface';
import { stylesGlobal } from '../../util/styleGlobal';



export default function Products(props: any) {

    /* get params navigation */
    const { route } = props;
    const { params } = route;
    const { CatId, title } = params;

    const [products, setProducts] = useState<apiProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [catName, setCatName] = useState<string>("");
    const [catColor, setCatColor] = useState<string>("");

    const dispatch = useDispatch();





    useEffect(() => {


        GetAllProductsByCategory(CatId).then((_products) => {
            setProducts(_products);
            setIsLoading(false);

            _products.length > 0 ? setCatName(_products[0].attributes.category.data.attributes.nom) : 'Aucun produits disponible';
            _products.length > 0 ? setCatColor(_products[0].attributes.category.data.attributes.color) : 'red';


        }
        );
    }, [])

    return (
        <SafeAreaView  >
            <IndicatorActivity visible={isLoading} />
            <BackButton
                onPress={() => props.navigation.goBack()}
                nameOldScreen="Catégories"
                nameScreen=""
            />
            <TitleScreen
                titre="Liste de produits "
                image={
                    <Image
                        style={{ width: 38, height: 38, tintColor: '#1F1F35', marginLeft: 10 }}
                        source={require('../../assets/products-icon.png')}
                    />
                }
            />
            <View style={[stylesGlobal.container, stylesGlobal.padding]}>
                {
                    !isLoading &&
                    <View>

                        <Text style={[styles.titleCat, { color: catColor }]}>{catName}</Text>

                        <Text style={[styles.titleCat, { textAlign: "left" }]}>{title}</Text>
                        <ScrollView scrollEnabled={true} showsHorizontalScrollIndicator={false} horizontal={false} >
                            <View style={styles.container}>
                                {

                                    products.map((product) => {
                                        return (
                                            <CardProduct products={product} key={product.id} />
                                        )
                                    })
                                }
                            </View>

                        </ScrollView >
                    </View>
                }
            </View>
        </SafeAreaView>
    );
}





const styles = StyleSheet.create({
    container: {

        paddingHorizontal: "5%",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center',
        justifyContent: Dimensions.get('window').width > 500 ? 'flex-start' : "center",
        height: "100%",
    },
    cat: {
        width: "100%",
        height: 58,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    titleCat: {
        fontSize: 30,
        marginBottom: 17,
        fontFamily: "Roboto-SlabBold",
        textAlign: "center",
    },
    subTittleCat: {
        fontSize: 20,
        color: "#1F1F35",
        marginBottom: 17,
        fontFamily: "Roboto-SlabBold",
    }
});

function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}

