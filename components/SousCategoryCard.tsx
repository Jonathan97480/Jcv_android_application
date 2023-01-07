import React, { useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from '@env'
import { RootProductStackParamList } from "../interface";
import type { StackNavigationProp } from '@react-navigation/stack';
import { Gesture, TouchableOpacity } from 'react-native-gesture-handler';
import { fixeText } from "../util/function";



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



        <TouchableOpacity onPress={() => {

            navigation.navigate("Product", { CatId: sousCategory.id, title: sousCategory.attributes.name });
        }}  {...{
            tap
        }}
            style={styles.container}
        >
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
                key={sousCategory.id}
            >
                {
                    !sousCategory.attributes.image.data ? null :
                        <Image style={styles.image} source={{ uri: API_URL + sousCategory.attributes.image.data.attributes.url }} resizeMode="cover"
                        />
                }
                <View style={{
                    position: "absolute",
                    backgroundColor: "#D77333",
                    borderRadius: 5,
                    width: "90%",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    elevation: 5,

                }}>
                    <Text style={styles.title}>{fixeText(sousCategory.attributes.name, 10, '...')}</Text>
                </View>
            </View>
        </TouchableOpacity>




    )
}
const sliceTitle = (title: string) => {
    return title.length > 20 ? title.slice(0, 20) + '...' : title;
}
const styles = StyleSheet.create({
    container: {

        width: 101,
        height: 96,
        position: "relative",
        borderRadius: 5,
        backgroundColor: "#fff",
        elevation: 5,
        marginHorizontal: 10,
    },
    title: {
        textAlign: "center",
        textTransform: "capitalize",
        fontSize: 10,
        fontWeight: "bold",
        color: "#fff",



    },
    image: {
        width: 101,
        height: 96,


    }

});