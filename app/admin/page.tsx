import { Card, CardHeader, CardTitle } from "@/src/components/ui/card";
import { CardContent } from "@/src/components/ui/card";
import { buttonVariants } from "@/src/components/ui/button";
import Link from "next/link";
import { prisma } from "@/src/lib/script";
import { DeleteCitationButton } from "./delete-citation-button";


export default async function Page() {
  const citations = await prisma.citation.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>URL : / admin </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {citations.map((citation) => (
          <Card className="p-4 flex items-start gap-4" key={citation.id}>
            <div className="flex flex-col gap-2 flex-1">
              <p className="relative pl-8 italic">
                "{citation.text}"
              </p>
              <p> -- {citation.author} </p>
            </div>
            <div className="flex flex-col gap-2">
              <DeleteCitationButton id={citation.id} />
              <Link href={`/admin/citations/${citation.id}`} className={buttonVariants({ size: "sm", variant: "outline" })}>
                Modifier
              </Link>
                            <Link href={`/citations/${citation.id}`} className={buttonVariants({ size: "sm", variant: "outline" })}>
                Partager
              </Link>
            </div>
          </Card>
        ))}
        <Link href="admin/new" className={buttonVariants({ size: "lg", variant: "outline" })}>
          Ajouter une citation
        </Link>
      </CardContent>
    </Card>
  );
} 