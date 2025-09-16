import Layout from "@/components/Layout";

export default function ContactPage() {
  return (
    <Layout>
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-4">Холбоо барих</h1>
        <p className="text-gray-700 mb-2">
          Утас:{" "}
          <a href="tel:+1234567890" className="text-blue-600 hover:underline">
            +976 9911-2233
          </a>
        </p>
        <p className="text-gray-700">
          И-мэйл:{" "}
          <a
            href="mailto:info@example.com"
            className="text-blue-600 hover:underline"
          >
            info@example.com
          </a>
        </p>
      </div>
    </Layout>
  );
}
