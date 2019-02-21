import AuthenticationManager from './AuthenticationManager';
import GeoManager from './GeoManager';

export default class DataManager {
  static instance = null;
  _currentVersion = 41;
  _geoManager = new GeoManager();
  _currentObj = null;

  state() {
    let innerState = window.localStorage.getItem('state');
    if (innerState) {
      try {
        innerState = JSON.parse(innerState);
      } catch (e) {
        innerState = null;
      }
    }
    //if(!innerState || true){
    if (!innerState || innerState.currentVersion !== this._currentVersion) {
      innerState = this.defaultState();
      window.localStorage.setItem('state', JSON.stringify(innerState));
    }
    innerState['geocartilla'] = this._geoManager._filteredCartilla;
    console.log(innerState);
    return innerState;
  }

  storeProp(k, v) {
    let innerState = this.state();
    innerState[k] = v;
    window.localStorage.setItem('state', JSON.stringify(innerState));
    this.loadState();
  }

  loadState() {
    if (!DataManager.getInstance()._currentObj.state) {
      DataManager.getInstance()._currentObj.state = this.state();
    } else {
      DataManager.getInstance()._currentObj.setState(this.state());
    }
  }

	defaultState(){
		return {
			currentVersion: this._currentVersion,
			isLoaded: true,
			cartillaChecksum: '0',
			credentials: {cuit: null},
			notifications:[		
				{"_id":{"$oid":"5be25d9675fefa000401f33f"},"application":"iapos","body":"","callToAction":null,"created_at":"2018-11-07T03:35:50.394Z","title":"Mensaje de Prueba","uid":"20139251246","updated_at":"2018-11-07T03:35:50.394Z", "date":"2018-11-07"}		
			],		
			unread_count: 0,
    		currentUser:{
				"IdTitular": 308477,
				"IdMiembro": 308477,
				"DocumentoMiembro": "13925124       ",
				"ApellidoMiembro": "VALENCIA                      ",
				"NombreMiembro": "TEST MARIO                         ",
				"FechaAltaMiebro": "2009-01-22",
				"ParentescoMiembro": "TITULAR        ",
				"FechaNacMiembro": "1960-06-14",
				"SexoMiembro": "MASCULINO "
			},
    		familyGroup: [
				{
				"IdTitular": 308477,
				"IdMiembro": 308479,
				"DocumentoMiembro": "46296655       ",
				"ApellidoMiembro": "VALENCIA TEO RAFAEL           ",
				"NombreMiembro": "                              ",
				"FechaAltaMiebro": "2009-01-22",
				"ParentescoMiembro": "HIJA/O         ",
				"FechaNacMiembro": "2004-10-13",
				"SexoMiembro": "MASCULINO "
				},
				{
				"IdTitular": 308477,
				"IdMiembro": 308477,
				"DocumentoMiembro": "13925124       ",
				"ApellidoMiembro": "VALENCIA                      ",
				"NombreMiembro": "TEST MARIO                         ",
				"FechaAltaMiebro": "2009-01-22",
				"ParentescoMiembro": "TITULAR        ",
				"FechaNacMiembro": "1960-06-14",
				"SexoMiembro": "MASCULINO "
				},
				{
				"IdTitular": 308477,
				"IdMiembro": 308478,
				"DocumentoMiembro": "23358280       ",
				"ApellidoMiembro": "CHAMUDIS LEONOWIEC L          ",
				"NombreMiembro": "                              ",
				"FechaAltaMiebro": "2009-01-22",
				"ParentescoMiembro": "CONYUGE        ",
				"FechaNacMiembro": "1973-09-12",
				"SexoMiembro": "FEMENINO  "
				},
				{
				"IdTitular": 308477,
				"IdMiembro": 308480,
				"DocumentoMiembro": "49924578       ",
				"ApellidoMiembro": "VALENCIA MORA ISABEL          ",
				"NombreMiembro": "                              ",
				"FechaAltaMiebro": "2009-12-18",
				"ParentescoMiembro": "HIJA/O         ",
				"FechaNacMiembro": "2009-12-07",
				"SexoMiembro": "FEMENINO  "
				}
			],
			currentImage: 'data:image/png;base64,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',
			defaultImage: 'data:image/png;base64,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',
		}
	};

	static getInstance() {
        if (DataManager.instance === null) {
            DataManager.instance = new DataManager();
        }

        return this.instance;
    }

    handleCurrentObject(obj){
    	if(obj){
			DataManager.getInstance()._currentObj = obj;
		}
		this.loadState();
		if(this._currentObj.props.history.location.pathname !== '/login' && !this.isLoggedIn()){
			this._currentObj.props.history.push('/login')
		}
		console.log(this._currentObj.props.history.location.pathname);
		console.log(this.isLoggedIn());
		if(this._currentObj.props.history.location.pathname == '/login' && this.isLoggedIn()){
			this._currentObj.props.history.push('/')
		}
    }

    isLoggedIn(){
    	console.log(this.state().credentials);
    	if (this.state().credentials.cuit){
    		return true;
    	}
    	return false;
    }

    login(){
    	if(window.cordova){
	    	let a = new AuthenticationManager();
	    	a.authenticate();
    	}else{
    		this.storeProp('credentials', 
	    		{
	    			cuit: 20139251246
	    		}
	    	);
			this._currentObj.props.history.push('/');
    	}
	}

    logout(){
    	this.storeProp('credentials', 
    		{cuit: null}
    	)
    	this._currentObj.props.history.push('/login');
    }

