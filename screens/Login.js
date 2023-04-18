import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
export default function Login({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const supabaseUrl = "https://mwcxgupdugvwdbbhxwbp.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13Y3hndXBkdWd2d2RiYmh4d2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE0NzU4OTYsImV4cCI6MTk5NzA1MTg5Nn0.tGzHnvCtJi0yB0qQXteiBBfFL1TOfv0i1OIAw9oRKOA";
  const supabase = createClient(supabaseUrl, supabaseKey);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({});
