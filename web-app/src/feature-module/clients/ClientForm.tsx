import React from "react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { clientSchema, ClientSchema } from "../../lib/schemas/clientScema";

interface ClientFormProps {
  quantity: number;
  id: string | undefined;
  setaddClientFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClientForm: React.FC<ClientFormProps> = ({ quantity, id,setaddClientFlag }) => {
  const { clientStore: { addClient } } = useStore();

  const { register, handleSubmit, formState: { errors }, control } = useForm<ClientSchema>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      clients: Array.from({ length: quantity }, () => ({ name: "", passportNumber: "" }))
    }
  });

  const { fields } = useFieldArray({
    control,
    name: "clients", 
  });

  // Correct the onSubmit to accept ClientSchema which is an array of clients
  const onSubmit: SubmitHandler<ClientSchema> = async (data) => {
    // Loop through the clients and add them one by one
    for (const client of data.clients) {
      // Add bookingId to the client before passing to addClient
      if (id) {
        client.bookingId = id;
      }
  
      // Call addClient with a single client, not the entire data object
      const result = await addClient(client);
  
      if (result.status === "success") {
        toast.success(`Client ${client.name} Added Successfully`);
      } else {
        toast.error(`Error with ${client.name}: ${result.error}`);
      }
    }
    setaddClientFlag(true);
  };
  

  // Dynamically render client fields
  const clientFields = fields.map((client, index) => (
    <div key={client.id} className="flex items-center justify-between space-x-4 mb-2">
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700">Name</label>
        <input
          {...register(`clients.${index}.name`)}  // Correct dynamic field name
          className="w-full p-1 border border-gray-300 rounded-sm text-sm"
          placeholder="Enter name"
        />
        {errors?.clients?.[index]?.name && (
          <p className="text-red-500 text-xs">{errors?.clients?.[index]?.name?.message}</p>
        )}
      </div>

      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700">Passport Number</label>
        <input
          {...register(`clients.${index}.passportNumber`)}  // Correct dynamic field name
          className="w-full p-1 border border-gray-300 rounded-sm text-sm"
          placeholder="Enter passport number"
        />
        {errors?.clients?.[index]?.passportNumber && (
          <p className="text-red-500 text-xs">{errors?.clients?.[index]?.passportNumber?.message}</p>
        )}
      </div>
    </div>
  ));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      {clientFields}

      <div className="mt-2">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-sm text-sm hover:bg-blue-600"
        >
          Submit Clients
        </button>
      </div>
    </form>
  );
};

export default observer(ClientForm);
