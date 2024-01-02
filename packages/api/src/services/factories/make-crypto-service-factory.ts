import CryptoService from '../implementations/crypto-service';

const makeCryptoServiceFactory = () => new CryptoService();

export default makeCryptoServiceFactory;
