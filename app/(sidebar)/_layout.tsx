import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { View, Text, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { useState, useEffect } from "react";

// Define user types
type UserType = "teacher" | "student" | null;

// Define sidebar item structure
interface SidebarItem {
  name: string;
  route: string;
  icon: string;
  iconFamily: "ionicons" | "material" | "fontawesome";
}

// Teacher sidebar items
const teacherSidebarItems: SidebarItem[] = [
  {
    name: "Dashboard",
    route: "teacher/dashboard",
    icon: "grid-outline",
    iconFamily: "ionicons",
  },
  {
    name: "My Classes",
    route: "teacher/myclasses",
    icon: "school-outline",
    iconFamily: "ionicons",
  },
  {
    name: "Create Class",
    route: "teacher/createclass",
    icon: "add-circle-outline",
    iconFamily: "ionicons",
  },
  {
    name: "Students",
    route: "teacher/students",
    icon: "people-outline",
    iconFamily: "ionicons",
  },
  {
    name: "Approvals",
    route: "teacher/approval",
    icon: "checkmark-circle-outline",
    iconFamily: "ionicons",
  },
  {
    name: "Earnings",
    route: "teacher/earnings",
    icon: "cash-outline",
    iconFamily: "ionicons",
  },
  {
    name: "Profile",
    route: "teacher/teacherprofile",
    icon: "person-outline",
    iconFamily: "ionicons",
  },
];

// Student sidebar items
const studentSidebarItems: SidebarItem[] = [
  {
    name: "Dashboard",
    route: "student/dashboard",
    icon: "grid-outline",
    iconFamily: "ionicons",
  },
  {
    name: "My Classes",
    route: "student/studentclasses",
    icon: "book-outline",
    iconFamily: "ionicons",
  },
  {
    name: "Join Class",
    route: "student/joinclass",
    icon: "enter-outline",
    iconFamily: "ionicons",
  },
  {
    name: "Payments",
    route: "student/payment",
    icon: "card-outline",
    iconFamily: "ionicons",
  },
  {
    name: "Profile",
    route: "student/profile",
    icon: "person-outline",
    iconFamily: "ionicons",
  },
];


function CustomDrawerContent(props: any) {
  const router = useRouter();
  const pathname = usePathname();
  const [userType, setUserType] = useState<UserType>("teacher"); 
  const sidebarItems =
    userType === "teacher" ? teacherSidebarItems : studentSidebarItems;

  // Get user display info
  const getUserInfo = () => {
    if (userType === "teacher") {
      return {
        name: "Sagar Sir",
        role: "Tuition Teacher",
        avatar: "👨‍🏫",
      };
    } else {
      return {
        name: "Pravin Avhad",
        role: "Student",
        avatar: "👩‍🎓",
      };
    }
  };

  const userInfo = getUserInfo();

  const renderIcon = (item: SidebarItem, focused: boolean) => {
    const color = focused ? "#FFFFFF" : "#666666";
    const size = 24;

    switch (item.iconFamily) {
      case "ionicons":
        return <Ionicons name={item.icon as any} size={size} color={color} />;
      case "material":
        return (
          <MaterialIcons name={item.icon as any} size={size} color={color} />
        );
      case "fontawesome":
        return (
          <FontAwesome5 name={item.icon as any} size={size} color={color} />
        );
      default:
        return <Ionicons name="circle-outline" size={size} color={color} />;
    }
  };

  return (
    <View style={styles.drawerContainer}>
      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{userInfo.avatar}</Text>
        </View>
        <Text style={styles.userName}>{userInfo.name}</Text>
        <Text style={styles.userRole}>{userInfo.role}</Text>
      </View>

      {/* Navigation Items */}
      <DrawerContentScrollView
        {...props}
        style={styles.drawerContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.navSection}>
          {sidebarItems.map((item, index) => {
            const isActive = pathname.includes(item.route);

            return (
              <View key={index} style={styles.drawerItemWrapper}>
                <DrawerItem
                  label={item.name}
                  focused={isActive}
                  onPress={() => router.push(item.route as any)}
                  icon={({ focused }) => (
                    <View style={styles.iconContainer}>
                      {renderIcon(item, focused)}
                    </View>
                  )}
                  labelStyle={[
                    styles.drawerLabel,
                    { color: isActive ? "#FFFFFF" : "#333333" },
                  ]}
                  style={[
                    styles.drawerItem,
                    isActive && styles.drawerItemActive,
                  ]}
                  pressColor="rgba(68, 103, 238, 0.1)"
                  pressOpacity={0.8}
                />
              </View>
            );
          })}
        </View>
      </DrawerContentScrollView>

      {/* Logout Section */}
      <View style={styles.logoutSection}>
        <View style={styles.drawerItemWrapper}>
          <DrawerItem
            label="Logout"
            onPress={() => {
              // Handle logout logic here
              console.log("Logout pressed");
            }}
            icon={() => (
              <View style={styles.iconContainer}>
                <Ionicons name="log-out-outline" size={24} color="#FF6B6B" />
              </View>
            )}
            labelStyle={[styles.drawerLabel, { color: "#FF6B6B" }]}
            style={styles.drawerItem}
            pressColor="rgba(255, 107, 107, 0.1)"
            pressOpacity={0.8}
          />
        </View>
      </View>
    </View>
  );
}

export default function Layout() {
  // Replace this with actual user authentication logic
  const [userType, setUserType] = useState<UserType>("teacher");

  // For testing purposes, you can toggle between user types
  // In production, this would come from your authentication system

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          headerStyle: {
            backgroundColor: "#4467EE",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
          drawerStyle: {
            backgroundColor: "#FFFFFF",
            width: 300,
          },
          drawerActiveTintColor: "#FFFFFF",
          drawerInactiveTintColor: "#333333",
          drawerActiveBackgroundColor: "#4467EE",
          drawerInactiveBackgroundColor: "transparent",
        }}
      >
        {/* Teacher Routes */}
        <Drawer.Screen
          name="(sidebar)/teacher/dashboard"
          options={{
            drawerLabel: "Dashboard",
            title: "Teacher Dashboard",
          }}
        />
        <Drawer.Screen
          name="(sidebar)/teacher/myclasses"
          options={{
            drawerLabel: "My Classes",
            title: "My Classes",
          }}
        /><Drawer.Screen
          name="(sidebar)/teacher/test"
          options={{
            drawerLabel: "My Classes",
            title: "My Classes",
          }}
        />

        <Drawer.Screen
          name="teacher/create-class"
          options={{
            drawerLabel: "Create Class",
            title: "Create New Class",
          }}
        />
        <Drawer.Screen
          name="teacher/students"
          options={{
            drawerLabel: "Students",
            title: "All Students",
          }}
        />
        <Drawer.Screen
          name="teacher/approvals"
          options={{
            drawerLabel: "Approvals",
            title: "Pending Approvals",
          }}
        />
        <Drawer.Screen
          name="teacher/earnings"
          options={{
            drawerLabel: "Earnings",
            title: "Monthly Earnings",
          }}
        />
        <Drawer.Screen
          name="teacher/profile"
          options={{
            drawerLabel: "Profile",
            title: "Teacher Profile",
          }}
        />

        {/* Student Routes */}
        <Drawer.Screen
          name="student/dashboard"
          options={{
            drawerLabel: "Dashboard",
            title: "Student Dashboard",
          }}
        />
        <Drawer.Screen
          name="student/classes"
          options={{
            drawerLabel: "My Classes",
            title: "My Classes",
          }}
        />
        <Drawer.Screen
          name="student/join-class"
          options={{
            drawerLabel: "Join Class",
            title: "Join New Class",
          }}
        />
        <Drawer.Screen
          name="student/payments"
          options={{
            drawerLabel: "Payments",
            title: "Payment Tracker",
          }}
        />
        <Drawer.Screen
          name="student/profile"
          options={{
            drawerLabel: "Profile",
            title: "Student Profile",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  profileSection: {
    padding: 24,
    paddingTop: 60,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginBottom: 20,
    backgroundColor: "#F8F9FA",
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4467EE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#4467EE",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  avatar: {
    fontSize: 36,
  },
  userName: {
    color: "#1F2937",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },
  userRole: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
  },
  drawerContent: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "#FFFFFF",
  },
  navSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  drawerItemWrapper: {
    marginVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  drawerItem: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginHorizontal: 0,
    marginVertical: 0,
    height: 56,
    justifyContent: "center",
  },
  drawerItemActive: {
    backgroundColor: "#4467EE",
    shadowColor: "#4467EE",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 0,
    flex: 1,
  },
  logoutSection: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#F8F9FA",
  },
});
