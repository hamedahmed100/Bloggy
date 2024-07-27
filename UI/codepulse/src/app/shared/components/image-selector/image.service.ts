import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '../../Models/blog-image.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  // Create a BehaviorSubject to store the selected image
  selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    fileName: '',
    title: '',
    fileExtension: '',
    url: ''
  } as BlogImage);


  // Inject the HttpClient service to constructor
  constructor(private http: HttpClient) {

  }

  getAllImages(): Observable<BlogImage[]> {
    return this.http.get<BlogImage[]>(`${environment.apiBaseUrl}/api/images`);
  }



  uploadImage(file: File, fileName: string, title: string): Observable<BlogImage> {
    // Create a FormData object
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);

    // Call the API to upload the image
    return this.http.post<BlogImage>(`${environment.apiBaseUrl}/api/images`, formData);
  }

  selectImage(image: BlogImage): void {
    // Do something with the selected image
    this.selectedImage.next(image);
  }

  onSelectedImage(): Observable<BlogImage> {
    return this.selectedImage.asObservable();
  }
}
