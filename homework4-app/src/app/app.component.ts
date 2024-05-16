import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrafficLightComponent } from './traffic-light/traffic-light.component';
import { TrafficLightService } from './traffic-light.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TrafficLightComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isEmergencyDisabled: boolean = false;
  constructor(private trafficLightService: TrafficLightService) {}

  turnOnEmergency() {
    console.log("EMERGENCY!");
    this.trafficLightService.triggerEmergency();

    this.isEmergencyDisabled = true;

    setTimeout(() => {
      this.isEmergencyDisabled = false;
    }, 20000);
  }
}
