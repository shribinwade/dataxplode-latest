import { Component, EventEmitter, HostBinding, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tab-item-header',
  templateUrl: './tab-item-header.component.html',
  styleUrl: './tab-item-header.component.scss'
})
export class TabItemHeaderComponent implements OnChanges {


  @Input('Header') Header:string='';
  @Input('UniqueCode') UniqueCode:string='';
  @Input('IsActive') IsActive: boolean = true;
  @Output() Selected: EventEmitter<string> = new EventEmitter(); 
  @Output() Close: EventEmitter<string> = new EventEmitter();

  @HostBinding('class') hostClass: string = '';
 
  @HostListener('click') onHostSelected(){
    this.Selected.emit(this.UniqueCode);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['IsActive'] != undefined){
      if(changes['IsActive'].currentValue==true){
        
            this.hostClass = "active";
      }else{
        this.hostClass = "";
      }
    } 
  }

  closeTab(event: Event){
    event.stopPropagation();
    this.Close.emit(this.UniqueCode);
  }

}
