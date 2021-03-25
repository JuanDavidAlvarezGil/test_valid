import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db',);

import * as Network from 'expo-network';

export var queryResult;

export default class ServiceFactory {

    static connected
    //-------------Api Key--------------------_
    static apiKeyQuery = "&api_key=**************************"
    //-------------Url Base--------------------_
    static urlService = "http://ws.audioscrobbler.com/2.0/"
    static format = "&format=json"
    //-------------Url Querys--------------------_
    static methodQuery = "?method="

    //-------------Url Rutas--------------------_
    static artistRoute = "geo.gettopartists"
    static trackRoute = "geo.gettoptracks"
    static tracksGetInfo = "track.getInfo"
    static artistGetInfo = "artist.getInfo"
    static tracksSearch = 'track.search'
    static artistSearch = 'artist.search'

    //-------------Url parametros--------------------_
    static country = "&country=colombia"
    static pages = "&page="
    static artist = "&artist="
    static track = "&track="



    static handleMethod = async ({ method, url, send, key, dbParams }) => {
        await Network.getNetworkStateAsync().then((res) => {
            this.connected = res.isConnected
        });
        let newUrl = this.urlService + url;
        // console.log(newUrl);
        if (this.connected) {
            switch (method) {
                case 'GET':
                    console.log(newUrl)
                    let getResponse = await fetch(newUrl).catch(err => {
                        console.log(err)
                    });
                    let getResult = await getResponse.json();
                    if (getResult != null && getResult != undefined) { await this.insertIntoDatabase(key, getResult); }
                    console.log(queryResult)
                    return (getResult);
            }
        } else {
            await this.selectFromDatabase(key, dbParams);
            return (queryResult);
        }
    }

