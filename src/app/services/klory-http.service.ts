import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export default class KloryHttpService {

    requestOptionsCommand = {
        observe: 'response' as "body",
        headers: new HttpHeaders({
            'x-api-key': environment.apiKey,
        })
    };

    requestOptionsQuery = {
        headers: new HttpHeaders({
            'x-api-key': environment.apiKey,
        })
    };

    constructor(private http: HttpClient) { }

    get(url): Observable<any> {
        return this.http.get<any>(environment.baseApiPath + url, this.requestOptionsQuery);
    }


    post(url, data) {
        return this.http.post<Response>(environment.baseApiPath + url, data, this.requestOptionsCommand);
    }
}