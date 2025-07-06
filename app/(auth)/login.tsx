import Button from "@/components/ui/button";
import InputField from "@/components/ui/input";
import { useFetch } from "@/hooks/useFetch";
import { loginSchema } from "@/schemas/auth/login.schema";
import { loginService } from "@/server/auth.service";
import { useAuthStore } from "@/store/useAuthStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Keyboard, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const Login = () => {
  const router = useRouter();

  const { execute, loading, error, data } = useFetch(loginService);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const loginHandler = async (values: any) => {
    const result = await execute(values.email, values.password);

    if (!result) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error || "Something went wrong. Please try again.",
      });
      return;
    }

    const { session, user } = result;

    if (!session?.access_token || !user) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error?.toString() ?? "Something went wrong",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });

      return;
    }

    useAuthStore.getState().setToken(session.access_token);
    useAuthStore.getState().setUser(user);
    useAuthStore.getState().setIsLoggedIn(true);

    router.replace("/");
  };
  return (
    <SafeAreaView className="flex-1 relative p-4">
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View className="flex justify-center items-center mt-20 rounded-2xl overflow-hidden">
          <Image
            source={require("@/assets/images/logo.png")}
            className="w-full rounded-2xl"
            style={{ width: 100, height: 100, resizeMode: "contain" }}
          />
        </View>
        <View className="flex justify-center mt-10 mx-10">
          <Text className="font-semibold text-2xl text-neutral-gray mb-8">
            Login to your Account
          </Text>

          <View className="flex flex-col gap-4">
            <View>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <InputField
                      placeholder="Email"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      inputProps={{
                        keyboardType: "email-address",
                        autoCapitalize: "none",
                        testID: "email-input",
                      }}
                    />
                  );
                }}
              />
              {errors.email && (
                <Text className="text-red-500 mt-2 text-sm">
                  {errors.email.message}
                </Text>
              )}
            </View>

            <View>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <InputField
                      placeholder="Password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={true}
                      inputProps={{
                        testID: "password-input",
                      }}
                    />
                  );
                }}
              />
              {errors.password && (
                <Text className="text-red-500 mt-2 text-sm">
                  {errors.password.message}
                </Text>
              )}
            </View>
          </View>

          <Button
            title="Sign in"
            variant="primary"
            className="h-[50px] mt-4"
            onPress={handleSubmit(loginHandler)}
            disabled={loading}
            loading={loading}
          />
        </View>

        <View className="absolute bottom-[160px] w-full flex justify-center">
          <Text className="text-center text-neutral-gray font-semibold">
            Don't have an account?
            <Link href="/signup">
              <Text className="text-primary-green "> Sign up</Text>
            </Link>
          </Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Login;
