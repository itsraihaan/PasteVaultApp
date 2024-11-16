import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); // Destructure useSearchParams
  const pasteId = searchParams.get("pasteId"); // Get pasteId from the search params
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const createPaste = () => {
    if (!title.trim()) {
      toast.error("Title is mandatory. Please enter a title.", {
        position: "top-right",
      });
      return;
    }

    const paste = {
      title: title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updatePastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes]);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-6 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <input
            type="text"
            placeholder="Enter your title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-grow bg-gray-100 border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
          <button
            className="bg-blue-600 text-white font-medium rounded-lg px-5 py-3 hover:bg-blue-700 transition"
            onClick={createPaste}
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
          {pasteId && (
            <button
              className="bg-red-600 text-white font-medium rounded-lg px-4 py-3 flex items-center gap-2 hover:bg-red-700 transition"
              onClick={resetPaste}
            >
              <PlusCircle size={20} />
              Reset
            </button>
          )}
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-t-lg border-b">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <button
              className="text-gray-600 hover:text-green-600 transition"
              onClick={() => {
                navigator.clipboard.writeText(value);
                toast.success("Copied to Clipboard", { position: "top-right" });
              }}
            >
              <Copy size={20} />
            </button>
          </div>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write your content here..."
            className="w-full p-4 bg-gray-100 border border-gray-300 rounded-b-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            rows={12}
            style={{ caretColor: "#000" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
