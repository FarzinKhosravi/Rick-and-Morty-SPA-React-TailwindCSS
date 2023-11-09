import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useFetchIntroductionData(defaultQuery = null) {
  const [searchParams] = useSearchParams();

  const [introduction, setIntroduction] = useState(null);

  const query = searchParams.get("type");

  useEffect(() => {
    axios
      .get("http://localhost:3000/app-introduction")
      .then(({ data }) => {
        const introData = Object.values(data).find(
          (intro) => intro.id === query || defaultQuery
        );

        setIntroduction(introData);
      })
      .catch((err) => console.log(err));
  }, []);

  return introduction;
}
