import React, { useState, useEffect } from 'react';

import { API_URL } from '../config';

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('masterpieces');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('adminToken', data.token);
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('adminToken');
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-dark text-text-main">
        <form onSubmit={handleLogin} className="bg-card-bg p-8 rounded-lg shadow-lg w-96 border border-primary/20">
          <h2 className="text-2xl font-bold mb-6 text-primary text-center">Admin Login</h2>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded bg-bg-dark border border-gray-700 focus:border-primary outline-none"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-bg-dark border border-gray-700 focus:border-primary outline-none"
            />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-primary/80 transition">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark text-text-main p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-8 border-b border-gray-700 pb-4">
          <button
            onClick={() => setActiveTab('masterpieces')}
            className={`px-4 py-2 rounded ${activeTab === 'masterpieces' ? 'bg-primary text-white' : 'bg-card-bg hover:bg-gray-700'}`}
          >
            Masterpieces
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-4 py-2 rounded ${activeTab === 'packages' ? 'bg-primary text-white' : 'bg-card-bg hover:bg-gray-700'}`}
          >
            Packages
          </button>
        </div>

        {activeTab === 'masterpieces' ? <MasterpiecesManager /> : <PackagesManager />}
      </div>
    </div>
  );
};

const MasterpiecesManager = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  const fetchItems = async () => {
    const res = await fetch(`${API_URL}/api/masterpieces`);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    if (image) formData.append('image', image);

    await fetch(`${API_URL}/api/masterpieces`, {
      method: 'POST',
      body: formData,
    });
    setTitle('');
    setCategory('');
    setImage(null);
    fetchItems();
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`${API_URL}/api/masterpieces/${id}`, { method: 'DELETE' });
    fetchItems();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Masterpieces</h2>
      <form onSubmit={handleSubmit} className="bg-card-bg p-6 rounded-lg mb-8 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 rounded bg-bg-dark border border-gray-700"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 rounded bg-bg-dark border border-gray-700"
            required
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="p-2 rounded bg-bg-dark border border-gray-700"
            accept="image/*"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-primary text-white px-6 py-2 rounded hover:bg-primary/80">
          Add Masterpiece
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-card-bg p-4 rounded-lg border border-gray-700">
            <img src={`${API_URL}${item.image_url}`} alt={item.title} className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-gray-400">{item.category}</p>
            <button onClick={() => handleDelete(item.id)} className="mt-4 text-red-500 hover:text-red-400">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const PackagesManager = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [image, setImage] = useState(null);

  const fetchItems = async () => {
    const res = await fetch(`${API_URL}/api/packages`);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('features', features);
    if (image) formData.append('image', image);

    await fetch(`${API_URL}/api/packages`, {
      method: 'POST',
      body: formData,
    });
    setTitle('');
    setPrice('');
    setDescription('');
    setFeatures('');
    setImage(null);
    fetchItems();
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`${API_URL}/api/packages/${id}`, { method: 'DELETE' });
    fetchItems();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Packages</h2>
      <form onSubmit={handleSubmit} className="bg-card-bg p-6 rounded-lg mb-8 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 rounded bg-bg-dark border border-gray-700"
            required
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 rounded bg-bg-dark border border-gray-700"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded bg-bg-dark border border-gray-700 md:col-span-2"
            required
          />
          <textarea
            placeholder="Features (comma separated)"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="p-2 rounded bg-bg-dark border border-gray-700 md:col-span-2"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="p-2 rounded bg-bg-dark border border-gray-700"
            accept="image/*"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-primary text-white px-6 py-2 rounded hover:bg-primary/80">
          Add Package
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-card-bg p-4 rounded-lg border border-gray-700">
            <img src={`${API_URL}${item.image_url}`} alt={item.title} className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-primary font-bold">{item.price}</p>
            <p className="text-gray-400 text-sm mt-2">{item.description}</p>
            <button onClick={() => handleDelete(item.id)} className="mt-4 text-red-500 hover:text-red-400">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
