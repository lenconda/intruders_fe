import axios from 'axios'
import config from '../../../config.js'

class HotspotApi {

  private http = axios.create({
    baseURL: config.env === 'dev' ? 'http://localhost:3000/hotspot' : 'http://intruders.applinzi.com/hotspot'
  })

  private urls = {
    categories: '/categories',
    lists: '/lists',
  }

  fetchCategories = async () => {
    const res = this.http.get(this.urls.categories)
    return res
  }

  getLists = async (id?: string) => {
    const res = this.http.get(this.urls.lists, {
      params: {
        id
      }
    })
    return res
  }

}

const hotspotApi = new HotspotApi()
export default hotspotApi