import { getUserOverviewService } from "@/server/loan.service";
import { useAuthStore } from "@/store/useAuthStore";
import { useServerActions } from "@/store/useServerActions";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const Overview = () => {
  const [overviewData, setOverviewData] = useState<
    { label: string; value: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((s) => s.user);
  const refreshKey = useServerActions((s) => s.refreshKey);

  const fetchOverview = async () => {
    if (!user?.id) return;
    try {
      const data = await getUserOverviewService(user.id);
      setOverviewData(data);
    } catch (err) {
      console.error("Failed to fetch overview", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, [user?.id, refreshKey]);

  const totalBalance =
    overviewData.find((i) => i.label === "Total Balance")?.value ?? 0;

  if (loading) {
    return (
      <View className="p-4 bg-primary-dark-green rounded-3xl h-40 justify-center items-center">
        <ActivityIndicator color="#fff" />
      </View>
    );
  }

  return (
    <View className="p-4 pb-8 bg-primary-dark-green rounded-3xl">
      <Text className="text-sm font-medium text-white">Account</Text>
      <Text className="text-3xl font-bold text-white mt-2">
        $
        {totalBalance.toLocaleString("en-US", {
          currency: "USD",
          minimumFractionDigits: 2,
        })}
      </Text>
      <View className="mt-8 flex-col gap-2">
        {overviewData.map((item, index) => (
          <List key={index} label={item.label} value={item.value} />
        ))}
      </View>
    </View>
  );
};

export default Overview;

const List = ({ label, value }: { label: string; value: number }) => {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-sm font-medium text-white">{label}</Text>
      <Text className="text-sm font-medium text-white">
        $
        {value.toLocaleString("en-US", {
          currency: "USD",
          minimumFractionDigits: 2,
        })}
      </Text>
    </View>
  );
};
