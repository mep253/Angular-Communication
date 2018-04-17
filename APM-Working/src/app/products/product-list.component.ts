import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    listFilter: string;
    showImage: boolean;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];
    // access to the html reference- properies and methods
    @ViewChild('filterElement') filterElement: ElementRef;

    // access the state of the input(dirty usw). they are readonly, cannot be changed... we can watch for changes
    @ViewChild(NgModel) filterInput: NgModel;
    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    ngAfterViewInit(): void {
        console.log(this.filterElement);
        // set focus
        this.filterElement.nativeElement.focus();

        console.log(this.filterInput);
        // watch for changes
        this.filterInput.valueChanges.subscribe(
            () => this.performFilter(this.listFilter)
        );
    }
    // Getter and Setter
    // private _listFilter: string;
    // get listFilter() {
    //     return this._listFilter;
    // }
    // set listFilter(value) {
    //     this._listFilter = value;
    //     this.performFilter(this._listFilter);
    // }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
    // two way binding, the long way
    // onFilterChange(filter) {
    //     this.listFilter = filter;
    //     this.performFilter(this.listFilter);
    // }
    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
