import React, { useEffect, useState } from 'react';
import { Eye, Pencil, PlusSquare, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';
import DataTable from '../../components/admin/DataTable';
import blogService from '../../services/blogService';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);

  const load = async () => {
    const response = await blogService.getAdminAll();
    setBlogs(response.data.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const deleteBlog = async (blogId) => {
    if (!window.confirm('Delete this blog permanently?')) return;
    await blogService.remove(blogId);
    await load();
  };

  return (
    <div className="admin-page">
      <AdminHeader
        title="News & Insights"
        subtitle="Manage drafts, published posts, and the SEO-facing content that should drive organic traffic."
        actions={<Link to="/admin/blogs/new" className="admin-primary-btn"><PlusSquare className="w-4 h-4" /> Add Blog</Link>}
      />

      <div className="admin-panel-card">
        <DataTable
          emptyMessage="No blog posts found."
          columns={[
            {
              key: 'title',
              label: 'Title',
              render: (row) => (
                <div className="admin-cell-stack">
                  <div className="admin-cell-title">{row.title}</div>
                  <div className="admin-cell-subtitle">/{row.slug}</div>
                </div>
              ),
            },
            { key: 'category', label: 'Category' },
            { key: 'author', label: 'Author' },
            { key: 'publishDate', label: 'Publish Date', render: (row) => row.publishDate ? new Date(row.publishDate).toLocaleDateString('en-IN') : '-' },
            { key: 'status', label: 'Status', render: (row) => <span className={`admin-table-badge ${row.status === 'published' ? 'success' : 'warning'}`}>{row.status}</span> },
            {
              key: 'actions',
              label: 'Actions',
              render: (row) => (
                <div className="admin-action-row">
                  <a href={`/news-insights/${row.slug}`} target="_blank" rel="noreferrer" className="admin-secondary-btn admin-secondary-btn-inline"><Eye className="w-4 h-4" /> View</a>
                  <Link to={`/admin/blogs/${row._id}`} className="admin-secondary-btn admin-secondary-btn-inline"><Pencil className="w-4 h-4" /> Edit</Link>
                  <button type="button" className="admin-danger-btn" onClick={() => deleteBlog(row._id)}><Trash2 className="w-4 h-4" /> Delete</button>
                </div>
              ),
            },
          ]}
          rows={blogs.map((blog) => ({ ...blog, id: blog._id }))}
        />
      </div>
    </div>
  );
}
