import React from "react";
import { View, Text, StyleSheet, Modal, } from "react-native";
import { stylesGlobal } from "../util/styleGlobal";

interface Props {
    visible?: boolean;
    children: React.ReactNode;
}

export default function Box({
    children,
    visible = true,

}: Props) {
    return (
        <>
            {visible && <View style={styles.box} >
                {children}
            </View>}
        </>
    );
}


const styles = StyleSheet.create({
    box: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 17,
        elevation: 5,
        padding: 10,
    }
});