import { Injectable } from '@angular/core';
import MemoryItem from '../models/memoryItem';
import { Observable } from 'rxjs';
import KloryHttpService from './klory-http.service';

@Injectable()
export default class MemoryService {
    basePath: String = "memory/"

    constructor(private khttp: KloryHttpService) {}

    getAllMemoryItemsForUser(id: string) : Observable<Array<MemoryItem>> {
        return this.khttp.get(this.basePath + id);
    } 

    addMemoryItem(id: string, item: any) : Promise<any> {
        return this.khttp.post(this.basePath + id, item).toPromise();
    }

    getMemoryItem(id: string): Observable<MemoryItem> {
        return this.khttp.get(this.basePath + "item/" + id);
    }

    getMemoryItemsFromDate(data:any): Promise<any> {
        return this.khttp.post(this.basePath + 'items', data).toPromise();
    }
}