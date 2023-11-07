import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalServiceService } from 'src/app/core/services/modal-service.service';

@Component({
  selector: 'app-slider-img',
  templateUrl: './slider-img.component.html',
  styleUrls: ['./slider-img.component.css'],
  host: {
    '(document:keydown)': 'onKeyDown($event)'
  }
})
export class SliderImgComponent {
  id1!: string;
  id2!: string;
  id3!: string;
  url: string[] = this.router.url.split('/');
  count: number = 0;

  imgGallery: string[] = [
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/f8/31/4f/restaurante-hotel.jpg?w=1200&h=-1&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/dd/91/11/sumergete-en-nuestra.jpg?w=1200&h=-1&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/f7/82/76/la-huerta-hotel.jpg?w=1200&h=-1&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/59/43/74/hotel-ms-la-huerta-plus.jpg?w=1200&h=-1&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/3d/f4/e3/photo5jpg.jpg?w=1200&h=-1&s=1",
    "https://media-cdn.tripadvisor.com/media/photo-s/25/d0/3f/cd/un-comedor-de-400-anos.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-w/25/d0/40/42/un-comedor-de-400-anos.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-w/25/d0/3f/82/un-comedor-de-400-anos.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-s/11/36/3e/c8/culinarium-at-mylos.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-w/11/36/3f/5f/the-view.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-w/11/36/3f/01/bon-appetite.jpg"



  ];//todo OJITO TIENE QUE SER IGUALITO EL CONTENIDO DEL ARREGLO AL COMPONENTE DE PRESTADOR O SI NO SE DAÑA
  modalDataSubscription: any;
  turnModal: boolean | undefined;

  constructor(private route: ActivatedRoute,  private router: Router, private modalService:ModalServiceService) {

    this.id1= this.url[2];
    this.id2= decodeURI(this.url[3]);
    this.route.params.subscribe(params => {
      // params contendrá los valores de los parámetros de ruta
      this.id3 = params['option'];

    });
    this.count = Number(this.id3 === undefined ? 1 : Number(this.id3) > this.imgGallery.length ? 1 : this.id3 );
    this.router.navigateByUrl(`/prestadores/${this.id1}/${this.id2}/slider/${this.count}`)
  }

  buttonModal() {

    this.router.navigate(['../../'], { relativeTo: this.route })
  }

  gallery(){

    this.router.navigateByUrl(`/prestadores/${this.id1}/${this.id2}/gallery`)
  }



  buttonSlider(direction: string) {


    if (direction === "next") {
      if (this.count === this.imgGallery.length) {
        this.count = 1;
      } else {
        this.count++;
      }
    } else {
      if (this.count === 1) {
        this.count = this.imgGallery.length;
      } else {
        this.count--;
      }
    }

    this.router.navigateByUrl(`/prestadores/${this.id1}/${this.id2}/slider/${this.count}`)


  }

  ngOnInit() {
    // ...

  }

  onKeyDown(event: KeyboardEvent) {
    const targetElement = event.target as HTMLElement;

    // Verifica si el evento no se originó en un elemento con la clase "no-close"
    if (!targetElement.classList.contains('no-close') && targetElement.tagName !=="svg" && targetElement.tagName !=="li" && targetElement.tagName !=="path" && targetElement.tagName !=="span" && targetElement.tagName !=="ul"     && event.key === "Escape") {

      this.buttonModal();
    }
  }




  ngOndestroy(){

  }



  capitalizeFirstLetter(inputString: string): string {
    if (inputString.length === 0) {
      return inputString;
    }
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

}
