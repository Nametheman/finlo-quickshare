import BackButton from "@/components/back_button";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/input";
import DropdownSelect from "@/components/ui/select";
import TextAreaInput from "@/components/ui/textarea";
import { useFetch } from "@/hooks/useFetch";
import { createLoanSchema } from "@/schemas/app/loan.schema";
import { createLoanService } from "@/server/loan.service";
import { useAuthStore } from "@/store/useAuthStore";
import { useServerActions } from "@/store/useServerActions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

type RepaymentSchedule = "monthly" | "weekly" | "bi-weekly";

const interestRateBySchedule: Record<RepaymentSchedule, number> = {
  monthly: 5,
  weekly: 3,
  "bi-weekly": 4,
};

const GetLoan = () => {
  const { user } = useAuthStore();
  const { data, loading, error, execute } = useFetch(createLoanService);
  const router = useRouter();

  const { triggerRefresh } = useServerActions.getState();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      amount: 0,
      interest_rate: 0,
      repayment_schedule: "" as RepaymentSchedule,
      purpose: "",
      collateral: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(createLoanSchema),
  });

  const repayment_schedule = useWatch({ control, name: "repayment_schedule" });

  useEffect(() => {
    if (repayment_schedule) {
      const rate = interestRateBySchedule[repayment_schedule];
      setValue("interest_rate", rate);
    }
  }, [repayment_schedule]);

  const onSubmit = async (values: CreateLoan) => {
    const payload = {
      ...values,
      user_id: user?.id,
    };

    await execute(payload);

    if (error) {
      Toast.show({
        type: "error",
        text1: "Loan Application Failed",
        text2: error || "An unexpected error occurred",
      });
      console.log(error);
      return;
    }

    Toast.show({
      type: "success",
      text1: "Loan Application Submitted",
      text2: "We'll review your request shortly.",
    });

    reset();
    triggerRefresh();
    router.push("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable onPress={Keyboard.dismiss} className="flex-1">
          <ScrollView
            contentContainerStyle={{
              padding: 16,
              paddingBottom: 40,
              flexGrow: 1,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <BackButton />

            <View className="mt-4">
              <Text className="text-2xl font-semibold mb-1 text-neutral-dark-gray">
                Get A Loan
              </Text>
              <Text className="text-neutral-gray mb-6">
                Fill the form below to apply for a loan.
              </Text>

              <View className="gap-4">
                {/* Amount */}
                <Controller
                  control={control}
                  name="amount"
                  render={({ field: { value, onChange } }) => (
                    <InputField
                      label="Amount"
                      placeholder="Loan Amount"
                      value={value.toString()}
                      onChangeText={(text) => onChange(Number(text))}
                      errorMessage={errors.amount?.message}
                      inputProps={{ keyboardType: "numeric" }}
                    />
                  )}
                />

                {/* Repayment Schedule */}
                <Controller
                  control={control}
                  name="repayment_schedule"
                  render={({ field: { value, onChange } }) => (
                    <DropdownSelect
                      label="Repayment Schedule"
                      value={value}
                      options={["monthly", "weekly", "bi-weekly"]}
                      placeholder="Select repayment plan"
                      onSelect={onChange}
                      error={errors.repayment_schedule?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="interest_rate"
                  render={({ field: { value } }) => (
                    <InputField
                      label="Interest Rate"
                      value={`${value}`}
                      editable={false}
                      inputProps={{ keyboardType: "numeric" }}
                      errorMessage={errors.interest_rate?.message}
                      placeholder="Enter interest rate"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="purpose"
                  render={({ field: { value, onChange } }) => (
                    <TextAreaInput
                      label="Purpose"
                      placeholder="What do you need the loan for?"
                      value={value}
                      onChangeText={onChange}
                      error={errors.purpose?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="collateral"
                  render={({ field: { value, onChange } }) => (
                    <TextAreaInput
                      label="Collateral"
                      placeholder="What will you offer as collateral?"
                      value={value}
                      onChangeText={onChange}
                      error={errors.collateral?.message}
                    />
                  )}
                />
              </View>

              <Button
                title="Apply Now"
                className="mt-8"
                onPress={handleSubmit(onSubmit)}
                loading={loading}
              />
            </View>
          </ScrollView>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default GetLoan;
