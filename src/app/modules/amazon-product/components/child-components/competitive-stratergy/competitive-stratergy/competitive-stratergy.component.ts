import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-competitive-stratergy',
  templateUrl: './competitive-stratergy.component.html',
  styleUrl: './competitive-stratergy.component.scss'
})
export class CompetitiveStratergyComponent implements OnInit {


  activeTab:string = "CompetitorRivals";
  pageHidden:boolean = true;

  @Input('data') data:any;
   CompetitorSearchData:any;

  ngOnInit(): void {
   console.log(this.data);

   if(this.data != null||undefined){
       this.CompetitorSearchData = this.data.Search_result;
       this.pageHidden = !this.pageHidden;
   }

  }

  onTabClick(tab: string) {
    this.activeTab= tab;
  }

}
