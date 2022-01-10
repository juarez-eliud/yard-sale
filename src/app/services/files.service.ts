import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as saveAs from 'file-saver';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface File {
  originalname: string;
  filename: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private apiUrl = `${environment.API_URL}/api/files`;

  constructor(private http: HttpClient) { }

  getFile(name: string, url: string, type: string) {
    //El get obtiene el contenido del archivo y no un archivo descargable
    return this.http.get(url, {responseType: 'blob'})
    .pipe(
      tap(content => {
        //Se procesa el contenido
        const blob = new Blob([content], {type});
        //Realiza descarga del archivo
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  uploadFile(file: Blob) {
    const dto = new FormData();
    dto.append('file', file);
    return this.http.post<File>(`${this.apiUrl}/upload`, dto, {
      /* Si el backend necesita que se especifique el tipo de content type
      se especifica en los headers */
      /* headers: {
        'Content-type': "multipart/form-data"
      } */
    })
  }

}
