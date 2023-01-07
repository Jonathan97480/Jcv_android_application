import { Icon } from "@rneui/base";
import React from "react";
import { TextInput, View } from "react-native";


interface SearchBarProps {
    onChangeText: (text: string) => void;
    value?: string;
    placeholder: string;
}

export default function SearchBar({ onChangeText, value, placeholder }: SearchBarProps) {
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 10,
            paddingHorizontal: 10,
            marginVertical: 17,
            elevation: 5,
        }}>
            <TextInput
                style={{ height: 49, width: "90%", fontFamily: "Roboto-SlabBold", fontSize: 18 }}
                placeholderTextColor="#5E5E5E"

                onChangeText={text => onChangeText(text)}
                value={value}
                placeholder={placeholder}
            />
            <Icon
                name="search"
                size={38}
                color="black"


            />
        </View>
    );
}