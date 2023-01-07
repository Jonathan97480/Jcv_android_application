import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";



interface Props {
    label?: string;
    filter:
    {
        label: string;
        value: string;
        isDefault?: boolean;

    }[]
    onPress?: (value: string) => void;
    params?: {

        colorActive?: string;
        colorInactive?: string;
        isUnderlineActive?: boolean;
    }
    value?: string;

}

interface Item {
    label: string;
    value: string;
    isActif: boolean;

}

export default function Filters({ filter, params, label, onPress, value }: Props) {



    const [items, setItems] = useState<Item[]>(filter.map((item) => {
        return { ...item, isActif: item.isDefault ? true : false }
    }));

    const fixeActiveItem = (value: string) => {
        const newItems = items.map((item) => {
            return { ...item, isActif: item.value === value ? true : false }
        });
        setItems(newItems);
    }

    useEffect(() => {
        if (value) {
            fixeActiveItem(value);
        }
    }, [value])



    return (
        <View style={styles.container}>
            {
                label && <Text style={styles.label}>{label}</Text>

            }
            <View style={styles.liste}>
                {items.map((filter, index) => {

                    const colorActive = params?.colorActive ? params?.colorActive : "red";
                    const colorInactive = params?.colorInactive ? params?.colorInactive : "rgba(65, 63, 63, 0.35)";

                    const decoration = filter.isActif ? { color: colorActive } : { color: colorInactive };


                    return (
                        <TouchableOpacity key={index + "-filters-" + filter.label} onPress={() => {
                            onPress && onPress(filter.value);
                            fixeActiveItem(filter.value);

                        }}>
                            <Text
                                style={[styles.text, decoration]}>
                                {filter.label}
                            </Text>
                            {
                                params?.isUnderlineActive && filter.isActif ?
                                    <View style={[styles.ligne, styles.activeItemBackgroundLigne, { backgroundColor: colorActive }]}></View>
                                    : null
                            }
                        </TouchableOpacity>

                    )
                })}
            </View>

            <View style={styles.ligne}></View>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        marginBottom: 17
    },
    text: {
        fontSize: 15,
        fontFamily: "Roboto-SlabBold"
    },
    label: {
        fontSize: 18,
        fontFamily: "Roboto-SlabBold"
    },
    liste: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    ligne: {
        height: 2,
        backgroundColor: "rgba(65, 63, 63, 0.35)",
        width: "100%",
        marginVertical: 5
    },

    activeItemBackgroundLigne: {

        marginVertical: 2
    },





})