
const bigrockBase = 'https://www.dataxplode.com/auth-api';

export const environment = {
    // Services API
    production: false,

    // Base URL
    bigrockBaseUrl: bigrockBase,

    // Auth API
    authUrl: `${bigrockBase}`,

    // Plan API
    planUrl: `${bigrockBase}/plan`,

    // Product API
    productUrl: `${bigrockBase}/productSearch`,

    // Keyword API
    keywordUrl: `${bigrockBase}/keywordSearch`,

    // Distributor API
    distributorUrl: `${bigrockBase}/distributorSearch`,

    // Competitive Strategy API
    competitiveStrategyUrl: `${bigrockBase}/competitiveSearch`,

    // Competitor Analysis API
    competitorAnalysisUrl: `${bigrockBase}/competititorAnalysisSearch`,

    // Market Search API
    marketSearchUrl: `${bigrockBase}/marketSearch`,

    // User Subscription API
    subscriptionUrl: `${bigrockBase}/subscription`,
  
    //Local endpoint 
    // apiUrl: 'https://www.dataxplode.com/dataxplode-api',
   
  };