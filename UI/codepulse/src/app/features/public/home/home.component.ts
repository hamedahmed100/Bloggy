import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  // properties
  blogs$?: Observable<BlogPost[]>;



  /**
   * constructor
   */
  constructor(private blogPostService: BlogPostService) {


  }

  // onInit
  ngOnInit(): void {
    this.blogs$ = this.blogPostService.getAllBlogPosts();
  }



  // onDestroy

  ngOnDestroy(): void {
    // Unsubscribe from the blog observable
    this.blogs$?.subscribe().unsubscribe();
  }
}
