export default class ServiceFactory {
    //-_-_-_-_-_-_-_-_-_-_-_-_-_Api Key-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
    static apiKeyQuery = "&api_key=********************************"
    //-_-_-_-_-_-_-_-_-_-_-_-_-_Url Base-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
    static urlService = "http://ws.audioscrobbler.com/2.0/"
    static format = "&format=json"
    //-_-_-_-_-_-_-_-_-_-_-_-_-_Url Querys-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
    static methodQuery = "?method="

    //-_-_-_-_-_-_-_-_-_-_-_-_-_Url Rutas-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
    static artistRoute = "geo.gettopartists"
    static trackRoute = "geo.gettoptracks"
    static tracksGetInfo = "track.getInfo"
    static artistGetInfo = "artist.getInfo"
    //-_-_-_-_-_-_-_-_-_-_-_-_-_Url parametros-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
    static country = "&country=colombia"
    static pages = "&page="
    static artist = "&artist="
    static track = "&track="
    //-_-_-_-_-_-_-_-_-_-_-_-_-_Url search-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
    static artistSearch = 'artist.search'
    static trackSearch = 'track.search'


    static handleMethod = async ({ method, url, send }) => {
        let newUrl = this.urlService + url;
        console.log(newUrl);
        switch (method) {
            case 'GET':
                let getResponse = await fetch(newUrl);
                let getResult = await getResponse.json();
               // console.log(getResult);
                return (getResult);


        }
    }
}