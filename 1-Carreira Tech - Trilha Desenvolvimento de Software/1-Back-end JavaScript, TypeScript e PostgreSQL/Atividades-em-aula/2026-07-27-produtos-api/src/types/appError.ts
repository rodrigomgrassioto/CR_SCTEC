export class AppError extends Error {
    constructor(
        public readonly message: string,
        public readonly statusCode: number = 400
    ) {
        super(message);
        // Necessário no TypeScript ao extender classes nativas, neste casoo Error
        // prototype refere-se a propriedade interna de um objeto
        Object.setPrototypeOf(this, AppError.prototype);
    }
}