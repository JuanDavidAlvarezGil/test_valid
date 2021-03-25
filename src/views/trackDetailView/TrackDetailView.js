import React from 'react'
import { Image, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function TrackDetailView({ detail }) {
    return (
        <ScrollView>
            <View style={{ padding: 16 }}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>

                    <Image source={{ uri: detail.album.image[2]['#text'] }} style={{ width: 300, height: 300, margin: 20 }} />
                </View>
                <Text style={{ marginVertical: 16, fontSize: 24, fontWeight: 'bold' }}>{detail.name}</Text>
                {detail.wiki == null ? <View></View> : <View>

                    <Text>Publicacion:{detail.wiki.published}</Text>
                    <Text>{detail.wiki.summary}</Text>
                </View>
                }
                <Text style={{ fontSize: 16, fontWeight: 'bold' }} >Artista</Text>
                <Text>{detail.album.artist}</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Album</Text>
                <Text>{detail.album.title}</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Oyentes</Text>
                <Text> {detail.listeners}</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Reproducciones</Text>
                <Text>{detail.playcount}</Text>
            </View>
        </ScrollView>
    )
}
