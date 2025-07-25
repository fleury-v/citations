import { Card, CardHeader, CardTitle } from "@/src/components/ui/card";
import { prisma } from "@/src/lib/script";
import { CitationForm } from "../citation-form";


export default async function Page(props: {
  params: Promise<{
    citationId: string;
  }>;
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const params = await props.params;
  const citationId = params.citationId;

  const citation = await prisma.citation.findFirst({
    where: {
      id: Number(params.citationId),
    }
  })

  if (!citation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle> La {citationId} n'hésite pas </CardTitle>
        </CardHeader>
      </Card>
    )
  }

  return (
    <CitationForm citation={citation} />
  );
}