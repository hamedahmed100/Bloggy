import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  addBlogPost: AddBlogPost;
  categories$?: Observable<Category[]>;
  isImageSelectorVisible: boolean = false;
  imageSelectSubscription?: Subscription;


  constructor(private blogPostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService,
    private imageService: ImageService,

  ) {
    this.addBlogPost = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: []
    }
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    this.imageSelectSubscription = this.imageService.onSelectedImage().subscribe({
      next: (image) => {
        if (this.addBlogPost) {
          this.addBlogPost.featuredImageUrl = image.url;
          this.closeImageSelector();
        }
      }
    })
  }


  onFormSubmit(): void {
    this.blogPostService.createBlogPost(this.addBlogPost)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }
  closeImageSelector(): void {
    this.isImageSelectorVisible = false;

  }

  ngOnDestroy(): void {
    this.imageSelectSubscription?.unsubscribe();
  }
}
