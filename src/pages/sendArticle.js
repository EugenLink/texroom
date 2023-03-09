import { Tiptap } from "@/components/Editor/Editor.js";
import styles from "@/styles/Home.module.css";
import parse from "html-react-parser";
import Head from "next/head";
import { useState } from "react";
import ReactDOMServer from "react-dom/server";
import Header from "../components/Header/Header";
import Footer from "./../components/Footer/Footer";

export default function Test() {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  return (
    <div>
      <Head>
        <title>Texnika Room</title>
        <meta name="description" content="Шоурум бытовой техники" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <Tiptap setDescription={setDescription} images={setImages} />
        <button
          onClick={() => {
            const id = Date.now();
            const html = parse(description, {
              replace: (domNode) => {
                if (domNode.attribs && domNode.name === "img") {
                  const alt = domNode.attribs.alt;

                  return (
                    <div
                      alt={alt}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={`https://volga24bot.com/cgi-bin/articles/photos/${id
                          .toString()
                          .substring(5)}/${alt}`}
                        alt={alt}
                      />
                    </div>
                  );
                }
              },
            });
            if (html.length) {
              const names = html?.map((el) => el.props.alt);

              const filtredImages = images.filter((el) => {
                return names.includes(el.name);
              });
              const htmlString = ReactDOMServer.renderToString(html);

              let formData = new FormData();

              filtredImages.forEach((el) => {
                formData.append(el.name, el);
              });

              formData.append("title", "Как отмыть газовую поверхность?");

              formData.append("id", id.toString().substring(5));
              formData.append("content", htmlString);
              formData.append("images", filtredImages);
              formData.append(
                "previewText",
                "При постоянном уходе за газовой поверхностью, проблем с уборкой возникнуть не должно. С небольшими загрязнениями легко справится любой мыльный раствор.Но, бывают ситуации, когда жир уже успел высохнуть и хорошенько впитаться в поверхность.В таких случаях мы удаляем крышки-конфорки и решетку. Замачиваем их в горячей воде на 5 минут и с помощью мыльной губки снимаем загрязнения.А саму газовую поверхность моем со специальным пастообразным средством для плит (например, Cif). Порошкообразные средства могут поцарапать поверхность, поэтому их мы не рекомендуем."
              );
              formData.append("author", "Texnika Room");
              fetch("https://volga24bot.com/cgi-bin/articles/push.php", {
                method: "POST",
                body: formData,
              });
            }
          }}
        >
          Save
        </button>
      </main>
      <Footer />
    </div>
  );
}
