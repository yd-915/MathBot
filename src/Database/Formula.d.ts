export interface Formula {
    formula_name: string,
    formula: string,
    properties: {
        formula_type: string,
        formula_subtype?: string
    }
}