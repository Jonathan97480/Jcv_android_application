import { Icon } from "@rneui/base";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";


interface Props {
    onPress: () => void;
    nameScreen: string;
    nameOldScreen: string;
}


export default function BackButton({ onPress, nameScreen, nameOldScreen }: Props) {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.btnBack}
                onPress={onPress}
            >
                <Icon
                    name="chevron-left"
                    size={20}
                    color="#678bae"
                    type="feather"
                />
                <Text style={styles.textBtnBack}>{nameOldScreen}</Text>

            </TouchableOpacity>
            <Text style={styles.textCurentScreen}>{nameScreen}</Text>
            <View
                style={{ width: Dimensions.get('window').width / 3 }}
            ></View>
        </View >

    )



}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: 10,
        backgroundColor: "#fff",


    }, btnBack: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: Dimensions.get('window').width / 3

    }, textBtnBack: {
        color: "#678bae",
        textTransform: "capitalize",

    }, textCurentScreen: {
        color: "black",
        fontWeight: "bold",
        textTransform: "capitalize",
        width: Dimensions.get('window').width / 3,


    }

})