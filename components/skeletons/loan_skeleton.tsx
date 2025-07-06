import React from "react";
import { View } from "react-native";

const LoanSkeleton = () => {
  return (
    <View className="h-24 w-full bg-neutral-200 rounded-2xl animate-pulse" />
  );
};

export default LoanSkeleton;
