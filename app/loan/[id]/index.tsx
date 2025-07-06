import Button from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { deleteLoanService, getLoanByIdService } from "@/server/loan.service";
import { useServerActions } from "@/store/useServerActions";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const LoanDetail = () => {
  const { id } = useLocalSearchParams();
  const { triggerRefresh } = useServerActions.getState();
  const { data: loan, execute, loading } = useFetch(getLoanByIdService);
  const {
    execute: deleteLoan,
    loading: deleting,
    error: deleteError,
  } = useFetch(deleteLoanService);
  const router = useRouter();

  useEffect(() => {
    if (typeof id === "string") {
      execute(id);
    }
  }, [id]);

  const handleDelete = async () => {
    Alert.alert("Delete Loan", "Are you sure you want to delete this loan?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteLoan(id as string);
            if (deleteError) {
              Toast.show({
                type: "error",
                text1: "Error deleting loan",
                text2: deleteError || "Something went wrong",
              });
            } else {
              triggerRefresh();
              Toast.show({
                type: "success",
                text1: "Loan deleted successfully",
              });
              router.back();
            }
          } catch (err: any) {
            Toast.show({
              type: "error",
              text1: "Error deleting loan",
              text2: err?.message || "Something went wrong",
            });
          }
        },
      },
    ]);
  };

  if (loading || !loan) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text className="text-neutral-gray text-base">
          Loading loan details...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text className="text-2xl font-bold mb-2 text-neutral-dark-gray">
          Loan Details
        </Text>

        <View className="bg-neutral-100 p-4 rounded-xl space-y-3">
          <Text className="text-base text-neutral-dark">
            <Text className="font-semibold">Amount:</Text> ${loan.amount}
          </Text>

          <Text className="text-base text-neutral-dark">
            <Text className="font-semibold">Status:</Text>{" "}
            <Text
              className={`${
                loan.status === "approved"
                  ? "text-green-600"
                  : loan.status === "pending"
                    ? "text-yellow-600"
                    : loan.status === "rejected"
                      ? "text-red-500"
                      : "text-orange-500"
              } font-semibold`}
            >
              {loan.status.toUpperCase()}
            </Text>
          </Text>

          <Text className="text-base text-neutral-dark">
            <Text className="font-semibold">Interest Rate:</Text>{" "}
            {loan.interest_rate}%
          </Text>

          <Text className="text-base text-neutral-dark">
            <Text className="font-semibold">Purpose:</Text>{" "}
            {loan.purpose || "N/A"}
          </Text>

          <Text className="text-base text-neutral-dark">
            <Text className="font-semibold">Collateral:</Text>{" "}
            {loan.collateral || "N/A"}
          </Text>
        </View>

        <Button
          title="Delete Loan"
          className="mt-8"
          variant="destructive"
          onPress={handleDelete}
          loading={deleting}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoanDetail;
