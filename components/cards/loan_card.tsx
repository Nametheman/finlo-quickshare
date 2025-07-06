import { format } from "date-fns";
import { useRouter } from "expo-router";
import { MailWarning } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

const LoanCard = ({ loan }: { loan: Loan }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/loan/${loan.id}`)}
      className="shadow-md p-4 border border-neutral-300 rounded-2xl mb-4"
    >
      <View className="flex-row justify-between">
        <Text className="font-semibold text-lg">
          ${loan.amount.toLocaleString()}
        </Text>
        <View className="flex-row items-center gap-2">
          <Text
            className={`font-medium ${
              loan.status === "approved"
                ? "text-green-600"
                : loan.status === "pending"
                  ? "text-yellow-600"
                  : loan.status === "rejected"
                    ? "text-red-500"
                    : "text-orange-500"
            }`}
          >
            {loan.status.toUpperCase()}
          </Text>
          {loan.status === "flagged" && (
            <MailWarning size={20} color="#f97316" />
          )}
        </View>
      </View>
      <Text className="text-neutral-500 mt-1 text-sm">
        Applied on {format(new Date(loan.created_at), "MMM dd, yyyy h:mm a")}
      </Text>
    </Pressable>
  );
};

export default LoanCard;
