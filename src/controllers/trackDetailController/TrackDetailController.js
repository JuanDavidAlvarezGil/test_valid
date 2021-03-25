import React, { useEffect, useState } from 'react'
import Failure from '../../views/default/failure/Failure';
import Loading from '../../views/default/loading/Loading';
import ServiceInterctor from '../../model/services/ServiceInteractor';
import TrackDetailView from '../../views/trackDetailView/TrackDetailView';

export default function TrackDetailController({route,navigation}) {
    const [loading, setLoading] = useState(false)
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
        setDetail(result)
        setLoading(false)
    }
    const clearData = () =>{
        setDetail({})
    }
    return loading?<Loading/>:detail.name!=undefined ?<TrackDetailView detail={detail}/>: <Failure/>
}
