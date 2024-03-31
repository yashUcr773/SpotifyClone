import { cn } from "@/lib/utils";
import FileUploader from "../file-uploader";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface FormFileUploaderProps {
    form: any,
    label: string,
    name: string,
    endpoint: "coverImages" | "audioFiles" | "playlistImages"
}

export default function FormFileUploader({ form, label, name, endpoint }: FormFileUploaderProps) {
    return (
        <FormField control={form.control} name={name} render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center flex-1 bg-gray-700 rounded-lg cursor-pointer p-2">
                <FormLabel className={cn("capitalize test-xs font-medium text-zinc-50 mb-2", !field.value && '-mb-10')}>{label}</FormLabel>
                <FormControl>
                    <FileUploader endpoint={endpoint} value={field.value} onChange={field.onChange}></FileUploader>
                </FormControl>
                <FormMessage></FormMessage>

            </FormItem>
        )}></FormField>
    )
}