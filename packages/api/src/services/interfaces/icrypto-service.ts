interface ICryptoService {
  validate(token: string): boolean;
  decode<T>(token: string): T;
  encode<T>(payload: T): string;
}

export default ICryptoService;
