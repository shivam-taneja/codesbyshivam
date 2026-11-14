import { Text, View } from "@react-pdf/renderer";
import { pdfStyles as styles } from "./styles";

export function PdfSectionHeading({
  n,
  title,
}: {
  n: string;
  title: string;
}) {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.sectionLetter}>{n}.</Text>
      <Text style={styles.labelDark}>{title}</Text>
      <View style={styles.sectionRule} />
    </View>
  );
}
