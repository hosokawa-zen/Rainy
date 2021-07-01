import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView,Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../Assets/Colors/colors';
import images from '../../../Assets/Images/images';
import CheckBox from '../../CheckBox/CheckBox';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';




export default class LockerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewShow: true,
            label:'yes',


        }

    }

    goToTerms = () => {
        if (this.props && this.props.navigation) {
            this.props.navigation.navigate('TermsAndCondtions');
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>

                <TouchableOpacity style={styles.container} onPress={this.props.onPress}>

                    <View style={styles.containerImage}>
                        <View style={styles.imageView}>
                            <Image style={styles.img} source={this.props.image} />
                        </View>
                        <View style={styles.itemDetail}>
                            <Text style={styles.textPrice}>{`$${this.props.price}`}</Text>
                            <View style={styles.infoView}>
                                <Image style={styles.iconSmall} source={images.lock} />
                                <Text numberOfLines={1} style={[styles.infoText, {paddingLeft: '5%'}]}>{this.props.lockText}</Text>
                            </View>
                            <View style={[styles.infoView,{paddingTop: '5%'}]}>
                                <Image style={styles.iconShopping} source={images.shippingTag} />
                                <Text numberOfLines={1} style={[styles.infoText, {paddingLeft: '2%'}]}>{this.props.valid}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.textView}>
                        <View style={styles.innerUpperView}>
                            <View style={{width:'85%',}}>
                                <Text numberOfLines={2} style={styles.title}>{this.props.title}</Text>
                                <Text numberOfLines={1} style={styles.subHeading}>{this.props.subTitle}</Text>
                            </View>
                            <TouchableOpacity onPress={() => {this.props.onRightClick()}} style={{width:'15%',paddingBottom:'7%'}}>
                                <Image style={[styles.icon,{tintColor:this.props.tintColorRightIcon || null}]} source={this.props.rightIcon} />
                            </TouchableOpacity>
                        </View>

                        <Text numberOfLines={4}  style={styles.text}>{this.props.text}</Text>

                        <View style={styles.bottomText}>
                            <TouchableOpacity onPress={() => {this.goToTerms()}}>
                                <Text style={styles.textTerm}>View Terms and Conditions</Text>
                            </TouchableOpacity>
                            <Text style={styles.locationText}>{this.props.quantity}</Text>
                        </View>


                    </View>
                </TouchableOpacity>


            </View>
        )
    }
}

const styles = StyleSheet.create({

    mainContainer:
        {
            // flex: 1,
            // justifyCsontent:'center',
            backgroundColor: colors.app_dark_white,
            // marginTop:50
        },
    container:{
        height: Platform.OS === 'ios' ? hp(24) : hp(26),
        width:wp(92),
        // backgroundColor: colors.white,
        alignSelf:'center',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:wp(2.5)

    },
    containerImage:{
        height: '100%',
        width: '35%',
        backgroundColor: colors.white,
        borderRadius:wp(2),
        // alignItems:'center',
        // justifyContent:'center'

        // backgroundColor:'green',
    },

    img:{
        height: '100%',
        width: '100%',
        resizeMode:'cover',
        borderTopLeftRadius: wp(2),
        borderTopRightRadius: wp(2)
    },
    imageView:{
        height: '55%',
        width: '100%',
        // backgroundColor:'blue',
        alignItems:'center',

    },
    itemDetail:{
        height: '45%',
        width: '100%',
        // backgroundColor: colors.dark_orange,
        paddingLeft:'3%',
        paddingTop:'10%'
    },
    icon:{
        height: 20,
        width: 20,
        resizeMode:'contain',
        marginRight:'3%',
        borderRadius: wp(2)
    },
    iconSmall:{
        height: 12,
        width: 12,
        resizeMode:'contain',
        tintColor:colors.grey1,
    },
    iconShopping:{
        height: 16,
        width: 16,
        resizeMode:'contain',
        tintColor:colors.grey1
    },
    infoView:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '3%'
    },
    infoText:{
        fontSize:wp(2.5),
        fontWeight:'500',
        color:colors.app_dark_grey,
        paddingLeft:'3%',
        width:'87%'
    },
    innerUpperView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
    },
    title:{
        fontSize:wp(4.3),
        fontWeight:'bold',
        color:colors.app_dark_grey,
        // backgroundColor:'green'
        // paddingLeft:'2.5%'
    },
    subHeading:{
        fontSize:wp(3.8),
        fontWeight:'400',
        color:colors.app_dark_grey,
        // paddingLeft:'2.5%'
    },
    text:{
        fontSize:wp(3.9),
        fontWeight:'400',
        color:colors.app_dark_grey,
        paddingRight:'2.5%'
    },
    locationText:{
        fontSize:wp(3.8),
        fontWeight:'400',
        color:colors.app_dark_grey,
        paddingRight:'5%',
        // textAlign:'right'
    },
    textPrice:{
        fontSize:wp(5.5),
        fontWeight:'600',
        color:colors.app_red,
    },
    textView:{
        height: '100%',
        width: '62%',
        // backgroundColor:'orange',
        backgroundColor: colors.white,
        justifyContent: 'space-around',
        paddingLeft:'4%',
        borderBottomRightRadius:wp(2),
        borderTopRightRadius:wp(2),
        borderBottomLeftRadius:wp(1),
        borderTopLeftRadius:wp(1),
        paddingVertical:'2%'
    },
    bottomText:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    textTerm:{
        fontSize:wp(3.3),
        fontWeight:'600',
        color:colors.app_header_color,
        textDecorationLine:'underline',
        fontStyle:'italic'

    }



});

