const crypto = require('crypto');

class CryptoUtil {
	
	static key = Buffer.from('MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDE=', 'base64');

	static init() {
		// Future Feature: read key from key storage server
		
		// Read Key From ENV variable
		CryptoUtil.key = process.env.DATABASE_KEY;
		console.log("INIT CRYTP: " + CryptoUtil.key);	
		return 0;
	}

	static encrypt(plaintext) {
		if(plaintext != null) {
				const iv = crypto.randomBytes(16);
				const cipher = crypto.createCipheriv(
					'aes-256-cbc',
					CryptoUtil.key,
					iv
				);
				let encrypted = Buffer.concat([iv, cipher.update(plaintext, 'utf8'), cipher.final()]);
				return encrypted.toString('base64url');
		} else {
			return null
		}
	}

	static decrypt(ivCiphertextB64) {
 		const ivCiphertext = Buffer.from(ivCiphertextB64, 'base64url');
		const iv = ivCiphertext.subarray(0, 16);
		const ciphertext = ivCiphertext.subarray(16);
		const cipher = crypto.createDecipheriv(
    		'aes-256-cbc',
    		CryptoUtil.key,
    		iv
  		);
  		let decrypted = Buffer.concat([cipher.update(ciphertext), cipher.final()]);
  		return decrypted.toString('utf-8');
	}
}

module.exports = CryptoUtil
