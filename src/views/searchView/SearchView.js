import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function SearchView({
    artists,
    tracks,
    value,
    onChangeText,
    getData,
    selectArt,
    selectTrack,
    dontSearch
}) {
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
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={!dontSearch ? {
                    margin: 16
                } : {
                    marginVertical: 16,
                    marginHorizontal: 16
                }}>
                    <Text style={{
                        marginTop: 24,
                        marginBottom: 8,
                        fontSize: 32,
                        fontWeight: 'bold'
                    }}>Buscar</Text>
                    <View style={{ width: '100%', flex: 1, flexDirection: 'row',alignItems:'center' }}>

                        <TextInput
                            style={{
                                flexGrow: 3,
                                height: 40,
                                borderColor: 'gray',
                                borderWidth: 1,
                                marginVertical: 16,
                                padding: 8,
                                borderRadius: 10
                            }}
                            onChangeText={text => onChangeText(text)}
                            value={value}
                            onSubmitEditing={() => { getData() }}
                        />
                        <TouchableOpacity
                        style={{margin:4, alignContent:'center'}}
                            disabled={value.length < 1}
                            onPress={() => { getData() }}
                        >
                            <Icon name="playlist" size={25} style={{alignSelf:'center'}} color={value.length>0?'blue':'grey'}/>
                            <Text style={{color:value.length>0?'blue':'grey'}}>Buscar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {!dontSearch ?
                    <View style={{
                        margin: 16
                    }}>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            textAlign: 'left',
                            marginBottom: 16
                        }}>Resultados</Text>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            textAlign: 'left',
                            marginBottom: 16
                        }}>Artistas</Text>
                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {artists.slice(0, 6).map((art) => {
                                return (
                                    <View style={{ width:  orientation == 1 ? 100 / 3 + "%" : 100 / 6 + "%", alignItems: 'center', marginTop: 8 }} key={art.name} >
                                        <TouchableOpacity onPress={() => { selectArt(art.name) }}>
                                            {<Image source={{ uri: art.image[2]['#text'] }} style={{ width: 100, height: 100, borderRadius: 200 }} />}
                                        </TouchableOpacity>
                                        <Text style={{ textAlign: 'center', overflow: 'hidden', }}>{art.name}</Text>

                                    </View>
                                )
                            })}
                        </View>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            textAlign: 'left',
                            marginBottom: 16
                        }}>Canciones</Text>
                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {tracks.slice(0, 6).map((track) => {
                                return (
                                    <View style={{ width: orientation == 1 ? 100 / 3 + "%" : 100 / 6 + "%", alignItems: 'center', marginTop: 8 }} key={track.name} >
                                        <TouchableOpacity onPress={() => { selectTrack(track.name, track.artist) }}>
                                            <Image source={{ uri: track.image[2]['#text'] }} style={{ width: 100, height: 100, borderRadius: 200 }} />
                                        </TouchableOpacity>
                                        <Text style={{ textAlign: 'center', overflow: 'hidden', }}>{track.name}</Text>

                                    </View>
                                )
                            })}
                        </View>
                    </View> :
                    <View></View>
                }
            </ScrollView>
        </SafeAreaView >
    )
}