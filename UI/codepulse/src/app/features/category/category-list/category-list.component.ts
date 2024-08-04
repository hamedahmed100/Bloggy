import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model'; // Import the 'category' type
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories$?: Observable<Category[]>;
  totalCount?: number;
  pageNumber = 1;
  pageSize = 5;
  pageCount = 0;
  listPages: number[] = []

  constructor(private categoryService: CategoryService) {

  }
  ngOnInit(): void {
    this.categoryService.getCategoriesCount()
      .subscribe({
        next: (count) => {
          this.totalCount = count;
          this.pageCount = Math.ceil(count / this.pageSize);
          this.listPages = new Array(this.pageCount);
          this.categories$ = this.categoryService.getAllCategories(
            undefined,
            undefined,
            undefined,
            this.pageNumber,
            this.pageSize
          );
        }
      });


  }

  onSearch(searchTerm: string): void {
    this.categories$ = this.categoryService.getAllCategories(searchTerm);
  }

  sortCategories(sortBy: string, sortDirection: string): void {
    this.categories$ = this.categoryService.getAllCategories(undefined, sortBy, sortDirection);
  }

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.categories$ = this.categoryService.getAllCategories(undefined, undefined, undefined, pageNumber, this.pageSize);
  }
  onPreviousPage(): void {
    if (this.pageNumber === 1) {
      return;
    }

    this.pageNumber--;
    this.categories$ = this.categoryService.getAllCategories(undefined, undefined, undefined, this.pageNumber, this.pageSize);
  }

  onNextPage(): void {
    if (this.pageNumber === this.listPages.length) {
      return;
    }
    this.pageNumber++;
    this.categories$ = this.categoryService.getAllCategories(undefined, undefined, undefined, this.pageNumber, this.pageSize);
  }
}
