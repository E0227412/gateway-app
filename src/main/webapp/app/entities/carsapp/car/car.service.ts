import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { ICar } from 'app/shared/model/carsapp/car.model';

type EntityResponseType = HttpResponse<ICar>;
type EntityArrayResponseType = HttpResponse<ICar[]>;

@Injectable({ providedIn: 'root' })
export class CarService {
  public resourceUrl = SERVER_API_URL + 'services/carsapp/api/cars';
  public resourceSearchUrl = SERVER_API_URL + 'services/carsapp/api/_search/cars';

  constructor(protected http: HttpClient) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICar>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICar[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICar[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
