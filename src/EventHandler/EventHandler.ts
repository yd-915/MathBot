// modules
import { Formula } from "../Database/Formula"
import { Discriminant } from "../Math/MathFunctions"
import { Area } from "../Math/MathFunctions"
import { Sites } from "../Math/MathFunctions"
import {Database} from "../Database/Database"

// types
import { event } from "../types/event"
declare type AbstractFormula<T> = any | T



abstract class FormulasHandler {

    protected static formulas: Formula[]

    protected static getFormulasToString(): string {
         
        if (FormulasHandler.formulas.length == 0) return "Nothing we can find"

        let mainString: string = ""
        mainString += "Found " + FormulasHandler.formulas.length.toString() + " formulas from your request: \n\n"
        
        for (let i: number = 0; i < FormulasHandler.formulas.length; i++) {
            mainString += FormulasHandler.formulas[i].formula_name.slice(0,1).toUpperCase() + FormulasHandler.formulas[i].formula_name.slice(1) + ": " + FormulasHandler.formulas[i].formula + "\n"
        }
        
        return mainString
    }

}

export abstract class EventHandler extends FormulasHandler implements EventHandler {

    private static discr = new Discriminant()
    private static area = new Area()
    private static sites = new Sites()

    private static database = new Database({
        host: process.env.DB_HOST!,
        database_name: process.env.DB_NAME!,
        main_collection: process.env.MAIN_COLLECTION!
    })


