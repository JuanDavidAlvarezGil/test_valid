import React from 'react'
import { Button, Image, SafeAreaView, StatusBar, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

export default function GeoViews({ artists, tracks, selectTrack, selectArtist,showMoreArtist,showMoreTrack }) {
    return (
        <SafeAreaView>
            <StatusBar hidden={true} />
            <View style={{ padding: 16 }}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <Text style={{marginVertical:16,fontSize:24,fontWeight:'bold'}}>Artistas</Text>
                    <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} >
                        {artists.map((artist) => {
                            return (
                                <View style={{marginHorizontal:8}} key={artist.name} style={{flex:1,justifyContent:'center'}}>
                                    <TouchableOpacity onPress={() => { selectArtist({ name: artist.name }) }}>
                                        <Image source={{ uri: artist.image[2]['#text'] }} style={{ width: 100, height: 100, borderRadius: 200 }} />
                                    </TouchableOpacity>
                                        <Text style={{ textAlign: 'center',width:"100%" }}>
                                            {artist.name}
                                        </Text>
                                </View>
                            )
                        })}
                        <TouchableOpacity onPress={()=>{showMoreArtist()}}>
                            <Text style={{}}>mas</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <Text style={{marginVertical:16,fontSize:24,fontWeight:'bold'}} >Canciones</Text>
                    <View style={{flex:1,flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
                        {tracks.map((track) => {
                            return (
                                <View style={{width:(100/3)+'%',alignItems:'center',marginTop:8}} key={track.name} >
                                    <TouchableOpacity onPress={() => { selectTrack({ name: track.name, artist: track.artist.name }) }}>
                                        <Image source={{ uri: track.image[2]['#text'] }} style={{ width: 100, height: 100, borderRadius: 200 }} />
                                    </TouchableOpacity>
                                        <Text style={{ textAlign: 'center',overflow:'hidden', }}>{track.name}</Text>

                                </View>
                            )
                        })}
                    </View>
                        <Button title="More" onPress={()=>{showMoreTrack()}} />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
