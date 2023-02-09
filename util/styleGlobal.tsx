import { StyleSheet } from "react-native";


export const stylesGlobal = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxHeight: '100%',
        minHeight: '100%',
        width: '100%',

    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'

    },
    padding: {
        paddingHorizontal: 20,
        paddingVertical: 5
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
        color: '#ED593C'
    },
    colorWarning: {
        color: 'orange'
    },
    colorInfo: {
        color: '#6BBB8B'
    },

    colorLight: {
        color: 'white'
    },
    colorDark: {
        color: 'black'
    },
    colorBottomBar: {
        backgroundColor: '#1F1F35',
    },
    colorBackGroundApp: {

        backgroundColor: '#F5F5F5',

    }

});