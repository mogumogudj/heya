import React from 'react';
import '../css/article.css';

const Article = ({ type }) => {
  return (
    <article className='article'>
        {type && (
            <>
            {type === 'Left' && <div>svg nog toevoegen</div>}
            {type === 'Right' && 
            <svg className='article__svg' viewBox="0 0 592 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <clipPath id="shapeClipPath">
                    <path d="M592 8C592 3.58173 588.418 0 584 0H7.99998C3.5817 0 -1.71661e-05 3.58172 -1.71661e-05 8V271.064C-1.71661e-05 275.457 3.60977 279.03 8.00276 279.057C232.085 280.451 361.04 263.183 587.138 165.115C590.057 163.849 592 160.943 592 157.761V8Z"/>
                    </clipPath>
                </defs>
                <image className='svg__image' href="../../ArticleImage.webp" clip-path="url(#shapeClipPath)" />
                <path d="M592 8C592 3.58173 588.418 0 584 0H7.99998C3.5817 0 -1.71661e-05 3.58172 -1.71661e-05 8V271.064C-1.71661e-05 275.457 3.60977 279.03 8.00276 279.057C232.085 280.451 361.04 263.183 587.138 165.115C590.057 163.849 592 160.943 592 157.761V8Z" fill="none"/>
            </svg>
            }
            {type === 'Default' && <div className='article__image'></div>}
            </>
        )}
        <div className='article__content'>
            <h4 className='article__title'>News article title</h4>
            <p className='article__description'>
            A small description about the article. Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
            <span className="article__ellipsis">...</span>
            </p>
            <a href="#" className="article__link">Read more</a>
        </div>
    </article>
  );
}

export default Article;