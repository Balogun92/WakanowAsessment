
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  url = environment.API_URL;

  headers = {
  'Content-Type': 'application/json',
}

signUp(payload: any):Observable<any>{
  return this.http.post(`${this.url}/register`, payload).pipe(catchError(this.handleError));
}

login(payload: any):Observable<any>{
  return this.http.post(`${this.url}/login`, payload).pipe(catchError(this.handleError));

}


private handleError(error: HttpErrorResponse): any {
  if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
  } else {
      console.error(
          `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
  }
  return throwError("Something went wrong, Please try again later.");
}



}


