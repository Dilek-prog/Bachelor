import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ansicht } from '../shared/ansicht';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Ansicht[]>{
    return this.http.get<Ansicht[]>(this.ansichtRoute);
  }

  // Die Poesie ist mit jeder eigenen Id gekennzeichnet nach dem Anlegen der Karte 
  getOne(id: string): Observable<Ansicht>{
    return this.http.get<Ansicht>(this.ansichtRoute + '/' + id);
  }

  // die Daten für Poesie werden aktualisiert 
  update(id: string, data: Ansicht): Observable<Ansicht> {
    return this.http.patch<Ansicht>(this.ansichtRoute + '/' + id, data);
  }

  // die Id wird gelöscht 
  deleteOne(id: string,): Observable<any>{
    return this.http.delete<any>(this.ansichtRoute + '/' + id,{observe: 'response'});
  } 

  // hinzufügen von Poesie Cards
  create(poesies: Ansicht): void{
     this.http.post<Ansicht>(this.ansichtRoute,  ansichts)
     .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  
    }
    
  }