    static insertIntoDatabase = async (key, response) => {
        switch (key) {
            case 'ARTIST':
                console.log(key)
                await db.transaction(tx => {
                    console.log("Llega a intentar las consultas");
                    tx.executeSql(
                        "create table if not exists ARTISTS (id text primary key not null, name text, image text);", [], (_, res) => {
                            console.log("Sale bien la consulta de crearla")
                        }, (_, err) => {
                            console.log(err)
                        }
                    );
                    response.topartists.artist.forEach(art => {
                        tx.executeSql('delete from ARTISTS WHERE id = ?',
                            ["%" + response.topartists['@attr'].page + art.name + "%"], (_, res) => {
                                console.log("Sale bien la consulta de borrar")
                            }, (_, err) => {
                                console.log(err)
                            });
                        tx.executeSql('insert into ARTISTS (id, name, image ) values (?, ?, ?)',
                            [response.topartists['@attr'].page + art.name, art.name, art.image[2]['#text']], (_, res) => {
                                console.log("Sale bien la consulta de insertar")
                            }, (_, err) => {
                                console.log(err)
                            });
                    });
                });
                break;
            case 'TRACKS':
                await db.transaction(tx => {
                    console.log("Llega a intentar las consultas");
                    tx.executeSql(
                        "create table if not exists TRACKS (id text primary key not null, name text, image text);", [], (_, res) => {
                            console.log("Sale bien la consulta de crearla")
                        }, (_, err) => {
                            console.log(err)
                        }
                    );
                    response.tracks.track.forEach(track => {
                        tx.executeSql('delete from TRACKS WHERE id = ?',
                            ["%" + response.tracks['@attr'].page + track.name + "%"], (_, res) => {
                                console.log("Sale bien la consulta de borrar")
                            }, (_, err) => {
                                console.log(err)
                            });
                        tx.executeSql('insert into TRACKS (id, name, image ) values (?, ?, ?)',
                            [response.tracks['@attr'].page + track.name, track.name, track.image[2]['#text']], (_, res) => {
                                console.log("Sale bien la consulta de insertarƒ")
                            }, (_, err) => {
                                console.log(err)
                            });
                    });
                });
                break;
            case 'TRACKDETAIL':
                await db.transaction(tx => {
                    console.log("Llega a intentar las consultas");
                    tx.executeSql(
                        "create table if not exists TRACKDETAIL (id text primary key not null, name text, image text, listeners text, playcount text, artist text, album text, published text, summary text);", [], (_, res) => {
                            console.log("Sale bien la consulta de crearla TRACKDETAIL")
                        }, (_, err) => {
                            console.log(err)
                        }
                    );
                    tx.executeSql('delete from TRACKDETAIL WHERE id = ?',
                        ["%" + response.track.mbid + "%"], (_, res) => {
                            console.log("Sale bien la consulta de borrar TRACKDETAIL")
                        }, (_, err) => {
                            console.log(err)
                        });
                    tx.executeSql('insert into TRACKDETAIL (id, name, image, listeners, playcount, artist, album, published, summary) values (?,?,?,?,?,?,?,?,?)',
                        [response.track.mbid, response.track.name, response.track.album.image[2]['#text'], response.track.listeners, response.track.playcount, response.track.album.artist, response.track.album.title, response.track.wiki.published, response.track.wiki.summary], (_, res) => {
                            console.log("Sale bien la consulta de insertarƒ TRACKDETAIL")
                        }, (_, err) => {
                            console.log(err)
                        });

                });
                break;
            case 'ARTISTDETAIL':
                await db.transaction(tx => {
                    console.log("Llega a intentar las consultas");
                    tx.executeSql(
                        "create table if not exists ARTISTDETAIL (id text primary key not null, name text, image text, published text, summary text);", [], (_, res) => {
                            console.log("Sale bien la consulta de crearla ARTISTDETAIL")
                        }, (_, err) => {
                            console.log(err)
                        }
                    );
                    tx.executeSql('delete from ARTISTDETAIL WHERE id = ?',
                        ["%" + response.artist.mbid + "%"], (_, res) => {
                            console.log("Sale bien la consulta de borrar ARTISTDETAIL")
                        }, (_, err) => {
                            console.log(err)
                        });
                    tx.executeSql('insert into ARTISTDETAIL (id, name, image, published, summary) values (?,?,?,?,?)',
                        [response.artist.mbid, response.artist.name, response.artist.image[2]['#text'], response.artist.bio.published, response.artist.bio.summary], (_, res) => {
                            console.log("Sale bien la consulta de insertarƒ ARTISTDETAIL")
                        }, (_, err) => {
                            console.log(err)
                        });
                    tx.executeSql(
                        "create table if not exists SIMILARARTISTDETAIL (id text primary key not null, name text, image text);", [], (_, res) => {
                            console.log("Sale bien la consulta de crearla SIMILARARTISTDETAIL")
                        }, (_, err) => {
                            console.log(err)
                        }
                    );
                    response.artist.similar.artist.forEach(art => {
                        tx.executeSql('insert into SIMILARARTISTDETAIL (id, name, image) values (?,?,?)',
                            ["S" + response.artist.name + art.name, art.name, art.image[2]['#text'],], (_, res) => {
                                console.log("Sale bien la consulta de insertarƒ SIMILARARTISTDETAIL")
                            }, (_, err) => {
                                console.log(err)
                            });
                    });

                });
                break;
            case 'SEARCHARTISTS':
                await db.transaction(tx => {
                    console.log("Llega a intentar las consultas");
                    tx.executeSql(
                        "create table if not exists SEARCHARTISTS (id text primary key not null, name text, image text);", [], (_, res) => {
                            console.log("Sale bien la consulta de crearla")
                        }, (_, err) => {
                            console.log(err)
                        }
                    );
                    response.results.artistmatches.artist.forEach(art => {
                        tx.executeSql('delete from SEARCHARTISTS WHERE id = ?',
                            ["%" + response.results['opensearch:Query'].searchTerms + art.name + "%"], (_, res) => {
                                console.log("Sale bien la consulta de borrar search artists")
                            }, (_, err) => {
                                console.log(err)
                            });
                        tx.executeSql('insert into SEARCHARTISTS (id, name, image ) values (?, ?, ?)',
                            [response.results['opensearch:Query'].searchTerms + art.name, art.name, art.image[2]['#text']], (_, res) => {
                                console.log("Sale bien la consulta de insertar search artists")
                            }, (_, err) => {
                                console.log(err)
                            });
                    });
                });
                break;
            case 'SEARCHTRACKS':
                await db.transaction(tx => {
                    console.log("Llega a intentar las consultas");
                    tx.executeSql(
                        "create table if not exists SEARCHTRACKS (id text primary key not null, name text, image text);", [], (_, res) => {
                            console.log("Sale bien la consulta de crearla")
                        }, (_, err) => {
                            console.log(err)
                        }
                    );
                    response.results.trackmatches.track.forEach(track => {
                        tx.executeSql('delete from SEARCHTRACKS WHERE id = ?',
                            ["%" + response.results['opensearch:Query'].searchTerms + track.name + "%"], (_, res) => {
                                console.log("Sale bien la consulta de borrar search tracks")
                            }, (_, err) => {
                                console.log(err)
                            });
                        tx.executeSql('insert into SEARCHTRACKS (id, name, image ) values (?, ?, ?)',
                            [response.results['opensearch:Query'].searchTerms + track.name, track.name, track.image[2]['#text']], (_, res) => {
                                console.log("Sale bien la consulta de insertar search tracks")
                            }, (_, err) => {
                                console.log(err)
                            });
                    });
                });
                break;
            default:
                break;
        }
    }
    static selectFromDatabase = async (key, param) => {
        console.log("LA KEY" + key)

        switch (key) {
            case 'ARTIST':
                await db.transaction(tx => {
                    tx.executeSql('select * from ARTISTS where id LIKE ?', ["%" + param + "%"], (_, { rows }) => {
                        // console.log(rows._array);
                        queryResult = [];
                        rows._array.forEach(art => {
                            queryResult.push(
                                {
                                    name: art.name,
                                    image: [
                                        { "#text": art.image },
                                        { "#text": art.image },
                                        { "#text": art.image }
                                    ]
                                }
                            )
                        });
                        // console.log(queryResult)
                    }
                    )
                });

                break;
            case 'TRACKS':
                await db.transaction(tx => {
                    tx.executeSql('select * from TRACKS where id LIKE ?', ["%" + param + "%"], (_, { rows }) => {
                        queryResult = [];
                        rows._array.forEach(track => {
                            queryResult.push(
                                {
                                    name: track.name,
                                    image: [
                                        { "#text": track.image },
                                        { "#text": track.image },
                                        { "#text": track.image }
                                    ]
                                }
                            )
                        });
                    }
                    )
                });
                break;
            case 'TRACKDETAIL':
                await db.transaction(tx => {
                    tx.executeSql('select * from TRACKDETAIL where name LIKE ?', ["%" + param + "%"], (_, { rows }) => {
                        let result = rows._array[0]
                        queryResult = {
                            name: result.name,
                            image: [
                                { "#text": result.image },
                                { "#text": result.image },
                                { "#text": result.image }
                            ],
                            listeners: result.listeners,
                            playcount: result.playcount,
                            album: {
                                artist: result.artist,
                                title: result.album,
                                image: [
                                    { "#text": result.image },
                                    { "#text": result.image },
                                    { "#text": result.image }
                                ],
                            },
                            wiki: {
                                published: result.published,
                                summary: result.summary
                            }
                        }
                    }
                    )
                });
                break;
            case 'ARTISTDETAIL':
                await db.transaction(tx => {

                    queryResult = {
                        name: '',
                        image: [],
                        similar: {
                            artist: []
                        },
                        bio: {
                            published: '',
                            summary: ''
                        }
                    }
                    tx.executeSql('select * from ARTISTDETAIL where name LIKE ?', ["%" + param + "%"], (_, { rows }) => {
                        let result = rows._array[0]

                        queryResult.name = result.name
                        queryResult.image = [
                            { "#text": result.image },
                            { "#text": result.image },
                            { "#text": result.image }
                        ]
                        queryResult.bio.published = result.published
                        queryResult.bio.summary
                    }
                    )

                    tx.executeSql('select * from SIMILARARTISTDETAIL', [], (_, { rows }) => {
                        rows._array.forEach(art => {
                            queryResult.similar.artist.push(
                                {
                                    name: art.name,
                                    image: [
                                        { "#text": art.image },
                                        { "#text": art.image },
                                        { "#text": art.image }
                                    ]
                                }
                            )
                        });
                    }
                    )
                });
                break;
            case 'SEARCHARTISTS':
                await db.transaction(tx => {
                    tx.executeSql('select * from SEARCHARTISTS where id LIKE ?', ["%" + param + "%"], (_, { rows }) => {
                        queryResult = [];
                        rows._array.forEach(art => {
                            queryResult.push(
                                {
                                    name: art.name,
                                    image: [
                                        { "#text": art.image },
                                        { "#text": art.image },
                                        { "#text": art.image }
                                    ]
                                }
                            )
                        });
                    }
                    )
                });
                break;
            case 'SEARCHTRACKS':
                await db.transaction(tx => {
                    tx.executeSql('select * from SEARCHTRACKS where id LIKE ?', ["%" + param + "%"], (_, { rows }) => {
                        queryResult = [];
                        rows._array.forEach(track => {
                            queryResult.push(
                                {
                                    name: track.name,
                                    image: [
                                        { "#text": track.image },
                                        { "#text": track.image },
                                        { "#text": track.image }
                                    ]
                                }
                            )
                        });
                    }
                    )
                });
                break;
        }
    }
}