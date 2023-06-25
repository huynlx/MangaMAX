const CryptoJS = require('crypto-js');

export const decrypt_data = (data: any) => {
    const parsed = (data);
    const type = parsed.ciphertext;
    const score = CryptoJS.enc.Hex.parse(parsed.iv);
    const lastviewmatrix = CryptoJS.enc.Hex.parse(parsed.salt);
    const adjustedLevel = CryptoJS.PBKDF2("nettruyenhayvn", lastviewmatrix, {
        "hasher": CryptoJS.algo.SHA512,
        "keySize": 64 / 8,
        "iterations": 999
    });
    const queryTokenScores = { iv: '' };
    queryTokenScores["iv"] = score;
    const pixelSizeTargetMax = CryptoJS.AES.decrypt(type, adjustedLevel, queryTokenScores);

    return pixelSizeTargetMax.toString(CryptoJS.enc.Utf8);
};
