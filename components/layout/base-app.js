import { useSelector, useDispatch } from "react-redux";
import Alert from "../ui/message/alert";

const BaseApp = ({ children }) => {
  return (
    <>
      {children}
      <Alert />
    </>
  );
}

export default BaseApp;