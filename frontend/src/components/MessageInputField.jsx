import React, { useRef, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { ImagePlusIcon, SendHorizontalIcon, Smile, X } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { TENOR_API_KEY } from '../constants';

const MessageInputField = () => {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessages, sendTypingStatus } = useChatStore();
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [gifs, setGifs] = useState([]);
  const [gifPreview, setGifPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview && !gifPreview) return;

    try {
      await sendMessages({
        text: text.trim(),
        image: imagePreview,
        gif: gifPreview,
      });

      setText('');
      setImagePreview(null);
      setGifPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleTyping = () => {
    sendTypingStatus(true);
    if (typingTimeout) clearTimeout(typingTimeout);
    const timeout = setTimeout(() => {
      sendTypingStatus(false);
    }, 2000);
    setTypingTimeout(timeout);
  };

  const fetchTenorGifs = async (query = 'trending') => {
    try {
      const apiKey = TENOR_API_KEY;
      const response = await axios.get(`https://tenor.googleapis.com/v2/search`, {
        params: {
          q: query,
          key: apiKey,
          limit: 70,
        },
      });
      setGifs(response.data.results);
    } catch (error) {
      console.error('Error fetching Tenor GIFs:', error);
    }
  };

  const handleGifClick = (gifUrl) => {
    setGifPreview(gifUrl);
    setShowGifPicker(false);
  };

  const removeGif = () => {
    setGifPreview(null);
  };

  return (
    <div className="p-4 w-full bg-base-200 rounded-xl shadow-md">
      {/* Preview Section */}
      {(imagePreview || gifPreview) && (
        <div className="mb-3 flex items-center gap-3">
          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-lg border border-base-300"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white flex items-center justify-center rounded-full shadow"
              >
                <X size={16} />
              </button>
            </div>
          )}
          {gifPreview && (
            <div className="relative">
              <img
                src={gifPreview}
                alt="GIF Preview"
                className="w-24 h-24 object-cover rounded-lg border border-base-300"
              />
              <button
                onClick={removeGif}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white flex items-center justify-center rounded-full shadow"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Input Section */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        {/* Input Field */}
        <div className="flex items-center w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow-md px-4 py-2">
  <input
    type="text"
    placeholder="Type a message..."
    value={text}
    onChange={(e) => {
      setText(e.target.value);
      handleTyping();
    }}
    className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
  />
  <button
    type="button"
    className="text-gray-500 dark:text-gray-300 hover:text-blue-500 transition pl-2"
    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
  >
    <Smile size={20} />
  </button>
  <button
    type="button"
    className="text-gray-500 dark:text-gray-300 hover:text-blue-500 transition pl-2"
    onClick={() => {
      setShowGifPicker(!showGifPicker);
      if (!showGifPicker) fetchTenorGifs();
    }}
  >
    <img src="/gif.png" alt="GIF" className="w-6 h-6" />
  </button>
  <button
    type="button"
    className="text-gray-500 dark:text-gray-300 hover:text-blue-500 transition pl-2"
    onClick={() => fileInputRef.current?.click()}
  >
    <ImagePlusIcon size={20} />
  </button>
</div>



        {/* Send Button */}
        <button
          type="submit"
          className={`w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition
            ${text.trim() || imagePreview || gifPreview ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!text.trim() && !imagePreview && !gifPreview}
        >
          <SendHorizontalIcon size={20} className="text-white" />
        </button>
      </form>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-20 left-4 bg-base-100 rounded-lg shadow-lg p-4">
          <EmojiPicker
            onEmojiClick={(emojiObject) => {
              setText((prevText) => prevText + emojiObject.emoji);
              setShowEmojiPicker(false);
            }}
          />
        </div>
      )}

      {/* GIF Picker */}
      {showGifPicker && (
            <div className="absolute bottom-16 right-4 bg-base-100 p-4 rounded-lg shadow-lg max-h-80 w-80 overflow-y-auto">
              <div className="grid grid-cols-3 gap-2">
                {gifs.map((gif) => (
                  <img
                    key={gif.id}
                    src={gif.media_formats.gif.url}
                    alt={gif.content_description}
                    className="cursor-pointer rounded-md"
                    onClick={() => handleGifClick(gif.media_formats.gif.url)}
                  />
                ))}
              </div>
            </div>
          )}

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default MessageInputField;
