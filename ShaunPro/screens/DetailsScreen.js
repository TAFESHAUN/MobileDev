import {View, StyleSheet} from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { useAppTheme } from "../App";

export default function DetailsScreen({ route, navigation }){
    const { item } = route.params;
    const theme = useAppTheme();

    return(
        <View style={styles.container, {backgroundColor: theme.cardBg}}>
            <Card style={styles.card}>
                <Card.Title title={item.title} subtitle="Detail View"/>
                <Card.Content>
                    <Text variant="bodyLarge" style={styles.description}>
                        {item.description}
                    </Text>
                    <Text variant="bodySmall" style={styles.meta}>
                        ID: {item.id}
                    </Text>
                </Card.Content>
            </Card>
            <Button
                mode="outlined"
                onPress={() => navigation.goBack()}
                style={styles.button}
                textColor="#c5c3c3"
            >
                Go Back
            </Button>

        </View>
    );
}

const styles = StyleSheet.create({
  container:   { flex: 1, padding: 16, backgroundColor: "#f4f4f4" },
  card:        { marginBottom: 16, elevation: 3 },
  description: { marginBottom: 8, color: "#ffd771" },
  meta:        { color: "#999" },
  button:      { marginTop: 8},
});
