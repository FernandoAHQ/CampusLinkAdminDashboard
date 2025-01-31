import { Button } from 'flowbite-react'
import React from 'react'
import { Article } from '../../models/articles'
import { Link } from 'react-router-dom'



function ArticleCard({article}:{article:Article}) {
  return (
    <div className='rounded-lg border-1 shadow-md flex flex-col p-3 group' >
        <div className='flex justify-between mb-3'>
            <div className=''>
            
            {article.tags.map((tag, index) =><span key={index} className='text-xs text-primary-700 font-semibold bg-primary-100 rounded py-0.5 px-1.5 mr-1'>{tag}</span>)}
            </div>
            <span className='text-sm font-Montserrat text-gray-500'>{new Date(article.created_at).toLocaleDateString()
            }</span>
        </div>
        <span className='text-xl font-semibold font-Montserrat mb-2'>{article.title}</span>
        <div className="flex">
  <img
    src={article.image_url}
    alt=""
    className="w-1/4 h-auto max-h-40"
  />
  <p className="text-gray-500 font-NexaThin font-semibold overflow-hidden px-4 line-clamp-3">
    {article.content}
  </p>
</div>
<div className='flex justify-end invisible group-hover:visible mt-2'>
<Link to={`edit?id=${article.id}`}>
  <button type="button" className="  text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">Edit</button>
</Link>
<button type="button" className=" text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Delete</button>

</div>

    </div>
  )
}

export default ArticleCard