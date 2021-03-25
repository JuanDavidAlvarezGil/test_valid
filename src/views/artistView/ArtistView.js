import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, Image, ScrollView, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../default/loading/Loading';
import * as ScreenOrientation from 'expo-screen-orientation';


export default function ArtistView({ artists, selectArtist, ShowMore, loading }) {
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
                }}> Artistas</Text>
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>

                    {artists.map((artist) => {
                        return (
                            <View style={{ width: orientation == 1 ? 100 / 3 + "%" : 100 / 6 + "%" }} key={artist.name + artist.listeners}>
                                <TouchableOpacity onPress={() => { selectArtist({ name: artist.name }) }}>
                                    <Image source={{ uri: artist.image[2]['#text'] }} style={{ width: 100, height: 100, borderRadius: 200 }} />
                                    <Text>{artist.name}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}

                </View>
            </View>
            {loading ? <Loading /> : <Button title="Ver mas" onPress={() => { ShowMore() }} />}
        </ScrollView>
    )
}
