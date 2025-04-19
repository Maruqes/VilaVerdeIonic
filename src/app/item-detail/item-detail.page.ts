import { Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { DataService, Item } from '../services/data.service'; // Import DataService and Item interface
import { Observable } from 'rxjs'; // Import Observable
import { register } from 'swiper/element/bundle';

// Registra os componentes do Swiper
register();

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
  standalone: false
})
export class ItemDetailPage implements OnInit {

  item$: Observable<Item | undefined> | undefined; // Observable to hold item data

  // Propriedades para o modal de fotos
  isPhotoModalOpen = false;
  currentPhotos: string[] = [];
  currentPhotoIndex = 0;
  slideOptions = {
    initialSlide: 0,
    speed: 400,
    zoom: true
  };

  @ViewChild('photoSlides') photoSlides?: ElementRef;
  private swiperElement: any;

  constructor(
    private route: ActivatedRoute, // Inject ActivatedRoute
    private dataService: DataService, // Inject DataService
    private ngZone: NgZone // Inject NgZone para atualizar a UI
  ) { }

  ngOnInit() {
    // Get the ID from the route parameters
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const itemId = +idParam; // Convert string ID to number
      this.item$ = this.dataService.getItemById(itemId); // Fetch item data
    } else {
      // Handle the case where ID is not present or invalid, maybe redirect or show an error
      console.error('Item ID not found in route parameters');
    }
  }

  // Método para abrir o modal de fotos
  openPhotoModal(index: number, photos: string[] = []) {
    if (photos && photos.length > 0) {
      this.currentPhotos = photos;
      this.currentPhotoIndex = index;
      this.slideOptions = {
        ...this.slideOptions,
        initialSlide: index
      };
      this.isPhotoModalOpen = true;

      // Configura o Swiper após o modal ser aberto
      setTimeout(() => {
        this.swiperElement = this.photoSlides?.nativeElement;
        if (this.swiperElement) {
          // Configura o evento de mudança de slide
          this.swiperElement.swiper.on('slideChange', () => {
            // Usar NgZone para garantir que a mudança seja detectada pelo Angular
            this.ngZone.run(() => {
              this.currentPhotoIndex = this.swiperElement.swiper.activeIndex;
            });
          });

          // Vai para o slide inicial
          this.swiperElement.swiper.slideTo(index);
        }
      }, 300);
    }
  }

  // Método para fechar o modal de fotos
  closePhotoModal() {
    this.isPhotoModalOpen = false;
  }

  // Método para fechar o modal ao clicar fora da foto
  onBackdropClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('swipe-container') || target.classList.contains('modal-content')) {
      this.closePhotoModal();
    }
  }
}
