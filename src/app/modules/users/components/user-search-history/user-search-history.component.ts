import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service/auth.service';
import { finalize, Subject, takeUntil } from 'rxjs';

export interface userSearchHistory {
  id: String;
  keywordQuery: String;
  competitiveStratergyQuery: String;
  marketSearchQuery: String;
  createdAt: String;
  countryName: String;
  featureName: String;
  platformName: String;
}

@Component({
  selector: 'app-user-search-history',
  templateUrl: './user-search-history.component.html',
  styleUrl: './user-search-history.component.scss',
})
export class UserSearchHistoryComponent implements OnInit {



  dataSource = new MatTableDataSource<userSearchHistory>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading$ = this.authService.loading$;
  private unsubscribe$ = new Subject<void>();


  isLoading: boolean=false;
 
  displayedColumns: string[] = [
    'index',
    'keywordQuery',
    'createdAt',
    'country',
    'featureName',
    'platformName',
  ];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  userID?: String;
  featureName?: String;
  tableSize:number= 0;

  ngOnInit() {
       
    this.route.queryParams.subscribe((params) => {
      this.userID = params['userID'];
      this.featureName = params['featureName'];
    });

      this.ApiCall();
  }

  ApiCall(){
    const data = {
      userID: this.userID,
      featureName: this.featureName,
    };

    this.authService.getuserfeaturehistorySubject(data);
 
    this.authService.userfeaturehistorySubject$.pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => {
             this.authService.loadingSubject.next(false);
        })
      )
      .subscribe(
        (res: userSearchHistory[]) => {

          this.isLoading=false;
          this.dataSource.data= res;
          
          if(res.length!=0 || null){
            this.tableSize = res.length;
          }
          // this.pageSlice = this.userSearchedData.slice(0, this.pageSize || 10); // Default page size to 10 if undefined
          // this.dataSource.data = this.pageSlice; // ✅ Ensure MatTableDataSource is updated
        },
        (error) => {
          this.isLoading = false;
          console.error('Error fetching search results:', error);
          // Handle error here if needed
        }
      );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getPageIndex(): number {
    return this.paginator ? this.paginator.pageIndex : 0;
  }

  getPageSize(): number {
    return this.paginator ? this.paginator.pageSize : 10;
  }

  ngOnDestroy(): void { 
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
