import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type ResultSectionProps = {
  title: string;
  body?: string;
  children?: ReactNode;
};

export function ResultSection({ title, body, children }: ResultSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(216, 178, 95, 0.24)",
    backgroundColor: "rgba(16, 9, 34, 0.72)",
    padding: 16,
    gap: 8
  },
  title: {
    color: "#f4d886",
    fontSize: 15,
    fontWeight: "800"
  },
  body: {
    color: "#efe7ff",
    fontSize: 15,
    lineHeight: 23
  }
});
