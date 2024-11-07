import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MonthlyReviewSummary,
  Review,
  ReviewData,
} from '../../../../core/model/interfaces';
import { Chart, ChartData } from 'chart.js';

@Component({
  selector: 'app-review-bar-chart',
  templateUrl: './review-bar-chart.component.html',
  styleUrl: './review-bar-chart.component.scss',
})
export class ReviewBarChartComponent implements OnInit, AfterViewInit {
  @Input() data!: Review[];
  @ViewChild('barChart') barChartRef!: ElementRef;

  chart: any;
  selectedYear!: string;
  availableYears!: string[];
  reviewData!: ReviewData;
  months!: string[];

  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  ngOnInit(): void {
    this.reviewData = this.transformReviewsToYearlyData(this.data);
    this.availableYears = Object.keys(this.reviewData);
    // this.selectedYear = this.availableYears[0];

    //  this.chartData.datasets =
  }

  ngAfterViewInit(): void {
    debugger;
    console.log('inside After View inInit');
    this.selectedYear = this.availableYears[0];
    this.renderChart();
  }

  transformReviewsToYearlyData(reviews: Review[]): ReviewData {
    debugger;
    const result: ReviewData = {};

    // List of all months
    const allMonths = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];

    reviews.forEach((review) => {
      const reviewDate = new Date(review.reviewed_date);
      const year = reviewDate.getFullYear().toString();
      const month = reviewDate.toLocaleString('default', { month: 'short' });

      if (!result[year]) {
        result[year] = {};
        // Initialize all months for this year
        allMonths.forEach((m) => {
          result[year][m] = { positive: 0, negative: 0, neutral: 0 };
        });
      }

      if (!result[year][month]) {
        result[year][month] = { positive: 0, negative: 0, neutral: 0 };
      }

      const rating = parseInt(review.rating, 10);
      if (rating >= 4) {
        result[year][month].positive++;
      } else if (rating === 3) {
        result[year][month].neutral++;
      } else if (rating <= 2) {
        result[year][month].negative++;
      }
    });

    return result;
  }

  onYearChange(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.renderChart();
  }

  renderChart(): void {
    const monthlyData = this.reviewData[this.selectedYear];
    const months = Object.keys(monthlyData);

    const positiveCounts = months.map((month) => monthlyData[month].positive);
    const negativeCounts = months.map((month) => monthlyData[month].negative);
    const neutralCounts = months.map((month) => monthlyData[month].neutral);

    if (this.barChartRef.nativeElement)
      this.chart = new Chart(this.barChartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Positive',
              data: positiveCounts,
              backgroundColor: 'rgba(0, 255, 0, 0.3)',
              hoverBackgroundColor: 'rgba(0, 255, 0, 0.3)',  // Prevent color change on hover
              borderColor: 'rgba(0, 255, 0, 1)',
              hoverBorderColor: 'rgba(0, 255, 0, 1)'
            },
            {
              label: 'Negative',
              data: negativeCounts,
              backgroundColor: 'rgba(255, 0, 0, 0.3)',
              hoverBackgroundColor: 'rgba(255, 0, 0, 0.3)',  // Prevent color change on hover
              borderColor: 'rgba(255, 0, 0, 1)',
              hoverBorderColor: 'rgba(255, 0, 0, 1)'
            },
            {
              label: 'Neutral',
              data: neutralCounts,
              backgroundColor: 'rgba(0, 0, 255, 0.3)',
              hoverBackgroundColor: 'rgba(0, 0, 255, 0.3)',  // Prevent color change on hover
              borderColor: 'rgba(0, 0, 255, 1)',
              hoverBorderColor: 'rgba(0, 0, 255, 1)'
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
  }

  // createDatasets(months: string[]): any[] {
  //   const datasets = [];

  //   // Create dataset for positive reviews
  //   datasets.push({
  //     label: 'Positive Reviews',
  //     data: months.map(month => this.data[month]?.positive || 0), // Extract positive reviews or 0 if undefined
  //    // Adjust color as needed
  //     backgroundColor: 'rgba(0, 255, 0, 0.3)',
  //     hoverBackgroundColor: 'rgba(0, 255, 0, 0.3)',  // Prevent color change on hover
  //     borderColor: 'rgba(0, 255, 0, 1)',
  //     hoverBorderColor: 'rgba(0, 255, 0, 1)'
  //   });

  //   // Create dataset for negative reviews
  //   datasets.push({
  //     label: 'Negative Reviews',
  //     data: months.map(month => this.data[month]?.negative || 0), // Extract negative reviews or 0 if undefined
  //     backgroundColor: 'rgba(255, 0, 0, 0.3)',
  //     hoverBackgroundColor: 'rgba(255, 0, 0, 0.3)',  // Prevent color change on hover
  //     borderColor: 'rgba(255, 0, 0, 1)',
  //     hoverBorderColor: 'rgba(255, 0, 0, 1)'
  //   });

  //   // Create dataset for neutral reviews
  //   datasets.push({
  //     label: 'Neutral Reviews',
  //     data: months.map(month => this.data[month]?.neutral || 0), // Extract neutral reviews or 0 if undefined
  //     backgroundColor: 'rgba(0, 0, 255, 0.3)',
  //     hoverBackgroundColor: 'rgba(0, 0, 255, 0.3)',  // Prevent color change on hover
  //     borderColor: 'rgba(0, 0, 255, 1)',
  //     hoverBorderColor: 'rgba(0, 0, 255, 1)'
  //   });

  //   return datasets;
  // }

  // getRandomColor(): string {
  //   // Function to generate a random color in hex format
  //   const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  //   return `#${randomColor}`;
  // }

  // ngOnInit(): void {
  //   this.createChart(this.sortedReviewSummary);

  // }

  // createChart(sortedReviewSummary: MonthlyReviewSummary) {

  // }
}
