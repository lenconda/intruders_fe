import axios from 'axios'
import config from '../../../config'

class SearchApi {

  private http = axios.create({
    baseURL: config.env === 'dev' ? 'http://localhost:3000' : 'http://intruders.applinzi.com'
  })

  private urls = {
    search: '/search',
  }

  search = async (keyword: string, page: number, tab?: string) => {
    const res = this.http.get(this.urls.search, {
      params: {
        keyword,
        page,
        tab
      }
    })
    return res
  }

}

const searchApi = new SearchApi()
export default searchApi