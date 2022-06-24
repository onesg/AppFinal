import React, { Component } from 'react';

import firebase from '../config/firebase';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements'


class ReadComponent extends Component {
    constructor() {
        super();
        this.docs = firebase.firestore().collection('carro');
        this.state = {
            isLoading: true,
            carro: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    fetchCollection = (querySnapshot) => {
        const carro = [];
        querySnapshot.forEach((res) => {
            const { nome, modelo, ano, cor } = res.data();
            carro.push({
                key: res.id,
                nome,
                modelo,
                ano,
                cor
            });
        });
        this.setState({
            carro,
            isLoading: false
        });
    }



    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            )
        }
        return (
            <ScrollView style={styles.wrapper}>
                {
                    this.state.carro.map((res, i) => {
                        return (
                            <ListItem
                                key={i}
                                onPress={() => {
                                    this.props.navigation.navigate('UpdateComponent', {
                                        userkey: res.key
                                    });
                                }}
                                bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title>{res.nome}</ListItem.Title>
                                    <ListItem.Subtitle>{res.modelo}</ListItem.Subtitle>
                                    <ListItem.Subtitle>{res.ano}</ListItem.Subtitle>
                                    <ListItem.Subtitle>{res.cor}</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron
                                    color="black"
                                />
                            </ListItem>
                        );
                    })
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingBottom: 20
    },
    loader: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
})

export default ReadComponent;