import { Component, HostListener, OnInit } from '@angular/core';
import { ModalServiceService } from 'src/app/core/services/modal-service.service';
import { PrestadoresService } from 'src/app/core/services/prestadores.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css']
})
export class PaginaInicioComponent implements OnInit {


  private modalDataSubscription!: Subscription;
  private modalDataSubscription2!: Subscription;
  private modalDataSubscription3!: Subscription;

  public cerrado: boolean = false;
  modalsuichtodo!:boolean;
  modaldata!:boolean;

  warningAll!:boolean;
  url = "";

  getLinkActivo(){

   this.router.url === '/dashboard-admin/pagina-inicio/list-prestadores-turisticos' ?    this.url = "uno" : this.router.url === '/dashboard-admin/pagina-inicio/list-atractivo-turistico' ?    this.url = "dos" : this.router.url === '/dashboard-admin/pagina-inicio/list-municipio' ?    this.url = "tres" : this.router.url === '/dashboard-admin/pagina-inicio/list-rutas-turisticas' ?    this.url = "cuatro" :    this.url = "cinco";



  }


  botonActivo:string = this.url; // Variable para guardar el botón activo

  activarBoton(boton: string) {// Función para activar el botón seleccionado
    this.botonActivo = boton;// Guarda el botón seleccionado en la variable
    console.log(this.botonActivo )
  }

  // Escucha el evento mousedown
  onCloseMousedown(event: MouseEvent) {
    this.cerrado = false;
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.closemodal();
    }
  }



  openmodaltodo() {
    this.modalService.setModalSuichTodo(true);
  }

  openmodaldata() {
    this.modalService.setData(true);
  }

  openWarningtodo() {
    this.modalService.setWarningAll(true);
  }


  DescargarArchivo(){
        // URL del archivo que deseas descargar
        const url = 'https://firebasestorage.googleapis.com/v0/b/centurhuila-b9e47.appspot.com/o/ManualDeUsuario%2FFormato.xlsx?alt=media&token=389d8ec6-d252-4c36-a13d-7a6dc8485977&_gl=1*nrb8qa*_ga*NDA2NDgyOTM3LjE2ODY3NDgyNjA.*_ga_CW55HF8NVT*MTY5NzgzNDM2MS42MS4xLjE2OTc4MzUxNjUuMTkuMC4w';

        // Abre la URL en una nueva pestaña para forzar la descarga
        window.open(url, '_blank');
  }

 closemodal() {
    this.modalService.setWarning(false);//cierra el modal
    this.modalService.setModalSuichTodo(false);//cierra el modal
    this.modalService.setWarningAll(false);//cierra el modal
    this.modalService.setData(false);//cierra el modal
    this.modalService.setModalSuichAtrac(false);//cierra el modal
    this.modalService.setModalSuichPst(false);//cierra el modal
    this.cerrado = false;
   }



  hidden(){
    this.cerrado == false ? this.cerrado = true : this.cerrado = false;
  }
  constructor(  private prestadoresService: PrestadoresService, // Inyectamos el servicio
  private modalService: ModalServiceService, private router: Router, private titleService: Title){

  }
  ngOnInit(): void {
    this.titleService.setTitle('Pal\'Huila - Admin');

    this.modalDataSubscription = this.modalService.modalsuichtodo$.subscribe((value) => {
      this.modalsuichtodo = value;
    });


    this.modalDataSubscription2 = this.modalService.warningAll$.subscribe((value) => {
      this.warningAll = value;
    });

    this.modalDataSubscription3 = this.modalService.modaldata$.subscribe((value) => {
      this.modaldata = value;
    });

    this.getLinkActivo();
    this.botonActivo = this.url;


  }


  ngOnDestroy() {
    if (this.modalDataSubscription) {
      this.modalDataSubscription.unsubscribe();
    }

    if (this.modalDataSubscription2) {
      this.modalDataSubscription2.unsubscribe();
    }

    if (this.modalDataSubscription3) {
      this.modalDataSubscription3.unsubscribe();
    }

  }
}

