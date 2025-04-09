import { api } from "../api";
class CategoriesApi {
  static getAll() {
    return api.get(`categories`);
  }
  static getOne(id: number) {
    return api.get(`categories/${id}`);
  }
  static create(values: any) {
    return api.post(`categories`, values);
  }
  static update(id: number) {
    return api.patch(`categories/${id}`);
  }
  static delete(id: number, token: string) {
    return api.delete(`categories/${id}`);
  }
}
export default CategoriesApi;
