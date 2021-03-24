import React, { useEffect, useState } from 'react'
import Failure from '../../default/failure/Failure';
import Loading from '../../default/loading/Loading';
import ServiceInterctor from '../../model/services/ServiceInteractor';
import TracksView from '../../views/tracksView/TracksView';

export default function TracksControllers({ navigation }) {
    const [loading, setLoading] = useState(false)
    const [resposnse, setResposnse] = useState({})
    const [tracks, setTracks] = useState([])
    const [pages, setPages] = useState(1)
    useEffect(() => {
        getData();
    }, [])
    const getData = async (pages) => {
        
        setLoading(true)
        clearData();
        let result = await ServiceInterctor.getTracks({pages:pages});
        var arrangements=tracks.concat(result.tracks.track)
        setTracks(arrangements)
        setResposnse(result)
        setLoading(false)

    }
    const clearData = () => {
        setTracks([])
        setResposnse({})
    }
    const selectTrack = ({ name, artist }) => {
        navigation.navigate('TrackDetail', { name: name, artist: artist })
    }
    const ShowMore = ()=>{
        setPages(pages+1)
        if(pages>1){getData(pages)}
    }
    
    return loading ? <Loading /> : resposnse != undefined ? <TracksView tracks={tracks} selectTrack={selectTrack} ShowMore={ShowMore} /> : <Failure />
}
