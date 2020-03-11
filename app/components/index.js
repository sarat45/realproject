import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './Home'
import NewItemScreen from './NewItem'
import Address from './address';

const AppStack = createStackNavigator({
    Home:{
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            title: `Home`,
        }),
    },
    NewItem:{
        screen: NewItemScreen,
        navigationOptions: ({ navigation }) => ({
            title: `New Item`,
        }),
    },
    Address:{
        screen: Address,
        navigationOptions: ({ navigation }) => ({
            title: `Address`,
        }),
    }
});

const RoutesStack = createSwitchNavigator(
    {
        App: AppStack
    },
);

const Router = createAppContainer(RoutesStack);

export default Router;
