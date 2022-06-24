import React, { Component } from 'react';

import firebase from '../config/firebase';
import { Alert, Button, ActivityIndicator, View, StyleSheet, TextInput, ScrollView } from 'react-native';


class UpdateComponent extends Component {
    constructor() {
        super();
        this.state = {
            nome: '',
            modelo: '',
            ano: '',
            cor: '',
            isLoading: true
        };
    }

    componentDidMount() {
        const docRef = firebase.firestore().collection('carro').doc(this.props.route.params.userkey)
        docRef.get().then((res) => {
            if (res.exists) {
                const user = res.data();
                this.setState({
                    key: res.id,
                    nome: user.nome,
                    modelo: user.modelo,
                    ano: user.ano,
                    cor: user.cor,
                    isLoading: false
                });
            } else {
                console.log("No document found.");
            }
        });
    }

    inputEl = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    editCarro() {
        this.setState({
            isLoading: true,
        });
        const docUpdate = firebase.firestore().collection('carro').doc(this.state.key);
        docUpdate.set({
            nome: this.state.nome,
            modelo: this.state.modelo,
            ano: this.state.ano,
            cor: this.state.cor,
        }).then((docRef) => {
            this.setState({
                key: '',
                nome: '',
                modelo: '',
                ano: '',
                cor: '',
                isLoading: false,
            });
            this.props.navigation.navigate('ReadComponent');
        })
            .catch((error) => {
                console.error(error);
                this.setState({
                    isLoading: false,
                });
            });
    }

    deleteCarro() {
        const docRef = firebase.firestore().collection('carro').doc(this.props.route.params.userkey)
        docRef.delete().then((res) => {
            console.log('Doc deleted.')
            this.props.navigation.navigate('ReadComponent');
        })
    }

    alertDialog = () => {
        this.deleteCarro();
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
            <ScrollView style={styles.container}>
                <View style={styles.formEl}>
                    <TextInput
                        placeholder={'Nome do carro'}
                        value={this.state.nome}
                        onChangeText={(val) => this.inputEl(val, 'nome')}
                    />
                </View>
                <View style={styles.formEl}>
                    <TextInput
                        placeholder={'Modelo do carro'}
                        value={this.state.modelo}
                        onChangeText={(val) => this.inputEl(val, 'modelo')}
                    />
                </View>
                <View style={styles.formEl}>
                    <TextInput
                        placeholder={'Ano do carro'}
                        value={this.state.ano}
                        onChangeText={(val) => this.inputEl(val, 'ano')}
                    />
                </View>
                <View style={styles.formEl}>
                    <TextInput
                        placeholder={'Cor do carro'}
                        value={this.state.cor}
                        onChangeText={(val) => this.inputEl(val, 'cor')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title='Atualizar'
                        onPress={() => this.editCarro()}
                        color="black"
                    />
                </View>
                <View>
                    <Button
                        title='Deletar'
                        onPress={this.alertDialog}
                        color="#5f0000"
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    formEl: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    loader: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    button: {
        marginBottom: 8,
    }
})

export default UpdateComponent;