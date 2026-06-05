import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { HunterCard } from "../components/HunterCard";
import { Screen } from "../components/Screen";
import { Section } from "../components/Section";
import { StatusPill } from "../components/StatusPill";
import { useHunterRadar } from "../context/HunterRadarContext";
import { groupCheckIns, simulatedHunters } from "../data/simulatedHunters";
import { colors } from "../theme/colors";

export function GroupScreen() {
  const { settings, userStatus } = useHunterRadar();
  const hunters = simulatedHunters.map((hunter) =>
    hunter.isCurrentUser ? { ...hunter, status: userStatus } : hunter
  );

  return (
    <Screen
      subtitle="Roster, status, and check-ins for the simulated hunt group."
      title="Group"
    >
      <Section title="Group summary" subtitle="Four hunters, one local group">
        <View style={styles.summaryGrid}>
          <View style={styles.summaryTile}>
            <Ionicons color={colors.forest} name="people" size={22} />
            <Text style={styles.summaryValue}>4</Text>
            <Text style={styles.summaryLabel}>Hunters</Text>
          </View>
          <View style={styles.summaryTile}>
            <Ionicons color={colors.amber} name="radio" size={22} />
            <Text style={styles.summaryValue}>915</Text>
            <Text style={styles.summaryLabel}>Mesh MHz</Text>
          </View>
          <View style={styles.summaryTile}>
            <Ionicons color={colors.blue} name="navigate" size={22} />
            <Text style={styles.summaryValue}>11m</Text>
            <Text style={styles.summaryLabel}>Oldest ping</Text>
          </View>
        </View>
      </Section>

      <Section title="Roster" subtitle="Simulated hunter location cards">
        {hunters.map((hunter) => (
          <HunterCard hunter={hunter} key={hunter.id} units={settings.units} />
        ))}
      </Section>

      <Section title="Check-ins" subtitle="Recent simulated group notes">
        {groupCheckIns.map((checkIn) => (
          <View key={checkIn.id} style={styles.checkInCard}>
            <View style={styles.checkInTop}>
              <View style={styles.checkInTitleBlock}>
                <Text style={styles.checkInName}>{checkIn.name}</Text>
                <Text style={styles.checkInTime}>{checkIn.time}</Text>
              </View>
              <StatusPill status={checkIn.status} />
            </View>
            <Text style={styles.checkInMessage}>{checkIn.message}</Text>
          </View>
        ))}
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  checkInCard: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    padding: 14
  },
  checkInMessage: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10
  },
  checkInName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900"
  },
  checkInTime: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2
  },
  checkInTitleBlock: {
    flex: 1
  },
  checkInTop: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between"
  },
  summaryGrid: {
    flexDirection: "row",
    gap: 10
  },
  summaryLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "800",
    marginTop: 2,
    textAlign: "center"
  },
  summaryTile: {
    alignItems: "center",
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    minHeight: 104,
    padding: 12
  },
  summaryValue: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900",
    marginTop: 8
  }
});
