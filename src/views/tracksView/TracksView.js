import React from 'react'
import { Button, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function TracksView({ tracks, selectTrack, ShowMore }) {
    return (
        <ScrollView>
            <View style={{ padding: 16, flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>

                {tracks.map((track) => {
                    return (
                        <View key={track.name }style={{width:100/3+'%'}} >
                            <TouchableOpacity onPress={() => { selectTrack({ name: track.name, artist: track.artist.name }) }}>
                                <Image source={{ uri: track.image[2]['#text'] }} style={{ width: 100, height: 100 }} />
                            </TouchableOpacity>
                                <Text style={{textAlign:'center',overflow:'hidden'}}>{track.name}</Text>
                        </View>

                    )
                })}
            </View>
                <Button title="More" onPress={() => { ShowMore() }} />
        </ScrollView>
    )
}
