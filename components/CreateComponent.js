import React, { Component } from 'react';
import { Button, StyleSheet, ScrollView, ActivityIndicator, View, TextInput, } from 'react-native';
import firebase from '../config/firebase';

class CreateComponent extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('livraria');
    this.state = {
      livro: '',
      autor: '',
      editora: '',
      valor: '',
      isLoading: false
    };
  }

  onValUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  addlivraria() {
    if(this.state.livro === ''){
     alert('livro is required.')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.ref.add({
        livro: this.state.livro,
        autor: this.state.autor,
        editora: this.state.editora,
        valor: this.state.valor,
      }).then((res) => {
        this.setState({
          livro: '',
          autor: '',
          editora: '',
          valor: '',
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
    if(this.state.isLoading){
      return(
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="green"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.formEle}>
          <TextInput
              placeholder={'livro'}
              value={this.state.livro}
              onChangeText={(val) => this.onValUpdate(val, 'livro')}
          />
        </View>
        <View style={styles.formEle}>
          <TextInput
              placeholder={'autor'}
              value={this.state.autor}
              onChangeText={(val) => this.onValUpdate(val, 'autor')}
          />
        </View>
        <View style={styles.formEle}>
          <TextInput
              placeholder={'editora'}
              value={this.state.editora}
              onChangeText={(val) => this.onValUpdate(val, 'editora')}
          />
        </View>
        <View style={styles.formEle}>
          <TextInput
              placeholder={'valor'}
              value={this.state.valor}
              onChangeText={(val) => this.onValUpdate(val, 'valor')}
          />
        </View>
        
        <View style={styles.button}>
          <Button
            title='Create'
            onPress={() => this.addlivraria()} 
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