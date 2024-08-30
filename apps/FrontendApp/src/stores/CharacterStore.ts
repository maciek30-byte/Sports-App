import { makeAutoObservable } from 'mobx';

export class CharacterStore {
  level = 1;
  experiencePercentage = 0;
  totalWeightLifted = 0;
  skills = [
    { name: 'Siła', value: 0 },
    { name: 'Wytrzymałość', value: 0 },
    { name: 'Szybkość', value: 0 },
    { name: 'Technika', value: 0 },
    { name: 'Mobilność', value: 0 },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  updateCharacterData(data: Partial<CharacterStore>) {
    Object.assign(this, data);
  }

  addWeightLifted(weight: number) {
    this.totalWeightLifted += weight;
    // Tu możesz dodać logikę aktualizacji poziomu i umiejętności
  }
}
