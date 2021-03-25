import React, { useEffect, useState } from 'react'
import Failure from '../../views/default/failure/Failure';
import Loading from '../../views/default/loading/Loading';
import ServiceInterctor from '../../model/services/ServiceInteractor';
import TracksView from '../../views/tracksView/TracksView';

export default function TracksControllers({ navigation }) {
    const [loading, setLoading] = useState(false)
    const [tracks, setTracks] = useState([])
    const [pages, setPages] = useState(1)
    useEffect(() => {
        getData();
    }, [])
    const getData = async (pages) => {

        setLoading(true)
        clearData();
        if (pages != undefined) {
            let result = await ServiceInterctor.getTracks({ pages: pages });
            var arrangements = tracks.concat(result)
            setTracks(arrangements)
            setLoading(false)
        } else {
            let result = await ServiceInterctor.getTracks({ pages: 1 });
            var arrangements = tracks.concat(result)
            setTracks(arrangements)
            setLoading(false)
        }

    }
    const clearData = () => {
        setTracks([])
    }
    const selectTrack = ({ name, artist }) => {
        navigation.navigate('TrackDetail', { name: name, artist: artist })
    }
    const ShowMore = () => {
        setPages(pages + 1)
        if (pages > 1) { getData(pages) }
    }

    return tracks != undefined || tracks.length >= 1 ? <TracksView tracks={tracks} selectTrack={selectTrack} ShowMore={ShowMore} loading={loading} /> : <Failure />

}
