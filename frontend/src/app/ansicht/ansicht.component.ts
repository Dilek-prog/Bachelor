import { Component, OnInit } from '@angular/core';
//import { BackendService } from '../shared/service';
//import { Ansicht } from '../shared/ansicht';
import { Router } from '@angular/router';
//import { AuthService } from '../shared/auth.service';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-ansicht',
  templateUrl: './ansicht.component.html',
  styleUrls: ['./ansicht.component.css']
})
export class AnsichtComponent implements OnInit {
  ansichts!: Ansicht[];
  deleted = false;

  constructor(private bs: BackendService, private router: Router, private auth: AuthService, private location: Location) { }

  ngOnInit(): void {
    this.readAll();
  }

  readAll():void{
    this.bs.getAll().subscribe(
      (
        response: Ansicht[]) => {
                this.ansichts = response;
                console.log(this.ansichts);
                return this.ansichts;
        },
        error => console.log(error)
      );
    }
  delete(id: string): void { 
      if(confirm("Möchtest du die Karte wirklich löschen?")){ // anhand von confirm wird die Karte geöffnet 
      this.bs.deleteOne(id).subscribe(
        (
          response: any) => {
            console.log('response : ', response);
            if(response.status == 204){
                    console.log(response.status);
                    this.reload(); // Wenn es war ist, dann soll es gelöscht werden 
                  } else {
                    console.log(response.status);
                    console.log(response.error);
                    this.reload(); // Abbruch, dann wirds nicht gelöscht
                    
                  }
          },
          error => console.log(error)

        );
    }
     
    } stringAsDate(dateStr: String){
      return new Date(dateStr.toString());
    }
  
  // Update, wenn etwas gelöscht wird 
    reload()
    {
      this.readAll();
    }

  }