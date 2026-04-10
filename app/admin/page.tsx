export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-serif text-neutral-900 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
            <h2 className="text-lg font-medium text-neutral-800 mb-2">Total Products</h2>
            <p className="text-4xl font-light text-neutral-900">124</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
            <h2 className="text-lg font-medium text-neutral-800 mb-2">Portfolio Works</h2>
            <p className="text-4xl font-light text-neutral-900">48</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
            <h2 className="text-lg font-medium text-neutral-800 mb-2">Recent Orders</h2>
            <p className="text-4xl font-light text-neutral-900">12</p>
          </div>
        </div>

        <div className="mt-8 bg-white border border-neutral-100 rounded-2xl p-8 text-center min-h-[300px] flex items-center justify-center flex-col">
          <p className="text-neutral-500 mb-4">Management features coming soon.</p>
          <button className="bg-neutral-900 text-white px-6 py-2 rounded-lg font-medium">Add Product</button>
        </div>
      </div>
    </div>
  );
}
