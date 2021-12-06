export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

/* Para hacer una actualización no es necesario que se 
envíen todos los parámetros del elemento, sino solo los o el 
elemento que se cambió, por lo que se podría crear 
una interfaz declarando todas las propiedades como opcionales, ejemplo: 

export interface UpdateProductDto {
  title: string;
  price: number;
  images: string[];
  description: string;
  categoryId: number;
} */

/* Sin embargo, se está repitiendo código, por lo que se 
podría usar la interfaz CreateProductDTO, la cual tiene 
solo los elementos que se necesitan, la diferencia es que
se requiere que los atributos sean opcionales, para poder 
usar la interfaz como se requiere se puede usar creando 
una interfaz (UpdateProductDto) que implementa de CreateProductDTO
y para poder hacer los atributos opcionales se logra mediante el uso de Partial */

export interface UpdateProductDto extends Partial<CreateProductDTO> { }