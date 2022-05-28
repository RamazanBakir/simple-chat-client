import React, { useState } from "react";
import { useChat } from "../contexts/ChatContext";
import { sendMessage } from "../socketApi";
import { Button } from "@progress/kendo-react-buttons";
import Picker from 'emoji-picker-react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Form() {
  const { setChat } = useChat();
  const [text, setText] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setText(chosenEmoji.emoji);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      return;
    }

    setChat((prev) => [...prev, { text, isFromMe: true }]);
    sendMessage(text);
    setText("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} style={{display:"flex;"}}>
        <input
          className="message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
            className="buttons-container-button"
        >
          <ArrowForwardIcon/>
        </Button>
      </form>
      <Picker style={{width:"100% !important;"}} onEmojiClick={onEmojiClick} />

    </div>
  );
}

export default Form;
