import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth-service/auth.service';
import { RetriveDBDataURLService } from '../../services/RetriveDataFromDBService/retrive-dbdata-url.service';



@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  


  apiurl: string = environment.apiUrl;
  authurl: string = environment.authUrl;                 
  // awsurl: string = environment.awsUrl;

  //store the response object
  cacheMap = new Map<string, HttpResponse<any>>();

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private retriveDbData: RetriveDBDataURLService
  ) {
    // Load cache from localStorage if it exists
    const storedCache = localStorage.getItem('httpCache');
    if (storedCache) {
      const parsedCache = JSON.parse(storedCache);
      for (const key of Object.keys(parsedCache)) {
        this.cacheMap.set(key, new HttpResponse({ body: parsedCache[key].body }));
      }
    }
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Check if the request is cacheable
    debugger
    if (!this.isRequestCachable(request)) {
      return next.handle(request);
    } else {
      //request is cacheable
      const cacheKey = this.getCacheKey(request);
      const url = request.url;

      // If the req is cached
      if (this.cacheMap.has(cacheKey)) {
        console.log('Serving from cache:', cacheKey);
        return of(this.cacheMap.get(cacheKey) as HttpResponse<any>)
      } else {
        //chcek data base Endpoint
        // Check database endpoint
        return this.checkDatabaseEndpoint(request).pipe(
          switchMap(dbData => {
            debugger
            if (dbData) {
            
              const dbResponse = new HttpResponse({ body: dbData, status: 200 });
              console.log('Serving from database endpoint:', );
              this.cacheMap.set(cacheKey, dbResponse);
              return of(dbResponse);
            } else {
              // Proceed with the request
              return next.handle(request).pipe(
                tap(event => {
                  if (event instanceof HttpResponse) {
                    this.cacheMap.set(cacheKey, event);

                    if (this.isRequestStorable(request)) {
                      try {
                        localStorage.setItem('httpCache', JSON.stringify(Object.fromEntries(this.cacheMap)));
                      } catch (e: any) {
                        if (e.name === 'QuotaExceededError') {
                          console.error('LocalStorage quota exceeded');
                        }
                      }
                    }
                  }
                })
              );
            }
          }),
          catchError(err => {
            console.error('Database check failed:', err);
            return next.handle(request); // Proceed with the request if the DB check fails
          })
        );
      }
    }
  }



  private checkDatabaseEndpoint(request: HttpRequest<any>): Observable<HttpResponse<any> | null> {
    // Extract parameters dynamically from the original request
    //extract form data parameter
    debugger
    const userId = this.authService.getUserInfo()?.id;
    const formData: FormData = request.body as FormData;
    const searchQuery = formData.get('query1') as string;
    const countryQuery = formData.get('query2') as string;

    const userID = userId || '';
    const country = countryQuery || '';
    const keyword = searchQuery || '';

    // Construct the dynamic URL
    const dbEndpointUrl: string = this.retriveDbData.getDBURL(request);
    console.log(dbEndpointUrl);


    // const dbEndpointUrl = `http://localhost:8081/keywordSearch/getKeywordData?UserID=${userID}&country=${country}&keyword=${keyword}`;

    return this.authService.getDBData(dbEndpointUrl).pipe(
      tap(response => {
        console.log('Final Response from DB:', response); // Debugging step
      }),
      catchError(error => {
        console.error('Error fetching data from DB:', error); // Log errors
        return of(null); // Return `null` in case of an error
      })
    );
    // Make the GET request to the database endpoint
       
  }

  isRequestStorable(req: HttpRequest<any>) {
    //the request must be POST method and match the specific URL
    if (req.method === 'POST') {
      //define all the cache partial URL
      const storeUrls = [
      `${this.apiurl}/get_CompetitorAnalyzer`,
      `${this.apiurl}/get_amazon_info_reviews`,
      `${this.apiurl}/get_amazon_keyword_details`,
      `${this.apiurl}/get_brand_details`,
      `${this.apiurl}/get_search_brand_details`,
      `${this.apiurl}/get_data_IP`,
      `${this.apiurl}/get_amazon_info_details`,
      `${this.apiurl}/get_supplier`,
      `${this.apiurl}/get_swot_analyzer`,
      `${this.apiurl}/get_porterforces`,
      `${this.apiurl}/get_reviewAnalyzer`,
      `${this.authurl}/keywordSearch/getKeywordData`
        //aws urls
        //  `${this.awsurl}/get_CompetitorAnalyzer`,
        //  `${this.awsurl}/get_amazon_info_reviews`,
        //  `${this.awsurl}/get_amazon_keyword_details`,
        //  `${this.awsurl}/get_brand_details`,
        //  `${this.awsurl}/get_search_brand_details`,
        //  `${this.awsurl}/get_data_IP`,
        //  `${this.awsurl}/get_amazon_info_details`,
      ];
      //get the request URL
      for (let i = 0; i < storeUrls.length; i++) {
        if (req.url.includes(storeUrls[i])) {
          return true;
        }
      }
    }
    return false;
  }

  isRequestCachable(req: HttpRequest<any>): boolean {

    //the request must be POST method and match the specific URL
    if (req.method === 'POST') {
      //define all the cache partial URL
      const cacheableUrls = [`${this.apiurl}/get_amazon_keyword_details`,
      `${this.apiurl}/get_amazon_info_reviews`,
      `${this.apiurl}/get_brand_details`,
      `${this.apiurl}/get_CompetitorAnalyzer`,
      `${this.apiurl}/get_amazon_keyword_details`,
      `${this.apiurl}/get_search_brand_details`,
      `${this.apiurl}/get_data_IP`,
      `${this.apiurl}/get_amazon_info_details`,
      `${this.apiurl}/get_supplier`,
      `${this.apiurl}/get_swot_analyzer`,
      `${this.apiurl}/get_porterforces`,
      `${this.apiurl}/get_reviewAnalyzer`,
      `${this.authurl}/keywordSearch/getKeywordData`
        //aws
        //  `${this.awsurl}/get_CompetitorAnalyzer`,
        //  `${this.awsurl}/get_amazon_info_reviews`,
        //  `${this.awsurl}/get_amazon_keyword_details`,
        //  `${this.awsurl}/get_brand_details`,
        //  `${this.awsurl}/get_search_brand_details`,
        //  `${this.awsurl}/get_data_IP`,
        //  `${this.awsurl}/get_amazon_info_details`,
        //  `${this.awsurl}/get_amazon_info_details`,
        //  `${this.awsurl}/get_supplier`,
        //  `${this.awsurl}/get_swot_analyzer`,
        //  `${this.awsurl}/get_porterforces`,
      ]
      //get the request URL
      for (let i = 0; i < cacheableUrls.length; i++) {
        if (req.url.includes(cacheableUrls[i])) {
          return true;
        }
      }
    }
    return false;
  }

  getCacheKey(req: HttpRequest<any>): string {
    //extract form data parameter
    const formData: FormData = req.body as FormData;
    const query1 = formData.get('query1') as string;
    const query2 = formData.get('query2') as string;
    //use the URL and form data parameter as the cache key
    return `${req.url}?query1=${query1}?query2=${query2}`;
  }
}
