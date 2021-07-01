import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView,Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../Assets/Colors/colors';
import images from '../../../Assets/Images/images';



export default class ConsultationListComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewShow: true,
        }

    }

    render() {





        return (

            <View style={styles.mainContainer}>

                  <TouchableOpacity style={styles.itemList} onPress={this.props.onPressItem}>
                          <Image style={styles.icon} source={images.ic_chevron_right} />
                          <Text style={styles.title}>{this.props.title}</Text>
                  </TouchableOpacity>


            </View>
        )
    }
}

const styles = StyleSheet.create({

    mainContainer:
        {
            // flex: 1,
            // justifyContent:'center',
            // backgroundColor: colors.white,
            // marginTop:50
        },
    itemList:{
        height:hp(4),
        width:wp(91),
        // backgroundColor: 'red',
        alignSelf:'center',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:Platform.OS === 'ios' ? 5 : 6
    },
    icon:{
        height: 17,
        width: 17,
        resizeMode:'contain'
    },
    title:{
        fontSize:wp(4.2),
        fontWeight:'bold',
        color:colors.app_button_color,
        paddingLeft:'2.5%'
    }


});

