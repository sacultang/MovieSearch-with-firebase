import { request } from '../baseUrl';

// export const getData = async (url: string,method:string, page: number) => {
//   const res = request(url,method,page)
//   try {
//     const res = await TMDBServer({
//       url: `${url}`,
//       method: 'GET',
//       params: { page },
//     });

//     if (res.status === 200) {
//       return res.data;
//     } else {
//       const errData = await res.data;

//       return errData;
//     }
//   } catch (e) {
//     console.error(e);
//   }
// };
