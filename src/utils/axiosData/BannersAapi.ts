import { api } from "../api";
class BannersApi {
  static getAll() {
    return api.get(`banners`);
  }
  static getOne(id: number) {
    return api.get(`banners/${id}`);
  }
  static create(values: any) {
    return api.post(`banners`, values);
  }
  static update(id: number) {
    return api.patch(`banners/${id}`);
  }
  static delete(id: number, token: string) {
    return api.delete(`banners/${id}`);
  }
}
export default BannersApi;
