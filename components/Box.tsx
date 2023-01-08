import React from "react";
import { View, StyleSheet } from "react-native";


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