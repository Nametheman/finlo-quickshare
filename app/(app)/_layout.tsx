import { Redirect, Tabs, usePathname } from "expo-router";
import { Clock9, Home, Mail, Plus, UserCircle } from "lucide-react-native";
import { Text, View } from "react-native";
import { useAuthStore } from "../../store/useAuthStore";

const TabIcon = ({ focused, icon, title }: any) => {
  if (title === "Apply") {
    return (
      <View className="flex flex-col justify-center items-center w-full h-[80px] min-w-[80px] gap-1 absolute border-none -top-10 rounded-full bg-primary-green text-white">
        {icon}
      </View>
    );
  } else {
    if (focused) {
      return (
        <View className="flex flex-col justify-center items-center w-full h-full min-w-[80px] mt-10 gap-1">
          {icon}
          <Text className="text-base text-primary-green">{title}</Text>
        </View>
      );
    } else {
      return (
        <View className="flex flex-col justify-center items-center w-full h-full min-w-[80px] mt-10 gap-1">
          {icon}
          <Text className="text-base text-neutral-gray">{title}</Text>
        </View>
      );
    }
  }
};

export default function ProtectedLayout() {
  const pathname = usePathname();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        animation: "fade",
        tabBarStyle: [
          {
            backgroundColor: "#fff",
            height: 100,
            position: "absolute",
          },
          pathname === "/get_loan" && { display: "none" },
        ],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={<Home color={focused ? "#008751" : "#6b7280"} />}
              title="Home"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          title: "History",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={<Clock9 color={focused ? "#008751" : "#6b7280"} />}
              title="History"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="get_loan"
        options={{
          headerShown: false,
          title: "Apply",
          tabBarIcon: () => (
            <TabIcon
              icon={<Plus color={"white"} size={30} strokeWidth={1.5} />}
              title="Apply"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="inbox"
        options={{
          headerShown: false,
          title: "Inbox",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={<Mail color={focused ? "#008751" : "#6b7280"} />}
              title="Inbox"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={<UserCircle color={focused ? "#008751" : "#6b7280"} />}
              title="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
}
