import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from "../../Assets/Colors/colors";
import images from "../../Assets/Images/images";


export default class CheckBox extends React.Component {
    constructor(props){
        super(props);
        this.state={
            radioButtonChecked: props.checked
        }

    }

    componentWillReceiveProps(preprop, prestate) {
        if (preprop.checked != this.props.checked) {
            if (preprop.checked) {
                this.setState({radioButtonChecked:true})
            } else {
                this.setState({radioButtonChecked:false})
            }
        }
    }

    onRadioPress(){
        if (this.state.radioButtonChecked){
            this.setState({radioButtonChecked:false})
            this.props.update(true)
        }else{
            this.setState({radioButtonChecked:true})
            this.props.update(true)
        }
    }

    render() {
        return(
            <View style={styles.mainContainer} >
                <View style={[styles.container,{marginTop:this.props.marginTop,marginLeft:this.props.marginLeft}]}>

                    <TouchableOpacity onPress={()=>this.onRadioPress()} style={styles.touchViewRadio}>
                        {this.state.radioButtonChecked &&   <Image style={styles.img} source={images.icn_check_box} />  }
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.text}>{this.props.checkTitle}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    mainContainer:{
        // justifyContent: 'center',
        // alignItems:'center',
        // backgroundColor:'green',
        // flex:1,

    },
    text: {
        // fontFamily:'Montserrat-Regular',
        fontSize:14,
        color:colors.app_light_blue,
        fontWeight:'500'

    },
    container: {
        flexDirection:'row',
        alignItems: 'center',
        // backgroundColor: '#fff',
        // height:hp(10),
        // width:wp(10),
    },
    touchViewRadio: {
        height:wp(3.7),
        width:wp(3.7),
        backgroundColor: colors.app_light_blue,
        // borderRadius:wp(10),
        borderWidth:wp(0.5),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:wp(2),
        borderColor:colors.app_light_blue,
    },
    innerTouchViewRadio:{
        backgroundColor: 'red',
        width:'80%',
        height:'80%',
        borderRadius:wp(5),
        margin:1,
    },
    img:{
        resizeMode:'contain',
        height:hp(4),
        width:wp(4),
        tintColor:colors.app_button_color,
    }



});


