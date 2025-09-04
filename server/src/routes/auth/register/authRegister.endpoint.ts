import { AuthRegisterController } from './authRegister.controller';
import { AuthRegisterEndpoint } from './authRegister.network';
import { AuthRegisterValidator } from './authRegister.validator';
import { MainPrivileges, MainRateLimiters } from '../../../services/main/commons/constants';

const controller = new AuthRegisterController(MainPrivileges.MAuthRegister);

const routeValidator = new AuthRegisterValidator();

const endpoint = new AuthRegisterEndpoint(controller, routeValidator, MainRateLimiters.MAuthRegister);

export default endpoint;
