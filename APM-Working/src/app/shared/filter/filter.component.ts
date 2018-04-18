import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'pm-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, AfterViewInit {
  listFilter: string;
  @Input() showDetails: boolean;
  @Input() foundItems: number;
  // access to the html reference- properies and methods
  @ViewChild('filterElement') filterElement: ElementRef;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    console.log(this.filterElement);
    // set focus
    this.filterElement.nativeElement.focus();

  }

}
