import { useEffect } from "react";

const Historic = ({id}) => {

  useEffect(() => {
    console.log(id);
  }, [id]);

  return(
    <>
      <h1>Historic</h1>
    </>
  )
}

export default Historic;
