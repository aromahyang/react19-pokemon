import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import fetch from "~/api";
import { Button, Input } from "~/components/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";

const formSchema = z.object({
  id: z.string().min(1),
});

async function fetchPokemon(previousState: number, payload: FormData) {
  const pokemon = await fetch({
    url: `https://pokeapi.co/api/v2/pokemon/${payload.get("id")}`,
    method: "GET",
  });
  return pokemon;
}

export default function UseActionState() {
  const [state, formAction, isPending] = useActionState(fetchPokemon, null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
    },
  });

  return (
    <div>
      <h2 className="font-bold text-2xl">useActionState()</h2>
      <p>useActionState()는 form action의 결과를 기반으로 상태를 업데이트하는 훅이다.</p>
      <Form {...form}>
        <form action={formAction}>
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pokemon ID</FormLabel>
                <FormControl>
                  <Input {...field} min={1} />
                </FormControl>
                <Button>Submit</Button>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div>
        <p>isPending: {isPending ? 'loading' : ''}</p>
        {state?.name}
      </div>
    </div>
  );
}
