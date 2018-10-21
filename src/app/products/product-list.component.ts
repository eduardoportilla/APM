import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{
  
    pageTitle: string = 'Lista de Productos!';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;

    //Propiedad para filtrar con sus respectivos get y set
    _listFilter: string;

    get listFilter(): string {
      return this._listFilter;
    }

    set listFilter(value: string) {
      this._listFilter = value;
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }


    filteredProducts: IProduct[];
    products: IProduct[];


    //Constructor. 

    constructor(private productService: ProductService) {
      console.log('Construyendo Product List Component');
    }

    //La siguiente función hara posible que se muestre la imagen cuando se de un click
    //en el botón Mostrar Imagen. 
    //Los parametros de la función se reciben en le parentesis, mientras que luego de los :
    //se indica el tipo de dato que devuelve

    toggleImage(): void {
      this.showImage = !this.showImage;
    }

    //Funcion para realizar el filtrado

    performFilter(filterBy: string): IProduct[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) =>
          product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    //Implementación de la interfaz OnInit

    ngOnInit(): void {
      console.log('Product list component: Obteniendo los productos');
      this.productService.getProducts().subscribe(
        products => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error => this.errorMessage = <any>error
      );
     // this.filteredProducts = this.products;
    }

    onRatingClicked(message: string): void {
      this.pageTitle = 'Lista de Productos: ' + message;
    }


}