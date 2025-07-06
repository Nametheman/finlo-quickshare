import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface TextAreaProps extends TextInputProps {
  label?: string;
  error?: string;
}

const TextAreaInput: React.FC<TextAreaProps> = ({ label, error, ...rest }) => {
  return (
    <View className="mb-4">
      {label && <Text className="mb-1 font-medium">{label}</Text>}
      <TextInput
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        className="border border-neutral-gray rounded-lg p-3 text-base text-neutral-dark-gray bg-white min-h-[100px]"
        {...rest}
      />
      {error && <Text className="text-red-500 mt-1 text-sm">{error}</Text>}
    </View>
  );
};

export default TextAreaInput;
