import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Introduction from "./../common/Introduction";

function CharacterPage() {
  // *** CUSTOM_HOOK ***

  const [searchParams] = useSearchParams();

  const [introduction, setIntroduction] = useState(null);

  const query = searchParams.get("type");

  console.log(query);

  useEffect(() => {
    axios
      .get("http://localhost:3000/app-introduction")
      .then(({ data }) => {
        const introData = Object.values(data).find(
          (intro) => intro.id === query || null
        );

        // console.log(introData);

        setIntroduction(introData);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(introduction);
  // console.log(introduction.firstPage);

  // *** CUSTOM_HOOK ***

  return (
    <section className="min-h-screen px-4">
      <div className="flex flex-col">
        <Introduction introduction={introduction} />
      </div>
    </section>
  );
}

export default CharacterPage;
