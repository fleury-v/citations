'use client';

import { Button } from "@/src/components/ui/button";
import { useFormStatus } from "react-dom";
import { CitationForm } from "../citations/citation-form";

export default function Page() {

  return <CitationForm />

}

// const SubmitButton = () => {
//   const {pending} = useFormStatus(); 

//   return (
//     <Button type="submit" disabled={pending} className="bg-green-500 hover:bg-green-600">
//       {pending ? "Envoi en cours..." : "Envoyer"}
//     </Button>
//   );
// }