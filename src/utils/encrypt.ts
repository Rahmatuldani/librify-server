import objectHash from "object-hash";

export function Encrypt(data: any){
    const encrypt = objectHash(data, { algorithm: 'sha3-512', encoding: 'base64' })

    return encrypt;
}