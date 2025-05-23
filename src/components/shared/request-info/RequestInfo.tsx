import { useEffect, useState } from "react";
import { tesloApi } from "../../../api/teslo.api";

export const RequestInfo = () => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    tesloApi
      .get("/auth/private")
      .then((res) => {
        console.log(res)
        setInfo(res.data);
      })
      .catch(() => {
        setInfo("Error");
      });
  }, []);

  return (
    <>
      <h2>Información</h2>
      <pre>{JSON.stringify(info, null, 2)}</pre>
    </>
  );
};
