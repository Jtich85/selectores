import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private baseUrl: string = 'https://restcountries.com/v3.1';

  private _regiones: Region[] = [ Region.Africa, Region.Americas, Region.Asia, Region.Europa, Region.Oceania];

  constructor(
    private http: HttpClient
  ) { }

  get regions(): Region[] {
    return [ ...this._regiones ];
  }

  getCountriesByRegion( region: Region ): Observable<SmallCountry[]> {
    if( !region ) return of([]);

    const url: string = `${ this.baseUrl }/region/${ region }?fields=cca3,name,borders`;

    return this.http.get<SmallCountry[]>(url)
      .pipe(
        tap( response => console.log({ response }) )
      )
  }

}
