export interface DisciminantActions {
    getSolution(first_rate: number, second_rate: number, third_rate: number): string,
    genEquation(difficulty: string): string,
    readonly discriminant_formula: string
}