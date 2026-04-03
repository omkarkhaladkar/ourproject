import api from './api';

const blogService = {
  getAll(params = {}) {
    return api.get('/blogs', { params });
  },

  getBySlug(slug) {
    return api.get(`/blogs/${slug}`);
  },

  getAdminAll() {
    return api.get('/admin/blogs');
  },

  getAdminById(blogId) {
    return api.get(`/admin/blogs/${blogId}`);
  },

  create(payload) {
    return api.post('/admin/blogs', payload);
  },

  update(blogId, payload) {
    return api.patch(`/admin/blogs/${blogId}`, payload);
  },

  remove(blogId) {
    return api.delete(`/admin/blogs/${blogId}`);
  },
};

export default blogService;
