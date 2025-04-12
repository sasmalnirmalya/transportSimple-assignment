import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Trip } from './trip.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'transportSimple-assignment';
  trips: Trip[] = []; 
  tripsLevel: any[]=[];
  id: number = 0;

  tripForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
    this.tripForm = this.fb.group({
      startPoint: ['', [Validators.required, Validators.minLength(3)]],
      endPoint: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getId() {
    this.id++;
    return this.id;
  }

  onSubmit(){
    this.trips.push({
      id: this.getId(),
      startPoint: this.tripForm.value.startPoint,
      endPoint: this.tripForm.value.endPoint,
      startPointCode: this.tripForm.value.startPoint.substring(0, 3).toUpperCase(),
      endPointCode: this.tripForm.value.endPoint.substring(0, 3).toUpperCase(),
    });
    this.tripForm.reset();
    this.decideLevel();
  }

  decideLevel() {
    this.tripsLevel = this.trips.map((trip,i,trips) => {
      if ( trips.length==1){
        return {...trip, level: 1};
      }
      else {
        if (i==0) {
          if( trips[i].startPointCode === this.trips[i+1].startPointCode && trips[i].endPointCode === this.trips[i+1].endPointCode){
            return {...trip, level: 2};
          }
          else return {...trip, level: 1};
        }
        else if(i==trips.length-1) {
          if(trips[i].startPointCode === this.trips[i-1].startPointCode && trips[i].endPointCode === this.trips[i-1].endPointCode){
            return {...trip, level: 2};
          }
          else return {...trip, level: 1};
        }
        else {
          if((trips[i].startPointCode === this.trips[i-1].startPointCode && trips[i].endPointCode === this.trips[i-1].endPointCode)
            || (trips[i].startPointCode === this.trips[i+1].startPointCode && trips[i].endPointCode === this.trips[i+1].endPointCode)){
              return {...trip, level: 2};
            }
          else return {...trip, level: 1};
        }
      }
    })
  }
  
}
