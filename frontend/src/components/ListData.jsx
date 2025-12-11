import React from "react";

const ListData = () => {
  // Data untuk setiap card - bisa diubah sesuai kebutuhan
  const plantData = [
    {
      id: 1,
      image: "./lidahbuaya.jpg",
      title: "Lidah Buaya",
      description: "Obat Gerd, luka bakar, gula darah, antioksidan",
    },
    {
      id: 2,
      image: "Sirih.webp",
      title: "Sirih",
      description: "anti-septik, membantu penyembuhan luka",
    },
    {
      id: 3,
      image: "BelimbingWuluh.png",
      title: "Belimbing Wuluh",
      description: "menurunkan tekanan darah, mengontrol gula darah",
    },
    {
      id: 4,
      image: "JambuBiji.jpg",
      title: "Jambu Biji",
      description: "kaya vitamin C dan serat, meningkatkan imunitas",
    },
    {
      id: 5,
      image: "JerukNipis.webp",
      title: "Jeruk Nipis",
      description: "antioksidan, mencegah batu ginjal, meredakan flu",
    },
    {
      id: 6,
      image: "Kemangi.jpg",
      title: "Kemangi",
      description: "anti-inflamasi, dan antibakteri, menjaga kesehatan jantung",
    },
    {
      id: 7,
      image: "Nangka.jpg",
      title: "Nangka",
      description: "menyembuhkan luka, mengontrol gula darah, meredakan peradangan",
    },
    {
      id: 8,
      image: "Pandan.jpg",
      title: "Pandan",
      description: "pereda nyeri sendi dan otot, penjaga kesehatan mata dan kulit",
    },
    {
      id: 9,
      image: "Pepaya.webp",
      title: "Pepaya",
      description: "Pencernaan, meningkatkan trombosit, potensi anti-cancer",
    },
    {
      id: 10,
      image: "Seledri.webp",
      title: "Seledri",
      description: "melawan radikal bebas, mendukung kesehatan jantung dan ginjal",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-green-950 to-green-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {plantData.map((plant) => (
            <div
              key={plant.id}
              className="bg-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="aspect-square overflow-hidden bg-gray-300">
                <img
                  src={plant.image}
                  alt={plant.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>

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
