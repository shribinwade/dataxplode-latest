import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bulletpoints',
  templateUrl: './bulletpoints.component.html',
  styleUrl: './bulletpoints.component.scss'
})
export class BulletpointsComponent {
   
  bulletPoint: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data:{bullet:any},private ref: MatDialogRef<BulletpointsComponent>){
  
    const description = data.bullet;
    // this.bulletPoint = data.bullet;
    // this.bulletPoint.
    // console.log(this.bulletPoint);
    this.bulletPoint = description.trim().split('\n').map((item:any) => item.trim());
    
  }


  closepopup(){
    this.ref.close()
  }
}
