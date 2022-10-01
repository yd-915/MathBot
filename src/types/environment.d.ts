export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            TOKEN_TYPE: 'telegram'
        }
    }
}