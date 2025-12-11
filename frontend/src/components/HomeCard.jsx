import { useEffect } from "react";
import { CheckCheck, Database, Zap, TriangleAlert } from "lucide-react";

function HerbalFeatures() {
  const features = [
    {
      icon: <CheckCheck color="#215e28" strokeWidth={1.75} />,
      title: "High Accuracy",
      desc: "CNN + Attention menghasilkan prediksi daun yang akurat.",
    },
    {
      icon: <Database color="#215e28" strokeWidth={1.75} />,
      title: "Herbal Database",
      desc: "Kumpulan data daun herbal lengkap dan informatif.",
    },
    {
      icon: <Zap color="#215e28" strokeWidth={1.75} />,
      title: "Real-Time Result",
      desc: "Dapatkan hasil klasifikasi dalam hitungan detik.",
    },
    {
      icon: <TriangleAlert color="#215e28" strokeWidth={1.75} />,
      title: "Error Insight",
      desc: "Memberikan penjelasan terkait risiko salah identifikasi.",
    },
  ];

  return (
    <div className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        {features.map((item, index) => (
          <div
            key={index}
            data-aos="zoom-in"
            data-aos-delay={index * 100} // Delay bertahap untuk efek berurutan
            data-aos-mirror="true"
            data-aos-once="false"
            className="card p-5 border border-green-600 rounded-xl bg-white"
          >
            <div className="flex items-center gap-4 mb-5">
              <span className="text-green-700">{item.icon}</span>
              <h2 className="text-lg text-[20px] font-semibold text-green-800">
                {item.title}
              </h2>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed text-[15px]">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HerbalFeatures;
