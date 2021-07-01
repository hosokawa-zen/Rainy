import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView,Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../Assets/Colors/colors';
import images from '../../../Assets/Images/images';
import CheckBox from '../../CheckBox/CheckBox';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';




export default class BrowseAllComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewShow: true,
            label:'yes',


        }

    }



    render() {


        return (

            <View style={styles.mainContainer}>

                <TouchableOpacity style={styles.container} onPress={this.props.onPress}>

                    <View style={styles.viewImage}>
                        <Image style={styles.img} source={this.props.image} />
                    </View>

                    <View style={styles.textView}>
                        <View style={styles.innerUpperView}>
                         <View>
                         <Text numberOfLines={2} style={styles.title}>{this.props.title}</Text>
                         <Text numberOfLines={1} style={styles.subHeading}>{this.props.subTitle}</Text>
                         </View>
                            <TouchableOpacity onPress={() => {this.props.onReports()}}>
                                <Image style={styles.icon} source={images.ic_sort} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.priceText}>{`$${this.props.price}`}</Text>
                        <Text style={styles.locationText}>{this.props.location}</Text>


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
            // backgroundColor: colors.app_dark_white,
            // marginTop:50
        },
    container:{
        height: Platform.OS === 'ios' ? hp(18) : hp(18),
        width:wp(96),
        // backgroundColor: colors.white,
        alignSelf:'center',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:wp(2.5)

    },
    viewImage:{
        height: '100%',
        width: '35%',
        backgroundColor: colors.white,
        borderRadius:wp(2),
        alignItems:'center',
        justifyContent:'center'

        // backgroundColor:'green',
    },
    img:{
        height: '90%',
        width: '90%',
        resizeMode:'contain',
        borderRadius: wp(2)
    },
    icon:{
        height: 20,
        width: 20,
        resizeMode:'contain',
        marginRight:'3%',
        borderRadius: wp(2),
    },
    innerUpperView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
    },
    title:{
        fontSize:wp(4.5),
        fontWeight:'bold',
        color:colors.app_dark_grey,
        // paddingLeft:'2.5%'
    },
    subHeading:{
        fontSize:wp(3.8),
        fontWeight:'400',
        color:colors.app_dark_grey,
        // paddingLeft:'2.5%'
    },
    priceText:{
        fontSize:wp(5.5),
        fontWeight:'bold',
        color:colors.app_red,
        // paddingLeft:'2.5%'
    },
    locationText:{
        fontSize:wp(3.8),
        fontWeight:'400',
        color:colors.app_dark_grey,
        paddingRight:'7%',
        width:'100%',
        textAlign:'right'
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



});

