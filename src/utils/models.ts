export interface Root {
    results: Result[]
  }
  
  export interface Result {
    id: number
    name: string
    homes: Home[]
    image: string
    created: string
    segment: number
    version: number
    modified: string
  }
  
  export interface Home {
    id: number
    name: string
    image: any
    created: string
    modified: string
    priority: number
    url_page: any
    home_type: HomeType[]
    name_button: string
    organization: number
  }
  
  export interface HomeType {
    id: number
    code: string
    home: number
    name: string
    image: string
    created: string
    modified: string
    url_page: any
    home_detail: HomeDetail[]
  }
  
  export interface HomeDetail {
    id: number
    name: string
    image: string
    created: string
    modified: string
    home_type: number
    is_active: boolean
    description: string
    image_orientation: string
  }
  