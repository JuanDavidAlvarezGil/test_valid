import React, { useEffect, useState } from 'react'
import ArtistDetailView from '../../views/artistDetailView/ArtistDetailView';
import Failure from '../../views/default/failure/Failure';
import Loading from '../../views/default/loading/Loading';
import ServiceInterctor from '../../model/services/ServiceInteractor';

export default function ArtistDetailController({route,navigation}) {
    const [loading, setLoading] = useState(false)
    const [detail, setDetail] = useState({})
    useEffect(() => {
        getData();
    }, []);
    const getData =async () => {
        var artistName=route.params.name.replace(/ /g,"%20")
        setLoading(true)
        clearData();
        let result=await ServiceInterctor.getArtistDetail({name:artistName});
        setDetail(result)
        setLoading(false)
        console.log(result)
    }
    const clearData = () =>{
        setDetail({})
    }
    return loading?<Loading/>:detail.image!=undefined ?<ArtistDetailView detail={detail} />: <Failure/>
    
}
