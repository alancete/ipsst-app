import DataManager from './DataManager';
export default class AuthenticationManager {
	_config = {
        oauth2: {
            serviceAuthUrl: 'https://sso.santafe.gov.ar/service-auth',
            authorizeUrl: 'https://sso.santafe.gov.ar/service-auth/oauth2.0/authorize',
            accessTokenUrl: 'https://sso.santafe.gov.ar/service-auth/oauth2.0/accessToken',
            profileUrl: 'https://sso.santafe.gov.ar/service-auth/oauth2.0/profile',
            clientId: 'mi-iapos.sso.santafe.gov.ar.v2l514$',
            clientSecret: 'pFx1qXEUDYQCMWbhtq0rxQbv7djaPKnQqbUA0',
            redirectUri: 'http://ar.gov.santafe.mobile.mi_iapos/oauth.callback',
            timeout: 8000
        }        
     };

	authenticate(){
		let endUrl = this._config.oauth2.redirectUri; 
	    let startUrl = this._config.oauth2.authorizeUrl; 
	    startUrl += '?response_type=code';
        startUrl += '&client_id=' + this._config.oauth2.clientId;
        startUrl += '&redirect_uri=' + this._config.oauth2.redirectUri;

	    let browser = window.open(startUrl, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
	    browser.addEventListener('loadstart', (evt) => {
	      console.log('evt.url = ' + evt.url);
	      if(evt.url.indexOf(endUrl) == 0) {
              console.log("match")
	          // close the browser, we are done!
	          browser.close();
	          // TODO: pull the token out and 
	          // use it for further API calls.
	          let code = evt.url.split('code=')[1]
              console.log(code);
	          DataManager.getInstance().storeProp('authentication_code', code)
	          this.getAccessToken(code);
	      }
	    });
	    browser.addEventListener('loaderror', function(err) {
	      console.log("error");
          console.log(err)
	      // TODO: handle this of course!
	    });
	}

	getAccessToken(code){
        console.log("AT")
		let tokenUrl = this._config.oauth2.accessTokenUrl + "?client_id=" + this._config.oauth2.clientId
        tokenUrl += "&client_secret=" + this._config.oauth2.clientSecret
        tokenUrl += "&redirect_uri=" + this._config.oauth2.redirectUri
        tokenUrl += "&grant_type=authorization_code"
        tokenUrl += "&code=" + code

        fetch(tokenUrl, { method: 'POST'})
        .then((res) => {
            console.log(res);
        	return res.text();
        })
        .then((result) => {
                console.log(result)
                var today = new Date();
                var expiresInMilliseconds = result.split("&expires_in=")[1] * 1000;
                var authentication = {
                    accessToken: result.split("access_token=")[1].split("&expires_in")[0],
                    accessTokenExpiresDate: new Date(today.getTime() + expiresInMilliseconds)
                };
                console.log(authentication);
                DataManager.getInstance().storeProp('authentication', authentication);
                this.getRemoteProfile();
	        },
            (error) => {
                console.log("error token");
                console.log(error);
            	DataManager.getInstance().storeProp('error', error)
            }
        )
	}

    getRemoteProfile(){
        fetch(this._config.oauth2.profileUrl + "?access_token=" + DataManager.getInstance().state().authentication.accessToken)
        .then((res) => {
            console.log(res);
            return res.json();
        })
        .then((result) => {
            console.log('profile');
            console.log(result);
            DataManager.getInstance().storeProp('profile',result);
            DataManager.getInstance().storeProp('credentials',{cuit: result.attributes.cuil});
            //DataManager.getInstance().storeProp('credentials',{cuit: 20139251246});
            DataManager.getInstance()._currentObj.props.history.push('/');
        })
    }

}