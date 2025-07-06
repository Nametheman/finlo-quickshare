import LoanCard from "@/components/cards/loan_card";
import SkeletonLoanCard from "@/components/skeletons/loan_skeleton";
import Button from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { getUserLoansService } from "@/server/loan.service";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const History = () => {
  const pathname = usePathname();

  const user = useAuthStore((s) => s.user);
  const { data, loading, error, execute } = useFetch(getUserLoansService);

  const fetchLoans = useCallback(async () => {
    if (user?.id) {
      await execute(user.id);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetchLoans();
    }
  }, [pathname]);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: "Failed to fetch loans",
        text2: error || "Please try again later",
      });
    }
  }, [error]);

  const isEmpty = !loading && !data?.length;
  return (
    <SafeAreaView className="flex-1 relative p-4 bg-white">
      <Text className="text-xl font-medium mb-4">All Loans</Text>
      {loading ? (
        <View className="gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonLoanCard key={index} />
          ))}
        </View>
      ) : error && isEmpty ? (
        <View className="items-center mt-8">
          <Text className="text-red-500 mb-4">
            {error || "An error occurred."}
          </Text>
          <Button title="Retry" onPress={fetchLoans} />
        </View>
      ) : isEmpty ? (
        <View className="items-center mt-8">
          <Text className="text-neutral-gray">No loans found.</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <LoanCard loan={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 90 }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchLoans} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default History;
