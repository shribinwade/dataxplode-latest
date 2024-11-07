import { ComponentRef, ViewRef } from "@angular/core";

export interface Itab{
    header: string;
    uniqueCode:string;
    content: ComponentRef<any>
    view: ViewRef;

}

export interface ItabComponent{
    IsActive:boolean;
    CanClose(): boolean;
}


export interface marketSearch {
    Brand_list: brandData[];
    definition: any;
    market_cagr: marketcagr[];
    market_trend_list: any;
}

//Market treand and News
export interface brandData{
    Brand:string;
    Company:string;
    Segment:string;
    market_share:string;
    Market_Growth_Rate:string;
    bcg_value:string;
}

export interface Brand {
    index: number;
    brand: string;
    company: string;
    segment:string;
    marketShare:string;
    MarketGrouthRate:string;
    bcgValue:string;
}  
 
export interface marketcagr{
    Compound_Annual_Growth_Rate_(CAGR: any):string;
    Market_Size_2022:string;
    Market_Size_2023:string;
    Market_Size_2032:string;
}

//News search
export interface brandResult{
    Search_result:any;
    news:any;
}
export interface newsdata{
    descr:string;
    title:string;
    url:string;
}



//Patent Data Search
export interface patentdata {
    status: string;
    message: string;
    data: Data;
}
  
export  interface Data {
    index: IndexItem[];
    result: Result;
}
  
export interface IndexItem {
    id: string;
    name: string;
}
  
export interface Result {
    [key: string]: value[]; // The values are arrays. Adjust the type of elements if you have specific types.
}
  
export interface value{
    patent_number:any;
    applicant:any;
}


//Distributor Search 
export interface treadSupplier{
  Supplier_list:Supplier_list[];
  Page_no: number;
}

export interface Supplier_list {
  Address: string;
  business_type:string;
  catalog_url:string;
  co_name:string;
  default_email:string;
  default_mobile:string;
}  



//Competitor Stratergy 

export interface Root {
    competitor_rivials: CompetitorRivial[]
    portential_entrant: string[]
    Buyer_power: BuyerPower[]
}
  
export interface CompetitorRivial {
    Industry_Growth?: string
    definition: string
    Fixed_Cost?: string
    Exit_Barriers?: string[]
}
  
export interface BuyerPower {
    switch_Cost?: string
    definition: string
    price_sensitivity?: string
    purchase_size?: string[]
}

//new Entrants tab

export interface newEntrants {
    difficulties: Difficulty[]
    opportunities: Opportunity[]
  }
  
  export interface Difficulty {
    point: string
    details: string[]
  }
  
  export interface Opportunity {
    point: string
    details: string[]
  }

  //
  export interface Features {
    feature: string;
  }


  export interface Review {
    reviewTitle: string;
    reviewDetail: string;
    rating: string;
    reviewed_by_name: string;
    reviewed_date: Date;
    verfied_purchase: boolean;
    category: string;
  }
  
  export interface ReviewData {
    [year: string]: YearlyReviewData;
  }
  
  export interface YearlyReviewData {
    [month: string]: MonthlyReviewSummary;
  }

  export interface MonthlyReviewSummary {
    positive: number;
    negative: number;
    neutral: number;
  }
  
  
  



