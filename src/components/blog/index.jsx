import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.scss';

export default function blog() {
  const categoriesList = [
    {name: 'cat 1'},
    {name: 'cat 2'},
    {name: 'cat 3'},
    {name: 'cat 4'},
    {name: 'cat 5'},
    {name: 'cat 7'},
    {name: 'cat 8'},
    {name: 'cat 9'},
  ];
  const renderCatigories = () => {
    const settings = {
      dots: true,
      infinite: true,
      arrows: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
    };
    const categories = categoriesList.map((cat) => (
      <div class='swiper-wrapper'>
        <div class='swiper-slide'>
          <a class='slider-category' href='{{ category.get_absolute_url }}'>
            <div class='category-image'>
              <img
                src='{{ category.image.url }}'
                alt='Blog Image'
                width='352'
                height='235'
              />
            </div>

            <div class='category'>
              <h3>
                <b>{cat.name} </b>
              </h3>
            </div>
          </a>
        </div>
      </div>
    ));
    return (
      <div>
        <h2> Single Item</h2>
        <Slider {...settings}>{categories}</Slider>
      </div>
    );
  };
  return (
    <div>
      {renderCatigories()}
      <section className='hero is-info is-medium is-bold'>
        <div className='hero-body'>
          <div className='container has-text-centered'>
            <h1 className='title'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              <br />
              sed eiusmod tempor incididunt ut labore et dolore magna aliqua
            </h1>
          </div>
        </div>
      </section>

      <div class='container'>
        <section class='articles'>
          <div class='column is-8 is-offset-2'>
            <div class='card article'>
              <div class='card-content'>
                <div class='media'>
                  <div class='media-content has-text-centered'>
                    <p class='title article-title'>
                      Introducing a new feature for paid subscribers
                    </p>
                    <div class='tags has-addons level-item'>
                      <span class='tag is-rounded is-info'>@skeetskeet</span>
                      <span class='tag is-rounded'>May 10, 2018</span>
                    </div>
                  </div>
                </div>
                <div class='content article-body'>
                  <p>
                    Non arcu risus quis varius quam quisque. Dictum varius duis
                    at consectetur lorem. Posuere sollicitudin aliquam ultrices
                    sagittis orci a scelerisque purus semper.{' '}
                  </p>
                  <p>
                    Metus aliquam eleifend mi in nulla posuere sollicitudin
                    aliquam ultrices. In hac habitasse platea dictumst
                    vestibulum rhoncus est pellentesque elit. Accumsan lacus vel
                    facilisis volutpat. Non sodales neque sodales ut etiam. Est
                    pellentesque elit ullamcorper dignissim cras tincidunt
                    lobortis feugiat vivamus.
                  </p>
                  <h3 class='has-text-centered'>
                    How to properly center tags in bulma?
                  </h3>
                  <p>
                    {' '}
                    Proper centering of tags in bulma is done with class:{' '}
                    <pre>level-item</pre>
                    Voluptat ut farmacium tellus in metus vulputate. Feugiat in
                    fermentum posuere urna nec. Pharetra convallis posuere morbi
                    leo urna molestie. Accumsan lacus vel facilisis volutpat est
                    velit egestas. Fermentum leo vel orci porta. Faucibus
                    interdum posuere lorem ipsum.
                  </p>
                </div>
              </div>
            </div>

            <div class='card article'>
              <div class='card-content'>
                <div class='media'>
                  <div class='media-center'>
                    <img
                      src='http://www.radfaces.com/images/avatars/daria-morgendorffer.jpg'
                      class='author-image'
                      alt='Placeholder image'
                    />
                  </div>
                  <div class='media-content has-text-centered'>
                    <p class='title article-title'>
                      Sapien eget mi proin sed 🔱
                    </p>
                    <p class='subtitle is-6 article-subtitle'>
                      <a href='#'>@daria</a> on February 17, 2018
                    </p>
                  </div>
                </div>
                <div class='content article-body'>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Accumsan lacus vel facilisis volutpat est velit
                    egestas. Sapien eget mi proin sed. Sit amet mattis vulputate
                    enim.
                  </p>
                  <p>
                    Commodo ullamcorper a lacus vestibulum sed arcu. Fermentum
                    leo vel orci porta non. Proin fermentum leo vel orci porta
                    non pulvinar. Imperdiet proin fermentum leo vel. Tortor
                    posuere ac ut consequat semper viverra. Vestibulum lectus
                    mauris ultrices eros.
                  </p>
                  <h3 class='has-text-centered'>
                    Lectus vestibulum mattis ullamcorper velit sed ullamcorper
                    morbi. Cras tincidunt lobortis feugiat vivamus.
                  </h3>
                  <p>
                    In eu mi bibendum neque egestas congue quisque egestas diam.
                    Enim nec dui nunc mattis enim ut tellus. Ut morbi tincidunt
                    augue interdum velit euismod in. At in tellus integer
                    feugiat scelerisque varius morbi enim nunc. Vitae suscipit
                    tellus mauris a diam. Arcu non sodales neque sodales ut
                    etiam sit amet.
                  </p>
                </div>
              </div>
            </div>

            <section class='hero is-info is-bold is-small promo-block'>
              <div class='hero-body'>
                <div class='container'>
                  <h1 class='title'>
                    <i class='fa fa-bell-o'></i> Nemo enim ipsam voluptatem
                    quia.
                  </h1>
                  <span class='tag is-black is-medium is-rounded'>
                    Natus error sit voluptatem
                  </span>
                </div>
              </div>
            </section>

            <div class='card article'>
              <div class='card-content'>
                <div class='media'>
                  <div class='media-center'>
                    <img
                      src='http://www.radfaces.com/images/avatars/angela-chase.jpg'
                      class='author-image'
                      alt='Placeholder image'
                    />
                  </div>
                  <div class='media-content has-text-centered'>
                    <p class='title article-title'>
                      Cras tincidunt lobortis feugiat vivamus.
                    </p>
                    <p class='subtitle is-6 article-subtitle'>
                      <a href='#'>@angela</a> on October 7, 2017
                    </p>
                  </div>
                </div>
                <div class='content article-body'>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Accumsan lacus vel facilisis volutpat est velit
                    egestas. Sapien eget mi proin sed. Sit amet mattis vulputate
                    enim.
                  </p>
                  <p>
                    Commodo ullamcorper a lacus vestibulum sed arcu. Fermentum
                    leo vel orci porta non. Proin fermentum leo vel orci porta
                    non pulvinar. Imperdiet proin fermentum leo vel. Tortor
                    posuere ac ut consequat semper viverra. Vestibulum lectus
                    mauris ultrices eros.
                  </p>
                  <h3 class='has-text-centered'>
                    “Everyone should be able to do one card trick, tell two
                    jokes, and recite three poems, in case they are ever trapped
                    in an elevator.”
                  </h3>
                  <p>
                    In eu mi bibendum neque egestas congue quisque egestas diam.
                    Enim nec dui nunc mattis enim ut tellus. Ut morbi tincidunt
                    augue interdum velit euismod in. At in tellus integer
                    feugiat scelerisque varius morbi enim nunc. Vitae suscipit
                    tellus mauris a diam. Arcu non sodales neque sodales ut
                    etiam sit amet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
