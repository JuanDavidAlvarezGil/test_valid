import React from 'react'
import { Image, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function ArtistDetailView({detail}) {
    return(
        <View>
            <Image  source={{ uri: detail.image[2]['#text'] }} style={{ width: 100, height: 100, borderRadius: 200 }}  />
            <Text>{detail.name}</Text>
            <Text>Oyentes: {detail.stats.listeners}</Text>
            <Text>Reproducciones:{detail.stats.playcount}</Text>
            <Text>Resumen:{detail.bio.summary}</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {detail.similar.artist.map((res)=>{
                    return(
                        <View key={res.name}>
                            <Image source={{uri:res.image[2]['#text']}} style={{ width: 100, height: 100, }}/>
                            <Text>{res.name}</Text>
                        </View>
                    )
                })}

            </ScrollView>

        </View>
    )
}
