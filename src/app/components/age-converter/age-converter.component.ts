import { Component, computed, signal } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-age-converter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './age-converter.component.html',
  styleUrl: './age-converter.component.css'
})
export class AgeConverterComponent {
  signalBaseDate = signal(0);


  baseDate(inputValue: NgModel){
    this.signalBaseDate.set(inputValue.value)
  }

  calculateAge = computed(()=>{
    const today = new Date().getTime();
    const baseDate = new Date(this.signalBaseDate()).getTime();
    const age = ((today - baseDate)/1000/60/60/24/365.25).toFixed(0);
    return age
  })

  calculateDogAge = computed(()=>{
    const age = +this.calculateAge();
    const dogAge = (age-1)* 7 +1
    return dogAge
  })
}
