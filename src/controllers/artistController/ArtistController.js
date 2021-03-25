import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Failure from '../../views/default/failure/Failure';
import Loading from '../../views/default/loading/Loading';
import ServiceInteractor from '../../model/services/ServiceInteractor';
import ArtistView from '../../views/artistView/ArtistView';

export default function ArtistController({ navigation }) {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [artists, setArtists] = useState([])
    var pages = 0;
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        pages = await pages + 1;
        setLoading(true)
        clearData();
        if (pages != undefined) {
            let result = await ServiceInteractor.getArtist({ pages: pages });
            var arrangements = artists.concat(result)
            setArtists(arrangements)
            setLoading(false)
        }else{
            let result = await ServiceInteractor.getArtist({ pages: 1 });
            var arrangements = artists.concat(result)
            setArtists(arrangements)
            setLoading(false)
        }

    }
    const clearData = () => {
        setResponse({})
    }
    const selectArtist = ({ name }) => {
        navigation.navigate('ArtistDetail', { name: name })
    }
    return artists!=undefined||artists.length>=1 ? <ArtistView artists={artists} selectArtist={selectArtist} ShowMore={getData} loading={loading} /> : <Failure />
}
