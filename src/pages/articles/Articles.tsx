import { useEffect, useState } from 'react'
import { HiPlus } from 'react-icons/hi'
import ArticleCard from './ArticleCard'
import { useApi } from '../../hooks/useApi';
import { Article } from '../../models/articles';

function Articles() {

  const { fetchArticles } = useApi();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() =>{
    loadArticles();
  }, []);

  const loadArticles = async () => {
    const result = await fetchArticles();
    if (Array.isArray(result) && result[0] === "success") {
      setArticles(result[1]);
      console.log(articles);
      
    } else {
      console.error("Failed to fetch articles:", result);
    }
  };

  return (
    <div>
          <div className='flex justify-between'>
          <h1 className="text-xl font-semibold text-primary-700 font-Nexa">Articles</h1>
          <span className="text-sm mt-1 font-Nexa text-gray-600">
            Published Articles: <span className="font-bold text-gray-700">{articles.filter((a)=>a.active).length}</span>
          </span>
          </div>
          <hr className="h-0.5 my-4 bg-gray-200 border-0 rounded dark:bg-gray-700" />
          <button type="button" className="font-Montserrat font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 me-2 mb-8 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex"><HiPlus size={20} className="text-white mr-1" /> New Article</button>

            
         {articles.map(article => <ArticleCard key={article.id} article={article}></ArticleCard>)}
          
      </div>
  )
}

export default Articles