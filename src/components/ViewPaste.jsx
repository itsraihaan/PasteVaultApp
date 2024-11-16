import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();

  console.log(id);

  const pastes = useSelector((state) => state.paste.pastes);

  // Find the paste with the matching ID
  const paste = pastes.find((paste) => paste._id === id);

  console.log("Paste->", paste);

  if (!paste) {
    return <p className="text-center text-gray-600">Paste not found!</p>;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content);
    toast.success("Copied to Clipboard!");
  };

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          value={paste.title || ""}
          disabled
          aria-label="Paste Title"
          className="w-full text-black border border-input rounded-md p-2"
        />

        {/* Paste Content Section */}
        <div className="w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl">
          {/* Top Section with Status Indicators and Copy Button */}
          <div className="w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]">
            {/* Status Indicators */}
            <div className="w-full flex gap-x-[6px] items-center select-none group">
              <div className="w-[13px] h-[13px] rounded-full bg-[rgb(255,95,87)]" />
              <div className="w-[13px] h-[13px] rounded-full bg-[rgb(254,188,46)]" />
              <div className="w-[13px] h-[13px] rounded-full bg-[rgb(45,200,66)]" />
            </div>

            {/* Copy Button */}
            <div className="w-fit rounded-t flex items-center justify-between gap-x-4 px-4">
              <button
                onClick={handleCopy}
                className="flex justify-center items-center transition-all duration-300 ease-in-out group"
                aria-label="Copy Content"
              >
                <Copy className="group-hover:text-green-500" size={20} />
              </button>
            </div>
          </div>

          {/* Text Area for Paste Content */}
          <textarea
            value={paste.content || ""}
            disabled
            placeholder="Write Your Content Here...."
            className="w-full p-3 focus-visible:ring-0"
            style={{
              caretColor: "#000", // Ensures a visible caret (cursor)
            }}
            rows={20}
            aria-label="Paste Content"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
