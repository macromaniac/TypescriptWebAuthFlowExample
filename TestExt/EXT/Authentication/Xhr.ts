class Xhr<T extends Object>{
	constructor(
		private url: string = null,
		private accessToken: string = null) { }

	private requestType = "GET";

	SetAccessToken(accessToken:string): Xhr<T> {
		this.accessToken = accessToken;
		return this;
	}
	SetUrl(url: string):Xhr<T> {
		this.url = url;
		return this;
	}
	SetRequestType(requestType: string):Xhr<T> {
		this.requestType = requestType;
		return this;
	}

	headers = new Array<{ header: string; value: string }>();
	AddRequestHeader(header: string, value: string): Xhr<T> {
		this.headers.push({ header, value });
		return this;
	}

	//This function is useful if there is another promise
	//that generates or ensures a token
	public AccessTokenToData = (authToken: string): Q.Promise<T> => {
		this.SetAccessToken(authToken);
		return this.GetData();
	}

	//This function is useful if there is another promise
	//that generates or ensures a url
	public UrlToData = (url: string): Q.Promise<T> => {
		this.SetUrl(url);
		return this.GetData();
	}

	public GetData = (): Q.Promise<T> => {

		var defer = Q.defer<T>();
		
		var xhr = new XMLHttpRequest();
		xhr.open(this.requestType, this.url);

		this.headers.forEach(header=> xhr.setRequestHeader(header.header, header.value));

		if(this.accessToken!=null)
			xhr.setRequestHeader('Authorization', 'Bearer ' + this.accessToken);

		xhr.onload = () => {
			if ((xhr.status < 200 || xhr.status >= 300))
				defer.reject("HTTP status " + xhr.status + " for xhr " + xhr);
			try {
				var data = JSON.parse(xhr.responseText);
				defer.resolve(data);
			} catch (ex) {
				defer.reject("Could not parse xhr data : " + xhr.responseText + " in object " + xhr);
			}
		}
		xhr.onerror = () => defer.reject("Error sending XHR request xhr:" + xhr);
		xhr.send();

		return defer.promise;
	}
} 