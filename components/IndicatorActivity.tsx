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
                <View style={{ justifyContent: 'center', alignItems: 'center', height: "100%", }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>}
        </>

    );



}