import React from 'react'; //Import useEffect and usestate
import { ScrollView, View, StyleSheet} from 'react-native';
import { Text, Button, Card, ActivityIndicator } from 'react-native-paper';


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

//Remote data here
const [events, setEvents] = React.useState([]);
const [loading, setLoading] = React.useState(false); //Add cool spin animation part2
const [error, setError] = React.useState('');

const EVENTS_URL = 'https://tafeshaun.github.io/elevate-data/events.json';

const loadEvents = async () => {
    try{
        setLoading(true);
        setError('');
        const response = await fetch(EVENTS_URL);
        if(!response.ok){
            throw new Error('Network response failed. Panic!')
        }
        const text = await response.text();
        const cleaned = text.replace(/^\uFEFF/, ''); //Clean
        const data = JSON.parse(cleaned);
        setEvents(data);
    }
    catch (e){
        setError('Could not load any events. Check git connection and maybe panic more');
        console.error(e);
    }
    finally {
        setLoading(false);
    }
 
}

React.useEffect(() => {
    loadEvents();
}, []);

    return (
        <ScrollView style={styles.container}>

        <Text variant='headlineMedium' style={styles.title}>
            Welcome to Events
        </Text>

        {/* ADD ERROR MSG HERE FOR LATER TESTING */}
        {!!error && <Text style={{color: '#ff0000'}}>{error}</Text>}

        {/* Add cool spin animation part2 */}
        {loading && <ActivityIndicator animating size="large" style={{ marginTop: 80 }} />}

        {events.map(event => (
        <Card
            key={String(event.id)}
            style={styles.card}
            onPress={() => navigation.navigate("Details", { item: event })} //PARAMS!
        >
            {/* Added subtitle to show date field from the remote JSON */}
            <Card.Title title={event.title} subtitle={event.date}/>
                <Card.Content>
                    <Text variant="bodyMedium">{event.description}</Text>
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