	helloWorld(obj=null){
		this.handleCurrentObject(obj);
	}
	loadLoginSection(obj){
		this.handleCurrentObject(obj)
	}
	loadHomeSection(obj){
		this.handleCurrentObject(obj)
		this._geoManager.populate();

		let headers = new Headers({'parametros': JSON.stringify({"inOrganizacion":1,"InUsuario":"smartcare","InPassword":"4rfv","inCUIL":this.state().credentials.cuit})})
		fetch("https://aswe.santafe.gov.ar/iapos-sw/servlet/abeafilgrupows", { method: 'POST',
               headers:headers
        })
        .then((res) => {
        	return res.json();
        })
        .then(
            (result) => {
                this.storeProp('familyGroup', result)
                this.pickMainUser(result);
	        },
            (error) => {
            	this.storeProp('error', error)
            }
        )

        fetch("https://notifications-engine.herokuapp.com/notifications/unread_count?application=iapos&uid="+this.state().credentials.cuit)
        .then((res) => {
        	return res.json();
        })
        .then(
            (result) => {
            	this.storeProp('unread_count', result.result)   
	        },
            (error) => {
            	this.storeProp('error', error)
            }
        )
	}
	pickMainUser(result){
		for(var i=0;i<result.length;i++){
			let e = result[i];
			if(e["IdTitular"] === e["IdMiembro"]){
				this.storeProp('currentUser', e);
				this.loadPicture(e["IdMiembro"]);
			}
		}
	}
	pickUser(documento){
		for (var e of this._currentObj.state.familyGroup) {
			if(e["DocumentoMiembro"] === documento){
				this.storeProp('currentUser', e);
				this.loadPicture(e["IdMiembro"]);
			}
		}	
	}

	loadPicture(id){
		let headers = new Headers({'parametros': JSON.stringify({"inOrganizacion":1,"InUsuario":"smartcare","InPassword":"4rfv","inIdAfiliado":id})})
        fetch("https://aswe.santafe.gov.ar/iapos-sw/servlet/abeafilfotows", { method: 'POST',
               headers:headers
        })
        .then((res) => {
        	return res.text();
        })
        .then(
            (result) => {
                this.storeProp('currentImage', "data:image/png;base64, "+result)
	        },
            (error) => {
            	this.storeProp('error', error)
            }
        )
	}

	loadGeoSection(obj){
		this.handleCurrentObject(obj)
		this._geoManager.populate();
	}


	loadPaymentsSection(obj){
		this.handleCurrentObject(obj)

		let headers = new Headers({'parametros': JSON.stringify({"inOrganizacion":1,"InUsuario":"smartcare","InPassword":"smart1234","InBAGfmNroIn":308477})})
		fetch("http://tkserver-vt12.tekhne.com.ar:7001/IAPOS_PREPRO_WS/servlet/abeafildeudactactews", { method: 'POST',
               headers:headers
        })
        .then((res) => {
        	return res.json();
        })
        .then(
            (result) => {
            	let nresult = [];
            	var max = Math.min(result.length, 2);
            	for(var i=0;i<max;i++){
            		var r = result[i];
            		r['Saldo'] = parseFloat(r['Debe']) - parseFloat(r['Haber']);
            		r['Saldo'] = r['Saldo'].toFixed(2);
            		nresult.push(r);
            	}

	            this.storeProp('pastPayments', nresult)
	        },
            (error) => {
            	console.log(error);
            	this.storeProp('error', error)
            }
        )

		
		headers = new Headers({'parametros': JSON.stringify({"inOrganizacion":1,"InUsuario":"smartcare","InPassword":"smart1234","inIdTitular":532274,"inFechaDesde":"2014-08-01","inFechaHasta":"2018-08-01"})})
		fetch("http://tkserver-vt12.tekhne.com.ar:7001/IAPOS_PREPRO_WS/servlet/abeafilconsumosws", { method: 'POST',
               headers:headers
        })
        .then((res) => {
        	return res.json();
        })
        .then(
            (result) => {
				let nresult = [];
            	
            	for(var i=0;i<result.length;i++){
            		var r = result[i];
            		r['FechaPrestacion'] = r['FechaPrestacion'].split('-').reverse().join('-')
            		nresult.push(r);
            	}	            

	            this.storeProp('copagos', nresult);
	        },
            (error) => {
            	console.log(error);
            	this.storeProp('error', error)
            }
        )
	}

	loadNotificationsSection(obj){
		this.handleCurrentObject(obj)

		fetch("https://notifications-engine.herokuapp.com/notifications/all?application=iapos&uid=20139251246")
        .then((res) => {
        	return res.json();
        })
        .then(
            (result) => {
            	let nresult = [];
            	for(var i=0;i<result.result.length;i++){
            		var r = result.result[i];
            		r['date'] = r['created_at'].split('T')[0];
            		r['date'] = r['date'].split('-').reverse().join('-')
            		nresult.push(r);
            	}
	            this.storeProp('notifications', nresult)
	        },
            (error) => {
            	console.log(error);
            	this.storeProp('error', error)
            }
        )

        fetch("https://notifications-engine.herokuapp.com/notifications/read?application=iapos&uid="+this._currentObj.state.credentials.cuit)
        .then((res) => {
        	return res.json();
        })
        .then(
            (result) => {
            	fetch("https://notifications-engine.herokuapp.com/notifications/unread_count?application=iapos&uid="+this._currentObj.state.credentials.cuit)
		        .then((res) => {
		        	return res.json();
		        })
		        .then(
		            (result) => {
		            	this.storeProp('unread_count', result.result)   
			        },
		            (error) => {
		            	this.storeProp('error', error)
		            }
		        )
            },
            (error) => {
            	this.storeProp('error', error)
            }
        )
	}
}