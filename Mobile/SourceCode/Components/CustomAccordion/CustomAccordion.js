import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import images from '../../Assets/Images/images';
import {Text, View, StyleSheet, Image, Platform } from 'react-native';
//================================ React Native Imported Files ======================================//

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import colors from '../../Assets/Colors/colors';

const SECTIONS = [
  {
    title: 'First AAA',
  }
];

export default class CustomAccordion extends Component {
  state = {
    activeSections: [],
    openState: false
  };

  _renderSectionTitle = section => {
    return (
      <View isActive = {false}  style={styles.sectionTitle}>
      </View>
    );
  };

  _renderHeader = section => {
    var style = this.state.openState ? styles.renderHeader : styles.renderHeaderRadius;
    if (this.props.noPadding) {
      style = styles.renderHeaderRadius;
    }
    return (
      <View style={style}>
        <View style={styles.viewContact}>
            <Text style={styles.titleTouchItem}>{this.props.title}</Text>
            <Image style={styles.arrowUp} source={!this.state.openState ? images.ic_sort_down : images.ic_sort_up}/>
        </View>
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View style={this.props.noPadding ? styles.renderContentNoPadding : styles.renderContent}>
        {this.props.content}
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
    if (!this.state.openState) {
      this.setState({openState: !this.state.openState})
    } else {
      setTimeout(() => {
        this.setState({openState: !this.state.openState})
      }, 300)
    }
  };

  render() {
    return (
      <Accordion
        sections={SECTIONS}
        activeSections={this.state.activeSections}
        renderSectionTitle={this._renderSectionTitle}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  sectionTitle: {
    height: 0,
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  image:{
    height: 20,
    width: 20,
    resizeMode:'cover'
  } ,
  renderContentNoPadding:{
    flex: 1,
    width: wp(92),
    backgroundColor:colors.white,
    alignSelf:'center',
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingHorizontal:'5%',
    // paddingBottom:'5.5%',
    borderBottomLeftRadius:wp(3),
    borderBottomRightRadius:wp(3)
  },
  renderContent:{
    flex: 1,
    width: wp(92),
    backgroundColor:colors.white,
    alignSelf:'center',
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal:'5%',
    paddingBottom:'5.5%',
    borderBottomLeftRadius:wp(3),
    borderBottomRightRadius:wp(3)
  },
  renderHeader:{
    height:Platform.OS=== 'ios' ? hp(6.5):hp(7.6),
    width: wp(92),
    backgroundColor:colors.white,
    alignSelf:'center',
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal:'5%',
    marginTop:wp(2.5),
    paddingTop:'2.5%',
    borderTopLeftRadius:wp(3),
    borderTopRightRadius:wp(3)
  },
  renderHeaderRadius:{
    height:Platform.OS=== 'ios' ? hp(6.5):hp(7.6),
    width: wp(92),
    backgroundColor:colors.white,
    alignSelf:'center',
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal:'5%',
    marginTop:wp(2.5),
    paddingVertical:'2.5%',
    borderRadius:wp(3),
  },
  titleTouchItem:{
    fontSize:wp(4),
    fontWeight:'bold',
    color:colors.app_header_color,
  },
  viewContact:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical:'2.5%'
  },
  dealText:{
    fontSize:wp(3.5),
    fontWeight:'bold',
    color:colors.app_dark_grey,
    paddingTop: '4%'

  },
  arrowUp:{
    height:14,
    width:14,
    resizeMode: 'contain',
  },
})