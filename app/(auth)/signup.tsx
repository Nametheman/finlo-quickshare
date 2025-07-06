import Button from "@/components/ui/button";
import InputField from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { registerSchema } from "@/schemas/auth/register.schema";
import { useAuthStore } from "@/store/useAuthStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Keyboard, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    resolver: yupResolver(registerSchema),
  });

  const signupHandler = async (values: any) => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        console.log("Signup error:", error.message);
        return;
      }

      const session = data.session;
      const user = data.user;

      console.log("SESSION ==> ", session);
      console.log("USER ==> ", user);

      if (!user || !session?.access_token) {
        console.warn("User or token missing");
        return;
      }

      await supabase.from("users").insert({
        id: user.id,
        full_name: "",
        phone_number: "",
      });

      useAuthStore.getState().setToken(session.access_token);
      useAuthStore.getState().setUser(user);
      useAuthStore.getState().setIsLoggedIn(true);

      router.replace("/");
    } catch (err) {
      console.log("Unexpected signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 relative p-4">
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View className="mx-10">
          <ArrowLeft onPress={() => router.push("/login")} />
        </View>
        <View className="flex justify-center items-center mt-20 rounded-2xl overflow-hidden">
          <Image
            source={require("@/assets/images/logo.png")}
            className="w-full rounded-2xl"
            style={{ width: 100, height: 100, resizeMode: "contain" }}
          />
        </View>
        <View className="flex justify-center mt-10 mx-10">
          <Text className="font-semibold text-2xl text-neutral-gray-500 mb-8">
            Create your Account
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

            <View>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <InputField
                      placeholder="Confirm Password"
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
              {errors.confirmPassword && (
                <Text className="text-red-500 mt-2 text-sm">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>
          </View>

          <Button
            title="Sign up"
            variant="primary"
            className="h-[50px] mt-4"
            onPress={handleSubmit(signupHandler)}
            loading={loading}
            disabled={loading || !isValid}
          />
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Signup;
