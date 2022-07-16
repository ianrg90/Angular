/*
export class Ingredient {
    public name: string;
    public ammount: number;

    constructor(name: string, ammount: number) {
        this.name = name;
        this.ammount = ammount
    }
}
*/

//Alternative sytax

export class Ingredient {
    constructor(public name: string, public amount: number){}
}