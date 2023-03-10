import TMDBServer from '../baseUrl';

// export const getTrending = async (query: string) => {
//   try {
//     const res = await TMDBServer({
//       url: `trending/all/${query}`,
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
