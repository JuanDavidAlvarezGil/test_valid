import React from 'react'
import { Image, Text, View } from 'react-native'

export default function TrackDetailView({ detail }) {
    return (
        <View style={{padding:16}}>
            <View style={{flexDirection:'column',alignItems:'center'}}>

            <Image source={{ uri: detail.album.image[3]['#text'] }} style={{ width: 300, height: 300,margin:20 }} />
            </View>
            <Text style={{marginVertical:16,fontSize:24,fontWeight:'bold'}}>{detail.name}</Text>
            <Text>Artista: {detail.album.artist}</Text>
            <Text>Oyentes: {detail.listeners}</Text>
            <Text>Reproducciones:{detail.playcount}</Text>
            <Text>Album:{detail.album.title}</Text>
            {detail.wiki == null ? <View></View> : <View>

                <Text>Publicacion:{detail.wiki.published}</Text>
                <Text>Resumen: {detail.wiki.summary}</Text>
            </View>
            }
        </View>
    )
}
