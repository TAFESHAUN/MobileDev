import {View, StyleSheet} from "react-native";
import { Text, Card, Button } from "react-native-paper";

export default function DetailsScreen({ route, navigation }){
    const { item } = route.params;

    return(
        <View>
            <Card>
                <Card.Title title={item.title} subtitle="Detail View"/>
                <Card.Content>
                    <Text variant="bodyLarge">
                        {item.description}
                    </Text>
                    <Text variant="bodySmall">
                        ID: {item.id}
                    </Text>
                </Card.Content>
            </Card>
        </View>
    );
}