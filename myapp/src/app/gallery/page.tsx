import Image from "next/image";
import { photos } from "@/app/data/photos";
import Layout from "@/components/Layout";

export default function GalleryPage() {
  return (
    <Layout>
      <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Photo <span className="text-blue-600">Gallery</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300"
            >
              {/* Зураг */}
              <Image
                src={photo.src}
                alt={photo.desc}
                width={400}
                height={250}
                className="w-full h-64 object-cover"
                placeholder="blur"
                blurDataURL="/images/placeholder.png"
              />

              {/* Тайлбар текст */}
              <div className="p-4 text-center">
                <p className="text-lg font-semibold text-gray-800">
                  {photo.desc}
                </p>
                <span className="block text-sm text-gray-500 mt-1">
                  Beautiful capture
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
