/*
 * Hey Neighbor — Tab Navigation
 */
import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Platform.select({
            ios: insets.bottom + 64,
            android: insets.bottom + 64,
            default: 72,
          }),
          paddingTop: 10,
          paddingBottom: Platform.select({
            ios: insets.bottom + 10,
            android: insets.bottom + 10,
            default: 10,
          }),
          paddingHorizontal: 8,
          backgroundColor: Colors.surface,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Neighborhood',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="event" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="yardsales"
        options={{
          title: 'Yard Sales',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="sell" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="village"
        options={{
          title: 'Village Kids',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="child-care" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="offers"
        options={{
          title: 'Offers',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-offer" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
