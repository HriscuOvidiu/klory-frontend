import { Injectable } from "@angular/core";
import KloryHttpService from './klory-http.service';

@Injectable()
export default class AuthService {
    
    private readonly basePath = "auth/";
    constructor(private khttp: KloryHttpService){ }

    register(data): Promise<Response> {
        return this.khttp.post(this.basePath + "register", data).toPromise();
    }

    login(data): Promise<Response> {
        return this.khttp.post(this.basePath + "login", data).toPromise();
    }
}