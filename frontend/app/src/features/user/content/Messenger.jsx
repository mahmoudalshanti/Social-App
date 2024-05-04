import { useState } from "react";
import AsideMessenger from "../../../components/AsideMessenger";
import ContentMessenger from "../../../components/ContentMessenger";

const Messenger = () => {
  const [messenger, setMessenger] = useState(null);
  let content = (
    <main className="messenger">
      <section className="aside">
        <AsideMessenger setMessenger={setMessenger} />
      </section>
      <section className="content">
        <ContentMessenger messenger={messenger} />
      </section>
    </main>
  );

  return content;
};

export default Messenger;
