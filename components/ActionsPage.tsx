import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { stylesGlobal } from "../util/styleGlobal";

interface Props {
    onPressEdit: () => void;
    onPressDelete: () => void;

}

export default function ActionPAge({ onPressEdit, onPressDelete }: Props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnStyle} onPress={onPressEdit} >
                <Text style={[styles.textStyle, stylesGlobal.colorInfo]}>Éditer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnStyle} onPress={onPressDelete}>
                <Text style={[styles.textStyle, stylesGlobal.colorDanger]}>Supprimer</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "#678bae",
        paddingVertical: 10,
    },
    btnStyle: {},
    textStyle: {
        fontFamily: "Roboto-SlabBold",
        fontSize: 20,
    },

})