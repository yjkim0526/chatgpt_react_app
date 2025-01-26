import React, { useState } from "react";
import "./index.css"; // CSS 파일 임포트

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState([]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleButtonClick = async () => {
    // OpenAI API 요청 코드

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: message,
      }),
      //redirect: "follow",
    };

    try {
      // const result = await fetch("http://localhost:4000/ask", requestOptions) ;
      const result = await fetch(
        "http://15.164.221.216:4000/ask",
        requestOptions
      );
      const data = await result.json();
      console.log(">> data : " + data.response);

      setResponse([
        {
          writer: "질문",
          content: `${message}`,
        },
        {
          writer: "응답",
          content: `${data.response}`,
        },
        ...response,
      ]);
    } catch (err) {
      console.error("Error:", err);
      return "Error: OpenAI API";
    }
  };

  return (
    <div className="main">
      <div className="container">
        <h3 className="title">CahtGpt에게 질문하기 (이모티콘으로 응답)</h3>
        <textarea
          value={message}
          onChange={handleMessageChange}
          placeholder="Enter your message"
          rows="4"
        />
        <button onClick={handleButtonClick}>Send</button>
        <div className="reply">
          {response.map((item, idx) => {
            return (
              <p key={idx}>
                <span
                  style={{
                    color: item.writer === "질문" ? "blue" : "green",
                    "font-weight": "bold",
                    "margin-top": "2px",
                  }}
                >
                  {item.writer}
                </span>{" "}
                :{" "}
                <span className={item.writer === "응답" ? "reply_writer" : ""}>
                  {item.content}
                </span>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
