import { SignUpResponse, SignUpRequest } from './../../models/models';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  constructor(private http: HttpClient) { }

  public addTeacherUser(userRequest: SignUpRequest): Promise<SignUpResponse> {
    const requestHeaders = { 'content-type': 'application/json' };

    return this.http.post<SignUpResponse>(`${environment.BASEURL}/authentication/v1/signup`
      , userRequest, { headers: requestHeaders }).toPromise().catch(err => err.error);
  }
}
