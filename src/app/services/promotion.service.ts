import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable,of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Restangular } from 'ngx-restangular';
import { map, catchError } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private restangular:Restangular) { }


  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();
  }
  getPromotion(id: number): Observable<Promotion> {
    return  this.restangular.one('promotions', id).get();
  }
  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('promotions').getList({featured: true})
      .pipe(map(promotions => promotions[0]));
  }
  getPromotionIds(): Observable<number[] | any> {
    return this.getPromotions()
      .pipe(map(promotions => promotions.map(promotion => promotion.id)),
        catchError(error => error ));
  }
  
}
