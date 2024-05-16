import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, interval, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrafficLightService {
  private colorOrder: ('red' | 'green' | 'yellow')[] = ['red', 'yellow', 'green'];
  index: number = 0;
  private intervalSub!: Subscription;
  private emergencySub!: Subscription;

  private colorSubject = new BehaviorSubject<'red' | 'yellow' | 'green'>('red');
  currentColor$ = this.colorSubject.asObservable();

  private isEmergencySubject = new BehaviorSubject<boolean>(false);
  isEmergency$ = this.isEmergencySubject.asObservable();

  constructor() { 
    this.changeColor();
  }

  changeColor() {
    this.colorSubject.next(this.colorOrder[this.index]);
    let intervalDur = this.colorOrder[this.index] === 'yellow' ? 2000 : 5000;
    this.intervalSub = interval(intervalDur).subscribe(() => {
      this.index = (this.index + 1) % this.colorOrder.length;
      this.intervalSub.unsubscribe();
      this.changeColor();
    });
  }

  triggerEmergency() {
    if (this.intervalSub) {
      this.intervalSub.unsubscribe();
    }

    this.isEmergencySubject.next(true);
    this.colorSubject.next('yellow');
    this.emergencySub = timer(10000).subscribe(() => {
      this.isEmergencySubject.next(false);
      this.index = 0;
      this.changeColor();
    })
  }
}
