import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Popular = () => {
  const TMDB_API = process.env.REACT_APP_TMDB_API
  const LANG = `language=${process.env.REACT_APP_TMDB_API_LANGUAGE}`
  const URL = 'https://api.themoviedb.org/3'
  const [page, setPage] = useState(1)
  const [cardList, setCardList] = useState([])

  const getPopular = async (e) => {
    try {
      const response = await axios.get(
        `${URL}/movie/popular?api_key=${TMDB_API}&${LANG}&page=${
          page === undefined ? 1 : page
        }`
      )
      console.log(response)

      if (response.status === 200) {
        setCardList(response.data.results)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPopular()
  }, [])

  return (
    <>
      {cardList &&
        cardList.map((item, idx) => {
          return <div>{item.original_title}</div>
        })}
    </>
  )
}

export default Popular
