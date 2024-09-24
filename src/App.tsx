import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./components/ui/button";
import { Switch } from "./components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { DevTool } from "@hookform/devtools";

const formSchema = z.object({
  query: z.string().optional(),
  indicQuery: z.string().optional(),
  displayQuery: z.string(),
  inputScript: z.enum(["Devanagari", "Latin", "Other"]).optional(),
  isIndic: z.boolean().default(true),
  isAllTexts: z.boolean().default(true),
  selectedTexts: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

// const {
//   register,
//   handleSubmit,
//   watch,
//   control,
//   formState: { errors },
//   setValue,
// }
const App = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isIndic: true,
      isAllTexts: true,
      indicQuery: "",
      query: "",
      displayQuery: "",
      inputScript: "Devanagari",
      selectedTexts: [],
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
  } = form;

  const isIndic = watch("isIndic");
  const query = watch("query");
  const indicQuery = watch("indicQuery");

  // Display the transliterated query as displayQuery
  const displayQuery = isIndic ? indicQuery : query;
  setValue("displayQuery", displayQuery!);

  const isAllTexts = watch("isAllTexts");

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="h-screen max-w-5xl mx-auto p-4">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormItem>
            <FormLabel>Transliteration Toggle</FormLabel>
            <FormControl>
              <Controller
                control={control}
                name="isIndic"
                render={({ field }) => (
                  <Switch
                    onCheckedChange={field.onChange}
                    checked={field.value}
                  />
                )}
              />
            </FormControl>
            <FormMessage>{errors.isIndic?.message}</FormMessage>
          </FormItem>

          {isIndic ? (
            <FormItem>
              <FormLabel>Indic Query</FormLabel>
              <FormControl>
                <Input
                  {...register("indicQuery")}
                  placeholder="Enter Indic Query"
                />
              </FormControl>
              <FormMessage>{errors.indicQuery?.message}</FormMessage>
            </FormItem>
          ) : (
            <div className="flex gap-x-4">
              <FormItem className="w-full">
                <FormLabel>Query</FormLabel>
                <FormControl>
                  <Input {...register("query")} placeholder="Enter Query" />
                </FormControl>
                <FormMessage>{errors.query?.message}</FormMessage>
              </FormItem>
              <FormItem className="w-[300px]">
                <FormLabel>Input Script</FormLabel>

                <Select {...register("inputScript")}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Input Script" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Devanagari">Devanagari</SelectItem>
                    <SelectItem value="Latin">Latin</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage>{errors.inputScript?.message}</FormMessage>
              </FormItem>
            </div>
          )}

          <FormItem>
            <FormLabel>Display Query</FormLabel>
            <FormControl>
              <Input readOnly value={displayQuery} />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel>All Texts Toggle</FormLabel>
            <FormControl>
              <Controller
                control={control}
                name="isAllTexts"
                render={({ field }) => (
                  <Switch
                    onCheckedChange={field.onChange}
                    checked={field.value}
                  />
                )}
              />
            </FormControl>
            <FormMessage>{errors.isAllTexts?.message}</FormMessage>
          </FormItem>

          {!isAllTexts && (
            <FormItem>
              <FormLabel>Select Texts</FormLabel>
              <FormControl>
                <Select {...register("selectedTexts")}>
                  <option value="Text1">Text 1</option>
                  <option value="Text2">Text 2</option>
                  <option value="Text3">Text 3</option>
                </Select>
              </FormControl>
              <FormMessage>{errors.selectedTexts?.message}</FormMessage>
            </FormItem>
          )}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <DevTool control={control} />
    </div>
  );
};

export default App;
