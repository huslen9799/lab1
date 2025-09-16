import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <h2 className="text-2xl font-bold">Нүүр хуудас</h2>
      
      {/* Хүсвэл дунд нь өөр контент нэмэж болно */}
      <div className="mt-6">
        <p>Дунд хэсгийн агуулга</p>
      </div>

      {/* p элементийг хамгийн доор байрлууллаа */}
      <p className="mt-4">Энэ бол Layout ашигласан жишээ.</p>
    </Layout>
  );
}
