export interface ICryptoService {
    hash(data: string): Promise<string>;
    compare(data: string, encrypted: string): Promise<boolean>;
}