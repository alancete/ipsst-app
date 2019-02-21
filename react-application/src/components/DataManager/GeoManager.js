import DataManager from './DataManager';
export default class GeoManager {

    _currentEspecialidad = null;
    _currentLocalidad = null;
    _currentName = null;
    _cartilla = null;
    _checksum = null;
    _filteredCartilla = {especialidades: [], localidades: [], prestadores: []}

    constructor(){
        //this.populate();
    }

    populate(){
        let cartilla = this.fetchCartilla();
        console.log('POPULATE');
        console.log(cartilla);
        if(cartilla){
            console.log('YES');
            this._filteredCartilla = {
                especialidades: cartilla.especialidades,
                localidades: this.getLocalidades(),
                prestadores: this.getPrestadores(),
            }
            DataManager.getInstance().loadState();
        }
    }

    pickEspecialidad(especialidad){
        this._currentEspecialidad = especialidad;
        this._currentLocalidad = null;
        this._currentName = null;
        this.populate();
    }

    pickLocalidad(localidad){
        this._currentLocalidad = localidad;
        this._currentName = null;
        this.populate();
    }

    pickPrestador(name){
        name = name.toUpperCase();
        this._currentName = name;
        this.populate();
    }

    getLocalidades(){
        let cartilla = this.fetchCartilla();
        if(this._currentEspecialidad){
            return cartilla.localidades[this._currentEspecialidad];
        }else{
            return [];
        }
    }

    getPrestadores(){
        let cartilla = this.fetchCartilla();
        let prestadores = [];
        if(this._currentLocalidad && this._currentEspecialidad){
            prestadores = cartilla.prestadores_el[this._currentEspecialidad][this._currentLocalidad];
        }else if(this._currentEspecialidad){
            prestadores = cartilla.prestadores[this._currentEspecialidad];
        }
        if(this._currentName){
            prestadores = prestadores.filter(p => p.name.indexOf(this._currentName) >= 0);
        }
        return prestadores;
    }

    fetchCartilla(){
        console.log('INNER CHECKSUM '+this._checksum);

        if(this._checksum == null){
            fetch("https://s3.amazonaws.com/iapos-app/assets/checksum.json")
            .then((res) => {
                return res.json();
            })
            .then(
                (result) => {
                    console.log("CHECKSUM!!!");
                    console.log(result.checksum);
                    this._checksum = result.checksum;
                    //this.populate();
                },
                (error) => {
                    console.log(error)
                }
            )    
        }
        if(DataManager.getInstance().state().cartillaChecksum != this._checksum && this._checksum != null){
            this.remoteGetCartilla();
        }
        if(this._cartilla == null && DataManager.getInstance().state().cartillaChecksum == this._checksum){
            this.dbGetCartilla()
        }
        console.log(this._cartilla);
        return this._cartilla;
    }

    remoteGetCartilla(){
        fetch("https://s3.amazonaws.com/iapos-app/assets/cartilla.json")
        .then((res) => {
            return res.json();
        })
        .then(
            (result) => {
                this._cartilla = result;
                let content = {version: this._checksum, content: this._cartilla}    
                //CREATE DB
                let openReq = window.indexedDB.open("IAPOS_cartilla_db");
                openReq.onupgradeneeded = (event) => {
                    console.log('upg')
                    let db = event.target.result;
                    db.createObjectStore("version", {keyPath: "version"});
                };
                openReq.onsuccess = (event) => {
                    console.log('suc')
                    let db = event.target.result;
                    let transaction = db.transaction(["version"], "readwrite");
                    transaction.onsuccess = (event) => {
                        console.log("Operation completed successfully");
                    };
                    transaction.onerror = (event) => {
                        console.log("Operation failed");
                        console.log(event);
                        this.dbGetCartilla();
                    };

                    let objectStore = transaction.objectStore("version");
                    let request = objectStore.add(content);
                    request.onsuccess = (event) => {
                        console.log(event)
                        DataManager.getInstance().storeProp('cartillaChecksum', this._checksum);
                        this.dbGetCartilla();
                    };
                }
                openReq.onerror = (event) => {
                    console.log("Operation failed");
                }
            },
            (error) => {
                console.log(error)
            }
        )
    }

    dbGetCartilla(){
        var openReq = window.indexedDB.open("IAPOS_cartilla_db");
        openReq.onupgradeneeded = (event) => {
            var db = event.target.result;
            db.createObjectStore("version", {keyPath: "version"});
        };
        openReq.onsuccess = (event) => {
            var db = event.target.result;
            var transaction = db.transaction(["version"]);
            var objectStore = transaction.objectStore("version");
            var request = objectStore.get(this._checksum);
            request.onerror = (event) => {
              // Handle errors!
            };
            request.onsuccess = (event) => {
              // Do something with the request.result!
              this._cartilla = request.result.content;
              DataManager.getInstance().storeProp('cartillaChecksum', this._checksum);
              this.populate();
            };
        }
        openReq.onerror = (event) => {
            console.log("Operation failed");
        }
    }
}