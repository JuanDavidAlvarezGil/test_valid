import ServiceFactory from "./ServiceFactory"

export default class ServiceInterctor extends ServiceFactory {
    static getArtist = async ({ pages }) => {
console.log("estoy aqui--------------------------------------------------------"+pages);
        let response = await ServiceFactory.handleMethod({ method: 'GET', url: ServiceFactory.methodQuery + ServiceFactory.artistRoute + ServiceFactory.country + ServiceFactory.apiKeyQuery + ServiceFactory.pages + pages + ServiceFactory.format })
        return response;
    }
    static getTracks = async ({ pages }) => {
        let response = await ServiceFactory.handleMethod({ method: 'GET', url: ServiceFactory.methodQuery + ServiceFactory.trackRoute + ServiceFactory.country + ServiceFactory.apiKeyQuery + ServiceFactory.pages + pages + ServiceFactory.format })
        return response;
    }
    static getTrackDetail = async ({ name, artist, }) => {
        let response = await ServiceFactory.handleMethod({ method: 'GET', url: ServiceFactory.methodQuery + ServiceFactory.tracksGetInfo + ServiceFactory.country + ServiceFactory.apiKeyQuery + ServiceFactory.track + name + ServiceFactory.artist + artist + ServiceFactory.format })
        return response;

    }
    static getArtistDetail = async ({ name, }) => {
        let response = await ServiceFactory.handleMethod({ method: 'GET', url: ServiceFactory.methodQuery + ServiceFactory.artistGetInfo + ServiceFactory.country + ServiceFactory.apiKeyQuery + ServiceFactory.artist + name + ServiceFactory.format })
        return response;


    }


}