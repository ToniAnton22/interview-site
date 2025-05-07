import { Image } from 'expo-image';
import { Platform, StyleSheet, Button, ScrollView, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import WeatherComponent from '../../components/WeatherComponent';

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


export default function HomeScreen() {
  const [number, setNumber] = useState(1)
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [geoLoc, setGeoLoc] = useState({
    lat: 25.25,
    lng: 12.25
  })

  const increaseNumber = () => {
    setNumber(prev => prev + 1)
  }

  const fetchWeatherData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/getWeather');
      const data = await response.json();

      const hourlyData: WeatherData['hourly'] = {
        time: data.hourly.time.map((t: string) => new Date(t)),
        temperature2m: Object.values(data.hourly.temperature2m),
        weatherCode: Object.values(data.hourly.weatherCode),
      };

      const location = data.location;

      setWeather({ hourly: hourlyData, location });
    } catch (err) {
      console.error('Failed to fetch weather data:', err);
    }
  };


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome! You are meeting us from {Platform.Version}</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="default">
            Lets start by MAKING a number bigger, here is the number -> {number}
        </ThemedText>
        <Button onPress={increaseNumber} title="Increase number" color="#841584" accessibilityLabel='Increase the number by 1' />
      </ThemedView>
      <ThemedView style={styles.button}>
        <ThemedText type="defaultSemiBold">
          Lets try an api call this time (why not), lets check the weather
        </ThemedText>
        <View>
          <Button
            onPress={fetchWeatherData}
            title="Fetch Weather Data"
            color="#841584"
            accessibilityLabel="Fetch the weather data"
          />

          {weather && (
            <>
              <ThemedText type="defaultSemiBold">
                {`Location: (${weather.location.lat.toFixed(2)}, ${weather.location.lng.toFixed(2)})`}
              </ThemedText>

              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {weather.hourly.time.map((time, index) => (
                  <WeatherComponent weather={weather} time={time} index={index} />
                ))}
              </ScrollView>
            </>
          )}
        </View>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  button: {
    bottom: 0,
    left: 0,
    color: '#a5625a'
  }
});
