import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BebidasPage } from './bebidas.page'; // Changed import
import { IonicModule } from '@ionic/angular'; // Added IonicModule import
import { RouterTestingModule } from '@angular/router/testing'; // Added RouterTestingModule
import { SharedModule } from '../shared/shared.module'; // Added SharedModule import

describe('BebidasPage', () => { // Changed description
    let component: BebidasPage; // Changed type
    let fixture: ComponentFixture<BebidasPage>; // Changed type

    beforeEach(async () => { // Changed to async
        await TestBed.configureTestingModule({ // Added await
            declarations: [BebidasPage], // Changed declaration
            imports: [
                IonicModule.forRoot(), // Added IonicModule.forRoot()
                RouterTestingModule, // Added RouterTestingModule
                SharedModule // Added SharedModule
            ]
        }).compileComponents(); // Added compileComponents

        fixture = TestBed.createComponent(BebidasPage); // Changed component
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
