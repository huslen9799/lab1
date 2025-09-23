import Layout from "@/components/Layout";
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Нүүр хуудас</h2>
        <p className="mb-6 text-gray-700 text-lg">
          Манай сайтад тавтай морил! Доорх нь жишээ зураг юм.
        </p>


        <p className="mt-6 text-gray-600">
          Энэ бол Layout болон Navbar ашигласан жишээ юм.
        </p>
      </div>
    </Layout>
  );
}
