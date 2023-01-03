import React from 'react';
import { View, ActivityIndicator } from 'react-native';


interface Props {
    visible: boolean;

}

export default function IndicatorActivity({ visible }: Props) {

    return (
        <>
            {
                visible &&
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>}
        </>

    );



}