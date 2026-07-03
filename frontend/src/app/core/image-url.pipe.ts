import { Pipe, PipeTransform } from '@angular/core';
import { API_ORIGIN } from './api.config';

@Pipe({ name: 'imageUrl', standalone: true })
export class ImageUrlPipe implements PipeTransform {
  transform(value?: string): string {
    if (!value) {
      return '/assets/product-placeholder.svg';
    }
    if (value.startsWith('http') || value.startsWith('/assets')) {
      return value;
    }
    return `${API_ORIGIN}${value}`;
  }
}
