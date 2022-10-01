export interface AreaActions {
    triangleAreaByHeron(first_site: number, second_site: number, third_site: number): string,
    triangleAreaBySinus(first_site: number, seond_site: number, angle: number): string,
    squareAreaBySinus(first_diagonal: number, second_diagonal: number, angle: number): string,
    readonly heron_formula: string,
    readonly triangle_sin_formula: string,
    readonly square_sin_formula: string
}