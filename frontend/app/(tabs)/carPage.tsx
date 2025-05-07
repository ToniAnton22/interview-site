import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface Car {
    _id: string;
    name: string;
    year: number;
    selling_price: number;
    km_driven: number;
    fuel: string;
    seller_type: string;
    transmission: string;
    owner: string;
}

export default function CarPage() {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', '2015', '2000', '1856'];
    const [featuredCars, setFeaturedCars] = useState<Car[]>([])

    const getCars = async () => {
        try {
            const response = await fetch('https://serv.bard-labs.com/api/getCars');
            const data = await response.json();

            setFeaturedCars(data);

        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    }

    useEffect(() => {
        getCars()
    }, [])

    const filteredCars = featuredCars.filter(car =>
        (selectedCategory === 'All' || car.year === parseInt(selectedCategory)) &&
        car.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Browse Cars</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search cars..."
                value={search}
                onChangeText={setSearch}
            />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
                {categories.map(category => (
                    <TouchableOpacity key={category} onPress={() => setSelectedCategory(category)} style={[
                        styles.categoryButton,
                        selectedCategory === category && styles.selectedCategory
                    ]}>
                        <Text style={styles.categoryText}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <FlatList
                data={filteredCars}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View style={styles.carCard}>
                        <Image source={{ uri: item.name }} style={styles.carImage} />
                        <Text style={styles.carName}>{item.name}</Text>
                        <Text style={styles.carType}>{item.year}</Text>
                    </View>
                )}
                scrollEnabled={false}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#fff' },
    header: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
    searchInput: {
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
    },
    categoryContainer: { flexDirection: 'row', marginBottom: 20 },
    categoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#eee',
        marginRight: 10,
    },
    selectedCategory: { backgroundColor: '#007bff' },
    categoryText: { color: '#000' },
    carCard: {
        marginBottom: 16,
        padding: 10,
        backgroundColor: '#fafafa',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    carImage: { width: '100%', height: 150, borderRadius: 10 },
    carName: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
    carType: { fontSize: 14, color: '#555' },
});
