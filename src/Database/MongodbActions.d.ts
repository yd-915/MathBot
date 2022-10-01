import { Formula } from "./Formula";

export interface MongodbActions {
    getFormulasByType(formulaType: string, formulaSubtype: string | undefined): Promise<Formula[] | string | undefined | null>,
    getFormulasByName(formulaName: string): Promise<Formula[] | string | undefined | null>,
    getAllFormulas(): Promise<Formula[] | string | undefined | null>
}