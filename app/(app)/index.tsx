import Loans from "@/components/home/loans";
import Overview from "@/components/home/overview";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  return (
    <SafeAreaView className="flex-1 relative p-4 bg-white">
      <Overview />
      <Loans />
    </SafeAreaView>
  );
};

export default index;
