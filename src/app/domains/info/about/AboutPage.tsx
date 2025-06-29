'use client';

import Image from 'next/image';

export default function AboutPage() {
  const stats = [
    {
      number: '10.5k',
      description: 'Sellers active our site',
      bgColor: 'bg-gray-100',
      symbol: '🏪',
    },
    {
      number: '33k',
      description: 'Monthly Product Sale',
      bgColor: 'bg-gray-100',
      symbol: '💰',
    },
    {
      number: '45.5k',
      description: 'Customer active in our site',
      bgColor: 'bg-gray-100',
      symbol: '👥',
    },
    {
      number: '25k',
      description: 'Annual gross sale in our site',
      bgColor: 'bg-gray-100',
      symbol: '💳',
    },
  ];

  const team = [
    {
      name: 'Tom Cruise',
      position: 'Founder & Chairman',
      image: 'https://picsum.photos/seed/tom/300/400',
      social: {
        twitter: '#',
        instagram: '#',
        linkedin: '#',
      },
    },
    {
      name: 'Emma Watson',
      position: 'Managing Director',
      image: 'https://picsum.photos/seed/emma/300/400',
      social: {
        twitter: '#',
        instagram: '#',
        linkedin: '#',
      },
    },
    {
      name: 'Will Smith',
      position: 'Product Designer',
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
      title: 'FREE AND FAST DELIVERY',
      description: 'Free delivery for all orders over $140',
      symbol: '🚚',
    },
    {
      title: '24/7 CUSTOMER SERVICE',
      description: 'Friendly 24/7 customer support',
      symbol: '📞',
    },
    {
      title: 'MONEY BACK GUARANTEE',
      description: 'We return money within 30 days',
      symbol: '🛡️',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-20">
      <nav className="mb-8 text-sm">
        <span className="text-gray-500">Home</span>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-black">About</span>
      </nav>

      <section className="mb-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-black lg:text-5xl">
            Our Story
          </h1>
          <div className="space-y-4 text-gray-600">
            <p>
              {` Launched in 2015, Exclusive is South Asia's premier online
              shopping marketplace with an active presence in Bangladesh.
              Supported by wide range of tailored marketing, data and service
              solutions, Exclusive has 10,500 sellers and 300 brands and serves
              3 millions customers across the region.`}
            </p>
            <p>
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assortment in categories
              ranging from consumer.
            </p>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src="https://picsum.photos/seed/shopping-women/600/450"
            alt="Two women shopping with colorful shopping bags"
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
