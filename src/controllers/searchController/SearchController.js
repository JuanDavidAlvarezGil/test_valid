import React, { useState } from 'react';
import ServiceInteractor from '../../model/services/ServiceInteractor'
import Loading from '../../views/default/loading/Loading';
import SearchView from '../../views/searchView/SearchView'


export default function SearchController({ navigation }) {

    const [artists, setArtist] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [value, onChangeText] = useState('');
    const [loading, setLoading] = useState(false);
    const [dontSearch, setDontSearch] = useState(true);
    const getData = async () => {
        if (value != null && value != "") {
            clearData();
            var search = value.replace(/ /g, "%20");
            var res = await ServiceInteractor.getSearchArtists(search);
            setArtist(res)
            res = await ServiceInteractor.getSearchTracks(search);
            setTracks(res);
            setLoading(false);
            setDontSearch(false);
        }
    }
    const clearData = () => {
        setLoading(true);
        setArtist([]);
        setTracks([]);
    }


    const selectArt = (art) => {
        console.log("Que monda llega aqui? "+art)
        console.log(art)
        navigation.navigate('ArtistDetail', { name: art })
    }
    const selectTrack = (track,art) => {
        console.log("Que monda llega aqui? "+track+art)
        navigation.navigate('TrackDetail', { name: track, artist: art })
    }


    return !loading ?
        <SearchView
            artists={artists}
            tracks={tracks}
            value={value}
            onChangeText={onChangeText}
            getData={getData}
            selectArt={selectArt}
            selectTrack={selectTrack}
            dontSearch={dontSearch}
        /> :
        <Loading />

}