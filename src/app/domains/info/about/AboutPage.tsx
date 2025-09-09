'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('AboutPage');
  
  const stats = [
    {
      number: '10.5k',
      description: t('sellersActive'),
      bgColor: 'bg-gray-100',
      symbol: '🏪',
    },
    {
      number: '33k',
      description: t('monthlyProductSale'),
      bgColor: 'bg-gray-100',
      symbol: '💰',
    },
    {
      number: '45.5k',
      description: t('customerActive'),
      bgColor: 'bg-gray-100',
      symbol: '👥',
    },
    {
      number: '25k',
      description: t('annualGrossSale'),
      bgColor: 'bg-gray-100',
      symbol: '💳',
    },
  ];

  const team = [
    {
      name: t('tomCruise'),
      position: t('founderChairman'),
      image: 'https://picsum.photos/seed/tom/300/400',
      social: {
        twitter: '#',
        instagram: '#',
        linkedin: '#',
      },
    },
    {
      name: t('emmaWatson'),
      position: t('managingDirector'),
      image: 'https://picsum.photos/seed/emma/300/400',
      social: {
        twitter: '#',
        instagram: '#',
        linkedin: '#',
      },
    },
    {
      name: t('willSmith'),
      position: t('productDesigner'),
      image: 'https://picsum.photos/seed/will/300/400',
      social: {
        twitter: '#',
        instagram: '#',
        linkedin: '#',
      },
    },
  ];

  const services = [
    {
      title: t('freeDeliveryTitle'),
      description: t('freeDeliveryDesc'),
      symbol: '🚚',
    },
    {
      title: t('customerServiceTitle'),
      description: t('customerServiceDesc'),
      symbol: '📞',
    },
    {
      title: t('moneyBackTitle'),
      description: t('moneyBackDesc'),
      symbol: '🛡️',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-20">
      <nav className="mb-8 text-xl">
        <span className="text-gray-500">{t('home')}</span>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-black">{t('about')}</span>
      </nav>

      <section className="mb-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-black lg:text-5xl">
            {t('ourStory')}
          </h1>
          <div className="space-y-4 text-gray-600">
            <p>
              {t('storyParagraph1')}
            </p>
            <p>
              {t('storyParagraph2')}
            </p>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src="https://picsum.photos/seed/shopping-women/600/450"
            alt={t('shoppingWomenAlt')}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="mb-20">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-lg border p-8 text-center transition-all hover:shadow-lg ${
                stat.bgColor === 'bg-red-500'
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-black hover:bg-red-500 hover:text-white'
              }`}
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black/10 text-2xl">
                {stat.symbol}
              </div>
              <div className="text-2xl font-bold lg:text-3xl">
                {stat.number}
              </div>
              <div className="mt-2 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {team.map((member, index) => (
            <div key={index} className="group text-center">
              <div className="relative mb-6 aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold text-black">
                {member.name}
              </h3>
              <p className="mb-4 text-gray-600">{member.position}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-black text-3xl text-white">
                {service.symbol}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
