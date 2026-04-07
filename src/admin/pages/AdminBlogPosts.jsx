import React, { useEffect, useState } from "react";
import {
  createBlogPost,
  deleteBlogPost,
  listAdminBlogPosts,
  updateBlogPost,
} from "../api/adminApi";

const defaultForm = {
  title: "",
  category: "general",
  summary: "",
  content: "",
  tags: "",
  coverImageUrl: "",
  isPublished: true,
};

const AdminBlogPosts = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await listAdminBlogPosts({ search, page: 1, limit: 50 });
      setItems(data.items || []);
    } catch (apiError) {
      setError(apiError.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await updateBlogPost(editingId, payload);
      } else {
        await createBlogPost(payload);
      }
      resetForm();
      loadPosts();
    } catch (apiError) {
      setError(apiError.message || "Failed to save post");
    }
  };

  const onEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title || "",
      category: item.category || "general",
      summary: item.summary || "",
      content: item.content || "",
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : "",
      coverImageUrl: item.coverImageUrl || "",
      isPublished: Boolean(item.isPublished),
    });
  };

  const onDelete = async (postId) => {
    if (!window.confirm("Delete this blog post?")) {
      return;
    }

    try {
      await deleteBlogPost(postId);
      loadPosts();
    } catch (apiError) {
      setError(apiError.message || "Delete failed");
    }
  };

  return (
    <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">
      <div className="xl:col-span-1 rounded-2xl bg-white border border-slate-200 p-5">
        <h2 className="text-xl font-bold text-slate-900 mb-4">{editingId ? "Edit Post" : "Add Post"}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            required
            placeholder="Title"
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />

          <input
            value={form.category}
            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
            placeholder="Category"
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />

          <textarea
            value={form.summary}
            onChange={(event) => setForm((prev) => ({ ...prev, summary: event.target.value }))}
            placeholder="Summary"
            rows={2}
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />

          <textarea
            value={form.content}
            onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
            required
            placeholder="Content"
            rows={5}
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />

          <input
            value={form.tags}
            onChange={(event) => setForm((prev) => ({ ...prev, tags: event.target.value }))}
            placeholder="Tags (comma separated)"
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />

          <input
            value={form.coverImageUrl}
            onChange={(event) => setForm((prev) => ({ ...prev, coverImageUrl: event.target.value }))}
            placeholder="Cover image URL"
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(event) => setForm((prev) => ({ ...prev, isPublished: event.target.checked }))}
            />
            Published
          </label>

          <div className="flex gap-2">
            <button type="submit" className="rounded-xl bg-orange-500 text-white px-4 py-2 font-medium">
              {editingId ? "Update" : "Create"}
            </button>
            {editingId ? (
              <button type="button" onClick={resetForm} className="rounded-xl border border-slate-300 px-4 py-2">
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </div>

      <div className="xl:col-span-2 rounded-2xl bg-white border border-slate-200 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <h3 className="text-lg font-bold text-slate-900">Blog Posts</h3>
          <div className="flex gap-2">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search posts"
              className="rounded-xl border border-slate-300 px-4 py-2"
            />
            <button onClick={loadPosts} className="rounded-xl bg-slate-900 text-white px-4 py-2" type="button">
              Search
            </button>
          </div>
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {loading ? <p className="text-slate-500">Loading...</p> : null}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="py-3 pr-3">Title</th>
                <th className="py-3 pr-3">Category</th>
                <th className="py-3 pr-3">Published</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b border-slate-100">
                  <td className="py-3 pr-3 font-medium text-slate-900">{item.title}</td>
                  <td className="py-3 pr-3">{item.category}</td>
                  <td className="py-3 pr-3">{item.isPublished ? "Yes" : "No"}</td>
                  <td className="py-3 flex gap-2">
                    <button onClick={() => onEdit(item)} className="rounded-lg border border-slate-300 px-3 py-1 hover:bg-slate-50">
                      Edit
                    </button>
                    <button onClick={() => onDelete(item._id)} className="rounded-lg border border-red-300 text-red-600 px-3 py-1 hover:bg-red-50">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminBlogPosts;
