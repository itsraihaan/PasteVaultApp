import { Calendar, Copy, Eye, PencilLine, Trash2, Share } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react"; // Import useState
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/formatDate";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
    toast.success("Paste deleted successfully!", { position: "top-right" });
  };

  // Filter pastes based on search term (by title or content)
  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShare = (paste) => {
    const shareData = {
      title: paste?.title,
      text: paste?.content,
      url: `${window.location.origin}/pastes/${paste?._id}`,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => toast.success("Shared successfully!", { position: "top-right" }))
        .catch(() => toast.error("Failed to share!", { position: "top-right" }));
    } else {
      toast.error("Sharing is not supported in your browser!", { position: "top-right" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-6 flex flex-col items-center">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-6 space-y-6">
        {/* Search */}
        <div className="flex items-center gap-3 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2">
          <input
            type="search"
            placeholder="Search pastes by title..."
            className="w-full bg-transparent focus:outline-none text-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Pastes */}
        <div className="border border-gray-300 rounded-lg p-6 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">All Pastes</h2>
          <div className="space-y-4">
            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <div
                  key={paste?._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-gray-100 p-4 rounded-lg border border-gray-300"
                >
                  {/* Title and Content */}
                  <div className="flex-grow">
                    <p className="text-2xl font-semibold text-gray-900">{paste?.title}</p>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {paste?.content}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:items-end space-y-3">
                    <div className="flex items-center gap-2">
                      <a href={`/?pasteId=${paste?._id}`} className="group">
                        <button className="p-2 bg-white border rounded-lg transition hover:bg-blue-50 hover:border-blue-500">
                          <PencilLine className="text-gray-500 group-hover:text-blue-500" size={20} />
                        </button>
                      </a>
                      <button
                        className="p-2 bg-white border rounded-lg transition hover:bg-pink-50 hover:border-pink-500"
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <Trash2 className="text-gray-500 hover:text-pink-500" size={20} />
                      </button>
                      <a href={`/pastes/${paste?._id}`} target="_blank" className="group">
                        <button className="p-2 bg-white border rounded-lg transition hover:bg-orange-50 hover:border-orange-500">
                          <Eye className="text-gray-500 group-hover:text-orange-500" size={20} />
                        </button>
                      </a>
                      <button
                        className="p-2 bg-white border rounded-lg transition hover:bg-green-50 hover:border-green-500"
                        onClick={() => handleShare(paste)}
                      >
                        <Share className="text-gray-500 hover:text-green-500" size={20} />
                      </button>
                      <button
                        className="p-2 bg-white border rounded-lg transition hover:bg-green-50 hover:border-green-500"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to clipboard!", { position: "top-right" });
                        }}
                      >
                        <Copy className="text-gray-500 hover:text-green-500" size={20} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Calendar size={20} />
                      {FormatDate(paste?.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xl text-gray-600 text-center">No pastes found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;
