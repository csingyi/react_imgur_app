import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  ListView
} from 'react-native';


import { inject, observer } from 'mobx-react/native';

import styles from './styles';

@inject('store') @observer
class TouchableImage extends Component {
    state = {
      width: null,
      hideCaption: false
    }
 
  onPress(event) {
    console.log("press")
    const {width} =this.state,
    { store } = this.props,
    X = event.nativeEvent.locationX;

    if (X < width*.3) {
      store.prevImage();
        console.log("pre")
    }else if (X > width*.6) {
      store.nextImage();
      console.log("next")
    }
  }

  onPressIn(event) {
    this.setState({
      hideCaption: true
    })
  }

 onPressOut(event) {
   this.setState({
     hideCaption: false
   })
 }

 onImageLayout(event) {
   this.setState({
     width:event.nativeEvent.layout.width
   })
 }


 get caption() {
   let { caption, image} = this.props;
   return image.title || image.description || caption;
 }

 render() {
    const { image, store, height } = this.props,
    
    uri = image.link,
    hideCaption = this.state.hideCaption ? styles.hiddenLabel : null;

  //  console.log("i enter the component")
    return (
        <TouchableHighlight onPress={this.onPress.bind(this)}
                                onPressIn={this.onPressIn.bind(this)}
                                onPressOut={this.onPressOut.bind(this)}
                                style={styles.fullscreen}>
                <Image source={{uri: uri}}
                       style={[styles.backgroundImage,
                               styles[store.orientation.toLowerCase()],
                               {height: height || null}]}
                       onLayout={this.onImageLayout.bind(this)}>
                    {this.caption ?
                     <Text style={[styles.imageLabel, hideCaption]}>{this.caption}</Text>
                     : null}
                </Image>
            </TouchableHighlight>
      
       );
 }

}

export default TouchableImage;