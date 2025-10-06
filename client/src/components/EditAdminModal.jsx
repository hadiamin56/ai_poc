export default function EditAdminModal({ editModalOpen, setEditModalOpen, editForm, handleEditChange, handleEditSubmit }) {
  if (!editModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Edit Admin</h2>
        <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
          {["businessName","ownerName","email","phone","gstNumber"].map(key => (
            <input
              key={key}
              name={key}
              type="text"
              placeholder={key.replace(/([A-Z])/g, " $1")}
              value={editForm[key]}
              onChange={handleEditChange}
              className="border p-2 rounded w-full"
              required
            />
          ))}
          <div className="flex justify-between mt-3">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
            <button onClick={()=>setEditModalOpen(false)} type="button" className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
