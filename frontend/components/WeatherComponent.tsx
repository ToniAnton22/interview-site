import { View, Text, Image, StyleSheet } from "react-native";


type WeatherData = {
    hourly: {
        time: Date[];
        temperature2m: number[];
        weatherCode: number[];
    };
    location: {
        lat: number;
        lng: number;
    };
};

type WeatherComponentProps = {
    weather: WeatherData;
    index: number;
    time: Date;
};

export default function WeatherComponent({ weather, time, index }: WeatherComponentProps) {
    return (
        <View
            key={index}
            style={styles.card}
        >
            <Image
                style={styles.image}
                source={{ uri: 'https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bright-sun-and-clouds.jpg?s=612x612&w=0&k=20&c=MGd2-v42lNF7Ie6TtsYoKnohdCfOPFSPQt5XOz4uOy4=' }} />
            <Text style={styles.text}>{time.toLocaleString()}</Text>
            <Text style={styles.text}>Temp: {weather.hourly.temperature2m[index]?.toFixed(1)}°C</Text>
            <Text style={styles.text}>Code: {weather.hourly.weatherCode[index]}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        flex: 1,
        position: 'relative',
        borderRadius: 8,
        margin: 8,
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    text: {
        color: '#a25926',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})
