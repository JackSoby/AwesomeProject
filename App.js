import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, Keyboard, TextInput, TouchableOpacity, TouchableHighlight, View, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';

class ExampleApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: null,
    };
  }

  // takePicture() {
  //   // this.camera.capture()
  //   //   .then((data) => {
  //   //     console.log(data);
  //   //     this.setState({ path: data.path })
  //   //   })
  //   //   .catch(err => console.error(err));


  //   if (this.camera) {
  //     const options = { quality: 0.5, base64: true };
  //     const data = await this.camera.takePictureAsync(options);
  //     console.log(data.uri);

  //     this.setState({ path: data.uri })

  //   }
  // }


  renderCamera() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        notAuthorizedView={
          <View>
            <Text>YOU ARE NOT AUTHORIZED TO USE THE CAMERA</Text>
            <Button onPress={() => { Alert.alert('SET CAMERA STATUS TO READY') }} title="HELLLOOO" />
          </View>
        }
        androidPermissionDialogTitle={'Permission to use camera'}
        androidPermissionDialogMessage={'We need your permission to use your camera phone'}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          console.log(barcodes);
        }}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          console.log(barcodes);
        }}
      >
        <TouchableHighlight
          style={styles.capture}
          onPress={this.takePicture.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <View />
        </TouchableHighlight>
      </RNCamera>
    );
  }

  renderImage() {
    return (
      <View>
        <Image
          source={{ uri: this.state.path }}
          style={styles.preview}
        />
        <Text
          style={styles.cancel}
          onPress={() => this.setState({ path: null })}
        >Cancel
        </Text>
      </View>
    );
  }


  render() {
    console.log("this is the state", this.state.path)

    return (
      <View style={styles.container}>
        {this.state.path ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }

  takePicture = async () => {
    console.log("CELLLLOOO ITS A BASS");

    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = this.camera.takePictureAsync(options);
      console.log(data.uri);

      this.setState({ path: data.uri })

    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

AppRegistry.registerComponent('App', () => ExampleApp);

export default ExampleApp