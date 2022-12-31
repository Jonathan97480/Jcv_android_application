import React from 'react';
import { Button, Icon, IconNode, IconProps, RneFunctionComponent } from '@rneui/base';
import { StyleSheet, Text, View } from 'react-native';

interface PropsCustomButton {
    label: string,
    onPress: () => void,
    icon: IconNode | undefined
    btnType?: 'solid' | "danger"
    disabled?: boolean
}

export default function CustomButton({ label, onPress, icon, btnType, disabled }: PropsCustomButton) {
    const curentStyle = getStyleBtn();
    return (
        <Button
            containerStyle={styles.button}
            buttonStyle={curentStyle}
            disabled={disabled}
            onPress={onPress}
            title={label}

            icon={
                icon
            }
        />
    )

    function getStyleBtn() {
        switch (btnType) {
            case 'solid':
                return { backgroundColor: '#2e64e5' }

            case 'danger':
                return { backgroundColor: 'red' }
            default:
                return { backgroundColor: '#2e64e5' }
        }
    }

}

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        backgroundColor: 'red',
        marginVertical: 5
    }

});