import { Navigate, useParams } from 'react-router-dom';
import articles from './articleContent';
import './impmedicinedonstyle.css';

function ArticleDetail() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return <Navigate to="/Articlespage" />;
  }

  return (
    <>
      <section className="iheader">
        <div className="itext-box">
          <h1>{article.title}</h1>
        </div>
      </section>
      <div className="icontainer">
        <img src={article.image} alt={article.imageAlt} style={{ maxWidth: '300px', height: 'auto' }} />
        <p>{article.intro}</p>
        <p>{article.listIntro}</p>
        <ul>
          {article.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p>{article.closing}</p>
      </div>
    </>
  );
}

export default ArticleDetail;
