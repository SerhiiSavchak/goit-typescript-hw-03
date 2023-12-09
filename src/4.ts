interface KeyI {
  getSignature(): number;
}

interface PersonI {
  getKey(): KeyI | undefined;
}

interface HouseI {
  door: boolean;
  tenants: PersonI[];
  comeIn(obj: PersonI): void;
  OpenDoor(obj: KeyI): void;
}

class Key implements KeyI {
  private signature: number = Math.random();

  getSignature() {
    return this.signature;
  }
}

class Person implements PersonI {
  constructor(private key: KeyI) {}

  getKey() {
    return this.key;
  }
}

abstract class House implements HouseI {
  tenants: PersonI[] = [];

  constructor(public door: boolean, protected key: KeyI) {}

  abstract OpenDoor(obj: KeyI): void;

  comeIn(obj: PersonI) {
    if (this.door) {
      this.tenants.push(obj);
      console.log(`${obj.getKey()?.getSignature()} entered the house.`);
    } else {
      console.log("The door is closed.");
    }
  }
}

class MyHouse extends House {
  constructor(door: boolean, key: KeyI) {
    super(door, key);
  }

  OpenDoor(obj: KeyI) {
    if (obj.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log("The door is opened.");
    } else {
      console.log("Invalid key. The door remains closed.");
    }
  }

  closeDoor() {
    this.door = false;
    console.log("The door is closed.");
  }
}

const key = new Key();
const person = new Person(key);
const myHouse = new MyHouse(false, key);

myHouse.OpenDoor(person.getKey());
myHouse.comeIn(person);

const wrongKey = new Key();
myHouse.OpenDoor(wrongKey);

myHouse.closeDoor();

export {};
