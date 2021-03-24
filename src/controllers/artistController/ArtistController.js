import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Failure from '../../default/failure/Failure';
import Loading from '../../default/loading/Loading';
import ServiceInteractor from '../../model/services/ServiceInteractor';
import ArtistView from '../../views/artistView/ArtistView';

export default function ArtistController({ navigation }) {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [artists, setArtists] = useState([])
    var pages=0;
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        pages= await  pages+1;
        setLoading(true)
        clearData();
        let result = await ServiceInteractor.getArtist({ pages: pages });
        setResponse(result)
        var arrangements=artists.concat(result.topartists.artist)
        setArtists(arrangements)
        setLoading(false)

    }
    const clearData = () => {
        setResponse({})
    }
    const selectArtist = ({ name }) => {
        navigation.navigate('ArtistDetail', { name: name })
    }
    return  artists.length>1 ? <ArtistView artists={artists} selectArtist={selectArtist} ShowMore={getData} loading={loading}/> : <Failure />
}
