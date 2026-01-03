import { ListPartnerDto } from "@/modules/partner/dto";

export type TablePartnerProp = {
  partners: ListPartnerDto[];
};

const TablePartner = ({ partners }: TablePartnerProp) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Partner Number
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Phone
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Created At
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {partners.map((partner) => (
          <tr key={partner.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {partner.number}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {partner.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {partner.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {partner.phone}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {partner.createdAt}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablePartner;
