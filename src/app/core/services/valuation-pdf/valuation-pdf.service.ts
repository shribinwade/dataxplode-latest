import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { autoTable } from 'jspdf-autotable';

interface jsPDFCustom extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}

@Injectable({
  providedIn: 'root',
})
export class ValuationPDFService {
  constructor() {}

  generatePdf(data: any): void {
    console.log(data);

    const doc = new jsPDF('portrait', 'px', 'a4') as jsPDFCustom;

    // Add a title
    doc.setFontSize(16);
    const pageWidth = doc.internal.pageSize.getWidth();
    const title = 'Valuation Report';
    const titleWidth = doc.getTextWidth(title);
    const titleXPosition = (pageWidth - titleWidth) / 2;
    doc.text(title, titleXPosition, 20);

    //Competitve Startup
    const startupData = data.StartupsMethod.rows.map((row: any) => [
      row.startup,
      row.valuation,
      row.funds,
      row.location,
    ]);
    // startupData.push(['Average', data.StartupsMethod.average, '', '']);
    // startupData.push(['Pessimistic', data.StartupsMethod.pessimistic, '', '']);

    doc.setFontSize(12);
    doc.text('Competitve Startup', 10, 40);
    const startupTable = doc.autoTable({
      head: [['Startup', 'Valuation', 'Funds Raised', 'Location']],
      body: startupData,
      startY: 50, // Adjust to leave margin after the heading
      theme: 'striped',
      foot:[['Average', data.StartupsMethod.average, '', ''],['Pessimistic', data.StartupsMethod.pessimistic, '', '']],

    });





    // Add Paynescore Method data
    const paynescoreData = data.PaynescoreMethod.rows.map((row: any) => [
      row.parameter,
      row.value,
      row.adjustment,
      row.result,
    ]);

    // paynescoreData.push(['Average', '', '', data.PaynescoreMethod.average]);
    // paynescoreData.push(['Valuation', data.PaynescoreMethod.valuation, '', '']);

    doc.setFontSize(12);
    const paynescoreStartY = (startupTable as any).lastAutoTable.finalY + 20; // Start below the previous table
    doc.text('Paynescore Method', 10, paynescoreStartY);
    const paynescoreTable = doc.autoTable({
      head: [['Parameter', 'Weight', 'Assumption Startup', 'Factor']],
      body: paynescoreData,
      startY: paynescoreStartY + 10, // Adjust to leave margin after the heading
      theme: 'striped',
      foot:[['Average','','',data.PaynescoreMethod.average],['Valuation',data.PaynescoreMethod.valuation],],
    });





    // Add Berkus Method data
    const berkusData = data.BerkusMethod.rows.map((row: any) => [
      row.parameter,
      row.value,
      row.adjustment,
      row.result,
    ]);

    // berkusData.push(['Average', '', '', data.BerkusMethod.average]);

    doc.setFontSize(12);
    const berkusStartY = (paynescoreTable as any).lastAutoTable.finalY + 20; // Start below the previous table
    doc.text('Berkus Method', 10, berkusStartY);
    const berkusTable = doc.autoTable({
      head: [['Parameter', 'Value', 'Adjustment', 'Result']],
      body: berkusData,
      startY: berkusStartY + 10, // Adjust to leave margin after the heading
      theme: 'striped',
      foot:[['Average',data.BerkusMethod.average]],

    });




    //Risk Summation Method
    const RiskSummationData = data.RiskSummationFactorMethod.rows.map(
      (row: any) => [row.parameter, row.value, row.ms]
    );

    // RiskSummationData.push([
    //   'Average',
    //   data.RiskSummationFactorMethod.avarageRating,
    //   data.RiskSummationFactorMethod.avarageM,
    // ]);

    doc.setFontSize(12);
   
    // Move to the next page before adding the Risk Summation content
    doc.addPage(); // Add a new page
    const RiskSummationY = 30; // Start below the previous table
    doc.text('Risk Summation', 10, 30);
    const riskSummationTable = doc.autoTable({
      head: [['Risk Factors', 'Ratings', 'M']],
      body: RiskSummationData,
      startY: RiskSummationY + 10, // Adjust to leave margin after the heading
      theme: 'striped',
      foot:[['Average',data.RiskSummationFactorMethod.avarageRating,data.RiskSummationFactorMethod.avarageM]],
    });



    //Discount cash flow
   const discountData = data.DiscountedCashFlow.rows.map((row: any) => [
      row.year,
      row.calender,
      row.income,
      row.expense,
      row.assets,
      row.liability,
      row.profit,
      row.clients,
      row.unitRate,
      row.clientLocation
    ]);

    // berkusData.push(['Average', '', '', data.BerkusMethod.average]);

    doc.setFontSize(12);
    const discountStartY = (riskSummationTable as any).lastAutoTable.finalY + 20; // Start below the previous table
    doc.text('Discount cash flow', 10, discountStartY);
    const discountTables = doc.autoTable({
      head: [['Year', 'Calender Peroid', 'Income', 'Expense','Assets','Liability','Net Profit','No of Clients','Unit Rate','Client Location']],
      body: discountData,
      startY: discountStartY + 10, // Adjust to leave margin after the heading
      theme: 'striped',
      foot:[['Average','','',data.DiscountedCashFlow.averageIncome,data.DiscountedCashFlow.averageExpense,data.DiscountedCashFlow.averageAssets,data.DiscountedCashFlow.averageLiability,data.DiscountedCashFlow.averageNetprofit,data.DiscountedCashFlow.averageNoOfClients]],

    });




    //Venture capital Method

    const ventureCapitalData = data.VentureCapitalMethod.rows.map((row: any) => [
      row.parameter,
      row.ms,
    ]);

    // berkusData.push(['Average', '', '', data.BerkusMethod.average]);

    doc.setFontSize(12);
    const ventureStartY = (discountTables as any).lastAutoTable.finalY + 20; // Start below the previous table
    doc.text('Venture capital', 10, ventureStartY);
    const VentureCapitalTable = doc.autoTable({
      head: [['', 'M',]],
      body: ventureCapitalData,
      startY: ventureStartY + 10, // Adjust to leave margin after the heading
      theme: 'striped',
      foot:[['Pre-Money Valuation before adjusting',data.VentureCapitalMethod.preMoney],['Pre-Money Valuation After adjusting',data.VentureCapitalMethod.postMoney]]
    });





    //Earning multiplier Method
    const earningMultiplierData = data.EarningMultiplierMethod.rows.map((row: any) => [
      row.parameter,
      row.ms,
    ]);

    // berkusData.push(['Average', '', '', data.BerkusMethod.average]);

    doc.setFontSize(12);
    doc.addPage();
    const earningMultiY = 30 // Start below the previous table
    doc.text('Earning multiplier', 10, 30);
    const earningMutltiTable = doc.autoTable({
      head: [['', 'M',]],
      body: earningMultiplierData,
      startY: earningMultiY + 10, // Adjust to leave margin after the heading
      theme: 'striped',
      foot:[['Value of the Startup',data.EarningMultiplierMethod.average]]
    });

    // Summarized Valuation


    const SummarizedData = data.SummarizedValuation.rows.map((row: any) => [
      row.parameter,
      row.ms,
    ]);

    // berkusData.push(['Average', '', '', data.BerkusMethod.average]);

    doc.setFontSize(12);
    const summarizedY = (earningMutltiTable as any).lastAutoTable.finalY + 20; // Start below the previous table
    doc.text('Summarized methods', 10, summarizedY);
    const summarizedTable = doc.autoTable({
      head: [['', 'M',]],
      body: SummarizedData,
      startY: summarizedY + 10, // Adjust to leave margin after the heading
      theme: 'striped',
    });


    // Save the PDF
    doc.save('valuation.pdf');
  }
}
