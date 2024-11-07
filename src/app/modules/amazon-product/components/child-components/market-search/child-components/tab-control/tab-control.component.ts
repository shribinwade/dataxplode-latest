import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Itab, ItabComponent } from '../../../../../../../core/model/interfaces';
import { TabService } from '../../../../../../../core/services/marketTabService/tab.service';
import { Subscription } from 'rxjs';
import { MarketTreadComponent } from '../market-tread/market-tread.component';
import { MarketLeaderComponent } from '../market-leader/market-leader.component';
import { InnovationComponent } from '../innovation/innovation.component';
import { ShowModalService } from '../../../../../../../core/services/showModalService/show-modal.service';

@Component({
  selector: 'app-tab-control',
  templateUrl: './tab-control.component.html',
  styleUrl: './tab-control.component.scss'
})
export class TabControlComponent implements OnDestroy,OnInit,OnChanges {

  @Input('data') data:any;

  tabItemSubScription: Subscription; 
  index:number = 0;
  tabs: Itab[] = []; 
  res:string="";                
  
  @ViewChild('containerRef',{read: ViewContainerRef, static: true}) containerRef!:ViewContainerRef;

  constructor(private tabService: TabService, private showModalService:ShowModalService){
   this.tabItemSubScription = tabService.tabItemObservable.subscribe({
      next:(res: string) =>{
        this.res = res;
        this.addNewTab(res);
      },
      error:(err) =>{
        console.log(err); 
      },
    });
  }
  
  ngOnChanges( changes: SimpleChanges): void {
    if(this.data!==undefined||null){
      this.tabService.addNewTab('Market Trend And News'); 
    } 
  }
  
  ngOnInit(): void {
  }

  addNewTab(code: string){
   
    let uniqueCode = code + '-'+ this.index;
    this.index++;

    this.containerRef.detach();                            //it removes the component from dom but stores the data  alternate method is clear() which clears the component with data      
    var component = this.containerRef.createComponent(this.getComponentType(code));
    component.instance.IsActive= true;   
    component.instance.data=this.data;                  //selected tab component changes css class as active
    this.containerRef.get(0);                              //Retrieves a view from this container
 
    for(let tab of this.tabs){                             //makes other component inactive
      tab.content.instance.IsActive = false;
    }
    //storing component in array
     this.tabs.unshift({                                   //unshift method shows latest created component on top 
      header: code,                                        
      uniqueCode: uniqueCode,                              //stores uniqueid for each same and different named components
      content: component,                                  //stores component data
      view: this.containerRef.get(0)!,                     // stores component view data
     });
  }

  
  getComponentType(code: string): Type<any>{              //helps us to create dynamic component and returns the Type of component
    let type: Type<any> = MarketTreadComponent;
    switch(code){
      case 'Market Trend And News':
           type =MarketTreadComponent;
           break;
      case 'Market Leader':
            type =MarketLeaderComponent;
            break;
      case 'Innovation':
           type =InnovationComponent;
           break;
    }
    return type;
  }

  selectTab(uniqueCode: string){                               
     for(let tab of this.tabs){
      if(tab.uniqueCode == uniqueCode){
        tab.content.instance.IsActive = true;
        this.containerRef.detach();
        this.containerRef.insert(tab.view);
      }else{
        tab.content.instance.IsActive = false;
      }
     }
  }

  CloseTab(uniqueCode: string) {

    let tabToClose: Itab | null = null;
    var index = -1;
    for(let i=0; i< this.tabs.length; i++){
      if(this.tabs[i].uniqueCode==uniqueCode){
        tabToClose = this.tabs[i];
        index = i;
      }
    }
    
    var component = tabToClose?.content.instance as ItabComponent;
     
    //Re-check if user want to close the component if fileds are not empty returns CanClost() as false
    if(component.CanClose()){
         var subscription= this.showModalService
          .showModal("Are you sure?")
          .subscribe({
            next:(res:string) =>{
              if(res=='yes'){
                if(tabToClose != null){
                  this.removeTab(tabToClose,index);
                }
              }
              subscription.unsubscribe();
            }
          })
            // this.removeTab(tabToClose!, index);
    }else{
      
    }
  }

  removeTab(tabToRemove: Itab, index: number){
          if(tabToRemove.content.instance.IsActive){
            //Deactivate this tab
            tabToRemove.content.instance.IsActive = false;

            //Remove from tabs and componentRef
            this.tabs.splice(index,1);
            this.containerRef.detach();

            //Make other tab active, if present.
            if(this.tabs.length>0){
              // if this was last, than it's front as active, otherwise make it's previous as active
              if(index ===this.tabs.length){
                    this.tabs[index-1].content.instance.IsActive = true;
                    this.containerRef.insert(this.tabs[index - 1].view);
              }else{
                    this.tabs[index].content.instance.IsActive = true;
                    this.containerRef.insert(this.tabs[index].view);  
              }
            }
          }else{
              //Remove from tabs
              this.tabs.splice(index,1);
              
          }
  }
    
  ngOnDestroy(): void {
     this.tabItemSubScription.unsubscribe();
  }
}
