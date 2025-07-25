'use client';

import Form from "next/form";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/card";
import { useFormStatus } from "react-dom";
import { createCitationAction, updateCitationAction } from "./[citationId]/citations.action";
// import { createCitation }


export function CitationForm(props: { citation?: Citation }) {
  const onSubmit = async (FormData: FormData) => {
    let error: null | string = null;
    if (props.citation) {
      const json = await updateCitationAction(props.citation.id, {
        author: String(FormData.get("author")),
        text: String(FormData.get("text")),
      });
      error = json.error;
    }
    else {
      const json = await createCitationAction({
        author: String(FormData.get("author")),
        text: String(FormData.get("text")),
      });
      error = json.error;
    }
    if (error) {
      alert(error)
    }
  }
  // console.log(json);
 
  return (
    <Card>
      <CardHeader>
        <CardTitle> {props.citation ? "Modifier " : "Insérer"} la citation </CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          action={async (formData) => {
            await onSubmit(formData);
          }}
          className="flex flex-col gap-2">
          <Label>
            Citation
            <Input defaultValue={props.citation?.text} name="text" className="my-4 py-5" />
          </Label>
          <Label>
            Auteur
            <Input defaultValue={props.citation?.author} name="author" className="my-5 py-5" />
          </Label>
          <SubmitButton />
        </Form>
      </CardContent>
    </Card>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="bg-green-500 hover:bg-green-600">
      {pending ? "Envoi en cours..." : "Envoyer"}
    </Button>
  );
}