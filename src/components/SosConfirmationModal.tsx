import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";

type SosConfirmationModalProps = {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function SosConfirmationModal({
  isVisible,
  onCancel,
  onConfirm
}: SosConfirmationModalProps) {
  return (
    <Modal
      animationType="fade"
      onRequestClose={onCancel}
      transparent
      visible={isVisible}
    >
      <View style={styles.scrim}>
        <View style={styles.modal}>
          <View style={styles.icon}>
            <Ionicons color={colors.white} name="alert-circle" size={30} />
          </View>
          <Text style={styles.title}>Confirm SOS</Text>
          <Text style={styles.body}>
            This prototype will save SOS as your local status only. No message,
            radio signal, or emergency request will be sent.
          </Text>
          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              onPress={onCancel}
              style={({ pressed }) => [
                styles.secondaryButton,
                { opacity: pressed ? 0.8 : 1 }
              ]}
            >
              <Text style={styles.secondaryLabel}>Cancel</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={onConfirm}
              style={({ pressed }) => [
                styles.primaryButton,
                { opacity: pressed ? 0.8 : 1 }
              ]}
            >
              <Text style={styles.primaryLabel}>Confirm SOS</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 22
  },
  body: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    textAlign: "center"
  },
  icon: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.danger,
    borderRadius: 999,
    height: 58,
    justifyContent: "center",
    marginBottom: 14,
    width: 58
  },
  modal: {
    backgroundColor: colors.panel,
    borderRadius: 8,
    marginHorizontal: 20,
    padding: 20
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.danger,
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 12
  },
  primaryLabel: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center"
  },
  scrim: {
    alignItems: "center",
    backgroundColor: "rgba(19, 32, 28, 0.62)",
    flex: 1,
    justifyContent: "center"
  },
  secondaryButton: {
    alignItems: "center",
    backgroundColor: colors.panelAlt,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 12
  },
  secondaryLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center"
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center"
  }
});
