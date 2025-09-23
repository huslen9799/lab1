import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Бидний тухай</h1>
        <p className="text-gray-700 mb-6">
          Манай сайт нь хэрэглэгчдэд зориулсан мэдээлэл, блог болон бусад үйлчилгээг хүргэдэг.
          Бид үргэлж илүү сайжруулахын төлөө хичээдэг.
        </p>

        {/* Example Image */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/hello.png" // public/images/team.jpg
            alt="Our Team"
            width={500}
            height={300}
            className="rounded-xl shadow-lg"
          />
        </div>

        <p className="text-gray-600 mb-6">
          Бидний гол зорилго бол хэрэглэгчдэд хамгийн сайн туршлагыг бий болгох юм. 
          Хэрэв танд ямар нэгэн санал хүсэлт байвал бидэнтэй холбогдоно уу.
        </p>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Нүүр хуудас руу буцах
        </Link>
      </div>
    </Layout>
  );
}
