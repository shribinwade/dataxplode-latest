import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service/auth.service';

export type MenuItem = {
  icon: string;
  label: string;
  route?:string;
  subItems?: MenuItem[];
}


@Component({
  selector: 'app-custom-sidenav',
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss'
})
export class CustomSidenavComponent implements OnInit, OnChanges{
  
  // menuItems : MenuItem[] = [
  //   {icon: 'dashboard',
  //     label: 'Dashboard',
  //     route: 'dashboard',
      
  //   },
  //   {
  //    icon: 'home',
  //    label: 'Home',
  //    route: 'home'
  //   },
  //   {
  //     icon: 'video_library',
  //     label: 'Content',
  //     route: 'content',
  //     subItems: [
  //       {
  //         icon: 'play_circle',
  //         label: 'Videos',
  //         route: 'videos'
  //       },
  //       {
  //         icon: 'play_circle',
  //         label: 'Videos',
  //         route: 'sdd'
  //       },
  //       {
  //         icon: 'play_circle',
  //         label: 'Videos',
  //         route: 'asdd'
  //       }
  //     ]
  //   }

  // ];

  constructor( private authService:AuthService ){

  }

  profilePicSize!: number;

  @Input() customStyles!: { [key: string]: any };
  isAdmin!: boolean;
  role: string | undefined;
  userName: string | undefined;
  menuItems: MenuItem[] = [];


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customStyles']) {
      const width = this.customStyles?.['width.px'];
      this.profilePicSize = width === 65 ? 32 : 60; // Set image size based on customStyles width
    }
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.getUserInfo()?.role ==='admin';
    console.log(this.isAdmin);
    this.userName = this.authService.getUserInfo()?.name;
    console.log(this.userName);
    this.role = this.authService.getUserInfo()?.role;

    if (this.isAdmin) {
      this.menuItems = this.getAdminMenuItems();
    } else {
      this.menuItems = this.getUserMenuItems();
    }
    
  }

  getAdminMenuItems() {
    return [
      { label: 'Dashboard', route: 'admin/home', icon: 'dashboard' },
      { label: 'Analysis Tool', 
        route: 'admin/analysis-tool',
        icon: 'construction',
        subItems: [
          {
           icon: 'analytics',
           label: 'Market Intelligence',
           route: 'admin/analysis-toolmarket-intelligence'
          }
         ]
      },
      { label: 'Settings', route: '/admin/settings', icon: 'settings' },
    ];
  }

  getUserMenuItems() {
    return [
      { label: 'Dashboard', route: 'user/home', icon: 'dashboard' },
      { label: 'Analysis Tool', 
        // route: 'user/analysis-tool',
        icon: 'construction',
        subItems: [
         {
          icon: 'analytics',
          label: 'Market Intelligence',
          route: 'user/analysis-tool/market-intelligence'
         },
         {
           icon: 'data_exploration',
           label: 'automation-management',
           route: 'user/automation-management'
         }
        ]
      },
      { label: 'Profile', route: '/user/profile', icon: 'person' },
    ];
  }
  


  

   
}
