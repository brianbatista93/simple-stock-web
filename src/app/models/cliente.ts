class Endereco {
    public cep: number;
    public logradouro: string;
    public numero: number;
    public complemento: string;
    public localidade: string;
    public uf: string;
}

export class Cliente {
    public nome: string;
    public telefone: string;
    public endereco: Endereco;
}
