// Web Crypto API E2EE and Security Service (Deterministic, Zero AI)

export class CryptoService {
  private static masterKey: CryptoKey | null = null;

  private static getCrypto(): Crypto {
    return typeof window !== 'undefined' ? window.crypto : (globalThis.crypto as unknown as Crypto);
  }

  // Generate or retrieve session AES-GCM 256-bit key
  static async getSessionKey(): Promise<CryptoKey> {
    if (this.masterKey) return this.masterKey;
    const cryptoObj = this.getCrypto();
    if (!cryptoObj || !cryptoObj.subtle) {
      throw new Error('Web Crypto API is unavailable in this environment');
    }

    this.masterKey = await cryptoObj.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256,
      },
      true,
      ['encrypt', 'decrypt']
    );
    return this.masterKey;
  }

  // Encrypt plaintext payload with AES-GCM
  static async encryptPayload(plaintext: string): Promise<{ ciphertext: string; iv: string }> {
    const key = await this.getSessionKey();
    const cryptoObj = this.getCrypto();
    const iv = cryptoObj.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(plaintext);

    const encryptedBuffer = await cryptoObj.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      encoded
    );

    const ciphertext = btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer)));
    const ivBase64 = btoa(String.fromCharCode(...iv));

    return { ciphertext, iv: ivBase64 };
  }

  // Decrypt AES-GCM payload
  static async decryptPayload(ciphertext: string, ivBase64: string): Promise<string> {
    const key = await this.getSessionKey();
    const cryptoObj = this.getCrypto();
    const iv = new Uint8Array(atob(ivBase64).split('').map((c) => c.charCodeAt(0)));
    const cipherBytes = new Uint8Array(atob(ciphertext).split('').map((c) => c.charCodeAt(0)));

    const decryptedBuffer = await cryptoObj.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      cipherBytes
    );

    return new TextDecoder().decode(decryptedBuffer);
  }

  // Generate SHA-256 hash formatted as 60-digit safety numbers (Signal/Apple standard)
  static async generateSafetyNumber(userIdA: string, userIdB: string): Promise<string> {
    const sorted = [userIdA, userIdB].sort().join(':');
    const encoded = new TextEncoder().encode(sorted + ':aether_e2ee_salt_2026');
    const cryptoObj = this.getCrypto();
    const hashBuffer = await cryptoObj.subtle.digest('SHA-256', encoded);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // Convert bytes into a 60-digit numeric string
    let numericStr = hashArray.map((b) => b.toString().padStart(3, '0')).join('').slice(0, 60);
    // Format into 12 blocks of 5 digits
    return numericStr.match(/.{1,5}/g)?.join(' ') || numericStr;
  }

  // Hash a PIN code with SHA-256
  static async hashPin(pin: string): Promise<string> {
    const encoded = new TextEncoder().encode(pin + '_aether_pin_salt');
    const cryptoObj = this.getCrypto();
    const hashBuffer = await cryptoObj.subtle.digest('SHA-256', encoded);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  // Generate BIP39-style 12-word mnemonic phrase
  static generateRecoveryPhrase(): string[] {
    const wordList = [
      'acoustic', 'almond', 'alpine', 'anchor', 'anthem', 'apollo', 'arctic', 'arrow',
      'aurora', 'bamboo', 'beacon', 'breeze', 'bridge', 'cactus', 'canyon', 'cascade',
      'celestial', 'cipher', 'clover', 'cobalt', 'comet', 'coral', 'crystal', 'delta',
      'diamond', 'drift', 'eagle', 'echo', 'eclipse', 'emerald', 'falcon', 'feather',
      'flare', 'forest', 'frost', 'galaxy', 'garnet', 'glacier', 'gravity', 'harbor',
      'haven', 'helix', 'horizon', 'indigo', 'island', 'jupiter', 'lagoon', 'lantern',
      'lotus', 'lunar', 'meadow', 'meteor', 'mirage', 'monarch', 'nebula', 'oasis',
      'ocean', 'orbit', 'orchid', 'origami', 'palace', 'pearl', 'phoenix', 'pioneer',
      'polaris', 'prism', 'pulsar', 'pyramid', 'quartz', 'radiant', 'rain', 'realm',
      'river', 'sapphire', 'satellite', 'shadow', 'solace', 'spark', 'spire', 'spring',
      'summit', 'temple', 'terra', 'timber', 'topaz', 'trail', 'twilight', 'valley',
      'vapor', 'velvet', 'vessel', 'vortex', 'voyage', 'wave', 'whisper', 'zenith'
    ];
    const phrase: string[] = [];
    const randomVals = new Uint8Array(12);
    const cryptoObj = this.getCrypto();
    cryptoObj.getRandomValues(randomVals);
    for (let i = 0; i < 12; i++) {
      phrase.push(wordList[randomVals[i] % wordList.length]);
    }
    return phrase;
  }
}
