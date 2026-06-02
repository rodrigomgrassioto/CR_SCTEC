// src/main.ts
import packageJson from "../package.json" with { type: "json" };

const mensagem: string = "Olá, mundo! Pokedex em TypeScript funcionando! 🚀";

function exibirDados(texto: string, versao: string): void {
    console.log(`${texto} (v${versao})`);
}

exibirDados(mensagem, packageJson.version);
