import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'pm-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, AfterViewInit, OnChanges {

  filterMsg: string;
  @Input() showDetails: boolean;
  @Input() foundItems: number;
  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>();

  private _listFilter: string;
  get listFilter() {
    return this._listFilter;
  }
  set listFilter(value) {
    this._listFilter = value;
    this.filterChange.emit(value);
  }

  // access to the html reference- properies and methods
  @ViewChild('filterElement') filterElement: ElementRef;
  constructor() { }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    if (changes['foundItems'] && !changes['foundItems'].currentValue) {
      this.filterMsg = 'No hits';
    } else {
      this.filterMsg = 'Hits: ' + this.foundItems;
    }
  }
  ngAfterViewInit(): void {
    // console.log(this.filterElement);
    // set focus
    this.filterElement.nativeElement.focus();

  }

}
