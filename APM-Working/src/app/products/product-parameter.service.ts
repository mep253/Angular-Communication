import { Injectable } from '@angular/core';

@Injectable()
export class ProductParameterService {
  // service as  a property bag; stores values for
  showImage: boolean;
  filterBy: string;

  constructor() { }

}
