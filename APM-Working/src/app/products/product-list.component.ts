import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';
import { FilterComponent } from '../shared/filter/filter.component';
import { ProductParameterService } from './product-parameter.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    parentFilter: string;
    // showImage: boolean;
    displayFilter: boolean = true;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];
    @ViewChild(FilterComponent) filter: FilterComponent;


    constructor(private productService: ProductService, private productParameterService: ProductParameterService) { }

    get showImage() {
        return this.productParameterService.showImage;
    }
    set showImage(value) {
        this.productParameterService.showImage = value;
    }
    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.filter.listFilter = this.productParameterService.filterBy;
                // this.performFilter(this.parentFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    ngAfterViewInit(): void {
        this.parentFilter = this.filter.listFilter;
        // console.log(this.filterElement);
        // // set focus
        // this.filterElement.nativeElement.focus();

        // console.log(this.filterInput);
        // // watch for changes
        // this.filterInput.valueChanges.subscribe(
        //     () => this.performFilter(this.listFilter)
        // );
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
    onFilterChange(value) {
        // console.log(value);
        this.productParameterService.filterBy = value;
        this.performFilter(value);
    }
    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
