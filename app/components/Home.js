import React, {useEffect, useState} from 'react';
import {
    FlatList,
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ActivityIndicator,
    TouchableHighlight,
    AsyncStorage,
    Button
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

import { addItems, deleteItem } from "../actions";

import ListItem from "./ListItem";
import Address from "./address"

export default function Home(props) {
    const dispatch = useDispatch();
    const { navigation } = props;

    const [isFetching, setIsFetching] = useState(false);
    const dataReducer = useSelector((state) => state.dataReducer);
    const {items } = dataReducer;

    
    useEffect(() => getData(), []);

   
    const getData = () => {
        setIsFetching(true);

        AsyncStorage.getItem('items', (err,items) => {
            if (err) alert(err.message);
            else if (items !== null) dispatch(addItems(JSON.parse(items)));

            setIsFetching(false)
        });

        // FAKE API
         let url = "https://my-json-server.typicode.com/mesandigital/demo/quotes";
        axios.get(url)
            .then(res => res.data)
            .then((data) => dispatch(addItems(data)))
            .catch(error => alert(error.message))
            .finally(() => setIsFetching(false));
     };

    const renderItem = ({item, index}) => {
        return (
            <ListItem item={item} index={index} navigation={navigation} onDelete={onDelete} onEdit={onEdit}/>
        )
    };

   
    const onEdit = (item) => {
        navigation.navigate('NewItem', {item: item, email:"Edit Item"})
    };

   
    const onDelete = (id) => {

        AsyncStorage.getItem('items', (err,items) => {
            if (err) alert(err.message);
            else if (items !== null){
               items = JSON.parse(items);
                const index =items.findIndex((obj) => obj.id === id);

                if (index !== -1)items.splice(index, 1);

                //Update the local storage
                AsyncStorage.setItem('items', JSON.stringify(quotes), () => dispatch(deleteItem(id)));
            }
        });

        // FAKE API
        let url = "https://my-json-server.typicode.com/mesandigital/demo/quotes";
        axios.delete(url, {data:{id:id}})
            .then((res) => dispatch(deleteItem(id)))
            .catch(error => alert(error.message))
            .finally(() => setIsFetching(false));
    };

    
    if (isFetching) {
        return (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator animating={true}/>
            </View>
        );
    } else{
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `items_${index}`}/>
                    

                <TouchableHighlight style={styles.floatingButton}
                                    underlayColor='#ff7043'
                                    onPress={() => navigation.navigate('NewItem', {title:"New Item"})}>
                    <Text style={{fontSize: 25, color: 'white'}}>+</Text>
                    </TouchableHighlight>                            
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: '#F5F5F5'
    },

    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    floatingButton:{
        backgroundColor: '#6B9EFA',
        borderColor: '#6B9EFA',
        height: 55,
        width: 55,
        borderRadius: 55 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 60,
        right: 15,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
});