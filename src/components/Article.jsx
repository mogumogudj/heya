import '../css/article.css';

const Article = () => {
  return (
    <article className='article'>
        <div className='article__image'></div>
        <div className='article__content'>
            <h4 className='article__title'>News article title</h4>
            <p className='article__description'>A small description about the article. Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                <span class="article__ellipsis">...</span>
            </p>
            <a href="#" class="article__link">Read more</a>
        </div>
    </article>
  );
}

export default Article;