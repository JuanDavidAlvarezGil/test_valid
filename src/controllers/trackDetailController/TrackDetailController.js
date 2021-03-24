import React, { useEffect, useState } from 'react'
import Failure from '../../default/failure/Failure';
import Loading from '../../default/loading/Loading';
import ServiceInterctor from '../../model/services/ServiceInteractor';
import TrackDetailView from '../../views/trackDetailView/TrackDetailView';

export default function TrackDetailController({route,navigation}) {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [detail, setDetail] = useState({})
    useEffect(() => {
        getData();
    }, []);
    const getData =async () => {
        var trackName = route.params.name.replace(/ /g,"%20")
        var artisName = route.params.artist.replace(/ /g,"%20")
        setLoading(true)
        clearData();
        let result=await ServiceInterctor.getTrackDetail({name:trackName,artist:artisName});
        setDetail(result.track)
        setResponse(result)
        console.log("Aqui el detail----------------------------------")
        console.log(result.track)
        setLoading(false)
    }
    const clearData = () =>{
        setResponse({})
        setDetail({})
    }
    return loading?<Loading/>:response != null ?<TrackDetailView detail={detail}/>: <Failure/>
}
