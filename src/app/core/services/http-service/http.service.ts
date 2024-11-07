import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HTTPService {

  constructor(private httpClient:HttpClient) { }

  // Method Overloading (Signatures)
  // post(endpoint: string, data: any): Observable<any>;
  post(endpoint: string, data: any): Observable<any>;
  
  // Single method implementation                       
  post(endpoint: string, data: any): Observable<any> {  
    debugger                  //in query2 paramater added ? to make optional parameter 
    const formData = new FormData();

  

    const query1 = 
    data.productSearchQuery !== null && data.productSearchQuery !== undefined && data.productSearchQuery !== ""
    ? data.productSearchQuery
    : data.keywordSearchQuery !== null && data.keywordSearchQuery !== undefined && data.keywordSearchQuery !== ""
    ? data.keywordSearchQuery
    : data.marketSearchQuery !== null && data.marketSearchQuery !== undefined && data.marketSearchQuery !== ""
    ? data.marketSearchQuery
    : data.patentNumber !== null && data.patentNumber !== undefined && data.patentNumber !== ""
    ? data.patentNumber
    : data.distributorSearchQuery !== null && data.distributorSearchQuery !== undefined && data.distributorSearchQuery !== ""
    ? data.distributorSearchQuery
    : data.competitiveSearchQuery !== null && data.competitiveSearchQuery !== undefined && data.competitiveSearchQuery !== ""
    ? data.competitiveSearchQuery
    // : data.CompetitorAnalysisKeyword !== null && data.CompetitorAnalysisKeyword !== undefined && data.CompetitorAnalysisKeyword !== ""
    // ? data.CompetitorAnalysisKeyword
    :"no value for query1"  // This message will appear if all are empty, null, or undefined


    const query2 = data.country !== null && data.country !== undefined && data.country !== "" ? data.country: 
                   data.title !== null && data.title !== undefined && data.title !== ""? data.title:"";

    
    formData.append('query1', query1);

    if(query2!=undefined||null){
      formData.append('query2', query2);
    }
    
    data.pincode !== null && data.pincode !== undefined ? formData.append('query3', data.pincode): null;
    
    const query4 = data.keyword;
    
    if(data.keyword !=null){
      formData.append('query4',query4)
    }


    //for competitor-analysis
    const competitoranalysisformdata  = new FormData();

    if(data.CompetitorAnalysisKeyword){
      competitoranalysisformdata.append('query1', data.CompetitorAnalysisKeyword);
    }
    if(data.CompetitorAnalysisBrand){
      competitoranalysisformdata.append('query2', data.CompetitorAnalysisBrand);
    }
    if(data.CompetitorAnalysisFeatures){
      competitoranalysisformdata.append('query3', data.CompetitorAnalysisFeatures);
    }
    if(data.CompetitorAnalysisCountry){
      competitoranalysisformdata.append('query4', data.CompetitorAnalysisCountry);
    }


    //swot-analysis
    const swotAnalysisFormdata = new FormData();
     debugger
    if(data.product_owned){
      swotAnalysisFormdata.append('query1',data.product_owned);
      swotAnalysisFormdata.append('query2',data.competitor_product);
    }

    
    // Loop over all formData entries and log them
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    //review analysis chart
    if(data.chartData){
      const reviewAnalysisForm  = new FormData();
      reviewAnalysisForm.append('query1',data.chartData);

      return this.httpClient.post<any>(endpoint, reviewAnalysisForm);
    }

    if(data.CompetitorAnalysisKeyword){
      return this.httpClient.post<any>(endpoint, competitoranalysisformdata);
    }
    else if(data.product_owned){
      return this.httpClient.post<any>(endpoint, swotAnalysisFormdata);
    }
    else{
      return this.httpClient.post<any>(endpoint, formData);
    }
  }

}
