import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView,Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../Assets/Colors/colors';
import images from '../../../Assets/Images/images';
import CheckBox from '../../CheckBox/CheckBox';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';




export default class TransactionComponent extends React.Component {

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

                <View style={styles.container}>

                    <View style={styles.viewImage}>
                        <Image style={styles.img} source={this.props.image} />
                    </View>

                    <View style={styles.textView}>
                                <Text numberOfLines={5} style={styles.title}>{this.props.text}</Text>
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
        height: '100%',
        width: '100%',
        resizeMode:'cover',
        borderRadius: wp(2)
    },

    title:{
        fontSize:wp(4),
        fontWeight:'bold',
        color:colors.app_dark_grey,
        width:'100%',
        // paddingLeft:'2.5%'
    },
    textView:{
        height: '100%',
        width: '62%',
        backgroundColor:'white',
        // backgroundColor: colors.white,
        // justifyContent: 'space-around',
        paddingLeft:'4%',
        paddingRight:'2%',
        paddingTop:'5%',
        borderBottomRightRadius:wp(2),
        borderTopRightRadius:wp(2),
        borderBottomLeftRadius:wp(1),
        borderTopLeftRadius:wp(1),
        // paddingVertical:'2%'
    },



});

