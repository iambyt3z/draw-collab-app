function base64ToArrayBuffer(base64: string): ArrayBuffer {
    let binaryString = window.atob(base64);
    let len = binaryString.length;
    let bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
}

async function decrypt(
    encryptedBase64: string,
    key: string
): Promise<any> {

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
        ["decrypt"],
    );

    const encryptedArrayBuffer = base64ToArrayBuffer(encryptedBase64);

    const decrypted = await window.crypto.subtle.decrypt(
        { "iv": new Uint8Array(12), "name": "AES-GCM" },
        cryptoKey,
        encryptedArrayBuffer,
    );

    const decoded = new window.TextDecoder().decode(new Uint8Array(decrypted));

    const content = JSON.parse(decoded);

    return content;
}

export default decrypt;
