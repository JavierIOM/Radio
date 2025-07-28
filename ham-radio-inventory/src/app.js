return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Ham Radio Inventory
        </h1>

        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex
  items-center gap-2"
          >
            <Plus size={20} />
            Add Equipment
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            {/* Add form content */}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipment.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow">
              {/* Equipment card content */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
