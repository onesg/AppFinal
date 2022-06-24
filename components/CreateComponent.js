import React, { Component } from 'react';
import {
    Button,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    View, TextInput,
} from 'react-native';
import firebase from '../config/firebase';

class CreateComponent extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('carro');
        this.state = {
            nome: '',
            modelo: '',
            ano: '',
            cor: '',
            isLoading: false
        };
    }

    onValUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    addCarro() {
        if (this.state.nome === '') {
            alert('Nome é obrigatório.')
        } else {
            this.setState({
                isLoading: true,
            });
            this.ref.add({
                nome: this.state.nome,
                modelo: this.state.modelo,
                ano: this.state.ano,
                cor: this.state.cor,
            }).then((res) => {
                this.setState({
                    nome: '',
                    modelo: '',
                    ano: '',
                    cor: '',
                    isLoading: false,
                });
                this.props.navigation.navigate('ReadComponent')
            })
                .catch((err) => {
                    console.error("Error occured: ", err);
                    this.setState({
                        isLoading: false,
                    });
                });
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="green" />
                </View>
            )
        }
        return (
            <ScrollView style={styles.container}>
                <View style={styles.formEle}>
                    <TextInput
                        placeholder={'Nome'}
                        value={this.state.nome}
                        onChangeText={(val) => this.onValUpdate(val, 'nome')}
                    />
                </View>
                <View style={styles.formEle}>
                    <TextInput
                        placeholder={'Modelo'}
                        value={this.state.modelo}
                        onChangeText={(val) => this.onValUpdate(val, 'modelo')}
                    />
                </View>
                <View style={styles.formEle}>
                    <TextInput
                        placeholder={'Ano'}
                        value={this.state.ano}
                        onChangeText={(val) => this.onValUpdate(val, 'ano')}
                    />
                </View>
                <View style={styles.formEle}>
                    <TextInput
                        placeholder={'Cor'}
                        value={this.state.cor}
                        onChangeText={(val) => this.onValUpdate(val, 'cor')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title='Cadastrar'
                        onPress={() => this.addCarro()}
                        color="black"
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    formEle: {
        flex: 1,
        padding: 5,
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#4e4e4e',
    },
    loading: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
})

export default CreateComponent;