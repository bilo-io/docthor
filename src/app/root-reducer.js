import { combineReducers } from 'redux';
// Pages
import aboutReducer from './pages/about/reducer';
import docsReducer from './pages/docs/reducer';
import homeReducer from './pages/home/reducer';
// Containers
const rootReducer = combineReducers({
    // Pages
    about: aboutReducer,
    docs: docsReducer,
    home: homeReducer,
})

export default rootReducer;