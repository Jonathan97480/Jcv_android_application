import { Button, Icon, ListItem } from "@rneui/base";
import React from "react";
import { View, Text, StyleSheet } from "react-native";


interface Props {
    title: string;
    status?: string;
    description?: string;
    chevronDisabled?: boolean;
    isSwipeable?: boolean;
    onPress: () => void;
    onDeletedPress?: () => void;
    onEditPress?: () => void;

}

export default function MicroCard({ title, status, description, onPress, chevronDisabled = false, isSwipeable = false, onDeletedPress, onEditPress }: Props) {

    return (
        <>
            {
                isSwipeable ?
                    <ListItem.Swipeable
                        onPress={onPress}

                        containerStyle={
                            [styles.microCard, styles.decoration, { minHeight: 60, minWidth: "100%", maxWidth: '100%' }]

                        }
                        leftContent={(reset) => (
                            <Button
                                containerStyle={{ borderRadius: 5, }}
                                title="Éditer"
                                onPress={() => { reset(); if (onEditPress) onEditPress(); }}
                                icon={{ name: 'edit', color: 'white' }}
                                buttonStyle={{ minHeight: '80%' }}
                            />
                        )}
                        rightContent={(reset) => (
                            <Button
                                containerStyle={{ borderRadius: 5, }}
                                title="Delete"
                                onPress={() => {
                                    reset();

                                    if (onDeletedPress)
                                        onDeletedPress();
                                }}
                                icon={{ name: 'delete', color: 'white' }}
                                buttonStyle={{ minHeight: '80%', backgroundColor: 'red' }}
                            />
                        )}
                    >

                        <ListItem.Content

                        >
                            <View
                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
                            >
                                <Icon

                                    name="warning"
                                    color="red"
                                    size={30}
                                    containerStyle={{ marginRight: 10 }}

                                />

                                <View style={[styles.microCard, { justifyContent: 'space-between', alignItems: 'flex-start' }]}>

                                    <View style={[styles.microCard, { flexDirection: 'row', justifyContent: 'space-between', maxWidth: '85%' }]} >
                                        <ListItem.Title>{title}</ListItem.Title>
                                        <ListItem.Title>{status}</ListItem.Title>

                                    </View>
                                    <ListItem.Subtitle>{description}</ListItem.Subtitle>

                                </View>
                            </View>


                        </ListItem.Content>

                    </ListItem.Swipeable>

                    : <View style={[styles.microCard, styles.decoration]}
                        onTouchStart={() => { onPress() }}
                    >

                        <View style={[styles.microCard, { flexDirection: 'row', }]}>
                            <Text>{title}</Text>
                            <Text>{status}</Text>
                            {
                                !chevronDisabled &&
                                <Icon
                                    name='chevron-right'
                                />
                            }

                        </View >
                        {
                            description && <Text
                                style={
                                    {
                                        textAlign: 'justify',
                                    }
                                }
                            >{description}</Text>
                        }


                    </View>
            }
        </>

    )

}

const styles = StyleSheet.create({

    microCard: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',

    },
    decoration: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
        elevation: 2,
        marginBottom: 10,
    }


})