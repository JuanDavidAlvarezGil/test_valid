import React, { useEffect, useState } from 'react'
import ArtistDetailView from '../../views/artistDetailView/ArtistDetailView';
import Failure from '../../default/failure/Failure';
import Loading from '../../default/loading/Loading';
import ServiceInterctor from '../../model/services/ServiceInteractor';

export default function ArtistDetailController({route,navigation}) {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [detail, setDetail] = useState({})
    useEffect(() => {
        getData();
    }, []);
    const getData =async () => {
        var artistName=route.params.name.replace(/ /g,"%20")
        setLoading(true)
        clearData();
        let result=await ServiceInterctor.getArtistDetail({name:artistName});
        setResponse(result)
        setDetail(result.artist)
        setLoading(false)
    }
    const clearData = () =>{
        setResponse({})
        setDetail({})
    }
    return loading?<Loading/>:response != null ?<ArtistDetailView detail={detail} />: <Failure/>
    
}
