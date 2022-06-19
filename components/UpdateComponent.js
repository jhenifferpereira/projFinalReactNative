import React, { Component } from 'react';

import firebase from '../config/firebase';
import { Alert, Button, ActivityIndicator, View, StyleSheet, TextInput, ScrollView } from 'react-native';


class UpdateComponent extends Component {
  constructor() {
    super();
    this.state = {
      livro: '',
      autor: '',
      editora: '',
      valor: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const docRef = firebase.firestore().collection('livraria').doc(this.props.route.params.userkey)
    docRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          livro: user.livro,
          autor: user.autor,
          editora: user.editora,
          valor: user.valor,
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

  editLivraria() {
    this.setState({
      isLoading: true,
    });
    const docUpdate = firebase.firestore().collection('livraria').doc(this.state.key);
    docUpdate.set({
      livro: this.state.livro,
      autor: this.state.autor,
      editora: this.state.editora,
      valor: this.state.valor,
    }).then((docRef) => {
      this.setState({
        key: '',
        livro: '',
        autor: '',
        editora: '',
        valor: '',
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

  deleteLivraria() {
    const docRef = firebase.firestore().collection('livraria').doc(this.props.route.params.userkey)
      docRef.delete().then((res) => {
          console.log('Doc deleted.')
          this.props.navigation.navigate('ReadComponent');
      })
  }

  alertDialog=()=>{
    Alert.alert(
      'Delete',
      'Really?',
      [
        {text: 'Yes', onPress: () => this.deleteLivraria()},
        {text: 'No', onPress: () => console.log('Item not deleted'), style: 'cancel'},
      ],
      { 
        cancelable: true
      }
    );
  }
  
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="red"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.formEl}>
          <TextInput
              placeholder={'livro'}
              value={this.state.livro}
              onChangeText={(val) => this.inputEl(val, 'livro')}
          />
        </View>
        <View style={styles.formEl}>
          <TextInput
             
              placeholder={'autor'}
              
              value={this.state.autor}
              onChangeText={(val) => this.inputEl(val, 'autor')}
          />
        </View>
        <View style={styles.formEl}>
          <TextInput
              placeholder={'editora'}
              value={this.state.editora}
              onChangeText={(val) => this.inputEl(val, 'editora')}
          />
        </View>
        <View style={styles.formEl}>
          <TextInput
              placeholder={'valor'}
              value={this.state.valor}
              onChangeText={(val) => this.inputEl(val, 'valor')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Update'
            onPress={() => this.editLivraria()} 
            color="green"
          />
          </View>
         <View>
          <Button
            title='Delete'
            onPress={this.alertDialog}
            color="red"
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