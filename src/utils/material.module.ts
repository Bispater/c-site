import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule( {
    imports: [
        MatIconModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatCardModule,
    ],
    exports: [
        MatIconModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatCardModule,
    ],
    providers: [
    ]
} )

export class AngularMaterialModule { 

}