import {useEffect, useRef} from "react";

interface EmojiPickerProps {
  onSelectEmoji: (emoji: string) => void;
  onClose: () => void;
}

export default function EmojiPicker({onSelectEmoji, onClose}: EmojiPickerProps) {
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const commonEmojis = [
    "😊",
    "😂",
    "❤️",
    "👍",
    "😍",
    "🙏",
    "😭",
    "🥰",
    "😘",
    "🤔",
    "😅",
    "😁",
    "👏",
    "🎉",
    "🔥",
    "💯",
    "✨",
    "⭐",
    "🌟",
    "💖",
    "💕",
    "💓",
    "💗",
    "💙",
    "💚",
    "💛",
    "💜",
    "🖤",
    "💝",
    "💞",
    "💫",
    "🌈",
    "🤗",
    "🤭",
    "🤫",
    "🤐",
    "🤨",
    "😏",
    "😒",
    "😞",
    "😔",
    "😟",
    "😕",
    "🙁",
    "☹️",
    "😣",
    "😖",
    "😫",
    "😩",
    "🥺",
    "😢",
    "😤",
    "😠",
    "😡",
    "🤬",
    "😈",
    "👿",
    "💀",
    "☠️",
    "💩",
    "🤡",
    "👻",
    "👽",
    "👾",
  ];

  return (
    <div ref={pickerRef} className="absolute bottom-20  bg-white rounded-lg shadow-lg p-3 z-10 w-72">
      <div className="grid grid-cols-8 gap-2">
        {commonEmojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => onSelectEmoji(emoji)}
            className="text-2xl hover:bg-gray-100 rounded p-1 transition-colors">
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
