import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularMaterialModule } from '../../../utils/material.module';

@Component({
  selector: 'app-image-dialog',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './image-dialog.component.html',
  styleUrl: './image-dialog.component.scss'
})
export class ImageDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { images: string[] }
    ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
