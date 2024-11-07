import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BulletpointsComponent } from '../bulletpoints/bulletpoints.component';

@Component({
  selector: 'app-important-info',
  templateUrl: './important-info.component.html',
  styleUrl: './important-info.component.scss'
})
export class ImportantInfoComponent {

  impinfo: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data:{impinfo:any},private ref: MatDialogRef<ImportantInfoComponent>){
  
    const description = data.impinfo;
    // this.bulletPoint = data.bullet;
    // this.bulletPoint.
    // console.log(this.bulletPoint);
    this.impinfo = description.trim().split('\n').map((item:any) => item.trim());
    console.log(description);
    
    
  }

  closepopup(){
    this.ref.close()
  }


}
