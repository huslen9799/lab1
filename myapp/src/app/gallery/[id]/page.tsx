import Image from "next/image";
import { photos } from "@/app/data/photos";

export default function PhotoDetail({ params }: { params: { id: string } }) {
  const photo = photos.find((p) => p.id === params.id);

  if (!photo) return <h1>Photo not found</h1>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{photo.id}</h1>
      <Image src={photo.src} alt={photo.desc} width={600} height={400} />
      <p>{photo.desc}</p>
    </div>
  );
}
