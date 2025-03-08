import chat from "../assets/icon/Chat.png"

const FAQ = () => {
  const itemMelanoma = [
    {
      title: "Apa itu melanoma?",
      desription:
        "Melanoma adalah jenis kanker kulit yang paling serius. Melanoma terjadi ketika sel-sel pigmentasi kulit yang disebut melanosit berubah menjadi sel-sel kanker. Melanoma dapat terjadi di kulit mana pun, tetapi melanoma yang terjadi di bagian tubuh yang tidak terpapar sinar matahari seringkali lebih serius.",
    },
    {
      title: "Apa saja gejala Melanoma?",
      desription:
        "Gejala melanoma dapat meliputi munculnya tahi lalat baru atau perubahan pada tahi lalat yang sudah ada. Ciri-ciri tahi lalat yang mencurigakan termasuk bentuk yang tidak simetris, tepi yang tidak rata, warna yang tidak seragam, diameter lebih besar dari 6 mm, dan perubahan bentuk, ukuran, atau warna.",
    },
    {
      title: "Bagaimana pengobatan untuk melanoma?",
      desription:
        "Gejala melanoma dapat meliputi munculnya tahi lalat baru atau perubahan pada tahi lalat yang sudah ada. Ciri-ciri tahi lalat yang mencurigakan termasuk bentuk yang tidak simetris, tepi yang tidak rata, warna yang tidak seragam, diameter lebih besar dari 6 mm, dan perubahan bentuk, ukuran, atau warna.",
    },
    {
      title: "Bagaimana cara mencegah melanoma?",
      desription:
        "Pencegahan melanoma meliputi menghindari paparan sinar matahari yang berlebihan, terutama pada jam-jam terik. Gunakan tabir surya dengan SPF tinggi, kenakan pakaian pelindung, dan hindari penggunaan tanning bed. Selain itu, periksa kulit secara rutin untuk mendeteksi perubahan atau tanda-tanda yang mencurigakan.",
    },
  ];

  const itemMySkin = [
    {
      title: "Apa itu MySkin?",
      desription:
        "My Skin adalah sistem deteksi dini melanoma berbasis web yang menggunakan teknologi AI. Hasil analisis dapat diverifikasi oleh Dokter.",
    },
    {
      title: "Apakah MySkin berbayar?",
      desription:
        "My Skin gratis untuk digunakan oleh khalayak umum, dapat diakses dimana saja dan tidak dipungut biaya sepersen pun",
    },
  ];
  return (
    <div className="w-full min-h-screen pt-32">
      <h1 className="text-3xl font-bold text-black text-center">
        Frequntly Asked Questions
      </h1>
      <p className="font-normal text-black text-center mt-2">
        Terkait Melanoma
      </p>
      <div className="w-full flex flex-wrap justify-center gap-4 my-8">
        {itemMelanoma.map((item, index) => (
          <div key={index} className="rounded-lg shadow-lg w-1/3 bg-white p-5">
            <div className="flex items-center gap-x-2">
              <span className="border border-gray-200 p-1 rounded-lg">
                <img src={chat} alt="" />
              </span>
              <h1 className="font-semibold">{item.title}</h1>
            </div>
            <p className="text-sm font-normal mt-3">{item.desription}</p>
          </div>
        ))}
      </div>

      <h1 className="text-3xl font-bold text-black text-center">
        Frequntly Asked Questions
      </h1>
      <p className="font-normal text-black text-center mt-2">
        Terkait Melanoma
      </p>
      <div className="w-full flex flex-wrap justify-center gap-4 my-8">
        {itemMySkin.map((item, index) => (
          <div key={index} className="rounded-lg shadow-lg w-1/3 bg-white p-5">
            <div className="flex items-center gap-x-2">
              <span className="border border-gray-200 p-1 rounded-lg">
                <img src={chat} alt="" />
              </span>
              <h1 className="font-semibold">{item.title}</h1>
            </div>
            <p className="text-sm font-normal mt-3">{item.desription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
