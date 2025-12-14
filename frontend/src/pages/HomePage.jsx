import React from "react";
import HerbalFeatures from "../components/HomeCard";
import TextWithHighlight from "../components/HighLightedText";
import ListData from "../components/ListData";
import ScrollAnimation from "../components/ScrollAnimation";
import StepProcess from "../components/StepProcess";

function HomePage() {
  return (
    <div className="min-h-screen">
      <div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] 
                  bg-green-400/30 rounded-full blur-[150px]"/>
      <div className=" top-20 flex items-center justify-center gap-30 min-h-screen">
        <div className="mb-30">
          <div className="mb-5 text-[40px] font-bold">
            <h1>
              <TextWithHighlight
                text={`Deteksi Daun Herbal, \n Selangkah Lebih Akurat`}
                wordsToHighlight={["Deteksi", "Akurat"]}/>
            </h1>
          </div>
          <p className="leading text">
            LeafSense menghadirkan keahlian botani langsung ke perangkat Anda.
            <br />
            Cukup jepret foto, dan dapatkan identifikasi instan serta wawasan
            <br />
            tentang daun herbal di sekitar Anda</p>
        </div>
        <img src="home.png" className="w-130 h-130" />
      </div>
      <HerbalFeatures />
      <div className="flex justify-center my-5">
        <h1 className="font-bold text-[25px] text-white">Lingkup Data</h1>
      </div>
      <ListData />
      <ScrollAnimation />
      <StepProcess />
    </div>
  );
}

export default HomePage;
