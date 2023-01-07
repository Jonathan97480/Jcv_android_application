import React from 'react';
import { Button, fonts, Icon, IconNode, IconProps, RneFunctionComponent } from '@rneui/base';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

interface PropsCustomButton {
    label: {
        text: string,
        color?: string,
        size?: number,

    },
    paddingHorizontal?: number,
    sizeButton?: number | string,
    onPress: () => void,
    icon: React.ReactNode | undefined
    btnType?: 'solid' | "invert"
    disabled?: boolean
}

export default function CustomButton({ label, onPress, icon, btnType, disabled, paddingHorizontal = 20, sizeButton = "auto" }: PropsCustomButton) {
    const curentStyle = getStyleBtn();
    return (
        <TouchableOpacity style={[styles.button, curentStyle, {
            minWidth: sizeButton,
        }]}
            onPress={onPress}
        >


            <>
                {icon}
                <Text
                    style={{
                        color: 'white',
                        fontFamily: 'Roboto-SlabBold',
                        fontSize: label.size || 18,


                    }}
                >{label.text}</Text>

            </>


        </TouchableOpacity>

    )

    function getStyleBtn() {
        switch (btnType) {
            case 'solid':
                return { backgroundColor: '#D77333' }

            case 'invert':
                return { backgroundColor: 'red' }
            default:
                return { backgroundColor: '#D77333' }
        }
    }

}

const styles = StyleSheet.create({
    button: {

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
        borderRadius: 15,
        backgroundColor: 'red',

        paddingVertical: 10,
        marginBottom: 17,
        paddingHorizontal: 20,



    }

});