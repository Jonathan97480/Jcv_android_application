import { Button, Icon, ListItem } from "@rneui/base";
import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";



interface Props {
    title: string;
    status?: {
        color: string;
        text: string;
    };
    description?: string;
    chevronDisabled?: boolean;
    isSwipeable?: boolean;
    onPress: () => void;
    onDeletedPress?: () => void;
    onEditPress?: () => void;
    iconLeft?: React.ReactNode;

}

export default function MicroCard({ title, status, description, onPress, chevronDisabled = false, isSwipeable = false, onDeletedPress, onEditPress, iconLeft }: Props) {
    const [loading, setLoading] = React.useState(false);
    return (
        <>
            {
                isSwipeable ?
                    <ListItem.Swipeable
                        onPress={onPress}

                        containerStyle={
                            [styles.microCard, styles.decoration,
                            {
                                minHeight: 47,
                                minWidth: "100%",
                                maxWidth: '100%',
                                borderRadius: 5,
                                overflow: 'hidden',
                                marginBottom: 10,

                            }]

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
                                    setLoading(true);
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
                                {
                                    loading &&
                                    <ActivityIndicator size="small" color="#00ff00" />}

                                {iconLeft && iconLeft}

                                {description && <View style={[styles.microCard, { justifyContent: 'space-between', alignItems: 'flex-start' }]}>

                                    <View style={[styles.microCard, { flexDirection: 'row', justifyContent: 'space-between', maxWidth: '85%' }]} >
                                        <ListItem.Title
                                            style={{
                                                fontSize: 15,
                                                fontFamily: 'Roboto-SlabBold',
                                                color: '#36393E',
                                                textTransform: 'capitalize',
                                            }}
                                        >{title}</ListItem.Title>
                                        <ListItem.Title
                                            style={
                                                {
                                                    fontSize: 18,
                                                    fontFamily: 'Roboto-SlabBold',
                                                    color: status?.color,
                                                    textTransform: 'capitalize',
                                                }
                                            }
                                        >{status?.text}</ListItem.Title>

                                    </View>
                                    <ListItem.Subtitle
                                        style={{
                                            fontSize: 10,
                                            fontFamily: 'Roboto-SlabBold',
                                            color: '#36393E',
                                            textTransform: 'capitalize',
                                        }}

                                    >{description}</ListItem.Subtitle>

                                </View>}
                                {
                                    !description &&
                                    <View style={[styles.microCard, { justifyContent: 'space-between', alignItems: 'flex-start' }]}>

                                        <View style={[styles.microCard, { flexDirection: 'row', justifyContent: 'space-between', maxWidth: '85%' }]} >
                                            <ListItem.Title
                                                style={{
                                                    fontSize: 15,
                                                    fontFamily: 'Roboto-SlabBold',
                                                    color: '#5E5E5E',
                                                    textTransform: 'capitalize',
                                                }}
                                            >{title}</ListItem.Title>
                                            <ListItem.Title
                                                style={
                                                    {
                                                        color: status?.color,
                                                    }
                                                }
                                            >{status?.text}</ListItem.Title>

                                        </View>


                                    </View>
                                }
                            </View>


                        </ListItem.Content>

                    </ListItem.Swipeable>

                    : <View style={[styles.microCard, styles.decoration]}
                        onTouchStart={() => { onPress() }}
                    >

                        <View style={[styles.microCard, { flexDirection: 'row', }]}>
                            <Text>{title}</Text>
                            <Text>{status?.text}</Text>
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
    }


})