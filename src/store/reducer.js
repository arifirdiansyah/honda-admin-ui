import { combineReducers } from 'redux';
import CatalogueReducer from './../redux/catalog/CatalogReducer';
import MotorcycleReducer from './../redux/motorcycle/MotorcycleReducer';
import PartReducer from './../redux/part/PartReducer';
import UserReducer from './../redux/user/UserReducer';
import DealershipReducer from './../redux/dealership/DealershipReducer';
import ServicePackageReducer from './../redux/service-package/ServicePackageReducer';

const rootReducer = combineReducers({
    CatalogueReducer,
    MotorcycleReducer,
    PartReducer,
    UserReducer,
    DealershipReducer,
    ServicePackageReducer
});

export default rootReducer;
