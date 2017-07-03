import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHightlight,
  ListView
} from 'react-native';

import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react/native';
import TouchableImage from './TouchableImage';
import styles from './styles';
import Spinner from './Spinner'

@inject('store') @observer
class ImgurCarousel extends Component {
  render() {
    const { store } = this.props;
    console.log(store)
    // debugger
     if (!store.curentImage){
      return <Spinner/>
     }

     if (store.currentImage.is_album) {
       return (
         <Album albumID={store.currentImage.id} />
       );
     }else(

        return (<TouchableImage image={store.curentImage}/>)    
     )


                            
   }
}

export default ImgurCarousel;