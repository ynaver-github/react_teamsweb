import { useEffect } from "react";

function Toast({ setToast, duration, text }) {

  console.log("duration: " + duration);
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [setToast, duration]);

  return (
    <>
    <div>
    {/* // 재사용성을 위해 토스트의 내용도 prop로 내려줌 */}
      <p>{text}</p> 
    </div>
    </>
  );
}

export default Toast;