import React, { useEffect, useState } from 'react'
import { Button, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Loading from '../default/loading/Loading'
import * as ScreenOrientation from 'expo-screen-orientation';

export default function TracksView({ tracks, selectTrack, ShowMore, loading }) {
    const [orientation, setOrientation] = useState(1);
    useEffect(() => {
        getOrientation();
    }, [])
    const getOrientation = async () => {
        var orientation = await ScreenOrientation.getOrientationAsync();
        setOrientation(orientation)
    }
    ScreenOrientation.addOrientationChangeListener(getOrientation)

    return (
        <ScrollView>
            <View style={{ padding: 16, }}>

                <Text style={{
                    marginTop: 24,
                    marginBottom: 8,
                    fontSize: 32,
                    fontWeight: 'bold'
                }}> Canciones</Text>
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>

                    {tracks.map((track) => {
                        return (
                            <View key={track.name} style={{ width: orientation == 1 ? 100 / 3 + "%" : 100 / 6 + "%" }} >
                                <TouchableOpacity onPress={() => { selectTrack({ name: track.name, artist: track.artist.name }) }}>
                                    <Image source={{ uri: track.image[2]['#text'] }} style={{ width: 100, height: 100, borderRadius: 200 }} />
                                </TouchableOpacity>
                                <Text style={{ textAlign: 'center', overflow: 'hidden' }}>{track.name}</Text>
                            </View>

                        )
                    })}
                </View>
            </View>
            {loading ? <Loading /> : <Button title="Ver mas" onPress={() => { ShowMore() }} />}
        </ScrollView>
    )
}
