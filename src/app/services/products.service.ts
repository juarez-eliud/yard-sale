import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';

import { CreateProductDTO, Product, UpdateProductDto } from './../models/product.model';
import { throwError, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';
  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let httpParams  = new HttpParams();  
    if(limit && offset) {
      httpParams = httpParams.set('limit', limit);
      httpParams = httpParams.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, { params: httpParams })
    .pipe(
      /* Inidca cuantas veces se requiere reintentar la petición, también se puede
      usar con base en una condicionar con un retryWhen y colocandole un delay de tiempo
      en cada reintento */
      retry(3),
      map(products => products.map(item => { 
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDto) {
    return zip(
      this.getProduct(id),
      this.update(id, dto)
    )
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // if(error.status === 500) {
          if(error.status === HttpStatusCode.InternalServerError) {
            return throwError('Error en el servidor');
          }

          if(error.status === HttpStatusCode.NotFound) {
            return throwError('Producto no existe');
          }

          if(error.status === HttpStatusCode.Unauthorized) {
            return throwError('No autorizado');
          }

          return throwError('Ups.. algo salió mal!');

        })
      );
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: { limit, offset }
    });
  }

  /* Si el servicio es individual se vuelve redundante declarar createProduct, getProduct, etc.
  Porque ya nos encontramos dentro del servicio */
  create(dto: CreateProductDTO) {
    //Se espera que el post retorne el producto que se creó
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateProductDto) {
    /* En terminos puristas cuando se usa PUT se debería de enviar toda 
    la información del elemento que se acutalizó, no importa que se haya
    cambiado solo un valor se envía todo el cuerpo del elemento, a diferencia 
    de PATCH que es para la edición de un atributo en partícular, es decir si 
    solo se cambió el campo de nombre solo se envia ese campo.
    Depende más de como el backend incorporé estas peticiones. */
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string) {
   /*  Se usa el tipado de boolean para que el backend nos indique
    si se eliminó o no */
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

}


