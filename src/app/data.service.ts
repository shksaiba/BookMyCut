import { Injectable } from '@angular/core';

export interface Style { id: number; name: string; cat: string; type: string; price: number; min: number; rating: number; salons: number; length?: string; shape: string[]; color: string; }
export interface Salon { id: number; name: string; km: number; kind: string; rating: number; open: string; services: string; slot: string; }

@Injectable({ providedIn: 'root' })
export class DataService {
  styles: Style[] = [
    { id: 1, name: 'Skin fade', cat: 'Men', type: 'Haircut', price: 350, min: 40, rating: 4.8, salons: 18, length: 'Short', shape: ['Oval', 'Square'], color: '#E4DDF5' },
    { id: 2, name: 'Textured crop', cat: 'Men', type: 'Haircut', price: 300, min: 30, rating: 4.7, salons: 22, length: 'Short', shape: ['Oval', 'Round'], color: '#DCE2EE' },
    { id: 3, name: 'Classic taper', cat: 'Men', type: 'Haircut', price: 300, min: 30, rating: 4.7, salons: 25, length: 'Short', shape: ['Oval', 'Heart'], color: '#E8E0DA' },
    { id: 4, name: 'Quiff', cat: 'Men', type: 'Haircut', price: 400, min: 40, rating: 4.6, salons: 11, length: 'Medium', shape: ['Oval', 'Round'], color: '#DCE9E4' },
    { id: 5, name: 'Beard sculpt', cat: 'Men', type: 'Beard', price: 200, min: 20, rating: 4.6, salons: 30, shape: ['Round', 'Square'], color: '#EBDDE6' },
    { id: 6, name: 'Burgundy color', cat: 'Men', type: 'Color', price: 1800, min: 90, rating: 4.5, salons: 9, shape: ['Oval'], color: '#E2E5D3' },
    { id: 7, name: 'Layered cut', cat: 'Women', type: 'Haircut', price: 700, min: 60, rating: 4.8, salons: 20, length: 'Long', shape: ['Oval', 'Heart'], color: '#E4DDF5' },
    { id: 8, name: 'Balayage', cat: 'Women', type: 'Color', price: 3500, min: 150, rating: 4.7, salons: 14, length: 'Long', shape: ['Oval', 'Round'], color: '#EBDDE6' },
    { id: 9, name: 'Kids trim', cat: 'Boys', type: 'Haircut', price: 150, min: 20, rating: 4.9, salons: 17, length: 'Short', shape: ['Oval'], color: '#DCE9E4' },
    { id: 10, name: 'Princess trim', cat: 'Girls', type: 'Haircut', price: 250, min: 30, rating: 4.9, salons: 12, length: 'Medium', shape: ['Oval'], color: '#E8E0DA' },
  ];
  salons: Salon[] = [
    { id: 1, name: 'Studio Nine', km: 1.2, kind: 'Unisex', rating: 4.8, open: 'open until 9 PM', services: 'Skin fade, Balayage, Kids cuts', slot: '6:30 PM' },
    { id: 2, name: 'The Cut Room', km: 2.0, kind: 'Men', rating: 4.6, open: 'open until 10 PM', services: 'Fade, Beard sculpt, Color', slot: '7:00 PM' },
    { id: 3, name: 'Glam Lounge', km: 2.7, kind: 'Women and kids', rating: 4.7, open: '', services: 'Layered cut, Keratin, Bridal', slot: 'tomorrow 10:00 AM' },
    { id: 4, name: 'Little Snips', km: 3.4, kind: 'Boys and girls', rating: 4.9, open: '', services: 'First haircut, School cut', slot: '5:45 PM' },
  ];
}
