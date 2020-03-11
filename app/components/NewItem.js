import React, {useState} from 'react';
import {
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    AsyncStorage
} from 'react-native';

import {useDispatch} from 'react-redux';
import {Header} from 'react-navigation-stack';

import axios from "axios";

import {addItem, updateItem} from "../actions";


export default function NewItem(props) {
    const dispatch = useDispatch();
    const {navigation} = props;

    let item = navigation.getParam('item', null);

    //1 - DECLARE VARIABLES
    const [isSaving, setIsSaving] = useState(false);
    const [name, setName] = useState(item ? item.name : "");
    const [email, setEmail] = useState(item ? item.email : "");
    const [phone, setPhone] = useState(item ? item.phone : "");

    
    const onSave = () => {
        let edit = item !== null;
        let item_ = {};

        if (edit) {
            item_ = item;
            item_['name'] = name;
            item_['email'] = email;
            item_['phone'] = phone;
        } else {
            let id = generateID();
            item_ = {"id": id, "name": name, "email": email,"phone":phone};
        }


        
        let url = "https://my-json-server.typicode.com/mesandigital/demo/quotes";
        axios.post(url, item_)
            .then(res => res.data)
            .then((data) => {
                dispatch(item ? updateItem(data) : addItem(data));
                navigation.goBack();
            })
            .catch(error => alert(error.message))
    };

   
    const generateID = () => {
        let d = new Date().getTime();
        let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(5);
        });

        return id;
    };

    let disabled = (name.length > 0 && email.length > 0) ? false : true;
    return (
        
            <SafeAreaView style={styles.flex}>
                <View style={styles.flex}>
                    <TextInput
                        onChangeText={(name) => setName(name)}
                        placeholder={"Name"}
                        autoFocus={true}
                        style={[styles.input]}
                        value={name}/>
                    <TextInput
                        multiline={true}
                        onChangeText={(email) => setEmail(email)}
                        placeholder={"Enter Email"}
                        style={[styles.input]}
                        value={email}/>
                    <TextInput
                        multiline={true}
                        onChangeText={(phone) => setPhone(phone)}
                        placeholder={"Enter Phone"}
                        style={[styles.input]}
                        value={phone}/>
                         <View style={{ alignItems: "center",paddingTop:20}}>
                        <TouchableHighlight style={[styles.button]} disabled={disabled} onPress={onSave}
                                            underlayColor="rgba(0, 0, 0, 0)">
                            <Text style={[styles.buttonText, {color: disabled ? "rgba(255,255,255,.5)" : "#FFF"}]}>
                                Save
                            </Text>
                        </TouchableHighlight>

                </View>
                </View>

                   
            </SafeAreaView>
    
    );
}


const styles = StyleSheet.create({
    flex: {
        flex: 1
    },

    count: {
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 17,
        color: "#6B9EFA"
    },

    button: {
        width: 80,
        height: 44,
        borderRadius: 8,
        
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#6B9EFA"
    },

    buttonText: {
        textAlign:"center",
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 16,
    },

    input: {
        fontSize: 20,
        borderBottomWidth:1,
        lineHeight: 22,
        fontFamily: 'Helvetica Neue',
        height: 80,
        padding: 16,
        backgroundColor: 'white',
    },

    
});