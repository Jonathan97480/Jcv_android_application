import React from "react";
import { StyleSheet, Text, View } from "react-native";



export default function TitelScreen({ titre, image }: { titre: string, image: React.ReactNode }) {

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.titre}>{titre}</Text>
                {image}
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 17,

    },
    titre: {
        fontSize: 30,
        color: '#1F1F35',
        fontFamily: "Roboto-SlabBold"
    }

})