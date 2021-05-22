import React, { useState } from 'react';
import { Dimensions } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import MyLogsTab from './MyLogsTab';
import SharedLogsTab from './SharedLogsTab';

const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');

const Tabs = ({ openModel }) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'MyLogs', title: 'My Logs' },
        { key: 'SharedLogs', title: 'Shared Logs' },
    ]);

    const renderScene = SceneMap({
        MyLogs: () => <MyLogsTab openModel={openModel} />,
        SharedLogs: () => <SharedLogsTab />,
    });

    const renderTabBar = (props) => {
        return <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#6c5ce7' }}
            activeColor='#6c5ce7'
            inactiveColor='#b2bec3'
            labelStyle={{
                fontFamily: 'Lato-Bold',
                fontSize: 13
            }}
            style={{
                backgroundColor: "transparent",
                elevation: 0,
            }}
            pressColor="transparent"
        />
    }
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: WIDTH }}
            renderTabBar={renderTabBar}
        />
    );
}

export default Tabs;