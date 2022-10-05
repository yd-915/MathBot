// modules
import { MongoClient } from "mongodb"
import 'dotenv/config'

// interfaces
import { Formula } from "./Formula"
import { MongodbActions } from "./MongodbActions"


// types
import { dbParams } from "../types/dbParams"


export class Database implements MongodbActions {

    private client: MongoClient
    private params: dbParams
    private mainCollection: any

    constructor (insertedParams: dbParams) {

        this.params = insertedParams
        this.client = new MongoClient(this.params.host)
        this.mainCollection = this.client.db(this.params.database_name).collection(this.params.main_collection)

    }

    public async getAllFormulas(): Promise<Formula[] | string | undefined | null>{
        try {
            await this.client.connect()

            const query: object = {}

            const options: object = {
                sort: {"properties.formula_type": 1},
                projection: {_id: 0}
            }

            return await this.mainCollection.find(query, options).toArray()


        } catch (e) {
            return "db_error"
        }
    }

    public async getFormulasByName(formulaName: string): Promise<Formula[] | string | undefined> {
        try {
            await this.client.connect()

            if (formulaName == "") return []

            const query: object = {
                "formula_name": {$regex: formulaName.toLowerCase()}
            }

            const options: object = {
                sort: {"formula_name": 1},
                projection: {_id: 0}
            }

            return await this.mainCollection.find(query, options).toArray()


        } catch (e) {
            return "db_error"
        }
    }


    private static getQueryBySubtypeState(type: string, subtype: string | undefined): object {
        return subtype == undefined ? {"properties.formula_type": type} : {
            "properties.formula_type": type,
            "properties.formula_subtype": subtype
        }
    }

    public async getFormulasByType(formulaType: string, formulaSubtype: string | undefined): Promise<Formula[] | string | undefined> {
        try {
            await this.client.connect()
            
            const query: object = Database.getQueryBySubtypeState(formulaType, formulaSubtype)

            const options: object = {
                sort: {"properties.formula_type": 1},
                projection: {_id: 0}
            }

            return await this.mainCollection.find(query, options).toArray()

        } catch (e) {
            return "db_error"
        }
    }
    
}

