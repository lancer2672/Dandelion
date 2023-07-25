import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TabView, SceneMap } from "react-native-tab-view";
import UserPost from "./UserPost.component";
import { useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TAB_ITEM_WIDTH = Dimensions.get("window").width / 2;
const Tab = createMaterialTopTabNavigator();
const FeatureTabs = () => {
  const userState = useSelector(userSelector);

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props}></CustomTabBar>}
      screenOptions={{
        tabBarActiveTintColor: "#fff",
      }}
      initialLayout={{
        width: Dimensions.get("window").width,
      }}
    >
      <Tab.Screen
        initialParams={{ userId: userState.user._id }}
        name="Ảnh"
        component={UserPost}
      />
      <Tab.Screen
        initialParams={{ userId: userState.user._id }}
        name="Video"
        component={UserPost}
      />
    </Tab.Navigator>
  );
};
const CustomTabBar = ({ state, descriptors, navigation, position }) => {
  const inputRange = state.routes.map((_, i) => i);
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((inputIndex) =>
            inputIndex === index ? 1 : 0.5
          ),
        });
        const { options } = descriptors[route.key];

        return (
          <TouchableOpacity
            key={index}
            style={styles.tabItem}
            onPress={() => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
          >
            <Animated.Text style={[styles.tabButtonText, { opacity }]}>
              {options.title || route.name}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
      <TabBarIndicator state={state}></TabBarIndicator>
    </View>
  );
};
const TabBarIndicator = ({ state }) => {
  const [translateValue, setTranslateValue] = useState(new Animated.Value(0));
  useEffect(() => {
    slide();
  }, [state]);
  const slide = () => {
    const toValue = state.index * TAB_ITEM_WIDTH;
    Animated.timing(translateValue, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Animated.View
      style={{
        position: "absolute",
        width: TAB_ITEM_WIDTH - 48,
        marginHorizontal: 24,
        borderBottomColor: "#9971ee",
        borderBottomWidth: 3,
        bottom: 4,

        transform: [{ translateX: translateValue }],
      }}
    ></Animated.View>
  );
};
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#9971ee",
  },
});

export default FeatureTabs;
