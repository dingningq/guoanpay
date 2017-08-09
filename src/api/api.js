/**
 * Created by jh on 2017-06-26.
 */
import axios from 'axios';
export const getUserListPage = params => { return axios.get(`/api/merchant/testData`, { params: params }); };

