import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularMaterialModule } from '../../../utils/material.module';

@Component({
  selector: 'app-image-dialog',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './image-dialog.component.html',
  styleUrl: './image-dialog.component.scss',
})
export class ImageDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  currentIndex = 0;
  currentImage: string;
  startX = 0;
  endX = 0;

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { images: string[] }
  ) {
    this.currentImage = this.data.images[this.currentIndex];
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const imgElement = document.getElementById('carousel-image');

    if (imgElement) {
      imgElement.addEventListener('touchstart', this.onTouchStart.bind(this));
      imgElement.addEventListener('touchend', this.onTouchEnd.bind(this));
    }
  }

  ngOnDestroy(): void {
    const imgElement = document.getElementById('carousel-image');

    if (imgElement) {
      imgElement.removeEventListener(
        'touchstart',
        this.onTouchStart.bind(this)
      );
      imgElement.removeEventListener('touchend', this.onTouchEnd.bind(this));
    }
  }

  onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.endX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }

  handleSwipe(): void {
    const deltaX = this.startX - this.endX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        this.nextImage();
      } else {
        this.previousImage();
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  previousImage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.data.images.length - 1;
    }
    this.currentImage = this.data.images[this.currentIndex];
  }

  nextImage(): void {
    if (this.currentIndex < this.data.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.currentImage = this.data.images[this.currentIndex];
  }
}
