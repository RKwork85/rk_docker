import service from '../server'
export const dataset_List = () => {
    return service.get('/v1/work/datasets/list')
}
export const dataset_Create = (data) => {
    return service.post('/v1/work/datasets/create', data)
}
export const dataset_Update = (id,data) => {
    return service.put(`/v1/work/datasets/update/${id}`, data)
}
export const dataset_Synchronize = (data) => {
    return service.post('/v1/work/datasets/synchronize', data)
}
export const dataset_Delete = (id, data=null) => {
    return service.delete(`/v1/work/datasets/delete/${id}`, data)
}
export const dataset_UploadMd = (data) => {
    return service.post('/v1/work/datasets/uploadMd', data)
}




