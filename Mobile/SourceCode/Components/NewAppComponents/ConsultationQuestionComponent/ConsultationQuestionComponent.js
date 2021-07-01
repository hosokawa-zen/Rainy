import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView,Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../Assets/Colors/colors';
import images from '../../../Assets/Images/images';
import CheckBox from '../../CheckBox/CheckBox';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


var radio_props = [
    {label: 'Yes', value: 0 },
    {label: 'No', value: 1 }
];


export default class ConsultationQuestionComponent extends React.Component {

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

                <View style={styles.itemList}>
                    <View style={styles.textView}>
                        <Text numberOfLines={2} style={styles.title}>{this.props.question}</Text>
                    </View>

                    <View style={styles.CheckBoxView}>
                        {/*<CheckBox checkTitle={'YES'}/>*/}
                        {/*<CheckBox marginTop={7} checkTitle={'NO'}/>*/}
                        <RadioForm
                            radio_props={radio_props}
                            initial={0}
                            buttonSize={13}
                            buttonOuterSize={23}
                            buttonColor={'grey'}
                            selectedButtonColor={colors.app_button_color}
                            onPress={(value) => {this.setState({value:value})}}
                        />
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
            // backgroundColor: colors.app_background,
            // marginTop:50
        },
    itemList:{
        height: Platform.OS === 'ios' ? hp(16) : hp(18),
        width:wp(94),
        backgroundColor: colors.white,
        alignSelf:'center',
        borderRadius:wp(2),
        paddingHorizontal:'2%',
        paddingTop:'3%',
        marginTop:14
        // marginBottom:Platform.OS === 'ios' ? 5 : 6
    },
    title:{
        fontSize:wp(4),
        fontWeight:'400',
        color:colors.black,
        paddingLeft:'2.5%'
    },
    textView:{
        height: '35%',
        width: '100%',
        // backgroundColor:'green'
    },
    CheckBoxView:{
        height: '65%',
        width: '100%',
        // justifyContent:'center',
        // backgroundColor:'red',
        paddingLeft: '5.5%',
        paddingTop: '4%',
    }


});

