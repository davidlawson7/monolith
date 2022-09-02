import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { S3Client } from '@aws-sdk/client-s3';

@Injectable({
  providedIn: 'root',
})
export class UploaderService {
  constructor(private http: HttpClient) {}

  public uploadImage(image: File): Observable<any> {
    const formData = new FormData();

    formData.append('image', image);

    return this.http.post('/api/v1/image-upload', formData);
  }
}
