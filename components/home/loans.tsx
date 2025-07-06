import SkeletonLoanCard from "@/components/skeletons/loan_skeleton";
import { useFetch } from "@/hooks/useFetch";
import { getUserLoansService } from "@/server/loan.service";
import { useAuthStore } from "@/store/useAuthStore";
import { useServerActions } from "@/store/useServerActions";
import { usePathname } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import LoanCard from "../cards/loan_card";
import Button from "../ui/button";

const Loans = () => {
  const { triggerRefresh } = useServerActions.getState();
  const user = useAuthStore((s) => s.user);
  const pathname = usePathname();
  const { data, loading, error, execute } = useFetch(getUserLoansService);

  const fetchLoans = useCallback(async () => {
    if (user?.id) {
      await execute(user.id);
      triggerRefresh();
    }
  }, [user?.id]);

  useEffect(() => {
    if (pathname === "/") {
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
    <View className="mt-8 flex-1">
      <Text className="text-xl font-medium mb-4">Recent Loans</Text>

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
    </View>
  );
};

export default Loans;
