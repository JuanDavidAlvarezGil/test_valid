import React from 'react'
import { Image, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function ArtistDetailView({ detail }) {
    return (
        <ScrollView>
            <View style={{ padding: 16 }}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Image source={{ uri: detail.image[2]['#text'] }} style={{ width: 300, height: 300, margin: 20 }} />
                </View>
                <Text style={{ marginVertical: 16, fontSize: 24, fontWeight: 'bold' }}>{detail.name}</Text>
                <Text>{detail.bio.summary}</Text>
                <Text>Oyentes: {detail.stats.listeners}</Text>
                <Text>Reproducciones:{detail.stats.playcount}</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {detail.similar.artist.map((res) => {
                        return (
                            <View key={res.name}>
                                <Image source={{ uri: res.image[2]['#text'] }} style={{ width: 100, height: 100, }} />
                                <Text>{res.name}</Text>
                            </View>
                        )
                    })}

                </ScrollView>

            </View>
        </ScrollView>
    )
}
