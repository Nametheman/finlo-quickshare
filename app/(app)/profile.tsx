import Button from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { logoutService } from "@/server/auth.service";
import { useAuthStore } from "@/store/useAuthStore";
import { Link } from "expo-router";
import { UserCircle } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user, clearStorage } = useAuthStore();
  const { loading, execute } = useFetch(logoutService);

  const logoutHandler = async () => {
    await execute();
    clearStorage();
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="items-center mt-10 mb-6">
        <UserCircle size={64} color="#008751" />
        <Text className="mt-2 text-xl font-semibold text-neutral-dark-gray">
          {user?.email?.split("@")[0] || "User"}
        </Text>
        <Text className="text-neutral-gray">{user?.email}</Text>
      </View>

      <View className="bg-neutral-100 rounded-xl p-4 mb-6">
        <Text className="text-sm text-neutral-gray">Joined</Text>
        <Text className="font-medium mb-2">
          {new Date(user?.created_at).toDateString()}
        </Text>
      </View>

      <View className="gap-4">
        <Link href="/history" asChild>
          <Button title="Loan History" variant="secondary" />
        </Link>

        <Button title="Edit Profile" variant="secondary" disabled />

        <Button title="Contact Support" variant="secondary" disabled />

        <Button
          title="Logout"
          variant="primary"
          onPress={logoutHandler}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