    public static async handle(ctx: event<any>): Promise<unknown | undefined> {
        
        let message: string = ctx.message.text

        if (message.slice(0, 1) != "!" && message.slice(0, 1) != "/") {
            ctx.reply('Unknown command, type "/help" to see available functions')
            return
        }

        //done
        if (message.slice(1, 8) == "search ") {
            const query: string = message.slice(8).toLowerCase()

            let requestedFormulas: AbstractFormula<Formula> 

            if (query == "all") {
                requestedFormulas = await this.database.getAllFormulas()
            } else {
                requestedFormulas = await this.database.getFormulasByName(query)
            }

            if (typeof(requestedFormulas) == "string" || typeof(requestedFormulas) == undefined) {
                ctx.reply("Database error, contact the developer")
                return
            }

            if (typeof(requestedFormulas) == null || requestedFormulas.length == 0) {
                ctx.reply("Nothing we can find")
                return
            }

            FormulasHandler.formulas = requestedFormulas as Formula[]
            let reply: string = FormulasHandler.getFormulasToString()

            ctx.reply(reply)
            return
        }

        //nearly done
        if (message.slice(1, 13) == "search_type ") {
            const query: string = message.slice(13).toLowerCase()

            let subtypeIndex: number = 0
            for (let i: number = 0; i < query.length; i++) {
                if (query[i] == ".") subtypeIndex = i
            }
            
            
            let requestedFormulas: AbstractFormula<Formula>
            if (subtypeIndex == 0) {
                requestedFormulas = await this.database.getFormulasByType(query, undefined)
            } else {
                requestedFormulas = await this.database.getFormulasByType(query.slice(0, subtypeIndex), query.slice(subtypeIndex+1))
            }
            

            if (typeof(requestedFormulas) == "string" || typeof(requestedFormulas) == undefined) {
                ctx.reply("Database error, contact the developer")
                return
            }

            if (typeof(requestedFormulas) == null || requestedFormulas.length == 0) {
                ctx.reply("Nothing we can find")
                return
            }

            FormulasHandler.formulas = requestedFormulas as Formula[]
            let reply: string = FormulasHandler.getFormulasToString()

            ctx.reply(reply)
            return

        }

        //done
        if (message.slice(1, 7) == "discr ") {
            message = message.slice(7)
            
            let rates: number[] = []
            let numberEdges: number[] = [0]

            for (let i: number = 0; i < message.length; i++) {
                if (message[i] == " ") {
                    numberEdges.push(i)
                }
            }
            
            if (numberEdges.length < 3) {
                ctx.reply("You rates is undefined")
                return
            }

            try {
                rates[0] = parseInt(message.slice(0, numberEdges[1]))
                rates[1] = parseInt(message.slice(numberEdges[1] + 1, numberEdges[2]))
                rates[2] = parseInt(message.slice(numberEdges[2] + 1))
            } catch (e) {
                ctx.reply("Your rates is undefined")
                return
            }

            ctx.reply(
                EventHandler.discr.getSolution(rates[0], rates[1], rates[2])
            )
            return
            
        }

        //done
        if (message.slice(1, 16) == "get_third_site ") {
            message = message.slice(16)

            let first_site: number = 0
            let second_site: number = 0
            let angle: number = 0

            let numberEdges: number[] = [0]


            for (let i: number = 0; i < message.length; i++) {
                if (message[i] == " ") {
                    numberEdges.push(i)
                }
            }


            if (numberEdges.length < 3) {
                ctx.reply("Your sites or angle is undefined")
                return
            }

            try {
                first_site = parseInt(message.slice(0, numberEdges[1]))
                second_site = parseInt(message.slice(numberEdges[1] + 1, numberEdges[2]))
                angle = parseInt(message.slice(numberEdges[2] + 1))
            } catch (e) {
                ctx.reply("Your sites or angle is undefined")
                return
            }

            ctx.reply(
                EventHandler.sites.thirdSiteFromAngle(first_site,second_site,angle)
            )
            return
        }

        //done
        if (message.slice(1, 11) == "gen_discr ") {
            let difficulty: string = message.slice(11).replace(/ /g,'')

            ctx.reply(
                EventHandler.discr.genEquation(difficulty)
            )
            return
        }

        //done
        if (message.slice(1, 16) == "get_area_heron ") {
            message = message.slice(16)

            let sites: number[] = []
            let numberEdges: number[] = [0]

            for (let i: number = 0; i < message.length; i++) {
                if (message[i] == " ") {
                    numberEdges.push(i)
                }
            }

            if (numberEdges.length < 3) {
                ctx.reply("Your sites is undefined")
                return
            }

            try {
                sites[0] = parseInt(message.slice(0, numberEdges[1]))
                sites[1] = parseInt(message.slice(numberEdges[1] + 1, numberEdges[2]))
                sites[2] = parseInt(message.slice(numberEdges[2] + 1))
            } catch (e) {
                ctx.reply("You sites is undefined")
                return
            }

            

            ctx.reply(
                EventHandler.area.triangleAreaByHeron(sites[0], sites[1], sites[2])
            )
            return
        }

        if (message.slice(1, 14) == "get_area_sin ") {
            message = message.slice(14)

            let first_site: number = 0
            let second_site: number = 0
            let angle: number = 0

            let numberEdges: number[] = [0]


            for (let i: number = 0; i < message.length; i++) {
                if (message[i] == " ") {
                    numberEdges.push(i)
                }
            }


            if (numberEdges.length < 3) {
                ctx.reply("Your sites or angle is undefined")
                return
            }

            try {
                first_site = parseInt(message.slice(0, numberEdges[1]))
                second_site = parseInt(message.slice(numberEdges[1] + 1, numberEdges[2]))
                angle = parseInt(message.slice(numberEdges[2] + 1))
            } catch (e) {
                ctx.reply("Your sites or angle is undefined")
                return
            }

            ctx.reply(
                EventHandler.area.triangleAreaBySinus(first_site, second_site, angle)
            )
            return

        }
        // done
        if (message.slice(1, 21) == "get_square_area_sin ") {
            message = message.slice(21)

            let d1: number = 0
            let d2: number = 0
            let angle: number = 0

            let numberEdges: number[] = [0]

            for (let i: number = 0; i < message.length; i++) {
                if (message[i] == " ") {
                    numberEdges.push(i)
                }
            }
            
            if (numberEdges.length < 3) {
                ctx.reply("You diagonals or angle is undefined")
                return
            }

            try {
                d1 = parseInt(message.slice(0, numberEdges[1]))
                d2 = parseInt(message.slice(numberEdges[1] + 1, numberEdges[2]))
                angle = parseInt(message.slice(numberEdges[2] + 1))
            } catch (e) {
                ctx.reply("Your diagonals or angle is undefined")
                return
            }

            ctx.reply(
                EventHandler.area.squareAreaBySinus(d1, d2, angle)
            )
            return

        }

        ctx.reply('Unknown command or argument, type "/help" to see available functions')

        
    }

}
