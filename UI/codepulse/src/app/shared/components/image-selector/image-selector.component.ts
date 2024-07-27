import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { Observable, Subscription } from 'rxjs';
import { BlogImage } from '../../Models/blog-image.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit, OnDestroy {
  private file?: File;
  fileName: string = '';
  title: string = '';
  uploadPhotoSubsription?: Subscription;
  images$?: Observable<BlogImage[]>;
  constructor(private imageService: ImageService) { }

  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;



  onFileUploadChange(event: any): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  ngOnInit(): void {
    this.getImages();
  }

  uploadImage(): void {
    if (this.file && this.fileName !== '' && this.title !== '') {
      // Image service to upload image
      this.uploadPhotoSubsription = this.imageService.uploadImage(this.file, this.fileName, this.title).subscribe({
        next: (response) => {
          this.imageUploadForm?.resetForm();
          this.getImages();
        }
      })
    }
  }

  selectImage(image: BlogImage): void {
    this.imageService.selectImage(image);
  }

  private getImages() {
    this.images$ = this.imageService.getAllImages();
  }




  ngOnDestroy(): void {
    this.uploadPhotoSubsription?.unsubscribe();
  }

}
