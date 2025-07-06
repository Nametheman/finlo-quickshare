import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Inbox = () => {
  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-semibold mb-4 text-neutral-dark-gray">
        Inbox
      </Text>

      <View className="flex-1 justify-center items-center">
        <Text className="text-neutral-gray">You have no messages yet.</Text>
      </View>
    </SafeAreaView>
  );
};

export default Inbox;
