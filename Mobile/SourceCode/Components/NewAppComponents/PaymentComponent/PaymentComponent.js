import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView,Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../Assets/Colors/colors';
import images from '../../../Assets/Images/images';
import CheckBox from '../../CheckBox/CheckBox';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';




export default class PaymentComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewShow: true,
            label:'yes',
            initValue: 3,
            radio_props: [
                {value:0},
            ],
            isDisplay: true
        }
        if (this.props.selectedId == this.props.id) {
            this.setState({initValue:0})
        }
    }

    componentWillReceiveProps(preprop, prestate) {
        if (preprop.selectedId != this.props.selectedId) {
            this.setState({isDisplay: false})
            if (preprop.selectedId == this.props.id) {
                this.setState({initValue:0})
            } else {
                this.setState({initValue:3})
            }
            setTimeout(() => {
                this.setState({isDisplay: true})
            }, 50);
        }
    }

    render() {

        const {initValue, radio_props, isDisplay} = this.state;
        const radioButton = <RadioForm
            radio_props={radio_props}
            initial={initValue}
            onPress={(value) => {
                this.props.checked(this.props.id)
            }}
            buttonColor={colors.app_dark_grey}
            buttonSize={10}
            buttonOuterSize={20}
        />

        return (

            <View style={styles.mainContainer}>

                <View style={styles.container}>

                    <View style={styles.viewText}>
                        <Text numberOfLines={5} style={styles.title}>{this.props.title}</Text>
                        <Image style={styles.img} source={this.props.image} />
                    </View>
                    <View style={styles.radioView}>
                        {
                            isDisplay == true ? radioButton : <View />
                        }
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
            // marginTop:70
        },
    container:{
        height: Platform.OS === 'ios' ? hp(8) : hp(9),
        width:wp(92),
        backgroundColor: colors.white,
        alignSelf:'center',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:wp(4),
        marginTop:wp(2.5),

    },
    viewText:{
        height: '100%',
        width: '80%',
        // backgroundColor: colors.white,
        // borderRadius:wp(2),
        alignItems:'center',
        justifyContent:'center',
        paddingLeft:'5%'

        // backgroundColor:'green',
    },
    radioView:{
        height: '100%',
        width: '20%',
        // backgroundColor: colors.grey,
        // borderRadius:wp(2),
        alignItems:'center',
        justifyContent:'center'
    },

    title:{
        fontSize:wp(4),
        fontWeight:'bold',
        color:colors.app_header_color,
        width:'100%',
        // paddingLeft:'2.5%'
    },



});

