export class CounterService {
    activeToInactive: number = 0
    inactiveToActive: number = 0

    increaseActiveToInactive(){
        this.activeToInactive += 1
        console.log(`Active to Inactive counter = ${this.activeToInactive}`)
    }

    increaseInactivetoActive(){
        this.inactiveToActive += 1
        console.log(`Inactive to active counter = ${this.inactiveToActive}`)
    }
}