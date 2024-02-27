import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  counter = 0;
  signalCounter = signal(0);
  readonly signalCounterAsReadOnly = this.signalCounter.asReadonly(); // équivalent à private signalCounter
  // Pour que signalCounter se mette à jour dans computed, il faut absolument l'appeler au moins une fois avant de retourner quelque chose sinon le compteur se mettra pas à jour à chaque changements (le computed est un signal qui dépend d'un autre signal)
  tenTimeSignalCounter = computed(()=> {
    return this.signalCounter() * 10;
  });

  signalCounterSideEffect = effect(()=>{
    console.log(`Nouvelle valeur du compteur :  ${this.signalCounter()}`);
    
  })

  signalIncrement(){
    // On appelle la méthode set de nos signaux car c'est dans cette méthode "set" qu'est caché la magie dérrière les signaux. Alors que si on réassigne une valeur à signalCounter, on ne fait que remplacer notre signal par un nombre.
    this.signalCounter.set(this.signalCounter() + 1);
  }

  signalDecrement(){
    this.signalCounter.set(this.signalCounter() - 1);
  }

  basicIncrement(){
    this.counter++;
  }

  basicDecrement(){
    this.counter--;
  }
}
