import { AuthLoginController } from './authLogin.controller';
import { AuthLoginEndpoint } from './authLogin.network';
import { AuthLoginValidator } from './authLogin.validator';
import { MainPrivileges, MainRateLimiters } from '../../../services/main/commons/constants';

const controller = new AuthLoginController(MainPrivileges.MAuthLogin);

const routeValidator = new AuthLoginValidator();

const endpoint = new AuthLoginEndpoint(controller, routeValidator, MainRateLimiters.MAuthLogin);

export default endpoint;
