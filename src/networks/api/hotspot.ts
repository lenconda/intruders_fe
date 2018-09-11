import axios from 'axios'

class HotspotApi {

  private http = axios.create({
    baseURL: 'http://api.lenconda.top/hotspot'
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