import React, { useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from '@env'
import { RootProductStackParamList } from "../interface";
import type { StackNavigationProp } from '@react-navigation/stack';
import { Gesture, TouchableOpacity } from 'react-native-gesture-handler';



type ProfileScreenNavigationProp = StackNavigationProp<
    RootProductStackParamList

>;

export interface Props {
    sousCategory: {

        id: number,
        attributes: {
            name: string;
            image: {
                data: {
                    id: number;
                    attributes: {
                        url: string;
                    }
                }
            }
        }


    }
}


export default function SousCategoryCard(props: Props) {

    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const [CatId, setCatId] = useState<number>(0);
    const { sousCategory } = props;

    const tap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            navigation.navigate("Product", { CatId: sousCategory.id, title: sousCategory.attributes.name });
        });

    return (

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >

            <TouchableOpacity onPress={() => {

                navigation.navigate("Product", { CatId: sousCategory.id, title: sousCategory.attributes.name });

            }}  >
                <View style={styles.container}
                    key={sousCategory.id}
                >
                    {
                        !sousCategory.attributes.image.data ? null :
                            <Image style={styles.image} source={{ uri: API_URL + sousCategory.attributes.image.data.attributes.url }} resizeMode="cover"
                            />
                    }
                    <Text style={styles.title}>{sliceTitle(sousCategory.attributes.name)}</Text>

                </View>
            </TouchableOpacity>



        </ScrollView>

    )
}
const sliceTitle = (title: string) => {
    return title.length > 20 ? title.slice(0, 20) + '...' : title;
}
const styles = StyleSheet.create({
    container: {
        width: 126,
        height: 135,
        position: "relative",
        marginRight: 10,
        marginTop: 20,
    },
    title: {

        textAlign: "center",

        textTransform: "capitalize",

    },
    image: {
        width: 126,
        height: 98,
    }

});