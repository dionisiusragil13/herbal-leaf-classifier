import React from 'react';

const ListData = () => {
  // Data untuk setiap card - bisa diubah sesuai kebutuhan
  const plantData = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09',
      title: 'Lidah Buaya',
      description: 'Tanaman obat yang bermanfaat'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f',
      title: 'Mawar',
      description: 'Bunga cantik beraroma harum'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc',
      title: 'Melati',
      description: 'Bunga putih beraroma khas'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b',
      title: 'Anggrek',
      description: 'Tanaman hias yang elegan'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1446071103084-c257b5f70672',
      title: 'Kaktus',
      description: 'Tanaman tahan kekeringan'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411',
      title: 'Lavender',
      description: 'Bunga ungu harum menenangkan'
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8',
      title: 'Monstera',
      description: 'Tanaman hias daun bolong'
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a',
      title: 'Bambu',
      description: 'Tanaman pembawa keberuntungan'
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1466378108624-92629be98501',
      title: 'Sirih Gading',
      description: 'Pembersih udara alami'
    },
    {
      id: 10,
      image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc',
      title: 'Puring',
      description: 'Tanaman hias berdaun warna-warni'
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-green-950 to-green-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* Grid Container */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {plantData.map((plant) => (
            <div
              key={plant.id}
              className="bg-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              {/* Image Container */}
              <div className="aspect-square overflow-hidden bg-gray-300">
                <img
                  src={plant.image}
                  alt={plant.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              {/* Title */}
              <div className="p-4 bg-white">
                <h3 className="text-center font-semibold text-gray-800 text-sm md:text-base">
                  {plant.title}
                </h3>
                <p className="text-center text-xs text-gray-600 mt-1">
                  {plant.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListData;