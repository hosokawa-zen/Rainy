import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView,Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../Assets/Colors/colors';
import images from '../../../Assets/Images/images';
import CheckBox from '../../CheckBox/CheckBox';



export default class VetClinicComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewShow: true,
        }

    }

    render() {





        return (

            <View style={styles.mainContainer}>

                <View style={styles.itemList}>
                    <View style={styles.clinicNameView}>
                        <View style={styles.clinicNameInnerView}>
                            <Text numberOfLines={1} style={styles.clinicName}>{this.props.name}</Text>
                            <Image style={[styles.iconTag,{tintColor:this.props.tintColorTag || colors.app_button_color}]} source={images.ic_tag_2} />
                        </View>
                        <View style={styles.clinicTimeInnerView}>
                            <Image style={styles.iconTime} source={images.ic_clock_2} />
                            <Text numberOfLines={1} style={styles.clinicTime}>Open 24 hrs daily</Text>
                        </View>
                    </View>

                    <View style={styles.clinicAddressView}>
                        <Text numberOfLines={1} style={styles.clinicAddress}>{this.props.address}</Text>
                        <Text numberOfLines={1} style={[styles.clinicAddress,{paddingTop:Platform.OS === 'ios' ? '2%' :'1.2%'}]}>{this.props.email}</Text>
                    </View>

                    <View style={styles.clinicDistanceView}>
                        <Text numberOfLines={1} style={styles.clinicDistance}>{this.props.distance}</Text>
                    </View>

                </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({

    mainContainer:
        {
            // flex: 1,
            // justifyCsontent:'center',
            // backgroundColor: colors.greyTabs,
            // marginTop:50
        },
    itemList:{
        height: Platform.OS === 'ios' ? hp(18) : hp(19),
        width:wp(94),
        backgroundColor: colors.white,
        alignSelf:'center',
        borderRadius:wp(2),
        marginTop:17
    },
    clinicName:{
        fontSize:wp(4),
        fontWeight:'bold',
        color:colors.app_button_color,
    },
    clinicTime:{
        fontSize:wp(3.6),
        fontWeight:'bold',
        color:colors.placeholder_text_color,
    },
    clinicAddress:{
        fontSize:wp(3.7),
        fontWeight:'500',
        color:colors.black,
    },
    clinicDistance:{
        fontSize:wp(3.7),
        fontWeight:'bold',
        color:colors.placeholder_text_color,
    },


    clinicNameView:{
        height: '37%',
        width: '100%',
        // backgroundColor:'green',
        flexDirection:'row',
        justifyContent:'space-between',
        // alignItems:'center'
        paddingHorizontal:Platform.OS === 'ios' ? '2%' :'4%'
    },
    clinicNameInnerView:{
        height:'100%',
        width:'58%',
        // backgroundColor:'red',
        flexDirection:'row',
        alignItems:'center',

    },
    clinicTimeInnerView:{
        height:'100%',
        width:'42%',
        flexDirection:'row',
        // backgroundColor:'gold',
        alignItems:'center',
        paddingLeft:Platform.OS==='ios' ? '2%' : '4%'
    },

    clinicAddressView:{
        height: '38%',
        width: '100%',
        // backgroundColor:'orange',
        // alignItems:'center'
        paddingHorizontal:Platform.OS === 'ios' ? '2%' :'4%'

    },
    clinicDistanceView:{
        height: '25%',
        width: '100%',
        // backgroundColor:'blue',
        alignItems:'flex-end',
        paddingHorizontal:Platform.OS === 'ios' ? '2%' :'4%'
        // alignSelf: 'center'
    },
    iconTag:{
        height: 16,
        width: 16,
        resizeMode:'contain',
        marginLeft: '2%'
    },
    iconTime:{
        height: 14,
        width: 14,
        resizeMode:'contain',
        marginRight: '4%'
    },


});

