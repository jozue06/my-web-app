import React, { Component } from 'react';
import { StyleSheet, Text, View ,TextInput, TouchableOpacity, ScrollView  } from 'react-native';

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         <Text>Changes you make will automatically reload.</Text>
//         <Text>Shake your phone to open the developer menu.</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });



export default class usernameInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text1: 'username:', text2: 'message:', };


  }

  // Scroll a component into view. Just pass the component ref string.
inputFocused (onFocus) {
  setTimeout(() => {
    let scrollResponder = this.refs.scrollView.getScrollResponder();
    scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
      React.findNodeHandle(this.refs[refName]),
      1, //additionalOffset
      true
    );
  }, 5);
}
  render() {
    return (
      <ScrollView ref='onFocus'>
      <View style={styles.container}>
      
        <TextInput ref={'textInput1'}
        blurOnSubmit clearTextOnFocus onChangeText={(text1) => this.setState({text1})}
        value={this.state.text1}
        />
        
        <TextInput ref={'textInput2'}
        blurOnSubmit={true} clearTextOnFocus={true} onChangeText={(text2) => this.setState({text2})}
        value={this.state.text2}/>
      
          
      
      </View>
      </ScrollView>
    );
  }
  
}

 const styles = StyleSheet.create({
  container: {
    flex: 10,
    height: 300, 
    borderColor: 'gray', 
    borderWidth: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30
  },
}); 