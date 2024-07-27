import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/services/category.service';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit,
  OnDestroy {
  id: string | null = null;
  routeSubsription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;
  blogPost?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];
  isImageSelectorVisible: boolean = false;
  imageSelectSubscription?: Subscription;

  constructor(private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private router: Router,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories()

    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        // Get BlogPost from API
        if (this.id) {
          // Call the service to get the category by id
          this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.blogPost = response;
              this.selectedCategories = response.categories.map((category) => category.id);
            }
          });
        }

        this.imageSelectSubscription = this.imageService.onSelectedImage().subscribe({
          next: (image) => {
            if (this.blogPost) {
              this.blogPost.featuredImageUrl = image.url;
              this.closeImageSelector();
            }
          }
        })

      }
    });
  }

  onFormSubmit(): void {
    // convert model to request object
    if (this.blogPost && this.id) {
      var updateBlogPost: UpdateBlogPost = {
        author: this.blogPost.author,
        content: this.blogPost.content,
        shortDescription: this.blogPost.shortDescription,
        featuredImageUrl: this.blogPost.featuredImageUrl,
        isVisible: this.blogPost.isVisible,
        publishedDate: this.blogPost.publishedDate,
        title: this.blogPost.title,
        urlHandle: this.blogPost.urlHandle,
        categories: this.selectedCategories ?? []
      };
      this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/admin/blogposts']);
          }
        });
    };
  }

  onDelete(): void {
    if (this.id) {
      this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/admin/blogposts']);
          }
        });
    }
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }
  closeImageSelector(): void {
    this.isImageSelectorVisible = false;

  }


  ngOnDestroy(): void {
    this.routeSubsription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }
}
