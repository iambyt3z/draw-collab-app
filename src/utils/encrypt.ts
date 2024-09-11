function arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    return window.btoa(binary);
}

async function encrypt (
    jsonObject: object,
    key: string
): Promise<string> {
    
    const cryptoKey = await window.crypto.subtle.importKey(
        "jwk",
        {
            "alg": "A128GCM",
            "ext": true,
            "k": key,
            "key_ops": ["encrypt", "decrypt"],
            "kty": "oct"
        },
        { 
            "length": 128,
            "name": "AES-GCM", 
        },
        false, // extractable
        ["encrypt", "decrypt"],
    );

    const encrypted = await window.crypto.subtle.encrypt(
        { "iv": new Uint8Array(12), "name": "AES-GCM" },
        cryptoKey,
        new TextEncoder().encode(JSON.stringify(jsonObject)),
    );

    const encryptedBase64 = arrayBufferToBase64(encrypted);

    return encryptedBase64;
}

export default encrypt;
