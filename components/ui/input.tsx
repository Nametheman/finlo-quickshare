import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

interface InputFieldProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;
  onBlur?: (e: any) => void;
  secureTextEntry?: boolean;
  errorMessage?: string;
  inputProps?: Omit<
    TextInputProps,
    "value" | "onChangeText" | "placeholder" | "secureTextEntry"
  >;
  containerStyle?: string;
  /** Whether the input is editable (default: true) */
  editable?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  secureTextEntry = false,
  errorMessage,
  inputProps = {},
  containerStyle = "",
  editable = true, // <-- default is editable
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <View className={`w-full ${containerStyle}`}>
      {label && <Text className="text-gray-700 mb-1 font-medium">{label}</Text>}

      <View className="relative w-full">
        <TextInput
          className="w-full bg-white px-4 h-[50px] rounded-lg border border-gray-200 text-gray-800"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry && !showPassword}
          placeholderTextColor="#9ca3af"
          editable={editable}
          {...inputProps}
        />

        {secureTextEntry && (
          <TouchableOpacity
            className="absolute right-3 top-[16px]"
            onPress={togglePasswordVisibility}
            accessibilityLabel={
              showPassword ? "Hide password" : "Show password"
            }
            accessibilityRole="button"
          >
            {showPassword ? (
              <EyeOff size={22} color="#6b7280" />
            ) : (
              <Eye size={22} color="#6b7280" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {errorMessage && (
        <Text className="text-red-500 text-sm mt-1">{errorMessage}</Text>
      )}
    </View>
  );
};

export default InputField;
