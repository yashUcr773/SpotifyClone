import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

interface FormInputProps {
    form: any,
    placehoder: string,
    label: string,
    isLoading: boolean
    name: string,
    type?: string
}

export default function FormInput({ form, placehoder, label, isLoading, name, type }: FormInputProps) {
    return (
        <FormField control={form.control} name={name} render={({ field }) => (
            <FormItem className="flex-1 w-full">
                <FormLabel className="capitalize test-xs font-medium text-zinc-50">{label.toLowerCase()}</FormLabel>
                <FormControl>
                    <Input disabled={isLoading} type={type}
                        className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600  text-white focus-visible:ring-0  focus-visible:ring-offset-0"
                        placeholder={placehoder} {...field}></Input>
                </FormControl>
                <FormMessage></FormMessage>
            </FormItem>
        )}></FormField>
    )
}