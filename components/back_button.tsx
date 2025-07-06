import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const BackButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="flex-row items-center gap-2"
      onPress={() => router.back()}
    >
      <View className="flex-row items-center justify-center w-12 h-12 border border-neutral-300 rounded-xl">
        <ChevronLeft color={"#6B7280"} />
      </View>
      <Text>Go back</Text>
    </TouchableOpacity>
  );
};

export default BackButton;
