// interfaces
import { AreaActions } from "./AreaActions";
import { DisciminantActions } from "./DiscriminantActions";
import { SitesActions } from "./SitesActions";



export class Discriminant implements DisciminantActions {

    public readonly discriminant_formula = "D = b² - 4 * a * c"

    private static getRandomInt(min: number, max: number): number {
        let randomNum: number = Math.floor(Math.random() * (max - min + 1)) + min
        return randomNum != 0 ? randomNum : Discriminant.getRandomInt(min, max)
    }

    private static getDifficultyParams(difficulty: string): number[] {
        switch (difficulty) {

            case "easy":
                return [
                    Discriminant.getRandomInt(-4, 4),
                    Discriminant.getRandomInt(-2, 10),
                    Discriminant.getRandomInt(-2, 10)
                ]

            case "medium":
                return [
                    Discriminant.getRandomInt(-2, 6),
                    Discriminant.getRandomInt(-4, 15),
                    Discriminant.getRandomInt(-4, 15)
                ]
            case "hard":
                return [
                    Discriminant.getRandomInt(-3, 12),
                    Discriminant.getRandomInt(-5, 20),
                    Discriminant.getRandomInt(-6, 20)
                ]
            default: 
                return[
                    Discriminant.getRandomInt(-4, 4),
                    Discriminant.getRandomInt(-2, 10),
                    Discriminant.getRandomInt(-2, 10)
                ]
        }

    }

    private static stringingEquation(ratesArray: number[]): string {
        let equationString: string = ""
        
        for (let i: number = 0; i < ratesArray.length; i++) {

            if (i == 0) {
                if (ratesArray[0] < 0) {
                    equationString += ratesArray[i].toString().slice(0, 1) + " " + ratesArray[i].toString().slice(1)  + "x² "
                    continue
                }
                equationString += ratesArray[i].toString() + "x² "
            }

            if (i == 1) {
                if (ratesArray[1] < 0) {
                    equationString += ratesArray[i].toString().slice(0, 1) + " " + ratesArray[i].toString().slice(1)  + "x "
                    continue
                }
                equationString += "+ " + ratesArray[i].toString() + "x "
            }

            if (i == 2) {
                if (ratesArray[2] < 0) {
                    equationString += ratesArray[i].toString().slice(0, 1) + " " + ratesArray[i].toString().slice(1)  + " = 0"
                    continue
                }
                equationString += "+ " + ratesArray[i].toString() + " = 0"
            }

        }

        return equationString
    } 

    public getSolution(first_rate: number, second_rate: number, third_rate: number): string {
        if (first_rate == 0 || second_rate == 0) return "One of the rates is zero"

        let answerString: string = ""
        let D: number = (second_rate*second_rate) - (4 * first_rate * third_rate)

        if (D < 0) return "No solutions"
        if (D == 0) {
            let result: number = (-second_rate) / (2 * first_rate)
            answerString += "The discriminant is: " + D.toString() + "\nOnly one radical is: " + result.toString() + "\n" + (-second_rate).toString() + " +- " + "√" + D.toString() + " \n-------------\n" + (2 * first_rate).toString()
            return answerString
        }

        let firstRadical: number = ((-second_rate) + Math.sqrt(D)) / (2 * first_rate)
        let secondRadical: number = ((-second_rate) - Math.sqrt(D)) / (2 * first_rate)

        answerString += "The discriminant is: " + D.toString()
        answerString += "\nThe first radical is: " + firstRadical.toFixed(3).toString() + "\nThe second radical is: " + secondRadical.toFixed(3).toString() + "\n"
        answerString += (-second_rate).toString() + " +- " + "√" + D.toString() + " \n-------------\n " + (2 * first_rate).toString() 
        answerString += "\nFrom formula: " + this.discriminant_formula
        
        return answerString
    }

    

    public genEquation(difficulty: string): any {
        let rates: number[] = Discriminant.getDifficultyParams(difficulty)
        let mathFunc = new Discriminant()

        let mainString: string = ""

        
        if ((rates[0] < 0 && rates[2] < 0) || (rates[0] > 0 && rates[2] > 0)) {
            let randomRatePointerChange: number = Discriminant.getRandomInt(1,2)
            
            randomRatePointerChange == 1 ? rates[0] = rates[0] * -1 : rates[2] = rates[2] * -1
            
        }
        
        mainString += Discriminant.stringingEquation(rates)
        mainString += "\n\n\n\n\n\n\n" + mathFunc.getSolution(rates[0], rates[1], rates[2])

        return mainString
    }
}

export class Area implements AreaActions {

    public readonly heron_formula = "S = +√p(p - a)(p - b)(p - c)"
    public readonly triangle_sin_formula = "S = 0.5 * a * b * sin(α)"
    public readonly square_sin_formula = "S = 0.5 * d1 * d2 * sin(α)"
    private radians_in_deg: number = 0.0174533

    public triangleAreaByHeron(first_site: number, second_site: number, third_site: number): string {
        let p: number = (first_site + second_site + third_site) / 2
        let area: number = Math.sqrt(p * (p - first_site) * (p - second_site) * (p - third_site)) 
        return "The area of triangle is: " + area.toFixed(3).toString() + "\nFrom formula: " + this.heron_formula
    }

    public triangleAreaBySinus(first_site:number, second_site:number, angle:number): string {
        let area: number = (first_site * second_site * Math.sin(angle * this.radians_in_deg)) / 2
        console.log(Math.sin(angle))
        return "The area of triagnle is: " + area.toFixed(3).toString() + "\nFrom formula: " + this.triangle_sin_formula
    } 

    public squareAreaBySinus(first_diagonal: number, second_diagonal: number, angle: number): string {
        let area: number = (first_diagonal * second_diagonal * Math.sin(angle * this.radians_in_deg)) / 2
        
        return "The area of square is: " + area.toFixed(3).toString() + "\nFrom formula: " + this.square_sin_formula
    }

    
}


export class Sites implements SitesActions {

    public readonly third_site_formula: string = "a² = b² + c² - 2bc * cos(α)"
    protected radians_in_deg: number = 0.0174533

    public thirdSiteFromAngle(first_site: number, second_site: number, angle: number): string {
        let thirdSite: number = Math.sqrt((first_site*first_site) + (second_site*second_site) - (2*first_site*second_site*Math.cos(angle*this.radians_in_deg)))
        return "The third site of triangle is: " + thirdSite.toFixed(2).toString() + "\nFrom formula: " + this.third_site_formula
    }

}


