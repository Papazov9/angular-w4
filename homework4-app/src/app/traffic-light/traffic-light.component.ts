import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { TrafficLightService } from '../traffic-light.service';

@Component({
  selector: 'app-traffic-light',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './traffic-light.component.html',
  styleUrl: './traffic-light.component.css'
})
export class TrafficLightComponent implements OnInit, OnDestroy{
  
  @Input() orientation: 'horizontal' | 'vertical' = 'vertical';
  @Input() inverse: boolean = false;
  currentColor: 'red' | 'yellow' | 'green' | null = 'red';
  walkCounter: number = 0;
  colorSubscription!: Subscription;
  emergencySubscription!: Subscription;

  constructor(private trafficLightService: TrafficLightService) {}

  ngOnInit(): void {
    this.colorSubscription = this.trafficLightService.currentColor$.subscribe(color => {
      if (this.inverse) {
        this.currentColor = this.inverseColor(color);
      } else {
        this.currentColor = color;
      }
    });

    this.emergencySubscription = this.trafficLightService.isEmergency$.subscribe(isEmergency => {
      if (isEmergency) {
        this.currentColor = 'yellow';
      }
    })
  }

  inverseColor(color: 'red' | 'yellow' | 'green'): 'red' | 'yellow' | 'green' {
    if (color === 'yellow') return 'yellow';
    return color === 'red' ? 'green' : 'red';
  }

  ngOnDestroy(): void {
    this.colorSubscription.unsubscribe();
  }

  increaseCounter() {
    if (this.currentColor === 'green') {
      this.walkCounter++;
      return;
    }

    alert("Неправилно пресичане!");
  }
}
