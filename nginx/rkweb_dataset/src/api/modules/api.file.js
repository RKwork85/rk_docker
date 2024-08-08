import service from '../server'
// 下载
export const fileDownload = (filename) => {
    return service.get(`/download/${filename}`
        , {
          responseType: 'blob'
        })
}


