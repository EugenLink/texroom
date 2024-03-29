import BreadcrumbDinamic from "@/components/Breadcrumb/Breadcrumb.jsx";
import styles from "@/styles/Catalog.module.scss";

import NewsCard from "@/components/ChapterCard/NewsCard.jsx";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router.js";

export default function News({ data }) {
  const router = useRouter();

  const { asPath } = router;
  const path = asPath.split("?")[0];
  return (
    <div>
      <Head>
        <title>Новости</title>
        <meta name="description" content="Новости Texnika Room" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.contentWrapper}>
        <Header />
        <main className={styles.catalogWrapper}>
          <div className={styles.breadCrumb}>
            <BreadcrumbDinamic />
          </div>
          <h2 className={styles.title}>НОВОСТИ</h2>
          <div className={styles.cardWrapper}>
            {data.map((el) => {
              return (
                <NewsCard
                  key={el[0]}
                  src={`https://u1978287.isp.regruhosting.ru/news/photos/${el[0]}/logo.png`}
                  text={el[1]}
                  date={moment(el[3]).format("DD.MM.YYYY HH:mm")}
                  link={`${path}/${el[0]}?name=${el[1]}`}
                />
              );
            })}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `https://u1978287.isp.regruhosting.ru/news/getAllNews.php`
  );

  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
