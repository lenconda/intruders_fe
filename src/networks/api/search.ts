import axios from 'axios'

class SearchApi {

  private http = axios.create({
    baseURL: 'http://api.lenconda.top/intruders'
  })

  private urls = {
    search: '/search',
  }

  search = async (keyword: string, page: number) => {
    const res = this.http.get(this.urls.search, {
      params: {
        keyword,
        page
      }
    })
    return res
  }

}

const searchApi = new SearchApi()
export default searchApi