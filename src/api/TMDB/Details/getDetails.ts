import { request } from '../baseUrl';
import { requestFuncType } from '../constant';

// export const getDetails:requestFuncType = async (url,method,) => {
//   try {
//     const res = await TMDBServer({
//       url: `${url}`,
//       method: 'GET',
//     });
//     if (res.status === 200) {
//       return res.data;
//     } else {
//       const errData = await res.data;
//       throw errData;
//     }
//   } catch (e) {
//     console.error(e);
//   }
// };

// export const getTrailer = async (url: string) => {
//   try {
//     const res = await TMDBServer({
//       url: `${url}/videos`,
//       method: 'GET',
//     });

//     if (res.status === 200) {
//       return res.data;
//     }
//   } catch (e) {
//     console.error(e);
//   }
// };

// export const getCredit = async (url: string) => {
//   try {
//     const res = await TMDBServer({
//       url: `${url}/credits`,
//       method: 'GET',
//     });

//     if (res.status === 200) {
//       return res.data;
//     }
//   } catch (e) {
//     console.error(e);
//   }
// };

// export const getSimilar = async (url: string) => {
//   try {
//     const res = await TMDBServer({
//       url: `${url}/similar`,
//       method: 'GET',
//     });

//     if (res.status === 200) {
//       return res.data;
//     }
//   } catch (e) {
//     console.error(e);
//   }
// };
