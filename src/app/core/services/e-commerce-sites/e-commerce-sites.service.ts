import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ECommerceSitesService {

  constructor() { }


  eCommerceSites = [
    {
      country: 'India',
      sites: [
        { id: 1, name: 'Amazon', src: '/assets/amazon.png' },
        { id: 2, name: 'Flipkart', src: '/assets/logo.png' },
        { id: 3, name: 'Myntra', src: '/assets/logo.png' },
        { id: 4, name: 'TataCliq', src: '/assets/logo.png' },
        { id: 5, name: 'Croma', src: '/assets/logo.png' },
        { id: 6, name: 'RelianceDigital', src: '/assets/logo.png' },
        { id: 7, name: 'Vijay Sales', src: '/assets/logo.png' },
      ],
      cities: []
    },
    {
      country: 'United States',
      sites: [
        { id: 58, name: 'Amazon', src: '/assets/logo.png' },
        { id: 59, name: 'BigDeals', src: '/assets/logo.png' },
        { id: 60, name: 'BestBuy', src: '/assets/logo.png' },
        { id: 61, name: 'PcHub', src: '/assets/logo.png' },
        { id: 62, name: 'Newgg', src: '/assets/logo.png' },
        { id: 63, name: 'LinusTech', src: '/assets/logo.png' },
        { id: 64, name: '1Dollor', src: '/assets/logo.png' },
      ],
      cities: []
    },
    {
      country: 'Canada',
      sites: [
        { id: 8, name: 'Amazon', src: '/assets/logo.png' },
        { id: 9, name: 'Flipkart', src: '/assets/logo.png' },
        { id: 10, name: 'Flipkart', src: '/assets/logo.png' },
        { id: 11, name: 'Flipkart', src: '/assets/logo.png' },
        { id: 12, name: 'Flipkart', src: '/assets/logo.png' },
        { id: 13, name: 'Flipkart', src: '/assets/logo.png' },
        { id: 14, name: 'Flipkart', src: '/assets/logo.png' },
      ],
      cities: []
    },
    {
      country: 'United Kingdom',
      sites: [
        { id: 15, name: 'Amazon', src: '/assets/logo.png' },
        { id: 16, name: 'BigDeals', src: '/assets/logo.png' },
        { id: 17, name: 'BestBuy', src: '/assets/logo.png' },
        { id: 18, name: 'PcHub', src: '/assets/logo.png' },
        { id: 19, name: 'Newgg', src: '/assets/logo.png' },
        { id: 20, name: 'LinusTech', src: '/assets/logo.png' },
        { id: 21, name: '1Dollor', src: '/assets/logo.png' },
      ],
      cities: []
    },
    {
      country: 'Germany',
      sites: [
        { id: 22, name: 'Amazon', src: '/assets/logo.png' },
        { id: 23, name: 'Flipkart', src: '/assets/logo.png' },
        { id: 24, name: 'Flipkart', src: '/assets/logo.png' },
        { id: 25, name: 'Flipkart', src: '/assets/logo.png' },
        { id: 26, name: 'Flipkart', src: '/assets/logo.png' },
        { id: 27, name: 'Flipkart', src: '/assets/logo.png' },
        { id: 28, name: 'Flipkart', src: '/assets/logo.png' },
      ],
      cities: []
    },
    {
      country: 'France',
      sites: [
        { id: 31, name: 'Amazon', src: '/assets/logo.png' },
        { id: 32, name: 'BigDeals', src: '/assets/logo.png' },
        { id: 33, name: 'BestBuy', src: '/assets/logo.png' },
        { id: 34, name: 'PcHub', src: '/assets/logo.png' },
        { id: 35, name: 'Newgg', src: '/assets/logo.png' },
        { id: 36, name: 'LinusTech', src: '/assets/logo.png' },
        { id: 37, name: '1Dollor', src: '/assets/logo.png' },
      ],
      cities: []
    },
    {
      country: 'Italy',
      sites: [
        { id: 41, name: 'Amazon', src: '/assets/logo.png' },
        { id: 42, name: 'Flipkart', src: '/assets/logo.png' },
        { id: 43, name: 'Flipkart', src: '/assets/logo.png' },
        { id: 44, name: 'Flipkart', src: '/assets/logo.png' },
        { id: 45, name: 'Flipkart', src: '/assets/logo.png' },
        { id: 46, name: 'Flipkart', src: '/assets/logo.png' },
        { id: 47, name: 'Flipkart', src: '/assets/logo.png' },
      ],
      cities: []
    },
    {
      country: 'Saudi Arabia',
      sites: [
        { id: 51, name: 'Amazon', src: '/assets/logo.png' },
        { id: 52, name: 'BigDeals', src: '/assets/logo.png' },
        { id: 53, name: 'BestBuy', src: '/assets/logo.png' },
        { id: 54, name: 'PcHub', src: '/assets/logo.png' },
        { id: 55, name: 'Newgg', src: '/assets/logo.png' },
        { id: 56, name: 'LinusTech', src: '/assets/logo.png' },
        { id: 57, name: '1Dollor', src: '/assets/logo.png' },
      ],
      cities: [
        "Riyadh",
        "Jeddah",
        "Makkah Al Mukarramah",
        "Dammam",
        "Al Madinah Al Munawwarah",
        "Al Khobar",
        "Al Ahsa",
        "At Taif",
        "Al Jubail",
        "Tabuk",
        "Abha",
        "Khamis Mushayt",
        "Hail",
        "Yanbu",
        "Jazan"
      ]
    },
    {
      country: 'United Arab Emirates',
      sites: [
        { id: 51, name: 'Amazon', src: '/assets/logo.png' },
        { id: 52, name: 'BigDeals', src: '/assets/logo.png' },
        { id: 53, name: 'BestBuy', src: '/assets/logo.png' },
        { id: 54, name: 'PcHub', src: '/assets/logo.png' },
        { id: 55, name: 'Newgg', src: '/assets/logo.png' },
        { id: 56, name: 'LinusTech', src: '/assets/logo.png' },
        { id: 57, name: '1Dollor', src: '/assets/logo.png' },
      ],
      cities: [
        "Abu Dhabi",
        "Ajman",
        "Al Ain",
        "Dubai",
        "Fujairah",
        "Ras Al Khaimah",
        "Sharjah",
        "Umm Al Quwain",
      ]
    },
    {
      country: 'Egypt',
      sites: [
        { id: 51, name: 'Amazon', src: '/assets/logo.png' },
        { id: 52, name: 'BigDeals', src: '/assets/logo.png' },
        { id: 53, name: 'BestBuy', src: '/assets/logo.png' },
        { id: 54, name: 'PcHub', src: '/assets/logo.png' },
        { id: 55, name: 'Newgg', src: '/assets/logo.png' },
        { id: 56, name: 'LinusTech', src: '/assets/logo.png' },
        { id: 57, name: '1Dollor', src: '/assets/logo.png' },
      ],
      cities: [
        "Cairo",
        "Giza",
        "Alexandria",
        "Dakahlia",
        "Ash Sharqia",
        "Gharbia",
        "Port Said",
        "Asyut",
        "Sohag",
        "Kafr El Sheikh",
        "Menofia",
        "Damietta",
        "Suez",
        "Beheira",
        "Minya",
        "Aswan",
        "Qalyubia",
        "Ismailia",
        "Qena",
        "Red Sea"
      ]
    },
  ];

}
