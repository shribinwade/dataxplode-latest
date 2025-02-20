import { Component, ElementRef, ViewChild } from '@angular/core';
import { ECommerceSitesService } from '../../../../core/services/e-commerce-sites/e-commerce-sites.service';
import { CustomSnackbarService } from '../../../../core/services/snackbar-service/custom-snackbar.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../../core/services/auth-service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface UserSearchData {
  userId: number;
  searchData: SearchData;
}

export interface SearchData {
  country: string;
  platform: string;
  competitiorsAnalysisCount: number;
  competitiveStratergyCount: number;
  distributorSearchCount: number;
  keywordQueryCount: number;
  marketSearchCount: number;
  productSearchCount: number;
}

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrl: './user-report.component.scss',
})
export class UserReportComponent {
  filteredSites: Array<{ id: number; name: string; src: string }> = [];
  selectedCountry = '';
  selectedPlatform = '';
  selectedService = '';
  submitted = false;
  selectedCountrySites: any;
  ecommarcebrands: any;
  countryPlatforms: any;

  isLoading: boolean = false;

  searchResponse?: UserSearchData;

  unsubscribe$ = new Subject<void>();

  userID?:number;

  constructor(
    private ecommarcesites: ECommerceSitesService,
    private globalSnackbar: CustomSnackbarService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.ecommarcebrands = ecommarcesites.eCommerceSites;
  }

  // ViewChild elements
  @ViewChild('country') country!: ElementRef;

  onSelected(): void {
    this.selectedCountry = this.country.nativeElement.value;
    this.filterSites();
  }

  // Filter sites based on selected country
  filterSites() {
    if (this.selectedCountry) {
      //Getting Platforms based on country selection
      this.selectedCountrySites = this.ecommarcebrands.find(
        (site: any) => site.country === this.selectedCountry
      );
      this.filteredSites = this.selectedCountrySites
        ? this.selectedCountrySites.sites
        : [];
      //for City
      // this.selectedCities = this.selectedCountrySites ? this.selectedCountrySites.cities : [];
    } else {
      this.filteredSites = [];
    }
  }

  //keyword History
  keywordHistory() {
    this.router.navigate(['/dashboard/user/search-history'], {
      queryParams: { userID: this.userID, featureName: 'Keyword Search' },
    });
  }

  productHistory() {
    this.router.navigate(['/dashboard/user/search-history'], {
      queryParams: { userID: this.userID, featureName: 'Product Search' },
    });
  }
  marketHistory() {
    this.router.navigate(['/dashboard/user/search-history'], {
      queryParams: { userID: this.userID, featureName: 'Market Search' },
    });
  }
  distributorHistory() {
    this.router.navigate(['/dashboard/user/search-history'], {
      queryParams: { userID: this.userID, featureName: 'Distributor Search'},
    });
  }
  competitveHistory() {
    this.router.navigate(['/dashboard/user/search-history'], {
      queryParams: { userID: this.userID, featureName: 'competitive stratergy query'},
    });
  }
  CompetitiorHistory() {
    this.router.navigate(['/dashboard/user/search-history'], {
      queryParams: { userID: this.userID, featureName: 'Competitor Analysis Search'},
    });
  }

  onChange() {

    this.userID =  this.authService.getUserInfo()?.id;
    console.log(this.userID);
    
    const formdata = {
      UserID: this.userID,
      country: this.selectedCountry,
      platform: this.selectedPlatform,
    };

    this.authService.getUserSearchData(formdata);

    this.authService.data$
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: any) => {
          this.isLoading = false;

          this.searchResponse = res[0];
          console.log(this.searchResponse);
        },
        (error) => {
          this.isLoading = false;
          console.error('Error fetching search results:', error);
          // Handle error here if needed
        }
      );
    // this.authService.getUserSearchData(formdata).pipe(
    //       takeUntil(this.unsubscribe$),
    //       finalize(() => {
    //          this.isLoading = false
    //       })
    //     ).subscribe((res:any) => {
    //       this.isLoading = false
    //       this.searchResponse = res[0];
    //       console.log(this.searchResponse);
    //     },
    //       error => {
    //         this.isLoading = false
    //         console.error('Error fetching search results:', error);
    //         // Handle error here if needed
    //       })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
