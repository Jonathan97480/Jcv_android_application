import { StyleSheet } from "react-native";


export const stylesGlobal = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxHeight: '100%',
        minHeight: '100%',
        width: '100%',

    },
    padding: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    colorPrimary: {
        color: 'blue'
    },
    colorSecondary: {
        color: 'grey'
    },
    colorSuccess: {
        color: 'green'
    },
    colorDanger: {
        color: 'red'
    },
    colorWarning: {
        color: 'orange'
    },
    colorInfo: {
        color: 'blue'
    },

    colorLight: {
        color: 'white'
    },
    colorDark: {
        color: 'black'
    },

});