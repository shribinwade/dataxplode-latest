import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-review-analysis-chart',
  templateUrl: './review-analysis-chart.component.html',
  styleUrl: './review-analysis-chart.component.scss'
})
export class ReviewAnalysisChartComponent implements OnInit ,AfterViewInit{

  @Input('data') data:any;
  @ViewChild('barChart') barChartRef!: ElementRef;

  constructor(){
    Chart.register(...registerables,ChartDataLabels);
  }

  ngOnInit(): void {
    // const chartdata = Object.values(this.data);
  }

  ngAfterViewInit(): void {  

    const jsondata = JSON.parse(this.data.Search_result);
    this.createChart(jsondata);
  }

  createChart(data: any[]): void {

    // Check if data is defined and is an array
    if (!Array.isArray(data) || data.length === 0) {
           console.error('Data is undefined or not an array');
           return;
       }

    const labels = data.map(item => item.perception);
    const positiveReviews = data.map(item => Math.round(item.positive_reviews.percentage));
    const negativeReviews = data.map(item => Math.round(item.negative_reviews.percentage));
    const neutralReviews = data.map(item => Math.round(item.neutral_reviews.percentage));

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Positive Reviews',
          data: positiveReviews,
          backgroundColor: 'rgba(0, 255, 0, 0.3)',
          hoverBackgroundColor: 'rgba(0, 255, 0, 0.3)',  // Prevent color change on hover
          borderColor: 'rgba(0, 255, 0, 1)',
          hoverBorderColor: 'rgba(0, 255, 0, 1)'
        },
        {
          label: 'Negative Reviews',
          data: negativeReviews,
          backgroundColor: 'rgba(255, 0, 0, 0.3)',
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.3)',  // Prevent color change on hover
          borderColor: 'rgba(255, 0, 0, 1)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)'
        },
        {
          label: 'Neutral Reviews',
          data: neutralReviews,
          backgroundColor: 'rgba(0, 0, 255, 0.3)',
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.3)',  // Prevent color change on hover
          borderColor: 'rgba(0, 0, 255, 1)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)'
        }
      ]
    };

    const options: ChartConfiguration['options'] = {
      responsive: true,
      maintainAspectRatio: true,
      indexAxis: 'y',
      scales: {
        x: { beginAtZero: true, stacked: true },
        y: { beginAtZero: true, stacked: true }
      },
      plugins: {
        legend: { display: true },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = context.raw;
              return `${label}: ${value}%`;
            }
            
          }
        },

        datalabels: {
          
          display: true,
          formatter: (value: number) => `${value}%`,
          anchor: 'center',
          align: 'center',
          font:{
            size: 8
          }
        }
       
      },
  
    };

    const config: ChartConfiguration = {
      type: 'bar' as ChartType,
      data: chartData,
      options: options
    };

    new Chart(this.barChartRef.nativeElement, config);
  }

}
