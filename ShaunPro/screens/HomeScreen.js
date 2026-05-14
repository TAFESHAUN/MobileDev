import { ScrollView, View, StyleSheet} from 'react-native';
import { Text, Button, Card } from 'react-native-paper';


export default function HomeScreen({ navigation }) {

//Define ARRAY data here
const DATA = [
    {id: 1, title: "Placeholder1", description:"Some details here1"},
    {id: 2, title: "Placeholder2", description:"Some details here2"},
    {id: 3, title: "Placeholder3", description:"Some details here3"},
    {id: 4, title: "Placeholder4", description:"Some details here4"},
    {id: 5, title: "Placeholder5", description:"Some details here5"},
    {id: 6, title: "Placeholder6", description:"Some details here6"},
];

    return (
        <ScrollView style={styles.container}>

        <Text variant='headlineMedium' style={styles.title}>
            Welcome to Placeholder
        </Text>

        {DATA.map(item => (
        <Card
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate("Details", { item })}
        >
            <Card.Title title={item.title}/>
                <Card.Content>
                    <Text variant="bodyMedium">{item.description}</Text>
                </Card.Content>
        </Card>
        ))}
        </ScrollView>
    );
}

//PASTE STYLES HERE LATER
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#98d6ff'
    },
    title: {
        marginBottom:12,
        fontWeight: 'bold',
        color: '#595959',
    },
    subtitle: {
        textAlign: 'center', 
        marginBottom:24, 
        color: '#be5403'
    },
    button: {
        marginTop: 8,
        backgroundColor: '#ed019a',
    },
    card: {
        marginBottom: 12,
        elevation: 3,
    },
});