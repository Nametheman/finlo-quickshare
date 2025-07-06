import { ChevronDown } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface DropdownSelectProps {
  label?: string;
  options: string[];
  value: string;
  placeholder?: string;
  onSelect: (val: string) => void;
  error?: string;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  label,
  options,
  value,
  placeholder = "Select an option",
  onSelect,
  error,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View className="mb-2">
      {label && <Text className="text-sm text-neutral-gray mb-2">{label}</Text>}

      <TouchableOpacity
        className={`
          border rounded-xl px-4 py-3 bg-white flex-row justify-between items-center
          ${error ? "border-red-500" : "border-neutral-300"}
        `}
        onPress={() => setOpen(true)}
      >
        <Text
          className={`text-base capitalize ${value ? "text-black" : "text-gray-400"}`}
        >
          {value || placeholder}
        </Text>
        <ChevronDown size={18} color="#6b7280" />
      </TouchableOpacity>

      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}

      <Modal visible={open} transparent animationType="fade">
        <Pressable
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
          onPress={() => setOpen(false)}
        >
          <View className="mx-6 bg-white rounded-xl p-4 max-h-[300px]">
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item);
                    setOpen(false);
                  }}
                  className="py-3 border-b border-neutral-100"
                >
                  <Text className="text-base capitalize">{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default DropdownSelect;
