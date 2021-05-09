// tai day can sinh ra 1 cai goi la store =
import {createStore} from 'redux';
import {reducer} from '../reducers';

const initialState = {tech : 'React', category : 'book', categories : ['book','laptop'], cart : {total: 0, items:[]}};
export const store = createStore(reducer,initialState);
// da hieu van de la gi ??? --> no can 2 dau cham de tro ve thu muc goc :

