import React from 'react';
import HomeLinkCard from '../Cards/HomeLinkCard';

function Home(props) {

  const array = [
    {
      id: 1,
      link: '/map',

      title: 'Карта склонов',
      img: '/homepage/6.jpeg'
    },
    {
      id: 2,
      link: '/corporate',
      title: 'Корпоративный отдых',
      img: '/homepage/2.jpg'
    },
    {
      id: 3,
      link: '/restaurants',
      title: 'Рестораны',
      img: '/homepage/3.jpg'
    },
  ];

  return (
    <>
      <div className="grow  text-white flex justify-center items-center text-7xl">
        <span className="text-center font-black">Снежный образ жизни</span>
      </div>
      <div className="overflow-x-auto mb-2 mx-2 self-stretch rounded-lg">
        <div className="flex gap-2 w-fit  self-start">
          {array.map((obj) => <HomeLinkCard key={obj.id} obj={obj} />)}
        </div>
      </div>
    </>
  );
}

export default Home;
