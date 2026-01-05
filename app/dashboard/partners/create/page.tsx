import PartnerForm from "@/components/PartnerForm";

const Page = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Create Partner</h2>
      <PartnerForm />
    </div>
  );
};

export default Page;
