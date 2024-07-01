import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";
import { v4 as uuidv4 } from 'uuid'; 
const MenuSection = () => {
  const { control } = useFormContext();

  const {fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });

  return(
    <div className="space-y-2">
        <div>
            <h2 className="text-2xl font-bold">
                Menu
            </h2>
            <FormDescription>
                Create your menu along with name and price of each item
            </FormDescription>
        </div>
        <FormField control={control} name="menuItems" render={() => (
            <FormItem className="flex flex-col gap-2">
                {fields.map((field, index) => (
                    <MenuItemInput
                        key={field.id}
                        index={index}
                        removeMenuItem={() => {
                          remove(index);
                        }}
                        menuLength={fields.length}
                    />
                ))}
            </FormItem>
        )}/>
        <Button type="button" onClick={() => append({ id: uuidv4(), name: "", price: "" })}>
            Add Menu Item
        </Button>
    </div>
  )
};

export default MenuSection;
