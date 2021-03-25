import React, { useEffect, useState } from 'react'
import Failure from '../../views/default/failure/Failure'
import Loading from '../../views/default/loading/Loading'
import ServiceInterctor from '../../model/services/ServiceInteractor'
import GeoViews from '../../views/geoViews/GeoViews'

export default function GeoControllers({navigation}) {
    const [artists, setArtists] = useState([])
    const [tracks, setTracks] = useState([])
    const [loading, setLoading] = useState(false)
    const [pages, setPages] = useState(1)
    useEffect(() => {
        getData();
    }, []);
    const getData =async () => { 
        setLoading(true)
        clearData()
        // let resultArts =await ServiceInterctor.getArtist({pages:pages});
        // setArtists(resultArts.topartists.artist)
        // let resultTracks = await ServiceInterctor.getTracks({pages:pages});
        // setTracks(resultTracks.tracks.track)
        setLoading(false)
    }
    const clearData=()=>{
        setArtists([]);
        setTracks([]);
    }
    const selectTrack = ({name,artist}) =>{
        navigation.navigate('TrackDetail',{name:name,artist:artist})
    }
    const selectArtist = ({name}) =>{
        navigation.navigate('ArtistDetail',{name:name})
    }
    const showMoreTrack = () =>{
        navigation.navigate('Track')
    }
    const showMoreArtist = () =>{
        navigation.navigate('Artist')
    }
    return loading?<Loading/>:artists.length>1?
    <GeoViews 
    artists={artists}
    tracks={tracks}
    selectTrack={selectTrack}
    selectArtist={selectArtist}
    showMoreArtist={showMoreArtist}
    showMoreTrack={showMoreTrack}

    />:<Failure/>
}
