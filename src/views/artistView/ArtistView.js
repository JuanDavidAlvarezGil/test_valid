import React from 'react'
import { ActivityIndicator, Button, Image, ScrollView, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../../default/loading/Loading';

export default function ArtistView({ artists, selectArtist, ShowMore,loading }) {
    return (
        <ScrollView>
            <View style={{ padding: 16, flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>

                {artists.map((artist) => {
                    return (
                        <View style={{ width: 100 / 3 + '%' }} key={artist.name+artist.listeners}>
                            <TouchableOpacity onPress={() => { selectArtist({ name: artist.name }) }}>
                                <Image source={{ uri: artist.image[2]['#text'] }} style={{ width: 100, height: 100 }} />
                                <Text>{artist.name}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
                {loading?<Loading/>:<Button title="More" onPress={() => { ShowMore() }} />}
                
            </View>
        </ScrollView>
    )
}
