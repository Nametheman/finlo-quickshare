import { Search as SearchIcon, X } from "lucide-react-native";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Keyboard,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface SearchInputProps extends TextInputProps {
  onSearch?: (query: string) => void;
  containerClassName?: string;
  inputClassName?: string;
  dismissKeyboardOnBlur?: boolean;
}

const SearchInput = forwardRef<TextInput, SearchInputProps>(
  (
    {
      onSearch,
      containerClassName,
      inputClassName,
      value,
      onChangeText,
      onBlur,
      dismissKeyboardOnBlur = true,
      placeholder = "Search...",
      ...rest
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = useState(value || "");
    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => inputRef.current as TextInput);

    const handleChangeText = (text: string) => {
      setSearchQuery(text);
      onChangeText?.(text);
    };

    const handleClear = () => {
      setSearchQuery("");
      onChangeText?.("");
      onSearch?.("");
      inputRef.current?.focus();
    };

    const handleSearch = () => {
      onSearch?.(searchQuery);
      Keyboard.dismiss();
    };

    const handleBlur = (e: any) => {
      if (dismissKeyboardOnBlur) {
        Keyboard.dismiss();
      }
      onBlur?.(e);
    };

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          className={`
          flex-row 
          gap-2
          items-center 
          bg-neutral-light-gray 
          rounded-full
          border border-neutral-gray
          px-3 
          py-3 
          ${containerClassName || ""}
        `}
        >
          <SearchIcon color="#6B7280" size={20} className="mr-2" />

          <TextInput
            ref={inputRef}
            value={searchQuery}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            placeholderTextColor="#6B7280"
            className={`
            flex-1 
            text-neutral-dark-gray 
            text-base
            -mt-1.5
           ${inputClassName || ""}`}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
            onBlur={handleBlur}
            {...rest}
          />

          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClear} className="ml-2">
              <X color="#6B7280" size={20} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
);

export default SearchInput;
