import ServiceFactory, { queryResult } from "./ServiceFactory"
export default class ServiceInterctor extends ServiceFactory {


    static getArtist = async ({ pages }) => {
        let response = await ServiceFactory.handleMethod({
            method: 'GET',
            url: ServiceFactory.methodQuery + ServiceFactory.artistRoute + ServiceFactory.country + ServiceFactory.apiKeyQuery + ServiceFactory.pages + pages + ServiceFactory.format,
            key: 'ARTIST',
            dbParams: pages
        })
        console.log(queryResult)
        return Array.isArray(response) ? response : response.topartists.artist;
    }


    static getTracks = async ({ pages }) => {
        let response = await ServiceFactory.handleMethod({
            method: 'GET',
            url: ServiceFactory.methodQuery + ServiceFactory.trackRoute + ServiceFactory.country + ServiceFactory.apiKeyQuery + ServiceFactory.pages + pages + ServiceFactory.format,
            key: 'TRACKS',
            dbParams: pages
        })
        console.log(queryResult)
        return Array.isArray(response) ? response : response.tracks.track;
    }


    static getTrackDetail = async ({ name, artist, }) => {
        let response = await ServiceFactory.handleMethod({
            method: 'GET',
            url: ServiceFactory.methodQuery + ServiceFactory.tracksGetInfo + ServiceFactory.apiKeyQuery + ServiceFactory.track + name + ServiceFactory.artist + artist + ServiceFactory.format,
            key: 'TRACKDETAIL',
            dbParams: name
        })
        return response.track

    }


    static getArtistDetail = async ({ name, }) => {
        let response = await ServiceFactory.handleMethod({
            method: 'GET',
            url: ServiceFactory.methodQuery + ServiceFactory.artistGetInfo + ServiceFactory.apiKeyQuery + ServiceFactory.artist + name + ServiceFactory.format,
            key: 'ARTISTDETAIL',
            dbParams: name
        })

        console.log(response)
        return response.artist

    }


    static getSearchArtists = async (artist) => {
        var response = await ServiceFactory.handleMethod({
            method: 'GET',
            url: ServiceFactory.methodQuery + ServiceFactory.artistSearch + ServiceFactory.artist + artist + ServiceFactory.apiKeyQuery + ServiceFactory.format,
            key: 'SEARCHARTISTS',
            dbParams: artist
        });
        return Array.isArray(response) ? response : response.results.artistmatches.artist;
    }


    static getSearchTracks = async (track) => {
        var response = await ServiceFactory.handleMethod({
            method: 'GET',
            url: ServiceFactory.methodQuery + ServiceFactory.tracksSearch + ServiceFactory.track + track + ServiceFactory.apiKeyQuery + ServiceFactory.format,
            key: 'SEARCHTRACKS',
            dbParams: track
        });
        return Array.isArray(response) ? response : response.results.trackmatches.track;
    }

}